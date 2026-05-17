export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date */
  date: string;
  author: string;
  /** ~6 word reader hook shown in cards */
  hook: string;
  heroImage: string;
  intro: string[];
  sections: BlogSection[];
  keyTakeaways: string[];
  relatedCommunities?: string[];
  relatedBeaches?: string[];
  ctaTitle?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "best-beaches-bonfires-near-destin",
    title: "The 7 Best Beaches for Bonfires Near Destin (2026 Guide)",
    description:
      "An honest, locally written ranking of the seven best permitted beach bonfire spots near Destin - with parking, vibe, and what to know before you book.",
    date: "2026-05-04",
    author: "Destin Bonfire Company",
    hook: "Local picks, ranked by vibe and parking",
    heroImage: "/images/edwallenbeach.jpg",
    intro: [
      "If you&rsquo;re staying in Destin and want a beach bonfire, you have one important thing to know up front: bonfires aren&rsquo;t allowed inside Destin city limits. Every legal &ldquo;Destin bonfire&rdquo; you see online is actually held just east of the city in unincorporated Walton County.",
      "That&rsquo;s good news, because Walton County happens to have the most beautiful sugar-white beaches in Florida - and a permit system that lets us run private bonfires on a handful of public regional accesses. Here&rsquo;s our locally informed ranking of the seven best for a bonfire night.",
    ],
    sections: [
      {
        heading: "1. Scenic Gulf Drive Regional Access (Miramar Beach)",
        paragraphs: [
          "Closest permitted bonfire beach to Destin proper - about 10–15 minutes by car. Wide, flat sand, easy paved parking, and clean sunset views west toward Destin Pass. This is what almost every &ldquo;Destin bonfire&rdquo; package on the internet actually means.",
          "Best for: families staying in Destin condos who don&rsquo;t want to drive 30+ minutes after dinner.",
        ],
      },
      {
        heading: "2. Ed Walline Regional Access (Gulf Place / Santa Rosa Beach)",
        paragraphs: [
          "The flagship 30A regional access. Two-story viewing platform, multiple picnic shelters, and walkable to Gulf Place restaurants like Shunk Gulley and The Perfect Pig. Lot fills fast in peak season - there&rsquo;s a free tram from the 393 overflow lot.",
          "Best for: larger family bonfires that want dinner and drinks close by.",
        ],
      },
      {
        heading: "3. Inlet Beach Regional Access",
        paragraphs: [
          "The biggest lot in eastern 30A and the de facto bonfire beach for guests staying in Rosemary Beach, Seacrest, or 30Avenue. Wide stretch, less crowded than Gulf Place, beautiful sunset light.",
          "Best for: Rosemary renters and bachelorette weekends that want the photogenic end of 30A.",
        ],
      },
      {
        heading: "4. One Seagrove Place Access",
        paragraphs: [
          "The closest permitted access to Seaside - about 5 minutes east on 30A. Smaller, more intimate, beautiful dune line. Pair with a Bud & Alley&rsquo;s dinner reservation and you&rsquo;ve got a quintessential 30A night.",
          "Best for: Seaside, WaterColor, and Seagrove guests; smaller groups (8–20) who want a quieter access.",
        ],
      },
      {
        heading: "5. Blue Mountain Regional Access",
        paragraphs: [
          "Sits at one of the highest dune ridges on 30A, which means dramatic sunset framing and a slightly cooler breeze on summer nights. Lot is mid-sized - get there early on weekends.",
          "Best for: photographers and couples who want a more dramatic backdrop.",
        ],
      },
      {
        heading: "6. Grayton Dunes Access",
        paragraphs: [
          "Classic, undeveloped 30A vibe. Less polished, more local. The Grayton beach community itself has a great food scene (The Red Bar, AJ&rsquo;s) within a short golf-cart ride.",
          "Best for: groups that want a low-key, lived-in beach instead of a manicured one.",
        ],
      },
      {
        heading: "7. Gulfview Heights Regional Access",
        paragraphs: [
          "Smaller mid-30A access with permanent restrooms and a quiet pavilion. Lot is tight (~22 spaces) so it&rsquo;s a bring-fewer-cars situation, but the bonfire experience is more private.",
          "Best for: small-to-medium groups who want amenities without Gulf Place crowds.",
        ],
      },
    ],
    keyTakeaways: [
      "You can&rsquo;t legally have a bonfire inside Destin city limits - every &ldquo;Destin bonfire&rdquo; is actually in Walton County.",
      "Miramar Beach (Scenic Gulf Drive) is the closest permitted bonfire beach to Destin.",
      "30A accesses like Ed Walline and Inlet Beach are higher-demand - book early and provide a second-choice beach.",
      "We secure the Walton County permit and pick the right beach for your group size and vibe.",
    ],
    relatedCommunities: [
      "miramar-beach-bonfires",
      "30a-bonfires",
      "santa-rosa-beach-bonfires",
    ],
    relatedBeaches: ["scenic-gulf-drive", "ed-walline", "inlet-beach", "one-seagrove"],
    ctaTitle: "Pick your beach - we&rsquo;ll handle the rest",
  },
  {
    slug: "30a-bonfire-guide",
    title: "The Complete 30A Beach Bonfire Guide",
    description:
      "Permits, beach picks by neighborhood, parking tips, and what to expect - everything you need to plan a bonfire anywhere along Scenic Highway 30A.",
    date: "2026-02-14",
    author: "Destin Bonfire Company",
    hook: "Permits, parking, and how to pick the right access",
    heroImage: "/images/BigCircleBonfireSetupNight.jpg",
    intro: [
      "Scenic Highway 30A runs about 24 miles along the Gulf - a chain of small communities, each with its own personality and its own permitted beach accesses. If you&rsquo;re planning a bonfire here, this guide covers what you need to know: how the permit works, which beach to pick for your group, and the parking gotchas locals know about.",
    ],
    sections: [
      {
        heading: "Are bonfires legal on 30A?",
        paragraphs: [
          "Yes, on permitted Walton County beach accesses with a daily permit. Walton County maintains a list of public regional accesses where bonfires are allowed and issues a capped number of permits per beach per day. Bonfires on un-permitted private beachfront are not legal.",
          "The permit fee is currently $157 and is included in every package we run.",
        ],
      },
      {
        heading: "How the permit process works",
        paragraphs: [
          "Walton County releases bonfire permits about two weeks before your scheduled date. Because availability is capped per beach per day, we always ask for a second-choice beach when you book - that way if your first choice is already full when permits drop, we already have a fallback ready.",
          "Special-event permits are sometimes required for larger gatherings (>30 guests, lighting, catering, etc.). We&rsquo;ll let you know during booking if your event qualifies and walk you through the additional steps.",
        ],
      },
      {
        heading: "Picking the right beach for your group",
        paragraphs: [
          "The big variables are: group size, parking needs, dinner plans, and the vibe you want in your photos. Here&rsquo;s how locals think about it.",
        ],
        bullets: [
          "Larger families (20+): Ed Walline, Inlet Beach - biggest lots, most amenities.",
          "Couples and small groups (4–10): Walton Dunes, One Seagrove, Gulfview Heights.",
          "Bachelorette weekends: Inlet Beach, Blue Mountain - best photo backdrops.",
          "Walking from your rental: ask us which permitted access is closest to your address.",
        ],
      },
      {
        heading: "Parking tips locals know",
        paragraphs: [
          "30A parking is the #1 logistical issue. A few pointers:",
        ],
        bullets: [
          "Most regional accesses have small lots - arrive 30 minutes before your bonfire in summer.",
          "Walton County issues paid daily parking permits at most accesses (~$5–$15 cash or QR code).",
          "Drop-off and circle-back is allowed if you have a designated driver.",
          "The 393 Municipal Parking Facility runs a free tram to Ed Walline in peak season.",
        ],
      },
      {
        heading: "What an actual 30A bonfire night looks like",
        paragraphs: [
          "Most guests show up about 30–45 minutes before sunset. We&rsquo;ve already pulled the permit, set up the chairs, lit the tiki torches, and started the fire. You walk up to a finished setup, settle in, and watch the sun drop behind the dune line.",
          "Two or three hours later - depending on your package - we break it all down. You leave with full hands (s&rsquo;more sticks, drinks) and empty pockets (no firewood to lug, no permit to file, no fire to put out).",
        ],
      },
    ],
    keyTakeaways: [
      "30A bonfires require a Walton County permit; daily permit count is capped per beach.",
      "Always provide a second-choice beach - first choice can&rsquo;t be confirmed until ~2 weeks out.",
      "Match the beach to your group size and dinner plans, not just to whichever name you recognize.",
      "Parking is the most-overlooked logistical issue - arrive early, especially in summer.",
    ],
    relatedCommunities: ["30a-bonfires", "santa-rosa-beach-bonfires", "seaside-bonfires"],
    relatedBeaches: ["ed-walline", "blue-mountain", "inlet-beach", "grayton-dunes"],
    ctaTitle: "Ready to plan your 30A bonfire?",
  },
  {
    slug: "miramar-beach-vs-30a-bonfires",
    title: "Miramar Beach vs 30A Bonfires: Which Should You Pick?",
    description:
      "Both are sugar-white Walton County beaches with permitted bonfires - here&rsquo;s an honest side-by-side on parking, vibe, dining, and what each is actually best for.",
    date: "2025-10-21",
    author: "Destin Bonfire Company",
    hook: "An honest side-by-side from people who host both",
    heroImage: "/images/scenicbeach.jpg",
    intro: [
      "&ldquo;Should I do my bonfire in Miramar or on 30A?&rdquo; is one of the most common questions we get from guests staying in Destin. The truthful answer is: they&rsquo;re both great, but for different reasons. Here&rsquo;s the honest comparison.",
    ],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Pick Miramar Beach if you&rsquo;re staying in Destin and don&rsquo;t want a long drive after dinner.",
          "Pick 30A if you&rsquo;re staying anywhere east of Sandestin, or if the more design-forward, less-developed beach aesthetic matters to your night.",
        ],
      },
      {
        heading: "Drive time from Destin",
        paragraphs: [
          "Miramar Beach is 10–15 minutes from most Destin condos. The closest 30A access (Dune Allen) is 25–35 minutes; Inlet Beach is 45–55 minutes. If your group is older or has young kids, that drive matters.",
        ],
      },
      {
        heading: "Vibe and crowd",
        paragraphs: [
          "Miramar feels more developed - high-rise condos, big resorts, paved parking. The beach itself is wide and beautiful, but the energy is more &ldquo;resort beach&rdquo; than &ldquo;quiet 30A.&rdquo;",
          "30A is the opposite: smaller communities, dune walks, quieter accesses, more curated aesthetic. If you&rsquo;ve seen 30A photos on Instagram, you know the look.",
        ],
      },
      {
        heading: "Parking",
        paragraphs: [
          "Miramar Beach&rsquo;s Scenic Gulf Drive Regional Access has the largest lot of any Walton County access we serve. 30A&rsquo;s lots are smaller and fill faster - especially Ed Walline and Blue Mountain in peak season.",
        ],
      },
      {
        heading: "Dinner before the bonfire",
        paragraphs: [
          "Miramar has more chain options and a few standout local places (Pompano Joe&rsquo;s, Brotula&rsquo;s). 30A has a deeper local food scene at every neighborhood - Bud & Alley&rsquo;s in Seaside, Shunk Gulley at Gulf Place, The Red Bar in Grayton, La Crema in Rosemary.",
        ],
      },
      {
        heading: "Permit process",
        paragraphs: [
          "Identical. All Walton County beach bonfires run on the same permit, regardless of which beach you pick. We handle it as part of every package.",
        ],
      },
    ],
    keyTakeaways: [
      "Miramar = closer to Destin, easier parking, more developed feel.",
      "30A = farther drive, smaller lots, more aesthetic and design-forward.",
      "Same permit, same s&rsquo;mores, same setup - the only differences are vibe and logistics.",
      "Tell us where you&rsquo;re staying and what kind of night you want - we&rsquo;ll recommend the right beach.",
    ],
    relatedCommunities: ["miramar-beach-bonfires", "30a-bonfires"],
    relatedBeaches: ["scenic-gulf-drive", "ed-walline", "blue-mountain", "inlet-beach"],
    ctaTitle: "Still not sure? Tell us where you&rsquo;re staying.",
  },
  {
    slug: "bonfire-wedding-ideas",
    title: "Beach Bonfire Wedding Ideas: Welcome Parties, Rehearsals & Send-Offs",
    description:
      "How to use a private beach bonfire for your wedding weekend - welcome parties, rehearsal dinners, after-parties, and morning-after send-offs on Destin and 30A beaches.",
    date: "2025-06-12",
    author: "Destin Bonfire Company",
    hook: "Welcome parties, rehearsals, and send-offs on the sand",
    heroImage: "/images/WeddingProposalCloseUpFire.jpg",
    intro: [
      "A beach bonfire is one of the most-loved additions to a Destin or 30A wedding weekend - usually as a welcome party, a rehearsal-dinner extension, or a low-key after-party. Here&rsquo;s how couples are actually using them.",
    ],
    sections: [
      {
        heading: "1. Wedding welcome party",
        paragraphs: [
          "By far the most common use. The night guests arrive in town, you host a casual bonfire welcome on the beach - open seating, s&rsquo;mores, music, no formal program. Guests meet each other, the bride and groom say hi, and everyone&rsquo;s warmed up for the rehearsal the next day.",
          "Best package: The Bonfire Bash (29 guests) or our custom Ultimate Bonfire (30+).",
        ],
      },
      {
        heading: "2. Rehearsal-dinner extension",
        paragraphs: [
          "Rehearsal dinners often end at 9 or 10 PM - too early to send everyone back to their condos. A bonfire on the beach right after lets the wedding party keep going without a noise-ordinance issue or a packed bar.",
        ],
      },
      {
        heading: "3. Wedding after-party",
        paragraphs: [
          "The reception ends at 10 or 11; the wedding party isn&rsquo;t ready to call it a night. A late bonfire on the closest permitted beach is a beautiful, quiet way to wind down - especially with the wedding dress traded for jeans.",
          "Note: Walton County permit times are capped - we&rsquo;ll work with you on the latest possible end time.",
        ],
      },
      {
        heading: "4. Morning-after send-off",
        paragraphs: [
          "Less common but lovely - a daytime fire pit and brunch on the sand the morning after, before guests fly home.",
        ],
      },
      {
        heading: "What to coordinate",
        paragraphs: [
          "Wedding bonfires are usually larger groups (20–40+) and benefit from a few extra coordination conversations:",
        ],
        bullets: [
          "Permit timing - confirm we have your dates locked at least 2 weeks before the permit release window.",
          "Special-event permit - required for groups over ~30 or for setups that include catering/lighting/etc.",
          "Photographer access - we can coordinate setup time so your photographer has finished light.",
          "Guest transportation - most accesses don&rsquo;t support 40 cars; plan a shuttle or carpool.",
        ],
      },
    ],
    keyTakeaways: [
      "Welcome parties are the #1 wedding-bonfire use - casual, no-program, unforgettable.",
      "Rehearsal-dinner extensions and reception after-parties are the next most common.",
      "Larger wedding bonfires (>30 guests) usually require a special-event permit - we handle it.",
      "Coordinate transportation in advance - beach access lots aren&rsquo;t built for 40 wedding cars.",
    ],
    relatedCommunities: ["30a-bonfires", "rosemary-beach-bonfires", "seaside-bonfires"],
    relatedBeaches: ["inlet-beach", "ed-walline", "one-seagrove"],
    ctaTitle: "Planning a wedding weekend? Let&rsquo;s talk.",
  },
  {
    slug: "family-beach-night-ideas",
    title: "Family Beach Night Ideas (That Don&rsquo;t Involve Mini Golf)",
    description:
      "Five low-stress family beach night ideas for your Destin or 30A vacation - including the easiest one to actually pull off with kids in tow.",
    date: "2025-03-08",
    author: "Destin Bonfire Company",
    hook: "Five ideas, including the one we&rsquo;re biased about",
    heroImage: "/images/SmoreRoasting.jpg",
    intro: [
      "If you&rsquo;ve been on 30A or in Destin for more than two days, you&rsquo;ve probably already done the obvious nighttime activities: ice cream, mini golf, sunset cruise. Here are five family beach-night ideas that are a little less expected - and yes, the last one is the one we host (we&rsquo;ll be honest about it).",
    ],
    sections: [
      {
        heading: "1. Glow-stick beach scavenger hunt",
        paragraphs: [
          "A 20-minute setup the parents can do while the kids eat dinner. Hide cheap glow sticks in the sand at one beach access (away from the dunes - they&rsquo;re protected), then walk down with a list. Easiest at low tide.",
        ],
      },
      {
        heading: "2. Walton County turtle walk",
        paragraphs: [
          "From May through October, sea turtles nest along South Walton beaches. The South Walton Turtle Watch Group runs guided evening walks - kids love it, you learn something, and it&rsquo;s mostly free.",
          "Important: turn off your phone flashlights on the beach during nesting season; bright lights disorient hatchlings.",
        ],
      },
      {
        heading: "3. Sunset paddleboard from a coastal dune lake",
        paragraphs: [
          "30A&rsquo;s coastal dune lakes (Western Lake at Grayton, Camp Creek, Deer Lake) are calm, family-friendly, and close enough to the gulf that you can paddle, then walk over to the beach for sunset.",
        ],
      },
      {
        heading: "4. Bring-your-own-pizza beach picnic",
        paragraphs: [
          "Order a couple of pies from Pizza by the Sea (Gulf Place) or Sunset Bay Café (Miramar), grab a blanket, and have an early dinner on the sand. Kids burn off energy, parents finish the cocktail in peace.",
        ],
      },
      {
        heading: "5. A private beach bonfire (yes, our pitch)",
        paragraphs: [
          "We&rsquo;re biased - but a private beach bonfire is the family activity our guests rebook the most. The kids get s&rsquo;mores and cornhole; the parents get to sit in actual chairs and watch the sunset; nobody has to drive home stressed about parking.",
          "Our smallest package (The Cozy Fire) is built for 6 guests and starts at $429 with permit, setup, attendant, and cleanup all included.",
        ],
      },
    ],
    keyTakeaways: [
      "Beach scavenger hunts and turtle walks are zero-stress, low-budget family ideas.",
      "Coastal dune lakes are an underrated 30A activity for families.",
      "If you&rsquo;d rather just show up and be served, a private bonfire (our pitch) bundles the night for you.",
    ],
    relatedCommunities: ["miramar-beach-bonfires", "30a-bonfires"],
    relatedBeaches: ["scenic-gulf-drive", "ed-walline", "grayton-dunes"],
    ctaTitle: "Let us handle the family beach night",
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
