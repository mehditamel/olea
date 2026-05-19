import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-brand-text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
