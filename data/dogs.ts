export interface ParentInfo {
  name: string;
  healthInfo?: {
    hips?: string;
    elbows?: string;
    patella?: string;
    geneticTesting?: string;
  };
  url?: string;
  awards?: string[];
}

export interface Dog {
  id: string;
  name: string;
  aka?: string;
  url?: string;
  gender: 'Male' | 'Female';
  birthDate: string;
  age: string;
  color: string;
  weight: string;
  status?: 'Available' | 'Reserved' | 'Sold';
  parents: {
    sire: ParentInfo | string;
    dam: ParentInfo | string;
  };
  description?: string;
  personality: string[];
  healthInfo: {
    geneticTesting: string;
    hips: string;
    elbows: string;
    patella: string;
  };
  images: string[];
  awards?: string[];
  features?: string[];
  suitableFor?: string[];
}

function calculateAge(birthDateStr: string): string {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (years > 0 && months > 0) {
    return `${years}y ${months}m`;
  } else if (years > 0) {
    return `${years}y`;
  } else {
    return `${months}m`;
  }
}

export const availableDogs: Dog[] = [
  {
    id: "luna-spring-2024",
    name: "Luna",
    gender: "Female",
    birthDate: "January 13, 2020",
    age: calculateAge("2020-01-13"),
    color: "Rich Brown with White Markings",
    weight: "14 kg",
    status: "Available",
    parents: {
      sire: "Champion Romeo della Truffle",
      dam: "Champion Stella di Macedonia"
    },
    description: "Luna is a stunning female Lagotto Romagnolo with exceptional conformation and a wonderful temperament. She comes from our champion bloodlines and shows great promise for both companionship and truffle hunting. Luna has been raised with early neurological stimulation and extensive socialization.",
    personality: ["Intelligent", "Playful", "Gentle", "Alert", "Affectionate"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    images: [
      "/dog1.jpeg",
      "/dog1.jpeg",
      "/dog1.jpeg"
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
    age: calculateAge("2024-03-15"),
    color: "Orange Roan",
    weight: "9.2 kg",
    status: "Available",
    parents: {
      sire: "Champion Romeo della Truffle",
      dam: "Champion Stella di Macedonia"
    },
    description: "Bruno is a handsome male with excellent breed characteristics and a confident personality. He shows natural hunting instincts and has responded wonderfully to early training. Bruno would make an excellent addition to an active family or working home.",
    personality: ["Confident", "Energetic", "Loyal", "Smart", "Friendly"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    images: [
      "/dog1.jpeg",
      "/dog5.jpeg",
      "/dog5.jpeg",
      "/dog5.jpeg",
      "/dog5.jpeg",
      "/dog5.jpeg"
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
    age: calculateAge("2024-03-15"),
    color: "White with Brown Patches",
    weight: "7.8 kg",
    status: "Available",
    parents: {
      sire: "Champion Romeo della Truffle",
      dam: "Champion Stella di Macedonia"
    },
    description: "Aria is a beautiful female with striking white and brown coloring. She has a gentle nature and shows excellent potential for family life. Aria is particularly good with children and has shown natural water retrieving abilities.",
    personality: ["Gentle", "Patient", "Intelligent", "Calm", "Loving"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    images: [
      "/dog1.jpeg",
      "/dog1.jpeg",
      "/dog1.jpeg"
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
    parents: {
      sire: "Champion Bruno di Truffle",
      dam: "Champion Bella Macedonia"
    },
    description: "Maximus comes from our upcoming summer litter with exceptional European bloodlines. Both parents are proven champions with excellent health clearances. Reservations are now being taken for this highly anticipated litter.",
    personality: ["To be determined", "Expected: Confident", "Intelligent", "Active"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    images: [
      "/dog1.jpeg",
      "/dog1.jpeg",
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

export const ourDogs : Dog[] = [
  {
    id: "bianka-luna",
    name: "Bianka",
    aka: "Luna",
    url: "https://lagotto.breedarchive.com/animal/view/bianka-7e81c821-7662-4444-bb5b-650906da67c3",
    gender: "Female",
    birthDate: "January 13, 2020",
    age: calculateAge("2020-01-13"),
    color: "White and Orange",
    weight: "14 kg",
    parents: {
      sire: {
        name: "Bruno",
        url: "https://lagotto.breedarchive.com/animal/view/bruno-563e235b-fadf-4b83-a8b9-062a34bccad1"
      },
      dam: {
        name: "Etika",
        url: "https://lagotto.breedarchive.com/animal/view/etika-3e80ffe5-38a6-4d21-9ed6-c7a8d938a40d"
      }
    },
    personality: ["Intelligent", "Playful", "Gentle", "Alert", "Affectionate"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: [
      "MK CH - Macedonian Conformation Champion",
      "MK JCH - Macedonian Junior Champion"
    ],
    images: [
      "/LUNA/lagotto-romagnolo-bianka-jumping-upward-in-forest.webp",
      "/LUNA/lagotto-romagnolo-bianka-running-with-dogs-in-forest.webp",
      "/LUNA/lagotto-romagnolo-bianka-with-found-truffle-portrait.webp",
      "/LUNA/lagotto-romagnolo-bianka-leaping-fully-airborne-in-forest.webp",
      "/LUNA/lagotto-romagnolo-bianka-sitting-on-couch-with-pillow.webp",
      "/LUNA/lagotto-romagnolo-bianka-standing-on-forest-trail.webp",
      "/LUNA/lagotto-romagnolo-bianka-running-horizontally-in-forest.webp",
      "/LUNA/lagotto-romagnolo-bianka-playing-in-mud-puddle.webp",
      "/LUNA/lagotto-romagnolo-bianka-jumping-high-near-vehicle.webp",
      "/LUNA/lagotto-romagnolo-bianka-sitting-on-living-room-couch.webp",
      "/LUNA/lagotto-romagnolo-bianka-in-meadow-with-truffle-harvest.webp",
      "/LUNA/lagotto-romagnolo-bianka-with-dark-companion-in-forest.webp",
      "/LUNA/lagotto-romagnolo-bianka-indoor-floor-portrait-closeup.webp",
    ]
  },
  {
    id: "kali-from-truffles-macedonia",
    name: "Kali from Truffles Macedonia",
    url: "https://lagotto.breedarchive.com/animal/view/kali-from-truffles-macedonia-4b2266f2-be79-47b5-bc1e-c83e9cc67f60",
    gender: "Female",
    birthDate: "July 21, 2022",
    age: calculateAge("2022-07-21"),
    color: "White and Orange",
    weight: "14.5kg",
    parents: {
      sire: {
        name: "Aga",
        url: "https://lagotto.breedarchive.com/animal/view/aga-5b86d591-e9a1-4dac-95a0-5564fe16f669",
        awards: [
          "MK JCH - Macedonian Junior Champion",
          "MK CH - Macedonian Conformation Champion",
          "MK GR CH - Macedonian Grand Champion"
        ]
      },
      dam: {
        name: "Bianka from Truffles Macedonia",
        url: "https://lagotto.breedarchive.com/animal/view/bianka-7e81c821-7662-4444-bb5b-650906da67c3"
      }
    },
    personality: ["Confident", "Energetic", "Loyal", "Smart", "Friendly"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: [
      "MK JCH - Macedonian Junior Champion",
      "MK CH - Macedonian Conformation Champion",
      "RS JCH - Serbian Junior Champion",
      "J-CH KO - Junior Champion Kosovo",
      "CH JCH - Swiss Junior Champion",
      "Third place on WDSH in Swiss",
      "Winner of Grand Prix Geneva",
      "Swiss Champion"
    ],
    images: [
      "/KALI/lagotto-romagnolo-kali-show-grooming-stance-profile.webp",
      "/KALI/lagotto-romagnolo-kali-show-grooming-stance-side-view.webp",
      "/KALI/lagotto-romagnolo-kali-world-dog-show-geneva-award-diploma.webp",
      "/KALI/lagotto-romagnolo-kali-professional-show-grooming-portrait.webp",
      "/KALI/lagotto-romagnolo-kali-grand-prix-geneve-award-diploma.webp",
      "/KALI/lagotto-romagnolo-kali-on-grooming-table-profile.webp",
      "/KALI/lagotto-romagnolo-kali-playful-on-couch.webp",
    ]
  },
  {
    id: "astra-from-truffles-macedonia",
    name: "Astra from Truffles Macedonia",
    gender: "Female",
    birthDate: "May 1, 2024",
    age: calculateAge("2024-05-01"),
    color: "Brown and White",
    weight: "14kg",
    parents: {
      sire: {
        name: "Zaron",
        url: "https://lagotto.breedarchive.com/animal/view/zaron-45174d3d-f292-4a3e-a125-c6418c5c5a1a",
        awards: ["MK JCH - Macedonian Junior Champion"]
      },
      dam: {
        name: "Kali from Truffles Macedonia",
        url: "https://lagotto.breedarchive.com/animal/view/kali-from-truffles-macedonia-4b2266f2-be79-47b5-bc1e-c83e9cc67f60",
        awards: [
          "MK JCH - Macedonian Junior Champion",
          "MK CH - Macedonian Conformation Champion",
          "RS JCH - Serbian Junior Champion",
          "J-CH KO - Junior Champion Kosovo",
          "CH JCH - Swiss Junior Champion",
          "Third place on WDSH in Swiss",
          "Winner of Grand Prix Geneva",
          "Swiss Champion"
        ]
      }
    },
    personality: ["Gentle", "Patient", "Intelligent", "Calm", "Loving"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: ["YCH - Macedonian Youth Champion"],
    images: [
      "/ASTRA/lagotto-romagnolo-astra-conformation-stance-in-backyard.webp",   
      "/ASTRA/lagotto-romagnolo-astra-with-owner-kneeling-in-park.webp",       
      "/ASTRA/lagotto-romagnolo-astra-standing-portrait-on-grass.webp",       
      "/ASTRA/lagotto-romagnolo-astra-training-with-owner-in-park.webp",       
      "/ASTRA/lagotto-romagnolo-astra-outdoor-portrait.webp",       
      "/ASTRA/lagotto-romagnolo-astra-park-candid.webp",       
      "/ASTRA/lagotto-romagnolo-astra-outdoor-action.webp",       
    ]
  },
  {
    id: "ami-our-dog",
    name: "Ami",
    url: "https://lagotto.breedarchive.com/animal/view/ami-7258e6be-7d71-429c-8337-8a1f469beee0",
    gender: "Male",
    birthDate: "May 1, 2019",
    age: calculateAge("2019-05-01"),
    color: "Brown",
    weight: "12kg",
    parents: {
      sire: {
        name: "Bami",
        url: "https://lagotto.breedarchive.com/animal/view/bami-a14550c1-e1df-47a0-9136-0b7eefc20c4b"
      },
      dam: {
        name: "Hana",
        url: "https://lagotto.breedarchive.com/animal/view/hana-2290338b-fbd9-410f-b4d5-2e8b99ea082b",
        awards: ["RS JCH - Serbian Junior Champion"]
      }
    },
    personality: ["Confident", "Intelligent", "Active", "Loyal"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: [
      "MK JCH - Macedonian Junior Champion",
      "MK CH - Macedonian Conformation Champion",
      "MK GR CH - Macedonian Grand Champion"
    ],
    images: [
      "/AMI/lagotto-romagnolo-ami-forest-pine-needles-portrait.webp",
      "/AMI/lagotto-romagnolo-ami-playful-upside-down-on-couch.webp",
      "/AMI/lagotto-romagnolo-ami-sitting-on-grooming-table-at-salon.webp",
      "/AMI/lagotto-romagnolo-ami-indoor-home-sitting.webp",
      "/AMI/lagotto-romagnolo-ami-playful-belly-up-on-couch.webp",
      "/AMI/lagotto-romagnolo-ami-outdoor-portrait.jpeg",
      "/AMI/lagotto-romagnolo-ami-indoor-candid.webp",
    ]
  },
  {
    id: "igor-del-casale-brioso",
    name: "Igor del Casale Brioso",
    aka: "Joker",
    url: "https://lagotto.breedarchive.com/animal/view/igor-del-casale-brioso-60d2b875-036c-45f4-b324-53259b124d98",
    gender: "Male",
    birthDate: "September 5, 2024",
    age: calculateAge("2024-09-05"),
    color: "White and Orange",
    weight: "15kg",
    parents: {
      sire: {
        name: "Morgan (Marcelli)",
        url: "https://lagotto.breedarchive.com/animal/view/morgan-marcelli-7ec2c04b-c424-4c42-a2c7-e321266b0ca6",
        awards: ["IT CH - Italian Conformation Champion", "CH RIPR. - Campione Riproduttore", "SELECTED REPRODUCER"]
      },
      dam: {
        name: "Clio (Mencarelli)",
        url: "https://lagotto.breedarchive.com/animal/view/clio-mencarelli-58971219-0af4-47cc-9755-98f12632d131"
      }
    },
    personality: ["Playful", "Intelligent", "Energetic", "Friendly"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    images: [
      "/IGOR/lagotto-romagnolo-igor-first-place-winner-cacib-mavrovo-show.webp",
      "/IGOR/lagotto-romagnolo-igor-conformation-stance-with-handler-in-backyard.webp",
      "/IGOR/lagotto-romagnolo-igor-show-ring-conformation-stance.webp",
      "/IGOR/lagotto-romagnolo-igor-at-dog-show-with-judge-and-handler.webp",
      "/IGOR/lagotto-romagnolo-igor-gaiting-at-dog-show-with-handler.webp",
      "/IGOR/lagotto-romagnolo-igor-winners-podium-cacib-mavrovo.webp",
      "/IGOR/lagotto-romagnolo-igor-gaiting-in-show-ring.webp",
      "/IGOR/lagotto-romagnolo-igor-show-event-action.webp",
      "/IGOR/lagotto-romagnolo-igor-show-portrait.webp",
      "/IGOR/lagotto-romagnolo-igor-at-show-candid.webp",
      "/IGOR/lagotto-romagnolo-igor-additional-show-photo.webp",
    ]
  },
  {
    id: "ahilej",
    name: "Ahilej",
    url: "https://lagotto.breedarchive.com/animal/view/ahilej-crna-cizmica-2cf8afa4-68a7-42b3-b57c-487c92d59daa",
    gender: "Male",
    birthDate: "July 26, 2021",
    age: calculateAge("2021-07-26"),
    color: "Orange",
    weight: "13kg",
    parents: {
      sire: {
        name: "Kan Trace Viking Lord",
        url: "https://lagotto.breedarchive.com/animal/view/kan-trace-viking-lord-735b83fb-e8bc-4cc0-aaca-d075ad961729",
        awards: [
          "EU W 2023 - FCI European Winner 2023",
          "EU W 2021 - FCI European Winner 2021",
          "EU JW 2019 - FCI European Junior Winner 2019",
          "SBIS - Supreme Best In Show Winner",
          "BIS - All Breed Best In Show Winner",
          "BISS - Best In Speciality Show",
          "HU GR CH - Hungarian Grand Champion",
          "HU CH - Hungarian Conformation Champion",
          "RO CH - Romanian Conformation Champion",
          "HR CH - Croatian Conformation Champion",
          "SI CH - Slovenian Conformation Champion",
          "BA CH - Bosnian-Herzegovinian Conformation Champion",
          "LU CH - Luxembourg Conformation Champion",
          "LU JCH - Luxembourg Junior Champion",
          "HU JCH - Hungarian Junior Champion",
          "BPIS - Puppy Best In Show",
          "JCAC - Junior Class Winner",
          "JBOB - Junior Best Of Breed Winner",
          "CAC - Class Winner",
          "CACIB - FCI-CACIB",
          "BOB - Best Of Breed Winner",
          "BOG - Best Of Group"
        ]
      },
      dam: {
        name: "Marian Crna Cizmica",
        url: "https://lagotto.breedarchive.com/animal/view/marian-crna-cizmica-4b1aff6e-1a44-42d8-b2cc-ab0562a111d0",
        awards: ["MK CH - Macedonian Conformation Champion"]
      }
    },
    personality: ["Confident", "Intelligent", "Active", "Loyal"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: [
      "MK CH - Macedonian Conformation Champion",
      "MK JCH - Macedonian Junior Champion",
      "XK Ch - Champion of Kosovo",
      "RS CH - Serbian Conformation Champion",
      "AL CH - Champion of Albania"
    ],
    images: [
      "/AHIL/lagotto-romagnolo-ahilej-side-profile-portrait.jpeg",
      "/AHIL/lagotto-romagnolo-ahilej-with-owner-on-street.webp",
      "/AHIL/lagotto-romagnolo-ahilej-show-photo.webp",
      "/AHIL/lagotto-romagnolo-ahilej-with-owners-on-show-stage.webp",
      "/AHIL/lagotto-romagnolo-ahilej-show-portrait.webp",
      "/AHIL/lagotto-romagnolo-ahilej-outdoor-portrait.webp",
      "/AHIL/lagotto-romagnolo-ahilej-conformation-stance.webp",
      "/AHIL/lagotto-romagnolo-ahilej-candid-photo.webp",
      "/AHIL/lagotto-romagnolo-ahilej-action-shot.webp",
      "/AHIL/lagotto-romagnolo-ahilej-additional-portrait.webp",
      "/AHIL/lagotto-romagnolo-ahilej-show-candid.webp",
    ]
  },
  {
    id: "fanny-from-truffles-macedonia",
    name: "Fanny from Truffles Macedonia",
    gender: "Female",
    birthDate: "November 24, 2024",
    age: calculateAge("2024-11-24"),
    color: "Brown",
    weight: "14kg",
    parents: {
      sire: {
        name: "Ahilej",
        url: "https://lagotto.breedarchive.com/animal/view/ahilej-crna-cizmica-2cf8afa4-68a7-42b3-b57c-487c92d59daa",
        awards: [
          "MK CH - Macedonian Conformation Champion",
          "MK JCH - Macedonian Junior Champion",
          "XK Ch - Champion of Kosovo",
          "RS CH - Serbian Conformation Champion",
          "AL CH - Champion of Albania"
        ]
      },
      dam: {
        name: "Bianka",
        url: "https://lagotto.breedarchive.com/animal/view/bianka-7e81c821-7662-4444-bb5b-650906da67c3",
        awards: [
          "MK CH - Macedonian Conformation Champion",
          "MK JCH - Macedonian Junior Champion"
        ]
      }
    },
    personality: ["Playful", "Energetic", "Curious", "Friendly"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: [
      "MK YCH - Macedonian Youth Champion"
    ],
    images: [
      "/FANNY/lagotto-romagnolo-fanny-held-by-owner-with-youth-champion-trophy.webp",
      "/FANNY/lagotto-romagnolo-fanny-conformation-stance-with-handler-and-trophy.webp",
      "/FANNY/lagotto-romagnolo-fanny-closeup-portrait-with-trophy.webp",
      "/FANNY/lagotto-romagnolo-fanny-conformation-stance-at-outdoor-show.webp",
    ]
  },
  {
    id: "lara-from-truffles-macedonia",
    name: "Lara from Truffles Macedonia",
    gender: "Female",
    birthDate: "February 22, 2023",
    age: calculateAge("2023-02-22"),
    color: "White",
    weight: "14kg",
    parents: {
      sire: {
        name: "Ahilej",
        url: "https://lagotto.breedarchive.com/animal/view/ahilej-crna-cizmica-2cf8afa4-68a7-42b3-b57c-487c92d59daa",
        awards: [
          "MK CH - Macedonian Conformation Champion",
          "MK JCH - Macedonian Junior Champion",
          "XK Ch - Champion of Kosovo",
          "RS CH - Serbian Conformation Champion",
          "AL CH - Champion of Albania"
        ]
      },
      dam: {
        name: "Misha",
        url: "https://lagotto.breedarchive.com/animal/view/misha-e342c565-26a8-4f85-843b-5a8b03d60e3a",
        awards: [
          "MK CH - Macedonian Conformation Champion",
          "MK JCH - Macedonian Junior Champion"
        ]
      }
    },
    personality: ["Intelligent", "Active", "Friendly", "Alert", "Enthusiastic"],
    healthInfo: {
      geneticTesting: "All Clear",
      hips: "Excellent",
      elbows: "Excellent",
      patella: "Excellent"
    },
    awards: [
      "MK CH - Macedonian Conformation Champion",
      "MK JCH - Macedonian Junior Champion"
    ],
    features: [
      "Active in Tracking sports",
      "Active in Track & Search",
      "Active in Nosework"
    ],
    images: [
      "/LARA/lagotto-romagnolo-lara-groomed-standing-on-grooming-table.jpeg",
      "/LARA/lagotto-romagnolo-lara-indoor-training-with-treat-on-couch.webp",
      "/LARA/lagotto-romagnolo-lara-standing-in-kitchen-indoor.webp",
      "/LARA/lagotto-romagnolo-lara-sitting-on-couch-side-profile.webp",
      "/LARA/lagotto-romagnolo-lara-sitting-on-couch-portrait.webp",
      "/LARA/lagotto-romagnolo-lara-training-session-looking-up-at-treat.webp",
      "/LARA/lagotto-romagnolo-lara-conformation-stance-with-handler-on-street.webp",
    ]
  }
]

export const getDogById = (id: string): Dog | undefined => {
  return availableDogs.find(dog => dog.id === id);
};

export const getAvailableDogs = (): Dog[] => {
  return availableDogs.filter(dog => dog.status === 'Available');
};

export const getReservedDogs = (): Dog[] => {
  return availableDogs.filter(dog => dog.status === 'Reserved');
};

export const getDogByIdd = (id: string): Dog | undefined => {
  return ourDogs.find(dog => dog.id === id);
};

export const getourDogs = (): Dog[] => {
  return ourDogs;
};

// Configuration: Set to false to show "no available puppies" message
// Set to true to show available puppies (if any exist)
export const HAS_AVAILABLE_PUPPIES = false;


// Configuration: Set to false to hide upcoming litters section
// Set to true to show upcoming litters
export const HAS_UPCOMING_LITTERS = false;
