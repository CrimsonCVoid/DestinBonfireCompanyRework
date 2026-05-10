export const SITE = {
  name: "Destin Bonfire Company",
  domain: "https://www.destinbonfirecompany.com",
  tagline: "Luxury Beach Bonfires Near Destin",
  description:
    "Luxury, fully-permitted beach bonfires near Destin and along 30A. We handle the Walton County permit, premium seating, s’mores, and cleanup — you just show up.",
  phone: "(850) 706-1325",
  phoneHref: "tel:+18507061325",
  email: "bookings@destinbonfirecompany.com",
  emailHref: "mailto:bookings@destinbonfirecompany.com",
  address: {
    street: "34990 Emerald Coast Pkwy Suite #344",
    city: "Destin",
    region: "FL",
    postal: "32541",
    country: "US",
    lat: 30.38888,
    lng: -86.42237,
  },
  social: {
    facebook: "https://facebook.com/Destin-Bonfire-Company-100088117208761",
    instagram: "https://instagram.com/destin_bonfire_company",
  },
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
} as const;

export const FAREHARBOR = {
  // Must match the subdomain slug shown in the FareHarbor dashboard URL.
  shortname: "destinbonfirecompany",
  // Customer UUID from the original Duda embed URL. Used as the `u=` param
  // on every booking URL so FareHarbor tracks the source correctly.
  customerUuid: "6c9d4aed-4337-42f0-a465-d02502aa4167",
  // Public Lightframe booking URL (this is the one the autolightframe script
  // intercepts — visiting it directly without the script shows the public
  // booking picker, NOT the staff dashboard).
  fallbackUrl: "https://fareharbor.com/embeds/book/destinbonfirecompany/",
  items: {
    cozyBonfire: "434338",
    sunsetCircle: "723755",
    shorelineSocial: "723756",
    bonfireBash: "723757",
    // NOTE: Owner initially provided the same ID (596813) for both the
    // "Styled Bachelorette" and "Bachelorette Bash" listings. Treated as one
    // item here. If FareHarbor shows them as two separate items, split this
    // entry and update the packages/bachelorette page mappings.
    bacheloretteBash: "596813",
  },
} as const;

export type FareHarborItemKey = keyof typeof FAREHARBOR.items;

/**
 * Build a FareHarbor Lightframe URL for a specific item (or the generic
 * picker if no key provided).
 *
 * URL params match the proven Duda embed URL with one addition:
 *   - asn=yes      advance the calendar to the next available date
 *                  (fixes the "calendar mostly grayed-out past days" UX
 *                  when the current month has few remaining open dates)
 *   - full-items=yes  show complete item details
 *   - language=en-us  localize
 *   - u=UUID       customer tracking
 *   - from-ssl=yes mark the source as SSL
 *   - back=...     return URL after booking
 *   - flow=no      prevent the Flow multi-step wrapper from stacking
 *                  on top of the Lightframe modal
 */
export function fareHarborItemUrl(key?: FareHarborItemKey): string {
  const base = key
    ? `${FAREHARBOR.fallbackUrl}items/${FAREHARBOR.items[key]}/`
    : FAREHARBOR.fallbackUrl;
  const params = new URLSearchParams({
    asn: "yes",
    "full-items": "yes",
    language: "en-us",
    u: FAREHARBOR.customerUuid,
    "from-ssl": "yes",
    back: "https://destinbonfirecompany.com/",
  });
  return `${base}?${params.toString()}`;
}

export type Package = {
  slug: string;
  name: string;
  price: number;
  groupSize: string;
  duration: string;
  tagline: string;
  popular?: boolean;
  image: string;
  includes: string[];
  fareHarborKey: FareHarborItemKey;
};

