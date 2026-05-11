export type BeachDetail = {
  slug: string;
  fullName: string;
  shortName: string;
  community: string;
  image: string;
  heroImage?: string;
  parkingAddress: string;
  lat: number;
  lng: number;
  parkingSpots: string;
  parkingCost: string;
  restrooms: string;
  outdoorShowers: string;
  lifeguards: string;
  accessibility: string;
  petPolicy: string;
  crowdLevel: string;
  distanceToWater: string;
  vibe: string;
  bestFor: string;
  nearbyFood: { name: string; note?: string }[];
  drivingNotes: string[];
  sources: { label: string; url: string }[];
};

export const BEACHES: BeachDetail[] = [
  {
    slug: "ed-walline",
    fullName: "Ed Walline Regional Beach Access",
    shortName: "Ed Walline",
    community: "Santa Rosa Beach · Gulf Place",
    image: "/images/edwallenbeach.jpg",
    parkingAddress: "4447 W Scenic Hwy 30A, Santa Rosa Beach, FL 32459",
    lat: 30.34666,
    lng: -86.22992,
    parkingSpots:
      "~40 on-site spaces. 393 Municipal Parking Facility (74+ spaces) connects via free beach tram, 4 blocks north on Hwy 393.",
    parkingCost:
      "On-site lot is free. The 393 overflow lot is paid ($5–$15/day non-residents; $5/yr Walton residents).",
    restrooms: "Yes — permanent ADA-accessible restrooms with multiple stalls.",
    outdoorShowers: "Rinse showers available at the walkover.",
    lifeguards: "Seasonal · typically 10 AM – 6 PM in peak season.",
    accessibility:
      "Fully ADA-accessible — boardwalk, parking, restrooms, and beach wheelchairs available on request.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel: "Busy regional access — one of the most popular on 30A.",
    distanceToWater: "Short — ADA walkway straight from lot to sand.",
    vibe: "The flagship Gulf Place access with a two-story viewing platform, two picnic shelters, and a community toy-share box. Social, family-friendly, and walkable to shops and dining.",
    bestFor: "Larger family bonfires that want dinner and drinks close by.",
    nearbyFood: [
      { name: "Shunk Gulley Oyster Bar", note: "Across 30A, 2nd-story gulf view" },
      { name: "The Perfect Pig Gulf Place" },
      { name: "Pizza by the Sea", note: "Laura Hamilton Blvd" },
    ],
    drivingNotes: [
      "The on-site lot fills fast on peak days.",
      "Free tram from the 393 MPF runs every 10 minutes, 10 AM – 7 PM.",
      "Confirmed on the current Walton County permitted-bonfire access list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/ed-walline-regional-beach-access-39/" },
    ],
  },
  {
    slug: "gulfview-heights",
    fullName: "Gulfview Heights Regional Beach Access",
    shortName: "Gulfview Heights",
    community: "Santa Rosa Beach",
    image: "/images/gulfviewheights.jpg",
    parkingAddress: "186 Gulfview Heights Street, Santa Rosa Beach, FL 32459",
    lat: 30.34075,
    lng: -86.2102,
    parkingSpots: "~22 spaces. Parking is tight — arrive early.",
    parkingCost: "Free.",
    restrooms: "Yes — ADA-accessible permanent restrooms.",
    outdoorShowers: "Outdoor rinse showers confirmed.",
    lifeguards: "Seasonal.",
    accessibility:
      "ADA restrooms and parking on-site. Beach approach may include stairs — confirm with our team if mobility is a concern.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel: "Busy regional access — lot fills early on weekends.",
    distanceToWater: "Short — ~1/4 mile path from the lot to the sand.",
    vibe: "Classic mid-30A regional access with a picnic pavilion and water fountain. Less flashy than Ed Walline, with strong local usage.",
    bestFor: "Small-to-medium groups who want amenities without Gulf Place crowds.",
    nearbyFood: [
      { name: "Goatfeathers Seafood Market & Restaurant", note: "Walkable" },
      { name: "Basmati's Asian Cuisine", note: "Blue Mountain, short drive" },
      { name: "Shunk Gulley Oyster Bar", note: "Gulf Place, ~3 min drive" },
    ],
    drivingNotes: [
      "Plan for overflow street parking on busy evenings.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/gulfview-heights-regional-beach-access-37/" },
    ],
  },
  {
    slug: "santa-clara",
    fullName: "Santa Clara Regional Beach Access",
    shortName: "Santa Clara",
    community: "Seagrove Beach",
    image: "/images/SantaClara.jpg",
    parkingAddress: "3468 E Scenic Hwy 30A, Santa Rosa Beach, FL 32459",
    lat: 30.31364,
    lng: -86.11927,
    parkingSpots:
      "~60 spaces split across both sides of 30A. Dedicated bike and golf-cart parking added in the recent renovation.",
    parkingCost: "Free.",
    restrooms: "Yes — multi-stall, ADA-accessible, permanent facilities.",
    outdoorShowers: "Outdoor rinse showers confirmed.",
    lifeguards: "Seasonal (access #17).",
    accessibility:
      "Rebuilt ADA boardwalk, ADA restrooms and parking, and beach wheelchairs available.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel: "Busy regional access — one of the more family-friendly stops on 30A.",
    distanceToWater: "Medium — long ADA boardwalk and ramp.",
    vibe: "Recently renovated family-oriented access with shade, water fountains, and one of the most polished boardwalks on 30A. Popular lunch stop for locals.",
    bestFor: "Larger family bonfires that need real amenities.",
    nearbyFood: [
      { name: "Cafe Thirty-A", note: "3899 E 30A" },
      { name: "Old Florida Fish House", note: "Eastern Lake" },
      { name: "Amavida Coffee Seagrove" },
    ],
    drivingNotes: [
      "Site recently upgraded with new lighting and landscaping.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/santa-clara-regional-beach-access-17/" },
    ],
  },
  {
    slug: "dune-allen",
    fullName: "Dune Allen Regional Beach Access",
    shortName: "Dune Allen",
    community: "Dune Allen Beach · West 30A",
    image: "/images/DuneAllen.jpg",
    parkingAddress: "5999 W Scenic Hwy 30A, Santa Rosa Beach, FL 32459",
    lat: 30.35386,
    lng: -86.25491,
    parkingSpots: "~23 spaces including ADA-accessible spots.",
    parkingCost: "Free.",
    restrooms: "Yes — multi-stall ADA-accessible restroom pavilion.",
    outdoorShowers: "Two outdoor rinse showers.",
    lifeguards: "Seasonal.",
    accessibility: "ADA-accessible. Beach wheelchairs available on request.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel: "Moderate — a west-end locals' spot, less crowded than Gulf Place.",
    distanceToWater: "Short boardwalk from the pavilion to the sand.",
    vibe: "Classic west-30A access on a narrow strip across from Stinky's Fish Camp. Pavilion gathering feel with quick parking turnover.",
    bestFor: "Small-to-medium bonfires with dinner at Stinky's beforehand.",
    nearbyFood: [
      { name: "Stinky's Fish Camp", note: "Directly across 30A" },
      { name: "Goatfeathers Seafood" },
      { name: "The Bay Restaurant", note: "Choctawhatchee Bay" },
    ],
    drivingNotes: [
      "Small lot can fill at peak — the free West Route tram from the 393 MPF stops here every 15 minutes.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/" },
    ],
  },
  {
    slug: "fort-panic",
    fullName: "Fort Panic Regional Beach Access",
    shortName: "Fort Panic",
    community: "Dune Allen · West 30A",
    image: "/images/FortPanic.jpg",
    parkingAddress: "5753 W Scenic Hwy 30A, Santa Rosa Beach, FL 32459",
    lat: 30.35266,
    lng: -86.25127,
    parkingSpots: "~28–34 spaces plus limited street parking.",
    parkingCost: "Free.",
    restrooms: "Yes — ADA-accessible multi-stall restrooms with benches.",
    outdoorShowers: "Two outdoor shower areas.",
    lifeguards: "Seasonal (access #43).",
    accessibility: "ADA-accessible boardwalk, parking, and restrooms.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel:
      "Quiet — frequently called the least crowded regional access on 30A.",
    distanceToWater: "Short boardwalk ramp lined with sea oats.",
    vibe: "Tucked-away peaceful regional access with full amenities but noticeably less foot traffic. Feels private even on busy days.",
    bestFor: "Smaller private-feel bonfires, couples, and sunset groups.",
    nearbyFood: [
      { name: "Stinky's Fish Camp", note: "1 minute east" },
      { name: "Goatfeathers Seafood" },
      { name: "Ophelia Restaurant", note: "Seasonal, nearby" },
    ],
    drivingNotes: [
      "Free West Route tram from the 393 MPF stops here every 15 minutes.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/fort-panic-regional-beach-access-43/" },
    ],
  },
  {
    slug: "blue-mountain",
    fullName: "Blue Mountain Regional Beach Access",
    shortName: "Blue Mountain",
    community: "Blue Mountain Beach",
    image: "/images/BlueMountain2.jpg",
    parkingAddress: "2365 S Scenic Hwy 83, Santa Rosa Beach, FL 32459",
    lat: 30.33801,
    lng: -86.2009,
    parkingSpots: "~20 spaces including two ADA spots. Bike rack on-site.",
    parkingCost: "Free.",
    restrooms: "Yes — ADA-accessible permanent restrooms.",
    outdoorShowers: "Call to confirm — not listed on our primary sources.",
    lifeguards: "Seasonal (access #36).",
    accessibility: "ADA-accessible restrooms and parking.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel:
      "Moderate — active local crowd; the highest elevation on 30A gives it a reliable ocean breeze.",
    distanceToWater: "Short — brief walkover from the lot to the sand.",
    vibe: "The heart of Blue Mountain Beach — elevated, breezy, and walkable to restaurants. Social but not overwhelming.",
    bestFor: "Medium groups pairing dinner at Redfish Village with a bonfire.",
    nearbyFood: [
      { name: "Basmati's Asian Cuisine", note: "3295 Scenic 30A" },
      { name: "Red Fish Taco", note: "Redfish Village" },
      { name: "Blue Mountain Bakery" },
    ],
    drivingNotes: [
      "Limited parking — arrive early on weekends.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/blue-mountain-regional-beach-access-36/" },
    ],
  },
  {
    slug: "walton-dunes",
    fullName: "Walton Dunes Beach Access",
    shortName: "Walton Dunes",
    community: "Seagrove Beach",
    image: "/images/waltondunes.jpg",
    parkingAddress: "238 Beachfront Trail, Santa Rosa Beach, FL 32459",
    lat: 30.30377,
    lng: -86.08731,
    parkingSpots: "Roughly 15 roadside spots at the end of Beachfront Trail.",
    parkingCost: "Free (where street spots are available).",
    restrooms: "No on-site restrooms — plan a stop before arrival.",
    outdoorShowers: "None.",
    lifeguards: "Not a permanently staffed tower. Confirm with our team seasonally.",
    accessibility:
      "No dedicated ADA infrastructure reported — walk-on roadside access only.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel: "Quiet local access — one of the most low-key spots on 30A.",
    distanceToWater: "Short — direct walk-on at the end of Beachfront Trail.",
    vibe: "A locals' secret. No facilities, wide beach, and minimal crowds — feels off-the-grid even in summer.",
    bestFor: "Small private-feel bonfires, couples, and sunrise gatherings.",
    nearbyFood: [
      { name: "Old Florida Fish House", note: "Eastern Lake, 2 minutes" },
      { name: "Cafe Thirty-A", note: "Seagrove" },
      { name: "The Local Market", note: "Seagrove" },
    ],
    drivingNotes: [
      "Very limited parking — plan for street spots and be respectful of residents.",
      "No restrooms on-site — use Santa Clara or Seagrove Regional beforehand.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/" },
    ],
  },
  {
    slug: "one-seagrove",
    fullName: "One Seagrove Place Beach Access",
    shortName: "One Seagrove",
    community: "Seagrove Beach",
    image: "/images/oneseagrove.jpg",
    parkingAddress: "57 Seagrove Place, Santa Rosa Beach, FL 32459",
    lat: 30.31025,
    lng: -86.10884,
    parkingSpots:
      "No dedicated public lot — limited street parking. The adjacent condo lot is private and tows.",
    parkingCost: "Free where street spots are available.",
    restrooms: "No on-site public restrooms.",
    outdoorShowers: "Rinse shower at the walkover.",
    lifeguards: "Not a staffed regional tower.",
    accessibility:
      "Walkover was rebuilt and reopened after 2025 storm repairs. Full ADA features at the public walkover are not confirmed — call us if mobility is a concern.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel: "Quiet, neighborhood-style access.",
    distanceToWater: "Short walkover directly to the sand.",
    vibe: "A compact neighborhood-style access tucked next to the One Seagrove Place condos — one of only two high-rises on 30A. Private feel with a rinse shower and not much else.",
    bestFor: "Small private bonfires and couples' evenings.",
    nearbyFood: [
      { name: "Cafe Thirty-A" },
      { name: "Old Florida Fish House" },
      { name: "The Great Southern Cafe", note: "Seaside, 5 minutes west" },
    ],
    drivingNotes: [
      "Do not park in the condo lot — it is private and will tow.",
      "Best reached by drop-off or walking from the Seagrove area.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/" },
    ],
  },
  {
    slug: "grayton-dunes",
    fullName: "Grayton Dunes Beach Access",
    shortName: "Grayton Dunes",
    community: "Grayton Beach",
    image: "/images/GraytonDunes.jpg",
    parkingAddress: "288 Garfield St, Santa Rosa Beach, FL 32459",
    lat: 30.32863,
    lng: -86.1647,
    parkingSpots:
      "Street parking only with very limited ADA spots. Primary overflow is the Grayton Beach Municipal Lot on CR-283 S (free trolley to the beach).",
    parkingCost:
      "Street parking free where available. The Grayton Beach MPL overflow is paid ($5–$15/day non-residents, $5/yr Walton residents).",
    restrooms:
      "Limited on-site. Grayton Beach State Park nearby has full restrooms.",
    outdoorShowers: "Freshwater rinse showers at the boardwalk.",
    lifeguards: "Seasonal presence reported — not a full staffed tower.",
    accessibility: "ADA-accessible boardwalk extending east to Banfill Street.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel:
      "Busy in season — the heart of the Grayton village, walkable to restaurants and bars.",
    distanceToWater: "Short boardwalk from the end of Garfield Street to the sand.",
    vibe: "Old-Florida village charm — bohemian, walkable from The Red Bar and Chiringo, with classic 30A character and sunset energy.",
    bestFor: "Medium groups pairing dinner in Grayton village with a bonfire.",
    nearbyFood: [
      { name: "The Red Bar", note: "Iconic, steps away" },
      { name: "Chiringo", note: "Across from Red Bar" },
      { name: "Hurricane Oyster Bar", note: "Grayton Central" },
    ],
    drivingNotes: [
      "Parking is genuinely hard in the Grayton village — we steer guests to the MPL with the free tram.",
      "Beach driving is restricted to permitted residents only.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/" },
    ],
  },
  {
    slug: "inlet-beach",
    fullName: "Inlet Beach Regional Access",
    shortName: "Inlet Beach",
    community: "Inlet Beach · East 30A",
    image: "/images/InletBeach.jpg",
    parkingAddress: "438 S Orange St, Inlet Beach, FL 32461",
    lat: 30.27401,
    lng: -86.00393,
    parkingSpots:
      "117 spaces — the largest county beach access lot in Walton County.",
    parkingCost: "Free.",
    restrooms: "Yes — permanent ADA-accessible restrooms.",
    outdoorShowers: "Showers and rinse stations on-site.",
    lifeguards: "Seasonal.",
    accessibility:
      "Fully ADA — three dune walkovers, ADA boardwalk, ADA restrooms and parking, plus beach wheelchairs.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel:
      "Very busy regional access — the easternmost flagship lot in Walton County.",
    distanceToWater: "Medium — boardwalks over a substantial dune system.",
    vibe: "The big-lot east-end workhorse. Clean, spacious, and walkable to 30Avenue shopping and dining. Great for larger gatherings.",
    bestFor: "Large family and group bonfires (biggest lot means least parking stress).",
    nearbyFood: [
      { name: "The Donut Hole Inlet Beach", note: "12983 US-98 E" },
      { name: "Amici 30A", note: "30Avenue" },
      { name: "Shades Bar & Grill", note: "30Avenue" },
    ],
    drivingNotes: [
      "South Orange Street entrance is the primary driveway.",
      "Spans access IDs 2a, 2b, and 2c.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/inlet-beach-regional-access-2a-2b-2c/" },
    ],
  },
  {
    slug: "scenic-gulf-drive",
    fullName: "Scenic Gulf Drive Regional Beach Access",
    shortName: "Scenic Gulf Drive",
    community: "Miramar Beach · Closest to Destin",
    image: "/images/scenicbeach.jpg",
    parkingAddress: "907 Scenic Gulf Dr, Miramar Beach, FL 32550",
    lat: 30.37496,
    lng: -86.36365,
    parkingSpots:
      "18 vehicle spaces + 9 golf-cart spaces + bike parking. Built new in 2022.",
    parkingCost: "Free.",
    restrooms: "Yes — ADA-accessible restrooms in a coastal-cottage walkover pavilion.",
    outdoorShowers: "Rinse showers on-site.",
    lifeguards: "Seasonal lifeguard station.",
    accessibility:
      "ADA-accessible boardwalk, dune walkover, parking, and restrooms.",
    petPolicy:
      "Leashed dogs allowed with a Walton County pet permit, 3:30 PM – 8:30 AM only.",
    crowdLevel:
      "Moderate — quieter than 30A regional accesses, with a residential Miramar feel.",
    distanceToWater: "Short boardwalk across about 400 feet of beachfront.",
    vibe: "The newest access of the group (opened 2022) — modern coastal-cottage design, large deck plaza, picnic pavilion, and a calm residential Miramar setting away from 30A traffic.",
    bestFor: "Medium groups wanting a quieter Miramar bonfire with brand-new facilities.",
    nearbyFood: [
      { name: "Pompano Joe's", note: "2237 Scenic Gulf Hwy" },
      { name: "Whale's Tail Beach Bar & Grill", note: "Seascape Resort" },
      { name: "Surfer Girl Pizza", note: "Scenic Gulf Dr" },
    ],
    drivingNotes: [
      "Small vehicle lot (18 spaces) — arrive early on peak days.",
      "This is the closest permitted beach to Destin — a short drive east on Highway 98 from Destin proper.",
      "A small travel fee may apply for service at this location due to distance from 30A.",
      "Confirmed on the current permitted-bonfire list.",
    ],
    sources: [
      { label: "Visit South Walton", url: "https://www.visitsouthwalton.com/beach-access/scenic-gulf-drive-regional-beach-access/" },
    ],
  },
];

