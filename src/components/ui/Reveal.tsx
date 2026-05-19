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

type RevealDir = "up" | "left" | "right" | "scale";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  delay?: number;
  dir?: RevealDir;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  as,
  delay = 0,
  dir = "up",
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

  const baseTransform =
    dir === "up" ? "translate-y-3" : ""; // other dirs handled via [data-reveal-dir] CSS

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-dir={dir}
      className={cn(
        "opacity-0 transition-[opacity,transform] duration-700 ease-out will-change-transform",
        baseTransform,
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
