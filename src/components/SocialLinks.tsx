import type { Social } from "@/lib/types";
import { cn } from "@/lib/utils";
import { brandIcon } from "@/components/BrandIcons";

const iconMap = brandIcon;

export function SocialLinks({
  social,
  variant = "icon",
  className,
}: {
  social: Social[];
  variant?: "icon" | "labeled";
  className?: string;
}) {
  if (variant === "labeled") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {social.map((s) => {
          const Icon = iconMap[s.platform];
          return (
            <a
              key={s.platform + s.handle}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-line bg-surface/60 px-4 py-3 transition-colors hover:border-white/25 hover:bg-surface"
            >
              <Icon className="h-5 w-5 text-ash transition-colors group-hover:text-bone" />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-ash-dim">{s.platform}</div>
                <div className="truncate text-sm font-semibold text-bone">{s.handle}</div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {social.map((s) => {
        const Icon = iconMap[s.platform];
        return (
          <a
            key={s.platform + s.handle}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.platform} — ${s.handle}`}
            title={s.handle}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface/60 text-ash transition-all hover:scale-105 hover:border-white/25 hover:text-bone"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
