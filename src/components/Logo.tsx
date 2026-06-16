import { cn } from "@/lib/utils";

export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark && (
        <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-crimson to-crimson-deep shadow-[0_0_18px_-4px_var(--color-crimson)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            {/* championship belt buckle mark */}
            <path d="M5 9.5 L12 6 L19 9.5 L19 13 Q12 18 12 18 Q12 18 5 13 Z" fill="#fff" opacity="0.95" />
            <circle cx="12" cy="11.5" r="2.2" fill="var(--color-crimson-deep)" />
          </svg>
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25" />
        </span>
      )}
      <span className="font-display text-2xl leading-none tracking-tight text-bone">
        WRASS<span className="text-crimson">LIN</span>
      </span>
    </span>
  );
}
