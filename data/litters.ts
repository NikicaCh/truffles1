export type LitterFlag = "MK" | "IT";

export interface LitterParent {
  name: string;
  flag: LitterFlag;
  dogId?: string;
}

export interface Litter {
  id: string;
  mother: LitterParent;
  father: LitterParent;
  healthInfo: string;
  date: string;
  image?: string;
}

export const UPCOMING_LITTERS: Litter[] = [
  {
    id: "litter-lara-igor",
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
    date: "February 15th, 2026",
  },
  {
    id: "litter-astra-igor",
    mother: {
      name: "JCH Astra from Truffles Macedonia",
      flag: "MK",
      dogId: "astra-from-truffles-macedonia",
    },
    father: {
      name: "Igor del Casale Brioso",
      flag: "IT",
      dogId: "igor-del-casale-brioso",
    },
    healthInfo: "Genetic clear · HIP & Elbow normal",
    date: "February / March",
  },
  {
    id: "litter-kali-igor",
    mother: {
      name: "Inter CH Kali from Truffles Macedonia",
      flag: "MK",
      dogId: "kali-from-truffles-macedonia",
    },
    father: {
      name: "Igor del Casale Brioso",
      flag: "IT",
      dogId: "igor-del-casale-brioso",
    },
    healthInfo: "Genetic clear · HIP & Elbow normal",
    date: "February / March",
  },
];
