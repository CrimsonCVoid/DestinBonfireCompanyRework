export const SITE = {
  name: "Destin Bonfire Company",
  domain: "https://www.destinbonfirecompany.com",
  tagline: "Luxury Beach Bonfires Near Destin",
  description:
    "Luxury, fully-permitted beach bonfires near Destin and along 30A. We handle the Walton County permit, premium seating, s’mores, and cleanup - you just show up.",
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
    tiktok: "https://www.tiktok.com/@destinbonfire",
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
  // intercepts - visiting it directly without the script shows the public
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
  // Optional: when omitted, the BookNowButton opens the generic FareHarbor
  // picker. Use this for packages whose FareHarbor item ID isn't wired yet
  // (e.g. brand-new SKUs awaiting an owner to publish in FareHarbor).
  fareHarborKey?: FareHarborItemKey;
  // When true, the package's primary CTA is a "Call to Book" tel: link
  // instead of a FareHarbor Lightframe trigger. Use for packages the owner
  // wants to qualify by phone (custom dates, group logistics, deposits, etc.).
  callToBook?: boolean;
};

export const PACKAGES: Package[] = [
  {
    slug: "sunset-for-two",
    name: "The Sunset for Two",
    price: 329,
    groupSize: "Up to 2 guests",
    duration: "1.5 hours",
    tagline: "An intimate, romantic beach bonfire for two",
    // Placeholder image — swap for a proper "couple by the fire" shot when
    // the owner sends one. fareHarborKey intentionally omitted: per owner
    // direction this package is booked by phone, not via FareHarbor.
    image: "/images/MarryMeProposalCouple.jpg",
    callToBook: true,
    includes: [
      "S’mores for two",
      "Bluetooth speaker",
      "Two beach chairs with blanket",
      "Private beach bonfire setup",
      "1.5 hour fire",
      "Tiki torches",
      "On-site bonfire attendant",
      "Welcome sign",
      "Full setup & cleanup",
      "$157 Walton County permit",
    ],
  },
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
    callToBook: true,
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

export type FaqItem = {
  q: string;
  a: string;
  topic?: string;
  /**
   * Optional follow-up links rendered as small button pills under the
   * answer in the FAQ accordion. Use for questions where the natural
   * next step is jumping to another page (locations, refund policy,
   * permit process, packages, etc.).
   */
  links?: Array<{ label: string; href: string }>;
};

export const FAQ: FaqItem[] = [
  // Pricing & packages
  {
    topic: "Pricing",
    q: "How much does a beach bonfire near Destin cost?",
    a: "Our packages start at $429 for up to 6 guests (The Cozy Fire) and go up to $969 for groups of 29 (The Bonfire Bash). Every package includes the Walton County permit, premium seating, tiki torches, s’mores, cornhole, on-site attendant, and full setup and cleanup - no add-ons required.",
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
    links: [
      { label: "See the Destin guide", href: "/destin" },
      { label: "Closest beach details", href: "/service-areas/scenic-gulf-drive" },
    ],
  },
  {
    topic: "Locations",
    q: "Where can I have a beach bonfire on 30A?",
    a: "We host on every permitted regional access along 30A - including Ed Walline, Gulfview Heights, Santa Clara, Dune Allen, Fort Panic, Blue Mountain, Walton Dunes, One Seagrove, Grayton Dunes, and Inlet Beach. Browse our locations to see which is closest to where you’re staying.",
    links: [
      { label: "See every beach we serve", href: "/locations" },
      { label: "30A community guide", href: "/locations/30a-bonfires" },
    ],
  },
  {
    topic: "Locations",
    q: "Can I have a bonfire on Seaside or Rosemary Beach?",
    a: "Not directly on the private community beaches. We host Seaside guests at One Seagrove, Grayton Dunes, or Santa Clara (all permitted Walton County accesses), and Rosemary Beach guests at the adjacent Inlet Beach Regional Access.",
    links: [
      { label: "Seaside guide", href: "/locations/seaside-bonfires" },
      { label: "Rosemary Beach guide", href: "/locations/rosemary-beach-bonfires" },
    ],
  },

  // Booking
  {
    topic: "Booking",
    q: "How early should I book my bonfire?",
    a: "As early as possible - especially during peak season (May–August, holiday weekends). Booking early secures your date in our schedule. The exact beach is locked in ~2 weeks out when permits are issued.",
    links: [{ label: "See all packages", href: "/bonfire-packages" }],
  },
  {
    topic: "Booking",
    q: "What happens if it rains?",
    a: "Walton County bonfire permits are subject to weather and fire-safety conditions. If your bonfire is unsafe to hold (heavy rain, lightning, red-flag fire conditions), we’ll work with you to reschedule for another available date during your stay. Read our refund policy for full details.",
    links: [{ label: "Read the refund policy", href: "/refund-policy" }],
  },
  {
    topic: "Booking",
    q: "What's the maximum group size you can accommodate?",
    a: "There's no hard maximum - we've hosted everything from couples to 100+ guest corporate retreats and large wedding receptions. Anything over 29 guests runs as our Ultimate Bonfire package with custom planning, additional staffing, and (often) a special-event permit. Call us with your group size and we'll build the night around it.",
    links: [{ label: "See all packages", href: "/bonfire-packages" }],
  },
  {
    topic: "Booking",
    q: "Can I book for a group larger than 29?",
    a: "Yes. Our Ultimate Bonfire package handles 30+ guests with custom planning, additional staffing, and (often) a special-event permit. Call us at (850) 706-1325 for a custom quote. There's no upper limit - we've done groups of 100+ for corporate trips and wedding parties.",
    links: [{ label: "Browse add-ons & upgrades", href: "/add-ons" }],
  },
  {
    topic: "Booking",
    q: "Can you add bistro / market lights to my bonfire?",
    a: "Yes - bistro and market lights are one of our most-requested upgrades and a beautiful add to any evening setup, especially proposals, weddings, and bachelorette photos. Lighting that draws additional power, expanded lit areas, or amplified sound generally requires Walton County's special-event permit. We coordinate the special-event paperwork on top of the standard bonfire permit; the additional county fee is quoted separately when we book. Browse the full lighting menu and the rest of our add-ons on the add-ons page.",
    links: [
      { label: "See lighting add-ons", href: "/add-ons#lighting-ambiance" },
      { label: "Read the permit process", href: "/bonfire-permit-process" },
    ],
  },

  // The night itself
  {
    topic: "The Night",
    q: "How long is the bonfire?",
    a: "The Cozy Fire and Sunset Circle include 2 hours of fire time. The Shoreline Social and Bonfire Bash include 3 hours. Setup and breakdown happen outside your fire window - you arrive to a finished setup and leave when your time ends.",
  },
  {
    topic: "The Night",
    q: "Do we have to clean up?",
    a: "No. Cleanup is included in every package. Our crew breaks down the chairs, tables, torches, and fire setup, and we leave the beach better than we found it. You’re free to walk off the sand whenever you’re done.",
  },
  {
    topic: "The Night",
    q: "Can we bring food, drinks, or a cooler?",
    a: "Yes - bring whatever food and drinks you’d like (within Walton County’s public-beach rules). Many guests bring a cooler with drinks and pick up dinner from a nearby restaurant before walking down to the beach.",
  },
  {
    topic: "The Night",
    q: "Will there be other groups around us?",
    a: "Your bonfire setup is private to your group. The beach itself is public, so other beachgoers may be nearby - but the chairs, fire, and seating area are yours. Most permitted accesses give plenty of space between active permits.",
  },
];

// Live Google reviews - pulled verbatim from the company's Google
// Business Profile review feed. Owner replies, photo-only entries, and
// the few negative reviews are excluded from the home-page carousel.
// The deep-link below opens the full filtered review list on Google
// where every review (including critical ones) is visible.
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Destin+Bonfire+Company&kgmid=/g/11k5hd91yk#lrd=0x60301ac2922e2bb3:0x1a615f7d60ef2fe1,1";

export type GoogleReview = {
  name: string;
  dateLabel: string;
  text: string;
  occasion?: string;
  /** True if the source text was truncated by Google's "... More" cutoff. */
  truncated?: boolean;
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  { name: "Heidi W", dateLabel: "2 weeks ago", text: "Kaylee and the team at Destin Bonfire Company truly went above and beyond to create one of the most amazing experiences! If you are visiting Destin, this is an absolute must-do!" },
  { name: "Riley Bills", dateLabel: "4 weeks ago", occasion: "Bachelorette", text: "We booked for a bachelorette trip and it was so much fun! Corbin made sure we were well taken care of and had everything we needed. The hospitality was incredible! A good time had by all!" },
  { name: "Meghan Williams", dateLabel: "1 month ago", occasion: "Spring break · Family of 5", text: "I am so glad I scheduled a bonfire with this company for my family of 5 during spring break! There is just something magical about a bonfire on the beach at sunset. Everything was taken care of - we didn't have to bring a thing.", truncated: true },
  { name: "Tammy Crites", dateLabel: "1 month ago", occasion: "Family vacation", text: "You should absolutely book with Destin Bonfire Company! We had the best time during our family vacation. Corbin made the whole evening so special and personal - honestly, we felt like he was part of our group by the end of the night!", truncated: true },
  { name: "Jenny Keith", dateLabel: "1 month ago", text: "We had a great time! The setup was perfect at just the right time to see the sunset. Big thanks to Mike, Ben and Sam for making it a memorable experience!" },
  { name: "Cory Keith", dateLabel: "1 month ago", occasion: "Group of 18", text: "We had a group of 18 for a bonfire. None of us had done it before and all had a blast. Mike, Ben, and Sam took care of everything. We didn't have to worry about or do anything - we were able to relax and enjoy the wonderful experience.", truncated: true },
  { name: "Steph Boone", dateLabel: "1 month ago", occasion: "Spring break · 45+ people", text: "We were in town for our daughter's spring break trip with a large group of other families. Organizing a beach bonfire for 45+ people was pretty challenging, but overall Kaylee made the process pretty smooth.", truncated: true },
  { name: "Samuel", dateLabel: "1 month ago", text: "Best bonfire company ever. Will book with y'all every year. Thanks Ben and Mike." },
  { name: "Amy Rosso", dateLabel: "1 month ago", text: "Unique experience that was memorable for everyone!" },
  { name: "Erin Williams", dateLabel: "1 month ago", text: "Beautiful setting and mindful attendants - not intrusive but very accommodating. I would love to do this again!" },
  { name: "Marcia & Doug Pohlmann", dateLabel: "1 month ago", occasion: "Bachelorette", text: "We had an AWESOME time on our bachelorette bonfire with Sam! He went above and beyond to make our night even more special. Highly recommend!" },
  { name: "Stephanie Biesterveld", dateLabel: "1 month ago", occasion: "Team trip", text: "Our team had such a great evening! We had a blast and won't forget our evening. Mike and Ben were great bonfire attendants - they even accepted a dance from one of our teammates!" },
  { name: "Mike Carley", dateLabel: "1 month ago", occasion: "Family with kids", text: "Absolutely incredible experience. Corbin had everything we could have needed prepared and ready. We had five little kids with us and it was the perfect experience to let them run wild on the beach while the adults relaxed by the fire." },
  { name: "Ashleigh Grubb", dateLabel: "1 month ago", text: "Sam set up and provided a perfect bonfire experience! The blankets, s'mores, and cornhole boards were nice touches. Sam made everything so comfortable and easy, and he was well-prepared, professional, and attentive." },
  { name: "Grecia Trejo", dateLabel: "1 month ago", occasion: "Bachelorette", text: "Amazing service! Mike the beach bonfire worker went above and beyond to make sure we had everything we needed. Super attentive, friendly, and made the whole experience perfect and so fun. Highly recommend!" },
  { name: "Brad Neese", dateLabel: "1 month ago", occasion: "Family · 7 teenagers", text: "THIS EXPERIENCE WAS THE HIGHLIGHT OF OUR TRIP TO DESTIN! Destin Bonfire Company is top notch. The online reservation was easy and the company communicated well by text leading up to our bonfire.", truncated: true },
  { name: "Paige Rivard", dateLabel: "2 months ago", occasion: "Women's retreat", text: "We had a lovely evening on the beach made possible by Destin Bonfire Company and our beach attendant Corbin. Thank you!" },
  { name: "Ashley Hanson", dateLabel: "2 months ago", text: "What an amazing experience we had - such a beautiful setting you created! And thanks to Corbin for providing a lovely fire and tending it so unobtrusively for our gathering.", truncated: true },
  { name: "Leah Rocco", dateLabel: "2 months ago", occasion: "Family", text: "Such a great family-fun experience!" },
  { name: "Yvonne V", dateLabel: "2 months ago", text: "We had an amazing experience with this bonfire company! Everything was set up perfectly and made our night so memorable. The team was professional, friendly, and handled all the details so we could just relax and enjoy the fire.", truncated: true },
  { name: "Phi Vo", dateLabel: "2 months ago", text: "Had a relaxing time. Would recommend for those looking for a chill evening gathering. Great customer service and staff always checked on us.", truncated: true },
  { name: "Anh Nguyen", dateLabel: "2 months ago", occasion: "Girls trip", text: "We went as a group of girls and had such a wonderful time! We made s'mores, had great conversations, and really enjoyed the whole experience. They even provided a Bluetooth speaker so we could connect our phones and play music. Highly recommend!" },
  { name: "Angel Do", dateLabel: "2 months ago", text: "This was such an amazing way to end our trip! They had everything set up for us by the time we got there, provided s'mores and a huge speaker which added to our overall experience.", truncated: true },
  { name: "Dawn Le", dateLabel: "2 months ago", text: "Awesome service!" },
  { name: "Tiffany Butler", dateLabel: "2 months ago", occasion: "Bachelorette", text: "Great experience - easy to find the crew even though it was late. Loved the setup and it was perfect for our bachelorette party.", truncated: true },
  { name: "Rayma Miles", dateLabel: "4 months ago", text: "We had so much fun. The evening was just perfect. Luca did a fantastic job keeping our bonfire a picture-perfect blaze. Kaylee also gets two thumbs up for the ease of planning and helping with our reservations. We highly recommend and would definitely do it again." },
  { name: "Fran Douthitt", dateLabel: "4 months ago", text: "Very fun! Enjoyed the whole experience. Luca made sure we were taken care of. He was super." },
  { name: "Andrea S", dateLabel: "5 months ago", text: "Book them! We booked Destin Bonfire for a beach bonfire and it was fantastic. They were easy to work with during scheduling, the setup was quick, and our attendants were super helpful.", truncated: true },
  { name: "Jessica Berryhill", dateLabel: "7 months ago", text: "Had a great time! Wonderful setup, the attendant was amazing. Will definitely do it again!" },
  { name: "Andrew Brooks", dateLabel: "8 months ago", occasion: "Family", text: "Destin Bonfire Company made our beach night absolutely unforgettable! They handled everything from start to finish - setup was perfect, the fire was beautiful, and the atmosphere they created for my family was amazing.", truncated: true },
  { name: "Erick Gonzales", dateLabel: "8 months ago", occasion: "Proposal", text: "Amazing people - Katy is awesome. She helped all along the way and made my ideal proposal happen. They work with all ideas. I am from Texas and this was planned approximately 6 months prior and they executed beautifully.", truncated: true },
  { name: "David Conner", dateLabel: "8 months ago", occasion: "Corporate · group of 100", text: "We brought a group of 100 down for a work trip and had a BLAST at the bonfire. The team took incredible care to curate a fun experience for our team. 10/10 would recommend." },
  { name: "Stephanie Slate", dateLabel: "9 months ago", occasion: "Wedding reception", text: "Destin Bonfire Company did an awesome job with our daughter and son-in-law's casual beachside wedding reception. They communicated promptly, answering any questions we had throughout the process to help make it a stress-free event.", truncated: true },
  { name: "N. Aggielarr", dateLabel: "9 months ago", occasion: "Bachelorette", text: "Perfect touch to the bachelorette party. This was our first event during day one as everyone was flying in from all over. Very calming and relaxing. They were flexible and understanding when we were running a little behind.", truncated: true },
  { name: "Devin Blankenship", dateLabel: "9 months ago", occasion: "Bachelorette", text: "This amazing company came through for us last minute after another awful company canceled on us. Our fire attendants Ethan and Josh were so kind, keeping the fire burning just right.", truncated: true },
  { name: "Dave McCune", dateLabel: "9 months ago", text: "Our bonfire was amazing. Great service and help with all our needs. I will be back soon." },
  { name: "Scott Getty", dateLabel: "9 months ago", occasion: "Large family", text: "Was a great experience for our large family." },
  { name: "Bevin Judge", dateLabel: "9 months ago", text: "Came through last minute and set up for us after another company canceled on us. Thank you again!" },
  { name: "Yemy Fuguet", dateLabel: "10 months ago", occasion: "Marriage proposal", text: "Our experience with Destin Bonfire Company was exceptional. The team created an unforgettable setting for the marriage proposal, with flawless decoration by the ocean at sunset. Every detail was perfectly organized.", truncated: true },
  { name: "Janelle Cantu", dateLabel: "10 months ago", occasion: "Birthday · Texas family", text: "Would 100% recommend using Destin Bonfire Company for your beach bonfire. My family and I came from Texas to celebrate a birthday and everybody we interacted with at DBC were so kind and helpful. They helped me determine which beach was best.", truncated: true },
  { name: "Jordan Alonso", dateLabel: "11 months ago", occasion: "Bachelorette", text: "We highly enjoyed our bonfire experience on Miramar Beach! I booked a private bonfire for the last night of my girlfriend's bachelorette party and we thoroughly enjoyed the experience. It was perfect and picturesque.", truncated: true },
  { name: "Ed Megyesi", dateLabel: "11 months ago", occasion: "Family · 10-year tradition", text: "Hired Destin Bonfire Company and they were great! Corbin was our fire attendant for the evening. We have been coming to Destin for the last 10 years and my wife wanted to do something different - we stumbled across Destin Bonfire. This will now be a new tradition for our family. Highly recommend!" },
  { name: "Zac Thomas", dateLabel: "11 months ago", text: "Absolutely wonderful, great employees, very comfortable and an overall welcoming experience. Tracen made sure we were taken care of. 10/10 see you next year." },
  { name: "Kim Crist", dateLabel: "11 months ago", occasion: "Wedding · 50 guests", text: "Destin Bonfire Company is the best! We hosted a party the day after my son's wedding and we couldn't have been happier. They set everything up for 50 people and took everything away for us!" },
  { name: "Vickie Dolan", dateLabel: "11 months ago", occasion: "Bachelorette", text: "This is a must in Destin! We did this on a bachelorette trip and it was such a fun and creative activity. It made for cute photos and such a relaxing evening on the beach. Tracen was the best host and so sweet." },
  { name: "Clark Adams", dateLabel: "1 year ago", text: "Destin Bonfire Company made our beach trip unforgettable! We didn't have to worry about bringing firewood or setting up - they handled it all. The fire was perfect, the seating was comfortable, and the ambiance was just what we needed.", truncated: true },
  { name: "May Medina", dateLabel: "1 year ago", occasion: "Proposal", text: "Let me start off with WOW! From the beginning Kaylee was so helpful and gave very detailed information of my request. The proposal setup was so beautiful. They made our special day amazing." },
  { name: "Sandy Martin", dateLabel: "1 year ago", occasion: "Daughter's wedding", text: "I cannot say enough great things about this group. From the first phone call with Kaylee, she ran with ideas for a setup for my daughter's wedding. We started with a bonfire that grew to an elaborate wedding ceremony with the bonfire.", truncated: true },
  { name: "Christopher Piazza", dateLabel: "1 year ago", occasion: "Family reunion", text: "Our family recently had the most unforgettable experience with Destin Bonfire Company, and I can't recommend them enough! From start to finish, their service was impeccable - it truly made our family reunion a cornerstone memory.", truncated: true },
  { name: "Nan", dateLabel: "1 year ago", text: "Nick was amazing! He was always on top of all our requests and easy to be around. This company and its employees are the best in Destin. Ask for Nick and you will have a great time!" },
  { name: "Corey Hacker", dateLabel: "1 year ago", text: "What a great experience! They took care of absolutely everything and were a pleasure to work with. Highly recommend!" },
  { name: "Summer Feucht", dateLabel: "1 year ago", text: "Amazing - and a shout-out to Kaylee and Chris who worked hard to help us get the fire right at our beach condo! Never a more perfect way to end a beach trip." },
  { name: "Mike Boyer", dateLabel: "1 year ago", text: "Great setup and experience - highly recommend! Kaylee was so helpful and our fire attendant Payton was great." },
  { name: "Randell Richmond", dateLabel: "1 year ago", occasion: "Family", text: "The best experience ever for my family and I! They kept the fire going full on and making sure we were okay consistently." },
  { name: "Derek Harris", dateLabel: "1 year ago", text: "This was such a fun experience. Definitely something everyone should do while in Destin. They were super accommodating during the booking process and our fire tender was so helpful. One of our favorite activities of the trip." },
  { name: "Rachael Clark", dateLabel: "1 year ago", occasion: "Family", text: "The best family experience! We LOVED it. Kyle was so kind and helpful too. Highly recommend!" },
  { name: "Rainer Araujo", dateLabel: "1 year ago", text: "Amazing customer service from Kaylee and Eric. I am so impressed how easy and simple it was to throw a beach bonfire - just by making a phone call.", truncated: true },
  { name: "marcy parsons", dateLabel: "3 years ago", occasion: "Bonfire for 12", text: "Choose Destin Bonfire Company! Great communication, gorgeous presentation, and worth every penny. They think of every detail. Owners truly want you to have a great experience. We had a bonfire for 12 with s'mores add-on.", truncated: true },
  { name: "Tracey Lightfoot", dateLabel: "1 year ago", text: "Nick was awesome and so attentive to our party. Really enjoyed our time on the beach." },
  { name: "Denise Jordan", dateLabel: "1 year ago", occasion: "Family", text: "Our family had a lot of fun and appreciated the great service and kindness the entire time. Thank you!" },
  { name: "Jason & Tina Wileman", dateLabel: "1 year ago", text: "Nick was our host for the evening. He was polite, available to help, and very kind. Nick, your boss is fortunate to have you." },
  { name: "Tracen Trahan", dateLabel: "1 year ago", occasion: "22nd birthday", text: "Used Destin Bonfire here locally for my 22nd birthday party. Fantastic time with my friends and family - they scheduled us for a 7 PM slot and made sure we caught the sunset perfectly. Truly a magical experience. Will book again for another family member in the future." },
  { name: "Donna Harris", dateLabel: "1 year ago", occasion: "Family of 12 · 2-year repeat", text: "Destin Bonfire Company is the best! We have used them for 2 years for my family of 12. Their communication is fantastic. Their attention to detail is top notch. I will definitely use them again." },
  { name: "Kristin Weston", dateLabel: "1 year ago", text: "Wonderful experience! Great communicating and customer service. The attendants were very friendly and helpful. Truly the cherry on top of our trip!" },
  { name: "Jo", dateLabel: "1 year ago", text: "Literally the best people to work with - extremely responsive and kind. Absolutely recommend and will be using again!" },
  { name: "Tom Scheide", dateLabel: "1 year ago", text: "Best bonfire experience for my wife's birthday. Thank you Erik, Kaylee and Kyle!" },
  { name: "Hailey Boyer Roise", dateLabel: "1 year ago", text: "So fun and perfect for late October. S'mores, music, and a great bonfire on the beach. Loved it!" },
  { name: "Ann Howe", dateLabel: "1 year ago", occasion: "Family", text: "Incredible service. On time and took care of everything. Very much enjoyed our bonfire. It was a great family memory." },
  { name: "Matthew Odhner", dateLabel: "1 year ago", text: "Great time." },
  { name: "Angie Giguere", dateLabel: "1 year ago", occasion: "Bachelorette", text: "What a great experience. The finale to our bachelorette trip in Destin. Make sure that you get the cooler and water so you can relax when you get to your fire location.", truncated: true },
  { name: "Logan Fisher", dateLabel: "2 years ago", occasion: "Family · northerners visiting", text: "Family in town from way up north - what to do? This was a great idea! It was a little chilly for us but the northerners loved it. Well set up and we paired with the provided Bluetooth speaker. A wonderful evening on the beach watching the sunset by a bonfire. Thanks Sam for your hard work and professionalism." },
  { name: "Gracey Belote", dateLabel: "2 years ago", occasion: "Bachelorette", text: "We booked a bonfire for the final night of a friend's bachelorette weekend, and it was the perfect way to cap off our trip! We got some lovely sunset photos and were able to enjoy wine and s'mores by the fire. Would highly recommend!" },
  { name: "Sarah Hayes", dateLabel: "2 years ago", text: "Our bonfire experience was amazing! Sam did an excellent job accommodating our group. He was so attentive and thoughtful. Thank you for a wonderful night!" },
  { name: "James Rooney", dateLabel: "2 years ago", text: "Sam did an amazing job with our bonfire. He made sure the fire was always going. Very polite. We will definitely use Destin Bonfires again when in Destin." },
  { name: "Elizabeth Wendel", dateLabel: "2 years ago", occasion: "Family", text: "Wonderful once-in-a-lifetime experience - worth every penny. Sam made the bonfire so special for our family. Would highly recommend." },
  { name: "Griffin Combs", dateLabel: "3 years ago", text: "Absolute blast! Sam showed us a great time. He was very professional, the bonfire looked great, and some really awesome games were included. Highly recommend." },
  { name: "Darlene Combs", dateLabel: "3 years ago", text: "We had a great experience! Sam is so sweet, polite and professional. We will definitely use him for all of our bonfires!" },
  { name: "courtnee Armstrong", dateLabel: "3 years ago", text: "Highlight of our trip! Had a great time and both Sam and Eric were awesome to work with!" },
  { name: "Nicole G", dateLabel: "3 years ago", text: "Had an amazing bonfire experience! Great customer service. Will be booking again!" },
  { name: "Maddie Revelle", dateLabel: "3 years ago", text: "Had a blast! So great being able to actually have a fire on the beach!" },
  { name: "Danielle Beasley", dateLabel: "3 years ago", occasion: "Family", text: "I rented a golf cart from Erik this summer and had him set up a bonfire for my family this fall. It was a great experience and I can't wait to do it again!" },
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
    text: "They handled the permit, the chairs, the décor - everything. We just walked up and enjoyed the sunset with the girls. Worth every penny.",
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
    text: "We were celebrating our 10-year anniversary and wanted something private. The Cozy Fire was perfect - sunset, champagne, and the team gave us total privacy. Magical.",
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
    text: "We hosted a wedding welcome bonfire for ~25 guests. Permit, seating, lighting, music - they thought of everything. Guests are still texting us about it months later.",
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
      "Every bonfire is run on a Walton County permit secured by our team. We handle the application, the fee, and the access list - you never touch the paperwork.",
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
      "Real wood chairs, clean linens, tiki torches, ambient lighting, a welcome sign - it photographs as well as it feels in person.",
    icon: "premium",
  },
  {
    title: "A genuinely stress-free night",
    description:
      "No coolers to drag, no firewood to buy, no permit calls. Bring your group and a drink - that’s it. We’ve done this hundreds of times.",
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
      "Text us. Call us. Email us. You’ll hear back from a real person - usually within minutes - not a chatbot or a 24-hour ticketing queue.",
    icon: "comms",
  },
  {
    title: "Trusted by families & groups",
    description:
      "Bachelorette weekends, family reunions, proposals, welcome parties, milestone birthdays - guests rebook us year after year for the moments that matter.",
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
      "Miramar Beach is the closest stretch of permitted bonfire-friendly sand to Destin proper - the sugar-white beach you can actually drive to in ten minutes from a Destin condo. Because Destin city limits don’t allow beach bonfires, almost every “Destin bonfire” guests book is technically here in unincorporated Walton County, just east of Sandestin.",
    vibe:
      "Wide, flat beach with the clearest sugar-sand views west toward Destin Pass. Slightly more developed than 30A - more high-rises, more dining, easier parking - but the same sugar sand and the same Walton County permit process.",
    permitNote:
      "Bonfires here run on the standard Walton County beach bonfire permit. Permits are released ~2 weeks ahead of your date. We handle the permit and confirm the exact access point once it’s issued.",
    beaches: ["scenic-gulf-drive"],
    bestFor: [
      "Guests staying in Destin who don’t want to drive 30+ minutes",
      "Larger groups who need easier paved parking",
      "Couples who want a sunset bonfire close to dinner reservations",
    ],
    parkingTips: [
      "Scenic Gulf Drive Regional Access has the largest paid lot - arrive 30 minutes before your bonfire to grab a spot in summer.",
      "Avoid Highway 98 between 4–6 PM if you can - westbound traffic from Sandestin to Destin backs up.",
      "Drop-off at the access point is allowed if your driver circles back to park.",
    ],
    faqs: [
      {
        q: "Can you have a bonfire in Destin, FL?",
        a: "Not within Destin city limits - Okaloosa County does not permit beach bonfires there. The closest legal bonfire beach to Destin is Miramar Beach in unincorporated Walton County, which is what we serve.",
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
      "Scenic Highway 30A strings together a series of beach communities - Dune Allen, Gulf Place, Blue Mountain, Grayton, Seaside, Seagrove, Seacrest, Rosemary, Inlet - each with its own personality and its own permitted beach accesses. We host bonfires on every permitted access along 30A.",
    vibe:
      "Quieter, more design-forward than Miramar. Smaller dune walks, fewer high-rises, sunset views that frame around the dune line. The sand is the same world-class sugar white - what changes is the crowd, the parking, and the after-bonfire walk to dinner.",
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
      "Ed Walline and Blue Mountain fill up first in peak season - book early or expect to use the second-choice beach.",
      "Walton County issues paid daily parking permits at most regional accesses - bring $5–$15 cash or use the QR code at the lot.",
      "Several 30A accesses are walkable from short-term rentals - ask us which is closest to your house.",
    ],
    faqs: [
      {
        q: "Where can you have a bonfire on 30A?",
        a: "Walton County maintains a list of permitted beach accesses along 30A. We host on all of them - including Ed Walline, Gulfview Heights, Blue Mountain, Grayton Dunes, One Seagrove, Inlet Beach, and several more. Use the beach pages below for parking, restrooms, and vibe at each.",
      },
      {
        q: "Which 30A beach is best for a bonfire?",
        a: "It depends on your group. Larger families lean toward Ed Walline (lots of amenities). Couples and small groups love Gulfview Heights or Walton Dunes (quieter). Bachelorette weekends often choose Inlet or Blue Mountain for the photo backdrop. We can match the beach to the vibe - just tell us what you’re going for.",
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
      "Santa Rosa Beach is the umbrella postal community for most of western 30A - Dune Allen, Gulf Place, Blue Mountain, Grayton, and several smaller pockets all carry a Santa Rosa Beach mailing address. Some of our most popular permitted accesses live here.",
    vibe:
      "Less polished than Seaside or Rosemary, more local. The food scene leans toward seafood shacks and oyster bars rather than boutique cafés. Beaches feel a touch wider and less curated - many guests prefer that.",
    permitNote:
      "Same Walton County process as the rest of 30A. Several Santa Rosa Beach accesses (Ed Walline, Gulfview Heights, Blue Mountain) are among the highest-demand bonfire permits - book early.",
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
      "Ed Walline’s on-site lot fills first - the 393 MPF overflow has a free tram in peak season.",
      "Gulfview Heights’ lot is small (~22 spaces) - arrive early on weekends.",
      "Walton Dunes is a quieter neighborhood access - best for small groups, no large lot.",
    ],
    faqs: [
      {
        q: "Where exactly is Santa Rosa Beach?",
        a: "Santa Rosa Beach is the postal community covering much of western 30A in South Walton, FL. It includes Gulf Place, Dune Allen, Blue Mountain Beach, Grayton Beach, and several smaller neighborhoods.",
      },
      {
        q: "Are bonfires legal in Santa Rosa Beach?",
        a: "Yes - on permitted Walton County beach accesses with a daily permit. Bonfires on un-permitted private beachfront are not legal. Every bonfire we host runs on an issued county permit.",
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
      "Rosemary Beach itself is a private, deed-restricted community - bonfires aren’t held on the Rosemary-owned accesses. Guests staying in Rosemary almost universally bonfire at the adjacent Inlet Beach Regional Access just to the east, which is a permitted Walton County beach with abundant parking.",
    vibe:
      "Rosemary’s aesthetic is unmistakable - Dutch West Indies architecture, cobblestone walks, and one of the most photogenic main streets on the Gulf. Inlet Beach matches the energy: a wide, less-crowded stretch with stunning sunset light.",
    permitNote:
      "Inlet Beach Regional Access is on the Walton County permitted bonfire list. We handle the permit and meet your group at the access.",
    beaches: ["inlet-beach"],
    bestFor: [
      "Rosemary Beach renters and homeowners",
      "Couples and bachelorettes who want the Rosemary aesthetic in their photos",
      "Groups walking from Rosemary or Seacrest to the beach access",
    ],
    parkingTips: [
      "Inlet Beach Regional Access has the biggest lot in eastern 30A - easiest large-group parking.",
      "From Rosemary’s town center, Inlet is a short Uber, golf cart, or 12-minute walk along the beach.",
    ],
    faqs: [
      {
        q: "Can you have a bonfire on Rosemary Beach?",
        a: "Not on the private Rosemary Beach community accesses themselves. We host bonfires for Rosemary guests at the adjacent Inlet Beach Regional Access, which is a Walton County permitted public beach less than a mile east.",
      },
      {
        q: "Why not directly in front of Rosemary Beach?",
        a: "Rosemary Beach is a deed-restricted community and the beach accesses are private. Walton County does not issue bonfire permits for private community accesses - only for the public Regional Beach Accesses.",
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
      "Seaside, like Rosemary, is a private deed-restricted community - bonfires aren’t held on the Seaside community boardwalks. Seaside guests typically bonfire at One Seagrove Place or Grayton Dunes, both within a short drive and both on the Walton County permitted access list.",
    vibe:
      "Seaside is the cultural heart of 30A - the picket fences, the Truman Show pavilions, the airstreams selling lobster rolls. Pair an early dinner at Bud & Alley’s with a sunset bonfire at One Seagrove (5 minutes east) for the quintessential 30A night.",
    permitNote:
      "Bonfires for Seaside guests run at One Seagrove Place, Grayton Dunes, or Santa Clara depending on availability. All three are Walton County permitted accesses.",
    beaches: ["one-seagrove", "grayton-dunes", "santa-clara"],
    bestFor: [
      "Seaside, WaterColor, and Seagrove renters",
      "Guests pairing a Seaside dinner with a sunset bonfire",
      "Smaller groups (8–20) wanting a more intimate access",
    ],
    parkingTips: [
      "One Seagrove Place is the closest permitted access to Seaside - about 5 minutes east on 30A.",
      "Grayton Dunes is 8 minutes west - a quieter, classic-30A vibe.",
      "Avoid trying to park in Seaside itself for the bonfire - Seaside parking is for Seaside guests, and the bonfire access is elsewhere.",
    ],
    faqs: [
      {
        q: "Can you have a bonfire on Seaside, FL?",
        a: "Not directly on Seaside’s private community boardwalks. We host Seaside guests at the nearest Walton County permitted accesses - One Seagrove Place (5 minutes east), Grayton Dunes (8 minutes west), or Santa Clara.",
      },
      {
        q: "Which beach is closest to Seaside for a bonfire?",
        a: "One Seagrove Place is the closest permitted bonfire beach to Seaside - about a 5-minute drive east on 30A.",
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
