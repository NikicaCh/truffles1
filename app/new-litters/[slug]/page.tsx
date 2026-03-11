import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { UpcomingLittersNav } from "@/components/UpcomingLittersNav";
import { PuppyAnnouncementPoster } from "@/components/PuppyAnnouncementPoster";
import { LitterParentReferenceCard } from "@/components/LitterParentReferenceCard";
import { getLitterBySlug, getNewLitters } from "@/data/litters";

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getNewLitters().map((litter) => ({ slug: litter.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const litter = getLitterBySlug(params.slug);
  if (!litter) return {};

  const title = `${litter.kennel} Puppies – ${litter.monthYear}`;
  const description = `${litter.title}. ${litter.dateLabel}. Parents: ${litter.mother.name} and ${litter.father.name}.`;
  const canonical = `https://lagottomacedonia.com/new-litters/${litter.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default function NewLitterDetailPage({ params }: Props) {
  const litter = getLitterBySlug(params.slug);
  if (!litter || litter.status !== "new") return notFound();

  return (
    <div className="min-h-screen bg-background">
      <UpcomingLittersNav />
      <main className="pt-20 bg-gradient-to-br from-yellow-50/50 via-white to-orange-50/50">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{litter.kennel} Puppies - {litter.monthYear}</h1>
            <p className="text-muted-foreground">{litter.description}</p>
          </header>

          <PuppyAnnouncementPoster litter={litter} />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Parent References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LitterParentReferenceCard role="Mother" parent={litter.mother} />
              <LitterParentReferenceCard role="Father" parent={litter.father} />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-white/90 p-5 sm:p-6 space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Litter Updates</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Birth status: Born</li>
              <li>Availability status: Pending update</li>
              <li>Reservation status: Pending update</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
