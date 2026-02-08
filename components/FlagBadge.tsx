import { cn } from "./ui/utils";
import type { LitterFlag } from "@/data/litters";

const FLAG_EMOJI: Record<LitterFlag, string> = {
  MK: "🇲🇰",
  IT: "🇮🇹",
};

interface FlagBadgeProps {
  flag: LitterFlag;
  className?: string;
  "aria-label"?: string;
}

export function FlagBadge({ flag, className, "aria-label": ariaLabel }: FlagBadgeProps) {
  return (
    <span
      className={cn("inline-flex text-base leading-none opacity-90", className)}
      role="img"
      aria-label={ariaLabel ?? (flag === "MK" ? "Macedonia" : "Italy")}
    >
      {FLAG_EMOJI[flag]}
    </span>
  );
}