export const PACKAGES: Package[] = [
  {
    slug: "cozy-fire",
    name: "The Cozy Fire",
    price: 429,
    groupSize: "Up to 6 guests",
    duration: "2 hours",
    tagline: "Perfect for couples and small groups looking for a relaxed beach night",
    image: "/images/Real6PersonFire.jpg",
    fareHarborKey: "cozyBonfire",
    includes: [
      "S’mores",
      "Cornhole",
      "Bluetooth Speaker",
      "6 ft table with tablecloth",
      "Private beach bonfire setup",
      "2 hour fire",
      "6 chair set up",
      "Tiki torches",
      "On-site bonfire attendant",
      "Welcome sign",
      "Full setup & cleanup",
      "$157 Walton County permit",
    ],
  },
  {
    slug: "sunset-circle",
    name: "The Sunset Circle",
    price: 529,
    groupSize: "Up to 12 guests",
    duration: "2 hours",
    tagline: "Our most popular option for families and small groups",
    popular: true,
    image: "/images/Wideshot12ChairsBeach.jpeg",
    fareHarborKey: "sunsetCircle",
    includes: [
      "S’mores",
      "Cornhole",
      "Bluetooth Speaker",
      "6 ft table with tablecloth",
      "Private beach bonfire setup",
      "2 hour fire",
      "12 chair set up",
      "Tiki torches",
      "On-site bonfire attendant",
      "Welcome sign",
      "Full setup & cleanup",
      "$157 Walton County permit",
    ],
  },
  {
    slug: "shoreline-social",
    name: "The Shoreline Social",
    price: 729,
    groupSize: "Up to 20 guests",
    duration: "3 hours",
    tagline: "Great for celebrations and larger group gatherings",
    image: "/images/18ChairSunsetSetup.jpg",
    fareHarborKey: "shorelineSocial",
    includes: [
      "S’mores",
      "Cornhole",
      "Bluetooth Speaker",
      "(2) 6 ft tables with tablecloths",
      "Private beach bonfire setup",
      "3 hour fire",
      "20 chair set up",
      "Tiki torches",
      "On-site bonfire attendant",
      "Welcome sign",
      "Full setup & cleanup",
      "$157 Walton County permit fee",
    ],
  },
  {
    slug: "bonfire-bash",
    name: "The Bonfire Bash",
    price: 969,
    groupSize: "Up to 29 guests",
    duration: "3 hours",
    tagline: "Ideal for big events and unforgettable group nights",
    image: "/images/BigCircleBonfireSetupNight.jpg",
    fareHarborKey: "bonfireBash",
    includes: [
      "S’mores",
      "TWO On-site bonfire attendants",
      "Cornhole",
      "Bluetooth Speaker",
      "(2) 6 ft tables with tablecloths",
      "(2) 32″ round high top tables with tablecloths",
      "Private beach bonfire setup",
      "3 hour fire",
      "29 chair set up",
      "Tiki torches",
      "Welcome sign",
      "Full setup & cleanup",
      "$157 Walton County permit fee",
      "18% gratuity added",
    ],
  },
];

export type SpecialtyPackage = {
  slug: string;
  name: string;
  groupSize: string;
  price?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export const SPECIALTY_PACKAGES: SpecialtyPackage[] = [
  {
    slug: "ultimate-bonfire",
    name: "The Ultimate Bonfire",
    groupSize: "More than 30 People",
    description:
      "Perfect for wedding welcome parties, family reunions, corporate events, and large group celebrations. Contact event planner for customization.",
    ctaLabel: "Contact Event Planner",
    ctaHref: "tel:+18507061325",
    image: "/images/WideshotTruckBeachFire.jpg",
  },
  {
    slug: "bachelorette-bash",
    name: "Bachelorette Bash",
    groupSize: "Up to 12 guests",
    price: "$595",
    description:
      "Contact for larger parties. Includes customizable event planning.",
    ctaLabel: "View Bachelorette Details",
    ctaHref: "/bachelorette-bonfire",
    image: "/images/BatchloretteFirePristinePhoto.jpg",
  },
];

export type ServiceArea = {
  slug: string;
  name: string;
  address?: string;
  image: string;
};

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "ed-walline",
    name: "Ed Walline Regional Beach Access",
    address: "4447 County Highway 30A, Santa Rosa Beach, FL 32459",
    image: "/images/edwallenbeach.jpg",
  },
  {
    slug: "gulfview-heights",
    name: "Gulfview Heights Beach Access",
    address: "186 Gulfview Heights Street, Santa Rosa Beach, FL 32459",
    image: "/images/gulfviewheights.jpg",
  },
  {
    slug: "santa-clara",
    name: "Santa Clara Regional Beach Access",
    address: "3468 East County Highway 30A, Santa Rosa Beach, FL 32459",
    image: "/images/SantaClara.jpg",
  },
  {
    slug: "dune-allen",
    name: "Dune Allen Beach",
    address: "5999 County Highway 30A, Santa Rosa Beach, FL 32459",
    image: "/images/DuneAllen.jpg",
  },
  {
    slug: "fort-panic",
    name: "Fort Panic Regional Beach",
    address: "5753 County Highway 30A, Santa Rosa Beach, FL 32459",
    image: "/images/FortPanic.jpg",
  },
  {
    slug: "blue-mountain",
    name: "Blue Mountain Regional Beach Access",
    address: "2365 South County Highway 83, Santa Rosa Beach, FL 32459",
    image: "/images/BlueMountain2.jpg",
  },
  {
    slug: "walton-dunes",
    name: "Walton Dunes Access",
    address: "238 Beachfront Trail, Santa Rosa Beach, FL 32459",
    image: "/images/waltondunes.jpg",
  },
  {
    slug: "one-seagrove",
    name: "One Seagrove Access",
    address: "57 Seagrove Place, Santa Rosa Beach, FL 32459",
    image: "/images/oneseagrove.jpg",
  },
  {
    slug: "grayton-dunes",
    name: "Grayton Dunes Access",
    address: "288 Garfield Street, Santa Rosa Beach, FL 32459",
    image: "/images/GraytonDunes.jpg",
  },
  {
    slug: "inlet-beach",
    name: "Inlet Beach",
    address: "438 West Park Place Avenue, Inlet Beach, FL 32461",
    image: "/images/InletBeach.jpg",
  },
  {
    slug: "scenic-gulf-drive",
    name: "Scenic Gulf Drive Miramar Regional Access",
    address: "907 Scenic Gulf Drive, Miramar Beach, FL 32550",
    image: "/images/scenicbeach.jpg",
  },
];

