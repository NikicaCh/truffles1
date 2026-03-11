import { LitterCard } from "./LitterCard";
import type { Litter } from "@/data/litters";

interface LittersGridProps {
  litters: Litter[];
}

export function LittersGrid({ litters }: LittersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {litters.map((litter, index) => (
        <LitterCard key={litter.id} litter={litter} index={index} />
      ))}
    </div>
  );
}
