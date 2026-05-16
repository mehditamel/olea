"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  as,
  delay = 0,
  className,
  children,
  style,
  ...rest
}: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.setAttribute("data-revealed", "");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mergedStyle: CSSProperties = {
    ...(style ?? {}),
    transitionDelay: `${delay}ms`,
  };

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(
        "opacity-0 translate-y-3 transition-[opacity,transform] duration-700 ease-out will-change-transform",
        "data-[revealed]:opacity-100 data-[revealed]:translate-y-0",
        className,
      )}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