export type FaqItem = { q: string; a: string; topic?: string };

export const FAQ: FaqItem[] = [
  // Pricing & packages
  {
    topic: "Pricing",
    q: "How much does a beach bonfire near Destin cost?",
    a: "Our packages start at $429 for up to 6 guests (The Cozy Fire) and go up to $969 for groups of 29 (The Bonfire Bash). Every package includes the Walton County permit, premium seating, tiki torches, s’mores, cornhole, on-site attendant, and full setup and cleanup — no add-ons required.",
  },
  {
    topic: "Pricing",
    q: "Is the permit fee included in the package price?",
    a: "Yes. The $157 Walton County beach bonfire permit fee is included in every package we sell. You are never charged extra for the permit at the beach.",
  },
  {
    topic: "Pricing",
    q: "Do you charge extra for s’mores or chairs?",
    a: "No. S’mores, chairs, tables, tablecloths, tiki torches, cornhole, a Bluetooth speaker, and the welcome sign are all included in every package. The only common add-on is gratuity (added automatically on the largest package).",
  },

  // Permits
  {
    topic: "Permits",
    q: "Do I need a permit for a beach bonfire on 30A or near Destin?",
    a: "Yes. Every legal beach bonfire in this region requires a Walton County permit, and the daily permit count per beach is capped. We handle the permit as part of every package.",
  },
  {
    topic: "Permits",
    q: "How far in advance are bonfire permits issued?",
    a: "Walton County typically releases bonfire permits about two weeks before your scheduled date. We submit the application as soon as the window opens. Because of this, the exact beach can’t be confirmed until ~2 weeks out.",
  },
  {
    topic: "Permits",
    q: "Why do you ask for a second-choice beach?",
    a: "Each permitted beach has a limited number of permits per day. Providing a second-choice option ensures we can still secure a permit for your date if your first-choice beach is already full when permits are released.",
  },
  {
    topic: "Permits",
    q: "What is a special-event permit, and do I need one?",
    a: "A special-event permit may be required for larger gatherings (typically 30+ guests) or events that include additional elements such as catering, expanded lighting, or amplified sound. We’ll let you know during booking if your event qualifies and walk you through the additional steps.",
  },

  // Locations
  {
    topic: "Locations",
    q: "Can I have a bonfire directly in Destin?",
    a: "No. Beach bonfires are not permitted within Destin city limits (Okaloosa County). The closest legal bonfire beach is Miramar Beach in unincorporated Walton County, about 10–15 minutes east of most Destin condos.",
  },
  {
    topic: "Locations",
    q: "Where can I have a beach bonfire on 30A?",
    a: "We host on every permitted regional access along 30A — including Ed Walline, Gulfview Heights, Santa Clara, Dune Allen, Fort Panic, Blue Mountain, Walton Dunes, One Seagrove, Grayton Dunes, and Inlet Beach. Browse our locations to see which is closest to where you’re staying.",
  },
  {
    topic: "Locations",
    q: "Can I have a bonfire on Seaside or Rosemary Beach?",
    a: "Not directly on the private community beaches. We host Seaside guests at One Seagrove, Grayton Dunes, or Santa Clara (all permitted Walton County accesses), and Rosemary Beach guests at the adjacent Inlet Beach Regional Access.",
  },
  {
    topic: "Locations",
    q: "Which beach is best for a bonfire?",
    a: "It depends on your group. Larger families often prefer Ed Walline (lots of amenities) or Inlet Beach (biggest lot). Couples and bachelorettes often prefer Blue Mountain or Walton Dunes (quieter, more photogenic). Tell us where you’re staying and we’ll match you with the right access.",
  },

  // Booking
  {
    topic: "Booking",
    q: "How early should I book my bonfire?",
    a: "As early as possible — especially during peak season (May–August, holiday weekends). Booking early secures your date in our schedule. The exact beach is locked in ~2 weeks out when permits are issued.",
  },
  {
    topic: "Booking",
    q: "What happens if it rains?",
    a: "Walton County bonfire permits are subject to weather and fire-safety conditions. If your bonfire is unsafe to hold (heavy rain, lightning, red-flag fire conditions), we’ll work with you to reschedule for another available date during your stay. Read our refund policy for full details.",
  },
  {
    topic: "Booking",
    q: "Can I book for a group larger than 29?",
    a: "Yes. Our Ultimate Bonfire package handles 30+ guests with custom planning, additional staffing, and (often) a special-event permit. Call us at (850) 706-1325 for a custom quote.",
  },

  // The night itself
  {
    topic: "The Night",
    q: "How long is the bonfire?",
    a: "The Cozy Fire and Sunset Circle include 2 hours of fire time. The Shoreline Social and Bonfire Bash include 3 hours. Setup and breakdown happen outside your fire window — you arrive to a finished setup and leave when your time ends.",
  },
  {
    topic: "The Night",
    q: "Do we have to clean up?",
    a: "No. Cleanup is included in every package. Our crew breaks down the chairs, tables, torches, and fire setup, and we leave the beach better than we found it. You’re free to walk off the sand whenever you’re done.",
  },
  {
    topic: "The Night",
    q: "Can we bring food, drinks, or a cooler?",
    a: "Yes — bring whatever food and drinks you’d like (within Walton County’s public-beach rules). Many guests bring a cooler with drinks and pick up dinner from a nearby restaurant before walking down to the beach.",
  },
  {
    topic: "The Night",
    q: "Will there be other groups around us?",
    a: "Your bonfire setup is private to your group. The beach itself is public, so other beachgoers may be nearby — but the chairs, fire, and seating area are yours. Most permitted accesses give plenty of space between active permits.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah P.",
    location: "Santa Rosa Beach",
    occasion: "Family vacation",
    rating: 5,
    text: "Absolutely unforgettable. The setup was gorgeous, the s’mores were perfect, and our attendant made sure everything ran smoothly. The best night of our trip.",
  },
  {
    name: "Megan L.",
    location: "Seaside",
    occasion: "Bachelorette weekend",
    rating: 5,
    text: "They handled the permit, the chairs, the décor — everything. We just walked up and enjoyed the sunset with the girls. Worth every penny.",
  },
  {
    name: "David R.",
    location: "Inlet Beach",
    occasion: "Family reunion",
    rating: 5,
    text: "Beautiful fire, clean setup, and extremely professional from booking to breakdown. Our family will be back next summer.",
  },
  {
    name: "Lauren K.",
    location: "Miramar Beach",
    occasion: "Anniversary",
    rating: 5,
    text: "We were celebrating our 10-year anniversary and wanted something private. The Cozy Fire was perfect — sunset, champagne, and the team gave us total privacy. Magical.",
  },
  {
    name: "Caroline B.",
    location: "Rosemary Beach",
    occasion: "Bachelorette weekend",
    rating: 5,
    text: "I was nervous coordinating something this far from home, but the team replied within minutes every time. The setup at Inlet was stunning. The bride cried (good cried).",
  },
  {
    name: "Mark T.",
    location: "Blue Mountain Beach",
    occasion: "Birthday",
    rating: 5,
    text: "I planned a surprise 40th for my wife. The team helped me coordinate guests arriving at the beach, kept the fire going, and handled every detail. She still talks about it.",
  },
  {
    name: "Jessica W.",
    location: "Grayton Beach",
    occasion: "Family of 14",
    rating: 5,
    text: "We had three generations on the sand together. The Bonfire Bash had room for everyone, and the s’mores were the kids’ favorite part of the whole vacation.",
  },
  {
    name: "Ryan H.",
    location: "Seacrest Beach",
    occasion: "Proposal",
    rating: 5,
    text: "I asked them to help me propose. They set up extra tiki torches in a heart shape, kept the fire low so the photos would look good, and gave us space when she said yes.",
  },
  {
    name: "Amanda S.",
    location: "Santa Rosa Beach",
    occasion: "Welcome party",
    rating: 5,
    text: "We hosted a wedding welcome bonfire for ~25 guests. Permit, seating, lighting, music — they thought of everything. Guests are still texting us about it months later.",
  },
  {
    name: "Brad N.",
    location: "Dune Allen",
    occasion: "Couples trip",
    rating: 5,
    text: "Three couples, sunset, a bonfire, and zero stress. Our attendant was friendly without hovering. Booking again next summer with the in-laws.",
  },
];

