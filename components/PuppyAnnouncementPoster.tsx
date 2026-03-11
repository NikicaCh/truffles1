import Link from "next/link";
import { Calendar, PawPrint } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { Litter } from "@/data/litters";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PuppyAnnouncementPosterProps {
  litter: Litter;
}

export function PuppyAnnouncementPoster({ litter }: PuppyAnnouncementPosterProps) {
  return (
    <Card className="mx-auto w-full max-w-5xl border border-border bg-white shadow-md">
      <ImageWithFallback
        src={litter.posterImage}
        alt={`${litter.title} poster`}
        className="w-full h-72 sm:h-96 md:h-[34rem] object-contain bg-muted/20"
      />
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-yellow-600 text-white">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Puppy Announcement
            </Badge>
            <span className="text-sm text-muted-foreground">{litter.dateLabel}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{litter.title}</h2>

          <div className="text-sm sm:text-base text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Kennel:</span> {litter.kennel}
            </p>
            {litter.puppyCount ? (
              <p>
                <span className="font-semibold text-foreground">Puppies:</span> {litter.puppyCount}
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-foreground">Mother:</span>{" "}
              <Link href={`/dog/${litter.mother.dogId}`} className="text-foreground hover:text-yellow-700 underline-offset-2 hover:underline">
                {litter.mother.name}
              </Link>
            </p>
            <p>
              <span className="font-semibold text-foreground">Father:</span>{" "}
              <Link href={`/dog/${litter.father.dogId}`} className="text-foreground hover:text-yellow-700 underline-offset-2 hover:underline">
                {litter.father.name}
              </Link>
            </p>
          </div>

          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <PawPrint className="h-4 w-4 shrink-0 mt-0.5 text-yellow-700" />
            Puppy photos are not published. This page shows litter posters and parent references.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
