import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-line pb-12 pt-32 sm:pt-36", className)}>
      <div className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(80%_80%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-24 left-1/2 -z-10 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-crimson/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-3 w-1.5 rounded-full bg-crimson" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-ash">{eyebrow}</span>
        </div>
        <h1 className="headline max-w-4xl text-5xl text-bone sm:text-6xl md:text-7xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ash">{description}</p>}
        {children}
      </div>
    </section>
  );
}
