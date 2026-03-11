import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { FlagBadge } from "./FlagBadge";
import { getAnyDogById } from "@/data/dogs";
import type { LitterParent } from "@/data/litters";

interface LitterParentReferenceCardProps {
  role: "Mother" | "Father";
  parent: LitterParent;
}

export function LitterParentReferenceCard({ role, parent }: LitterParentReferenceCardProps) {
  const dog = parent.dogId ? getAnyDogById(parent.dogId) : undefined;
  const profileHref = parent.dogId ? `/dog/${parent.dogId}` : undefined;
  const primaryTitle = dog?.awards?.[0];

  return (
    <Card className="overflow-hidden border border-border">
      <CardContent className="p-0">
        {dog?.images?.[0] ? (
          <div className="relative h-64 w-full">
            <Image src={dog.images[0]} alt={`${parent.name} portrait`} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-64 w-full bg-muted" />
        )}

        <div className="p-4 sm:p-5 space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{role}</p>
          <div className="flex items-center gap-2">
            <FlagBadge flag={parent.flag} />
            {profileHref ? (
              <Link href={profileHref} className="font-semibold text-foreground hover:text-yellow-700">
                {parent.name}
              </Link>
            ) : (
              <p className="font-semibold text-foreground">{parent.name}</p>
            )}
          </div>
          {primaryTitle ? <p className="text-sm text-muted-foreground">{primaryTitle}</p> : null}
          {profileHref ? (
            <Link href={profileHref} className="inline-block text-sm font-medium text-yellow-700 hover:text-yellow-800">
              View full profile
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