export const STATS = [
  { value: "1,500+", label: "Bonfires hosted" },
  { value: "11", label: "Permitted beaches served" },
  { value: "5★", label: "Average guest rating" },
  { value: "100%", label: "Walton County permitted" },
];

export type WhyReason = {
  title: string;
  description: string;
  icon: "permit" | "host" | "setup" | "premium" | "stress" | "local" | "comms" | "trust";
};

export const WHY_REASONS: WhyReason[] = [
  {
    title: "Fully permitted, every time",
    description:
      "Every bonfire is run on a Walton County permit secured by our team. We handle the application, the fee, and the access list — you never touch the paperwork.",
    icon: "permit",
  },
  {
    title: "Professionally managed",
    description:
      "An on-site attendant tends the fire from light to last ember. You’re never poking logs, watching the wind, or worrying about safety.",
    icon: "host",
  },
  {
    title: "Setup & cleanup included",
    description:
      "We arrive early, build the setup, and stay late to break it down. You walk up to a finished beach scene and walk away from a clean one.",
    icon: "setup",
  },
  {
    title: "Premium chairs & styling",
    description:
      "Real wood chairs, clean linens, tiki torches, ambient lighting, a welcome sign — it photographs as well as it feels in person.",
    icon: "premium",
  },
  {
    title: "A genuinely stress-free night",
    description:
      "No coolers to drag, no firewood to buy, no permit calls. Bring your group and a drink — that’s it. We’ve done this hundreds of times.",
    icon: "stress",
  },
  {
    title: "Real local expertise",
    description:
      "We know which 30A access fills up first, where parking gets tight, which beach faces the best sunset in October. We pick the right spot for your group.",
    icon: "local",
  },
  {
    title: "Fast, human communication",
    description:
      "Text us. Call us. Email us. You’ll hear back from a real person — usually within minutes — not a chatbot or a 24-hour ticketing queue.",
    icon: "comms",
  },
  {
    title: "Trusted by families & groups",
    description:
      "Bachelorette weekends, family reunions, proposals, welcome parties, milestone birthdays — guests rebook us year after year for the moments that matter.",
    icon: "trust",
  },
];

