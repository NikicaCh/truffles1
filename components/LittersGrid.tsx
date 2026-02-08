import { LitterCard } from "./LitterCard";
import type { Litter } from "@/data/litters";

interface LittersGridProps {
  litters: Litter[];
  /** Use "threeCol" for hero section to show all 3 in a row on larger screens */
  variant?: "default" | "threeCol";
}

export function LittersGrid({ litters, variant = "default" }: LittersGridProps) {
  const gridClass =
    variant === "threeCol"
      ? "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4"
      : "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8";

  return (
    <div className={gridClass}>
      {litters.map((litter, index) => (
        <LitterCard key={litter.id} litter={litter} index={index} />
      ))}
    </div>
  );
}
