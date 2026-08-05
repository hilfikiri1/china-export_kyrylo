import { Check } from "lucide-react";
import type { ProjectStage } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

export function ProjectTimeline({ stages }: { stages: ProjectStage[] }) {
  return (
    <div className="space-y-0">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        return (
          <div key={stage.id} className="flex gap-4">
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                  stage.status === "completed" &&
                    "border-green-500/50 bg-green-500/15 text-green-400",
                  stage.status === "current" &&
                    "border-accent-light bg-accent-light/15 text-accent-light ring-4 ring-accent-light/10",
                  stage.status === "upcoming" &&
                    "border-white/10 bg-white/5 text-white/30",
                )}
              >
                {stage.status === "completed" ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mt-1 w-0.5 flex-1",
                    stage.status === "completed"
                      ? "bg-green-500/30"
                      : "bg-white/8",
                  )}
                  style={{ minHeight: "1.5rem" }}
                />
              )}
            </div>

            {/* Content column */}
            <div className={cn("pb-6", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-medium leading-8",
                  stage.status === "completed" && "text-white/60",
                  stage.status === "current" && "font-semibold text-white",
                  stage.status === "upcoming" && "text-white/30",
                )}
              >
                {stage.name}
                {stage.status === "current" && (
                  <span className="ml-2 inline-block rounded-full bg-accent-light/20 px-2 py-0.5 text-xs font-medium text-accent-light">
                    Aktualny
                  </span>
                )}
              </p>
              {stage.completedAt && (
                <p className="text-xs text-white/30">{stage.completedAt}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