export type Community = {
  slug: string;
  name: string;
  pageTitle: string;
  hero: string;
  intro: string;
  vibe: string;
  permitNote: string;
  beaches: string[];
  faqs: { q: string; a: string }[];
  bestFor: string[];
  parkingTips: string[];
  image: string;
};

export const COMMUNITIES: Community[] = [
  {
    slug: "miramar-beach-bonfires",
    name: "Miramar Beach",
    pageTitle: "Miramar Beach Bonfires",
    hero: "/images/scenicbeach.jpg",
    image: "/images/scenicbeach.jpg",
    intro:
      "Miramar Beach is the closest stretch of permitted bonfire-friendly sand to Destin proper — the sugar-white beach you can actually drive to in ten minutes from a Destin condo. Because Destin city limits don’t allow beach bonfires, almost every “Destin bonfire” guests book is technically here in unincorporated Walton County, just east of Sandestin.",
    vibe:
      "Wide, flat beach with the clearest sugar-sand views west toward Destin Pass. Slightly more developed than 30A — more high-rises, more dining, easier parking — but the same sugar sand and the same Walton County permit process.",
    permitNote:
      "Bonfires here run on the standard Walton County beach bonfire permit. Permits are released ~2 weeks ahead of your date. We handle the permit and confirm the exact access point once it’s issued.",
    beaches: ["scenic-gulf-drive"],
    bestFor: [
      "Guests staying in Destin who don’t want to drive 30+ minutes",
      "Larger groups who need easier paved parking",
      "Couples who want a sunset bonfire close to dinner reservations",
    ],
    parkingTips: [
      "Scenic Gulf Drive Regional Access has the largest paid lot — arrive 30 minutes before your bonfire to grab a spot in summer.",
      "Avoid Highway 98 between 4–6 PM if you can — westbound traffic from Sandestin to Destin backs up.",
      "Drop-off at the access point is allowed if your driver circles back to park.",
    ],
    faqs: [
      {
        q: "Can you have a bonfire in Destin, FL?",
        a: "Not within Destin city limits — Okaloosa County does not permit beach bonfires there. The closest legal bonfire beach to Destin is Miramar Beach in unincorporated Walton County, which is what we serve.",
      },
      {
        q: "How far is Miramar Beach from Destin?",
        a: "About 10–15 minutes by car from most Destin condos and resorts, depending on traffic on Highway 98. Most guests staying in Destin choose Miramar Beach for proximity.",
      },
      {
        q: "Which Miramar Beach access do you use?",
        a: "Scenic Gulf Drive Regional Access is the primary permitted access we serve in Miramar. It has paved parking, restrooms, and direct beach approach.",
      },
    ],
  },
  {
    slug: "30a-bonfires",
    name: "30A",
    pageTitle: "30A Beach Bonfires",
    hero: "/images/edwallenbeach.jpg",
    image: "/images/edwallenbeach.jpg",
    intro:
      "Scenic Highway 30A strings together a series of beach communities — Dune Allen, Gulf Place, Blue Mountain, Grayton, Seaside, Seagrove, Seacrest, Rosemary, Inlet — each with its own personality and its own permitted beach accesses. We host bonfires on every permitted access along 30A.",
    vibe:
      "Quieter, more design-forward than Miramar. Smaller dune walks, fewer high-rises, sunset views that frame around the dune line. The sand is the same world-class sugar white — what changes is the crowd, the parking, and the after-bonfire walk to dinner.",
    permitNote:
      "All 30A bonfires run on the Walton County permit. Some 30A accesses have stricter daily permit caps than Miramar, which is why we always ask for a second-choice beach when you book.",
    beaches: [
      "ed-walline",
      "gulfview-heights",
      "santa-clara",
      "dune-allen",
      "fort-panic",
      "blue-mountain",
      "walton-dunes",
      "one-seagrove",
      "grayton-dunes",
      "inlet-beach",
    ],
    bestFor: [
      "Guests staying anywhere along 30A",
      "Wedding welcome parties and large family groups",
      "Anyone who wants a quieter, more aesthetic beach setting",
    ],
    parkingTips: [
      "Ed Walline and Blue Mountain fill up first in peak season — book early or expect to use the second-choice beach.",
      "Walton County issues paid daily parking permits at most regional accesses — bring $5–$15 cash or use the QR code at the lot.",
      "Several 30A accesses are walkable from short-term rentals — ask us which is closest to your house.",
    ],
    faqs: [
      {
        q: "Where can you have a bonfire on 30A?",
        a: "Walton County maintains a list of permitted beach accesses along 30A. We host on all of them — including Ed Walline, Gulfview Heights, Blue Mountain, Grayton Dunes, One Seagrove, Inlet Beach, and several more. Use the beach pages below for parking, restrooms, and vibe at each.",
      },
      {
        q: "Which 30A beach is best for a bonfire?",
        a: "It depends on your group. Larger families lean toward Ed Walline (lots of amenities). Couples and small groups love Gulfview Heights or Walton Dunes (quieter). Bachelorette weekends often choose Inlet or Blue Mountain for the photo backdrop. We can match the beach to the vibe — just tell us what you’re going for.",
      },
      {
        q: "Do I need a permit for a 30A bonfire?",
        a: "Yes. Every legal 30A bonfire requires a Walton County permit, and the daily permit count per beach is capped. We handle the permit as part of every package.",
      },
    ],
  },
  {
    slug: "santa-rosa-beach-bonfires",
    name: "Santa Rosa Beach",
    pageTitle: "Santa Rosa Beach Bonfires",
    hero: "/images/gulfviewheights.jpg",
    image: "/images/gulfviewheights.jpg",
    intro:
      "Santa Rosa Beach is the umbrella postal community for most of western 30A — Dune Allen, Gulf Place, Blue Mountain, Grayton, and several smaller pockets all carry a Santa Rosa Beach mailing address. Some of our most popular permitted accesses live here.",
    vibe:
      "Less polished than Seaside or Rosemary, more local. The food scene leans toward seafood shacks and oyster bars rather than boutique cafés. Beaches feel a touch wider and less curated — many guests prefer that.",
    permitNote:
      "Same Walton County process as the rest of 30A. Several Santa Rosa Beach accesses (Ed Walline, Gulfview Heights, Blue Mountain) are among the highest-demand bonfire permits — book early.",
    beaches: [
      "ed-walline",
      "gulfview-heights",
      "santa-clara",
      "dune-allen",
      "fort-panic",
      "blue-mountain",
      "walton-dunes",
    ],
    bestFor: [
      "Guests staying in Gulf Place, Dune Allen, or Blue Mountain rentals",
      "Groups who want a beach that still feels local rather than resort-y",
      "Bonfires paired with dinner at Shunk Gulley, Goatfeathers, or The Perfect Pig",
    ],
    parkingTips: [
      "Ed Walline’s on-site lot fills first — the 393 MPF overflow has a free tram in peak season.",
      "Gulfview Heights’ lot is small (~22 spaces) — arrive early on weekends.",
      "Walton Dunes is a quieter neighborhood access — best for small groups, no large lot.",
    ],
    faqs: [
      {
        q: "Where exactly is Santa Rosa Beach?",
        a: "Santa Rosa Beach is the postal community covering much of western 30A in South Walton, FL. It includes Gulf Place, Dune Allen, Blue Mountain Beach, Grayton Beach, and several smaller neighborhoods.",
      },
      {
        q: "Are bonfires legal in Santa Rosa Beach?",
        a: "Yes — on permitted Walton County beach accesses with a daily permit. Bonfires on un-permitted private beachfront are not legal. Every bonfire we host runs on an issued county permit.",
      },
    ],
  },
  {
    slug: "rosemary-beach-bonfires",
    name: "Rosemary Beach",
    pageTitle: "Rosemary Beach Bonfires",
    hero: "/images/InletBeach.jpg",
    image: "/images/InletBeach.jpg",
    intro:
      "Rosemary Beach itself is a private, deed-restricted community — bonfires aren’t held on the Rosemary-owned accesses. Guests staying in Rosemary almost universally bonfire at the adjacent Inlet Beach Regional Access just to the east, which is a permitted Walton County beach with abundant parking.",
    vibe:
      "Rosemary’s aesthetic is unmistakable — Dutch West Indies architecture, cobblestone walks, and one of the most photogenic main streets on the Gulf. Inlet Beach matches the energy: a wide, less-crowded stretch with stunning sunset light.",
    permitNote:
      "Inlet Beach Regional Access is on the Walton County permitted bonfire list. We handle the permit and meet your group at the access.",
    beaches: ["inlet-beach"],
    bestFor: [
      "Rosemary Beach renters and homeowners",
      "Couples and bachelorettes who want the Rosemary aesthetic in their photos",
      "Groups walking from Rosemary or Seacrest to the beach access",
    ],
    parkingTips: [
      "Inlet Beach Regional Access has the biggest lot in eastern 30A — easiest large-group parking.",
      "From Rosemary’s town center, Inlet is a short Uber, golf cart, or 12-minute walk along the beach.",
    ],
    faqs: [
      {
        q: "Can you have a bonfire on Rosemary Beach?",
        a: "Not on the private Rosemary Beach community accesses themselves. We host bonfires for Rosemary guests at the adjacent Inlet Beach Regional Access, which is a Walton County permitted public beach less than a mile east.",
      },
      {
        q: "Why not directly in front of Rosemary Beach?",
        a: "Rosemary Beach is a deed-restricted community and the beach accesses are private. Walton County does not issue bonfire permits for private community accesses — only for the public Regional Beach Accesses.",
      },
    ],
  },
  {
    slug: "seaside-bonfires",
    name: "Seaside",
    pageTitle: "Seaside Bonfires",
    hero: "/images/oneseagrove.jpg",
    image: "/images/oneseagrove.jpg",
    intro:
      "Seaside, like Rosemary, is a private deed-restricted community — bonfires aren’t held on the Seaside community boardwalks. Seaside guests typically bonfire at One Seagrove Place or Grayton Dunes, both within a short drive and both on the Walton County permitted access list.",
    vibe:
      "Seaside is the cultural heart of 30A — the picket fences, the Truman Show pavilions, the airstreams selling lobster rolls. Pair an early dinner at Bud & Alley’s with a sunset bonfire at One Seagrove (5 minutes east) for the quintessential 30A night.",
    permitNote:
      "Bonfires for Seaside guests run at One Seagrove Place, Grayton Dunes, or Santa Clara depending on availability. All three are Walton County permitted accesses.",
    beaches: ["one-seagrove", "grayton-dunes", "santa-clara"],
    bestFor: [
      "Seaside, WaterColor, and Seagrove renters",
      "Guests pairing a Seaside dinner with a sunset bonfire",
      "Smaller groups (8–20) wanting a more intimate access",
    ],
    parkingTips: [
      "One Seagrove Place is the closest permitted access to Seaside — about 5 minutes east on 30A.",
      "Grayton Dunes is 8 minutes west — a quieter, classic-30A vibe.",
      "Avoid trying to park in Seaside itself for the bonfire — Seaside parking is for Seaside guests, and the bonfire access is elsewhere.",
    ],
    faqs: [
      {
        q: "Can you have a bonfire on Seaside, FL?",
        a: "Not directly on Seaside’s private community boardwalks. We host Seaside guests at the nearest Walton County permitted accesses — One Seagrove Place (5 minutes east), Grayton Dunes (8 minutes west), or Santa Clara.",
      },
      {
        q: "Which beach is closest to Seaside for a bonfire?",
        a: "One Seagrove Place is the closest permitted bonfire beach to Seaside — about a 5-minute drive east on 30A.",
      },
    ],
  },
];

