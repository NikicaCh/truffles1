export interface Dog {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  birthDate: string;
  age: string;
  color: string;
  weight: string;
  status: 'Available' | 'Reserved' | 'Sold';
  price: string;
  parents: {
    sire: string;
    dam: string;
  };
  description: string;
  personality: string[];
  healthInfo: {
    vaccinated: boolean;
    microchipped: boolean;
    healthTested: boolean;
    healthGuarantee: boolean;
  };
  images: string[];
  features: string[];
  suitableFor: string[];
}

export const availableDogs: Dog[] = [
  {
    id: "luna-spring-2024",
    name: "Luna",
    gender: "Female",
    birthDate: "March 15, 2024",
    age: "4 months old",
    color: "Rich Brown with White Markings",
    weight: "8.5 kg",
    status: "Available",
    price: "€1,400",
    parents: {
      sire: "Champion Romeo della Truffle",
      dam: "Champion Stella di Macedonia"
    },
    description: "Luna is a stunning female Lagotto Romagnolo with exceptional conformation and a wonderful temperament. She comes from our champion bloodlines and shows great promise for both companionship and truffle hunting. Luna has been raised with early neurological stimulation and extensive socialization.",
    personality: ["Intelligent", "Playful", "Gentle", "Alert", "Affectionate"],
    healthInfo: {
      vaccinated: true,
      microchipped: true,
      healthTested: true,
      healthGuarantee: true
    },
    images: [
      "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588269845464-96a4daa06a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Champion bloodlines",
      "Early socialization program",
      "Basic training started",
      "Health guarantee included",
      "Microchipped",
      "Current on vaccinations"
    ],
    suitableFor: [
      "First-time Lagotto owners",
      "Families with children",
      "Active individuals",
      "Truffle hunting enthusiasts"
    ]
  },
  {
    id: "bruno-spring-2024",
    name: "Bruno",
    gender: "Male",
    birthDate: "March 15, 2024",
    age: "4 months old",
    color: "Orange Roan",
    weight: "9.2 kg",
    status: "Available",
    price: "€1,350",
    parents: {
      sire: "Champion Romeo della Truffle",
      dam: "Champion Stella di Macedonia"
    },
    description: "Bruno is a handsome male with excellent breed characteristics and a confident personality. He shows natural hunting instincts and has responded wonderfully to early training. Bruno would make an excellent addition to an active family or working home.",
    personality: ["Confident", "Energetic", "Loyal", "Smart", "Friendly"],
    healthInfo: {
      vaccinated: true,
      microchipped: true,
      healthTested: true,
      healthGuarantee: true
    },
    images: [
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Excellent conformation",
      "Natural hunting instincts",
      "Early socialization program",
      "Basic obedience training",
      "Health tested parents",
      "2-year health guarantee"
    ],
    suitableFor: [
      "Active families",
      "Experienced dog owners",
      "Hunting enthusiasts",
      "Large properties"
    ]
  },
  {
    id: "aria-spring-2024",
    name: "Aria",
    gender: "Female",
    birthDate: "March 15, 2024",
    age: "4 months old",
    color: "White with Brown Patches",
    weight: "7.8 kg",
    status: "Available",
    price: "€1,300",
    parents: {
      sire: "Champion Romeo della Truffle",
      dam: "Champion Stella di Macedonia"
    },
    description: "Aria is a beautiful female with striking white and brown coloring. She has a gentle nature and shows excellent potential for family life. Aria is particularly good with children and has shown natural water retrieving abilities.",
    personality: ["Gentle", "Patient", "Intelligent", "Calm", "Loving"],
    healthInfo: {
      vaccinated: true,
      microchipped: true,
      healthTested: true,
      healthGuarantee: true
    },
    images: [
      "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Excellent with children",
      "Water retrieval instincts",
      "Calm temperament",
      "Show quality conformation",
      "Health certified",
      "Socialized with cats"
    ],
    suitableFor: [
      "Families with young children",
      "First-time owners",
      "Show potential homes",
      "Therapy dog prospects"
    ]
  },
  {
    id: "maximus-summer-2024",
    name: "Maximus",
    gender: "Male",
    birthDate: "Expected June 2024",
    age: "Available for reservation",
    color: "Brown",
    weight: "To be determined",
    status: "Reserved",
    price: "€1,500",
    parents: {
      sire: "Champion Bruno di Truffle",
      dam: "Champion Bella Macedonia"
    },
    description: "Maximus comes from our upcoming summer litter with exceptional European bloodlines. Both parents are proven champions with excellent health clearances. Reservations are now being taken for this highly anticipated litter.",
    personality: ["To be determined", "Expected: Confident", "Intelligent", "Active"],
    healthInfo: {
      vaccinated: false,
      microchipped: false,
      healthTested: true,
      healthGuarantee: true
    },
    images: [
      "https://images.unsplash.com/photo-1588269845464-96a4daa06a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Champion parents",
      "European bloodlines",
      "Health tested lineage",
      "Early reservation available",
      "Expected superior conformation",
      "Working ability heritage"
    ],
    suitableFor: [
      "Experienced owners",
      "Working homes",
      "Show prospects",
      "Breeding programs"
    ]
  }
];

export const getDogById = (id: string): Dog | undefined => {
  return availableDogs.find(dog => dog.id === id);
};

export const getAvailableDogs = (): Dog[] => {
  return availableDogs.filter(dog => dog.status === 'Available');
};

export const getReservedDogs = (): Dog[] => {
  return availableDogs.filter(dog => dog.status === 'Reserved');
};