export function getBeach(slug: string) {
  return BEACHES.find((b) => b.slug === slug);
}

/**
 * Top-down satellite embed using Google's official `/maps/embed?pb=` format.
 *
 * The pb string encodes:
 *   1d500      distance (~500m viewport → zoom ~19)
 *   2d{lng}    longitude
 *   3d{lat}    latitude
 *   2m3!1f0!2f0!3f0   bearing=0, tilt=0, roll=0 (guaranteed top-down)
 *   3m2!1i1024!2i768  viewport pixels
 *   4f13.1     heading/FOV
 *   5e1        map type: 1 = satellite (0=map, 1=satellite, 2=hybrid)
 *
 * Switched from the simpler `maps.google.com/maps?t=k&output=embed` URL
 * because that one lets Google decide on 3D tilt; this pb=-format forces
 * a strict 2D top-down view at every location.
 */
export function googleMapsSatelliteEmbed(lat: number, lng: number) {
  const pb =
    `!1m14!1m12!1m3` +
    `!1d500` +
    `!2d${lng}` +
    `!3d${lat}` +
    `!2m3!1f0!2f0!3f0` +
    `!3m2!1i1024!2i768` +
    `!4f13.1` +
    `!5e1`;
  return `https://www.google.com/maps/embed?pb=${pb}`;
}

export function googleMapsDirectionsLink(lat: number, lng: number, label: string) {
  const query = encodeURIComponent(label);
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${query}`;
}

export function googleMapsSatelliteLink(lat: number, lng: number) {
  // Force top-down satellite (!2e0 = tilt 0) in the "Open in Google Maps" link too.
  return `https://www.google.com/maps/@${lat},${lng},19z/data=!3m1!1e3!4m2!2e0`;
}