export function getCommunity(slug: string) {
  return COMMUNITIES.find((c) => c.slug === slug);
}

export const GALLERY = [
  { src: "/images/FirepitFocused.jpg", alt: "Focused close-up of a 30A beach bonfire at golden hour" },
  { src: "/images/CornholeBonfireWideShot.jpg", alt: "Wide shot of a Destin beach bonfire setup with cornhole on the sand" },
  { src: "/images/Great9SeatBonfirePhoto.jpg", alt: "Nine-seat beach bonfire ring with sunset lighting on 30A" },
  { src: "/images/Real6PersonFire.jpg", alt: "Six-guest cozy beach bonfire on the sand near Destin" },
  { src: "/images/CloseupAttendant.jpg", alt: "On-site bonfire attendant tending the fire at a 30A beach" },
  { src: "/images/SmoreRoasting.jpg", alt: "Marshmallow roasting over a Destin beach bonfire" },
  { src: "/images/SmoresStation.jpg", alt: "S’mores station styled for a beach bonfire on 30A" },
  { src: "/images/SmoreFocusedFireInBackground.jpg", alt: "Finished s’more with the bonfire glowing behind on the beach" },
  { src: "/images/StandardBlueFire.jpg", alt: "Beach bonfire flames against deep blue twilight" },
  { src: "/images/Wideshot12ChairsBeach.jpeg", alt: "Wide shot of a 12-chair beach bonfire setup at sunset" },
  { src: "/images/BigCircleBonfireSetupNight.jpg", alt: "Large circle of guests gathered around an evening beach bonfire" },
  { src: "/images/WideshotTruckBeachFire.jpg", alt: "Cinematic wide shot of a Destin beach bonfire setup at dusk" },
];
