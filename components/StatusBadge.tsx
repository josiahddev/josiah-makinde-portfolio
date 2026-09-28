import type { ProjectStatus } from "@/lib/data";
import { Badge } from "./ui/Badge";

const tone: Record<ProjectStatus, "accent" | "neutral" | "solid"> = {
  Working: "accent",
  "In progress": "neutral",
  "Learning project": "solid",
  Planned: "neutral",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge tone={tone[status]} dot={status === "Working" || status === "In progress"}>
      {status}
    </Badge>
  );
}
