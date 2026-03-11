export type LitterFlag = "MK" | "IT";
export type LitterStatus = "upcoming" | "new" | "archived";
export type LitterDateKind = "expected" | "born";

export interface LitterParent {
  name: string;
  flag: LitterFlag;
  dogId?: string;
}

export interface Litter {
  id: string;
  slug: string;
  title: string;
  monthYear: string;
  dateLabel: string;
  dateISO: string;
  dateKind: LitterDateKind;
  puppyCount?: string;
  description: string;
  kennel: string;
  posterImage: string;
  posterObjectPosition?: string;
  posterObjectFit?: "cover" | "contain";
  mother: LitterParent;
  father: LitterParent;
  healthInfo: string;
  status: LitterStatus;
}

export const ALL_LITTERS: Litter[] = [
  {
    id: "litter-astra-igor-2026",
    slug: "astra-igor-february-2026",
    title: "Astra x Igor Litter",
    monthYear: "February 2026",
    dateLabel: "Born February 22, 2026",
    dateISO: "2026-02-22",
    dateKind: "born",
    puppyCount: "Born - updates soon",
    description:
      "Astra x Igor puppies are born. This new litter announcement uses poster updates and parent references.",
    kennel: "Truffles Macedonia",
    posterImage: "/POSTERS/litter-astra-igor.png",
    posterObjectPosition: "center 34%",
    posterObjectFit: "cover",
    mother: {
      name: "Astra from Truffles Macedonia",
      flag: "MK",
      dogId: "astra-from-truffles-macedonia",
    },
    father: {
      name: "Igor del Casale Brioso",
      flag: "IT",
      dogId: "igor-del-casale-brioso",
    },
    healthInfo: "Genetic clear · HIP & Elbow normal",
    status: "new",
  },
  {
    id: "litter-lara-igor-2026",
    slug: "lara-igor-february-2026",
    title: "Lara x Igor Litter",
    monthYear: "February 2026",
    dateLabel: "Born February 18, 2026",
    dateISO: "2026-02-18",
    dateKind: "born",
    puppyCount: "Born - updates soon",
    description:
      "Lara x Igor puppies are born. This new litter announcement uses poster updates and parent references.",
    kennel: "Truffles Macedonia",
    posterImage: "/POSTERS/litter-lara-igor.png",
    posterObjectPosition: "center 50%",
    posterObjectFit: "cover",
    mother: {
      name: "Lara from Truffles Macedonia",
      flag: "MK",
      dogId: "lara-from-truffles-macedonia",
    },
    father: {
      name: "Igor del Casale Brioso",
      flag: "IT",
      dogId: "igor-del-casale-brioso",
    },
    healthInfo: "Genetic clear · HIP & Elbow normal",
    status: "new",
  },
];

const getTodayISO = (): string => new Date().toISOString().split("T")[0];

export const getUpcomingLitters = (todayISO: string = getTodayISO()): Litter[] =>
  ALL_LITTERS.filter((litter) => litter.status === "upcoming" && litter.dateISO >= todayISO);

export const getNewLitters = (): Litter[] =>
  ALL_LITTERS.filter((litter) => litter.status === "new");

export const getLitterBySlug = (slug: string): Litter | undefined =>
  ALL_LITTERS.find((litter) => litter.slug === slug);

export const UPCOMING_LITTERS: Litter[] = getUpcomingLitters();
export const NEW_LITTERS: Litter[] = getNewLitters();
