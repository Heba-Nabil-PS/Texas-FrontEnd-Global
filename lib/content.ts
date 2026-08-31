/**
 * All site copy + asset references in one place.
 * Assets live in /public/assets (copied from the Texas brand kit).
 */

export const brand = {
  name: "Texas Chicken",
  tagline: "Hand-battered. Made fresh. Since 1952.",
  since: 1952,
};

/* --------------------------------------------------------------------------
 * Site-wide navigation (route-aware, follows the sitemap)
 * ------------------------------------------------------------------------ */
export const site = {
  markets: [
    "Egypt",
    "KSA",
    "UAE",
    "Qatar",
    "Bahrain",
    "Oman",
    "Iraq",
    "Morocco",
    "Malaysia",
    "Singapore",
    "Indonesia",
    "Vietnam",
  ],
  nav: [
    { label: "Story", href: "/our-story" },
    { label: "Menu", href: "/menu" },
    { label: "App & Rewards", href: "/app" },
    // Hidden for now — uncomment to bring Community back into the main nav.
    // { label: "Community", href: "/community" },
    { label: "News", href: "/news" },
    { label: "Franchising", href: "/franchising" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  // secondary links (mobile drawer only)
  topNav: [
    { label: "Careers", href: "/careers" },
  ],
  cta: { label: "Find Your Market", href: "/find-your-market" },
};

export const hero = {
  eyebrow: "Bold flavor, worldwide",
  line1: "Hand-battered",
  line2: "chicken.",
  line3: "Real Texas soul.",
  subtitle:
    "Marinated, hand-breaded and fried fresh in every restaurant — the way it's been done in Texas since 1952. Now served in 23 markets across the globe.",
  ctaPrimary: "Explore the menu",
  ctaSecondary: "Find your market",
  video: "/assets/hero-banner.mp4",
  scrollHint: "Scroll to explore",
};

export const about = {
  eyebrow: "Our story",
  heading: "It started across the street from the Alamo.",
  body: "In 1952, George W. Church opened a small chicken stand in San Antonio, Texas — right across from the Alamo. One recipe, hand-battered and fried fresh to order. Seventy-two years later, that same uncompromising craft travels the world, still made by hand, still made fresh, one restaurant at a time.",
  stats: [
    { value: 1952, label: "Founded in San Antonio", suffix: "" },
    { value: 23, label: "Markets worldwide", suffix: "" },
    { value: 100, label: "Hand-battered, always", suffix: "%" },
    { value: 72, label: "Years of craft", suffix: "yrs" },
  ],
  image: "/assets/home-tray.png",
  video: "/assets/built-standards.webm",
  cta: {
    primary: { label: "Read our story", href: "/our-story" },
    secondary: { label: "Meet the team", href: "/our-story/leadership" },
  },
};

export const services = {
  eyebrow: "The Texas way",
  heading: "Crafted, not manufactured.",
  items: [
    {
      title: "Hand-battered",
      desc: "Every piece is marinated, then hand-dredged in our signature coating. No factory pre-coat — ever.",
      icon: "star",
    },
    {
      title: "Fried fresh",
      desc: "Cooked to order inside the restaurant, never held. Golden, crunchy, and hot when it reaches you.",
      icon: "deals",
    },
    {
      title: "Honey-butter biscuits",
      desc: "Buttery, flaky, glazed with honey. The reason people drive across town.",
      icon: "rewards",
    },
    {
      title: "Bold by design",
      desc: "Original or spicy, sandwiches to loaded fries — big Texan flavor built into every bite.",
      icon: "locate",
    },
  ],
};

export const featured = {
  eyebrow: "Limited-time offers",
  heading: "What's new.",
  items: [
    {
      title: "Golden Dragon",
      tag: "New",
      desc: "Glazed with our sweet & fiery golden habanero sauce.",
      image: "/assets/ltos/lto-01.png",
    },
    {
      title: "Mexicana Loaded Fries",
      tag: "New",
      desc: "Crispy fries piled with popcorn chicken and bold sauces.",
      image: "/assets/ltos/lto-02.png",
    },
    {
      title: "The Super Hero",
      tag: "New",
      desc: "A massively flavorful hero — stacked, saucy and loaded.",
      image: "/assets/ltos/lto-03.png",
    },
  ],
};

export const why = {
  eyebrow: "Why Texas",
  heading: "Seventy-two years, one standard.",
  milestones: [
    { year: "1952", title: "The first stand", desc: "George W. Church opens across from the Alamo, San Antonio." },
    { year: "1970s", title: "Texas goes national", desc: "The hand-battered recipe spreads across the United States." },
    { year: "2000s", title: "Around the world", desc: "MENA, Southeast Asia and the Pacific taste the Texas crunch." },
    { year: "Today", title: "23 markets, one craft", desc: "Still hand-battered, still fried fresh, one restaurant at a time." },
  ],
  counters: [
    { value: 23, label: "Markets", suffix: "" },
    { value: 1500, label: "Restaurants", suffix: "+" },
    { value: 1, label: "Recipe, unchanged", suffix: "" },
  ],
};

export const testimonials = {
  eyebrow: "From the counter",
  heading: "People don't forget the crunch.",
  quotes: [
    {
      quote:
        "The biscuits alone are worth the trip. Everything comes out hot, fresh, and actually hand-made — you can taste it.",
      name: "Layla H.",
      role: "Riyadh",
    },
    {
      quote:
        "Best fried chicken I've had outside the States. That spicy coating is unreal and the tenders are massive.",
      name: "Daniel O.",
      role: "Kuala Lumpur",
    },
    {
      quote:
        "Grew up on Church's in Texas. Found Texas Chicken abroad and it's the exact same crunch. Instant nostalgia.",
      name: "Marcus T.",
      role: "Dubai",
    },
    {
      quote:
        "The Mexicana sandwich is my whole personality now. Crispy, spicy, that tortilla crunch — genius.",
      name: "Sara N.",
      role: "Cairo",
    },
  ],
};

export const partners = {
  eyebrow: "Recognised & trusted",
  heading: "Backed by the industry.",
  badges: [
    "/assets/badge-franchise-times.svg",
    "/assets/badge-ifa-foty.svg",
    "/assets/badge-ifa-member.svg",
  ],
  markets: [
    "Egypt",
    "KSA",
    "UAE",
    "Qatar",
    "Bahrain",
    "Oman",
    "Iraq",
    "Morocco",
    "Malaysia",
    "Singapore",
    "Indonesia",
    "Vietnam",
  ],
};

export const finalCta = {
  eyebrow: "Come hungry",
  heading: "Bold bites are",
  headingAccent: "right around the corner.",
  body: "Find your nearest Texas Chicken or bring the crunch to your door. Menus, prices and hours vary by market.",
  ctaPrimary: "Find your market",
  ctaSecondary: "Franchise with us",
  video: "/assets/home/hero-reference.mp4",
  poster: "/assets/home/hero-reference-poster.webp",
};

/* --------------------------------------------------------------------------
 * Home-only extra sections (added in the supercharge round)
 * ------------------------------------------------------------------------ */
export const discover = {
  eyebrow: "Discover Texas",
  heading: "More than a meal. A whole lot of Texas.",
  words: ["CRUNCH", "HAND-BATTERED", "SINCE 1952", "HONEY BUTTER", "BOLD FLAVOR", "FRIED FRESH"],
};

export const menuCategories = {
  eyebrow: "Explore the menu",
  heading: "Pick your crunch.",
  body: "From bone-in buckets to loaded sandwiches — every category is built on the same hand-battered craft.",
  items: [
    { title: "Combos", tag: "Meals for one", image: "/assets/categories/combo.jpg", href: "/menu" },
    { title: "Sharing", tag: "Wraps & more", image: "/assets/categories/sharing.jpg", href: "/menu" },
    { title: "Buckets", tag: "Family feasts", image: "/assets/categories/bucket.jpg", href: "/menu" },
    { title: "Desserts", tag: "Sweet finish", image: "/assets/categories/dessert.jpg", href: "/menu" },
  ],
};

export const downloadApp = {
  eyebrow: "Texas Chicken App",
  heading: "Skip the line. Stack the rewards.",
  body: "Order ahead, unlock members-only deals and earn a free crunch on us. Your next honey-butter biscuit is one tap away.",
  points: ["Order ahead & pay in-app", "Exclusive app-only deals", "Earn & redeem rewards", "Track your favourites"],
  image: "/assets/home-tray.png",
};

/* --------------------------------------------------------------------------
 * HOME — mockup layout (1952 hero, standards, CEO, new-at, world map)
 * ------------------------------------------------------------------------ */
export const homeHero = {
  pre: "Story begins in",
  year: "1952",
  video: "/assets/home/story-hero.mp4",
};

export const builtStandards = {
  heading: ["Built on", "Texas Standards"],
  body: [
    "Our standards are what make the difference.",
    "Every piece of chicken is prepared in small batches to deliver the texture and crunch people know us for. It is not rushed, and it is never treated as routine.",
    "From the first bite to the last, the experience is built on care, attention, and doing things properly. That is how we protect the flavor, and why people keep coming back.",
  ],
  image: "/assets/home/tray-standards.png",
};

export const ceoMessage = {
  heading: ["Message", "from our CEO"],
  body: [
    "Our standards are what make the difference.",
    "Every piece of chicken is prepared in small batches to deliver the texture and crunch people know us for. It is not rushed, and it is never treated as routine.",
    "From the first bite to the last, the experience is built on care, attention, and doing things properly. That is how we protect the flavor, and why people keep coming back.",
  ],
  name: "Roland Gonzalez",
  image: "/assets/home/ceo-quote.png",
};

export const newAtTexas = {
  heading: ["New at", "Texas Chicken"],
  body: "We're always bringing new bold flavors. Discover our latest limited-time offers and meals, that bring the crunch like only Texas Chicken™ can.",
  items: [
    { title: "Honey Sriracha", tag: "Sweet heat", image: "/assets/food-sandwich.png" },
    { title: "BBQ Sauce Stacker", tag: "Covered in BBQ", image: "/assets/banner-tenders.png" },
    { title: "The Mexicana", tag: "Spicy sandwich", image: "/assets/banner-mexicana.png" },
    { title: "Bone-In Bucket", tag: "Original & Spicy", image: "/assets/banner-bonein.png" },
    { title: "Honey-Butter Biscuits", tag: "Famous side", image: "/assets/food-biscuits.png" },
  ],
};

export const worldMap = {
  eyebrow: "Global, locally served",
  heading: "One recipe, served across the world.",
  hqLabel: "Egypt · HQ",
  hq: { x: 548, y: 232 },
  regions: [
    { name: "United States", x: 232, y: 205 },
    { name: "Saudi Arabia", x: 590, y: 246 },
    { name: "United Arab Emirates", x: 616, y: 252 },
    { name: "Jordan", x: 576, y: 224 },
    { name: "Malaysia", x: 735, y: 312 },
    { name: "Indonesia", x: 762, y: 330 },
    { name: "Vietnam", x: 742, y: 280 },
  ],
  legendActive: "Active region",
  legendHq: "Egypt HQ",
  hint: "Hover or click a pin",
};

/* --------------------------------------------------------------------------
 * MARKET page
 * ------------------------------------------------------------------------ */
export type MarketRegionId = "me" | "apac" | "eu" | "ams";
export type BrandId = "texas" | "churchs";

export type Market = {
  /** display name, exactly as the brand site lists it */
  name: string;
  /** shorter label for the map pin (falls back to `name`) */
  short?: string;
  /** extra search term (e.g. "Saudi Arabia" for KSA) */
  alias?: string;
  /** ISO-3166 alpha-2, lowercase — matches /assets/flags/<code>.svg */
  code: string;
  /** ISO-3166 alpha-3 — matches the world GeoJSON feature id (omit when the map has no polygon for it) */
  iso3?: string;
  region: MarketRegionId;
  brand: BrandId;
  /** the market's own website */
  url: string;
  /** label anchor / marker position */
  lon: number;
  lat: number;
  /** nudge the map label in screen px so neighbours don't collide */
  dx?: number;
  dy?: number;
  /** where it all began — styled apart on the map */
  home?: boolean;
};

export const marketPage = {
  hero: {
    eyebrow: "Global, locally served",
    title: ["Find", "your market."],
    subtitle:
      "Two names, one recipe: Texas Chicken across the Middle East, Asia-Pacific and Europe, Church's Texas Chicken across the Americas. Pick a region on the map — or find your country in the list below.",
  },
  brands: [
    {
      id: "texas" as const,
      name: "Texas Chicken",
      short: "Texas Chicken",
      blurb: "The international brand — Middle East, Asia-Pacific and Europe.",
    },
    {
      id: "churchs" as const,
      name: "Church's Texas Chicken",
      short: "Church's",
      blurb: "The original name, still served across the Americas and the Caribbean.",
    },
  ],
  explorer: {
    eyebrow: "Where we serve",
    heading: "Pick your region.",
    body: "Every highlighted country is a market hand-battering chicken the exact same way we do in Texas.",
    allBrands: "Both brands",
    allLabel: "All markets",
    allName: "Around the world",
    allBlurb:
      "From the Gulf to South East Asia, Europe to the Caribbean — one recipe, hand-battered fresh in every kitchen. Choose a region to zoom in.",
    selectedLabel: "Selected region",
    selectedMarket: "Selected market",
    hint: "Tap a country to see it up close",
    seeAll: "See every country",
    visit: "Visit the site",
  },
  finder: {
    eyebrow: "Find your country",
    heading: "Find your country.",
    body: "Search by country, region or brand to visit the Texas Chicken market closest to you.",
    searchPlaceholder: "Search by country…",
    allRegions: "All regions",
    allBrands: "All brands",
    showOnMap: "Show on map",
    empty: "No market matches that search — but new markets open every year.",
  },
  regions: [
    {
      id: "me" as const,
      name: "Middle East",
      short: "Middle East",
      blurb:
        "Our busiest region — drive-thrus, malls and delivery kitchens serving the crunch from Casablanca and Cairo to Riyadh, Baghdad and Muscat.",
    },
    {
      id: "apac" as const,
      name: "Asia-Pacific",
      short: "Asia-Pacific",
      blurb:
        "Where the Texas crunch meets bold local flavour, from Kuala Lumpur and Jakarta to Phnom Penh, Ho Chi Minh City and Auckland.",
    },
    {
      id: "eu" as const,
      name: "Europe",
      short: "Europe",
      blurb:
        "Our newest frontier — the first European and Caucasus kitchens bringing hand-battered Texas chicken to a whole new audience.",
    },
    {
      id: "ams" as const,
      name: "Americas",
      short: "Americas",
      blurb:
        "Church's Texas Chicken country. It started in San Antonio, Texas, and spread north to Canada, south to Honduras and across the Caribbean.",
    },
  ],
  /** Every market listed on texaschicken.com + churchstexaschicken.com, with its own site. */
  markets: [
    /* ---------------------------- Middle East ---------------------------- */
    { name: "Egypt", code: "eg", iso3: "EGY", region: "me", brand: "texas", url: "https://egypt.texaschicken.com", lon: 29.5, lat: 26.8 },
    { name: "Morocco", code: "ma", iso3: "MAR", region: "me", brand: "texas", url: "https://morocco.texaschicken.com", lon: -6.9, lat: 31.8, dx: -10 },
    { name: "KSA", alias: "Saudi Arabia", code: "sa", iso3: "SAU", region: "me", brand: "texas", url: "https://ksa.texaschicken.com/", lon: 45, lat: 23.5 },
    { name: "United Arab Emirates", short: "UAE", code: "ae", iso3: "ARE", region: "me", brand: "texas", url: "https://uae.texaschicken.com/", lon: 54.6, lat: 23.9, dx: 18, dy: 36 },
    { name: "Qatar", code: "qa", iso3: "QAT", region: "me", brand: "texas", url: "https://qatar.texaschicken.com/", lon: 51.2, lat: 25.3, dx: 32, dy: -8 },
    { name: "Bahrain", code: "bh", region: "me", brand: "texas", url: "https://bahrain.texaschicken.com", lon: 50.55, lat: 26.05, dx: -34, dy: -14 },
    { name: "Oman", code: "om", iso3: "OMN", region: "me", brand: "texas", url: "https://oman.texaschicken.com/", lon: 56.7, lat: 21.2, dx: 30, dy: 2 },
    { name: "Iraq", code: "iq", iso3: "IRQ", region: "me", brand: "texas", url: "https://iraq.texaschicken.com/", lon: 43.7, lat: 33.2 },
    /* --------------------------- Asia-Pacific ---------------------------- */
    { name: "Malaysia", code: "my", iso3: "MYS", region: "apac", brand: "texas", url: "https://malaysia.texaschicken.com/", lon: 102.2, lat: 4.2, dx: -26, dy: -6 },
    { name: "Singapore", code: "sg", region: "apac", brand: "texas", url: "https://sg.texaschicken.com/", lon: 103.85, lat: 1.35, dx: 34, dy: 12 },
    { name: "Indonesia", code: "id", iso3: "IDN", region: "apac", brand: "texas", url: "https://indonesia.texaschicken.com/", lon: 110, lat: -5.5, dy: 14 },
    { name: "Vietnam", code: "vn", iso3: "VNM", region: "apac", brand: "texas", url: "https://vietnam.texaschicken.com/", lon: 107.5, lat: 15.5, dx: 30 },
    { name: "Cambodia", code: "kh", iso3: "KHM", region: "apac", brand: "texas", url: "https://cambodia.texaschicken.com/", lon: 104.9, lat: 12.3, dy: 20 },
    { name: "Laos", code: "la", iso3: "LAO", region: "apac", brand: "texas", url: "https://laos.texaschicken.com/", lon: 103.4, lat: 19.6, dx: 2, dy: -16 },
    { name: "New Zealand", code: "nz", iso3: "NZL", region: "apac", brand: "texas", url: "https://nz.texaschicken.com/", lon: 172.5, lat: -41.5, dx: -8, dy: 22 },
    /* ------------------------------ Europe ------------------------------- */
    { name: "Germany", code: "de", iso3: "DEU", region: "eu", brand: "texas", url: "https://germany.texaschicken.com", lon: 10.4, lat: 51.2 },
    { name: "Georgia", code: "ge", iso3: "GEO", region: "eu", brand: "texas", url: "https://georgia.texaschicken.com", lon: 43.4, lat: 42.3, dx: -14, dy: -18 },
    { name: "Azerbaijan", code: "az", iso3: "AZE", region: "eu", brand: "texas", url: "https://azerbaijan.texaschicken.com", lon: 47.8, lat: 40.4, dx: 34, dy: 12 },
    /* ----------------------------- Americas ------------------------------ */
    { name: "United States", short: "USA", code: "us", iso3: "USA", region: "ams", brand: "churchs", url: "https://churchstexaschicken.com/", lon: -98.5, lat: 39.5, home: true },
    { name: "Canada", code: "ca", iso3: "CAN", region: "ams", brand: "churchs", url: "https://canada.churchstexaschicken.com/", lon: -100, lat: 57 },
    { name: "Mexico", code: "mx", iso3: "MEX", region: "ams", brand: "churchs", url: "https://churchs.com.mx/", lon: -102.5, lat: 23.5, dx: -18, dy: 6 },
    { name: "Honduras", code: "hn", iso3: "HND", region: "ams", brand: "churchs", url: "https://churchshonduras.hn/", lon: -86.7, lat: 14.8, dx: -26, dy: 16 },
    { name: "Jamaica", code: "jm", iso3: "JAM", region: "ams", brand: "churchs", url: "https://jamaica.churchstexaschicken.com/", lon: -77.3, lat: 18.1, dx: -46, dy: 4 },
    { name: "Puerto Rico", code: "pr", iso3: "PRI", region: "ams", brand: "churchs", url: "https://www.churchspr.com/", lon: -66.4, lat: 18.2, dx: -6, dy: 30 },
    { name: "Virgin Islands", code: "vi", region: "ams", brand: "churchs", url: "https://virginislands.churchstexaschicken.com/", lon: -64.7, lat: 18.3, dx: 78, dy: 8 },
    { name: "St. Kitts", code: "kn", region: "ams", brand: "churchs", url: "https://stkitts.churchstexaschicken.com/", lon: -62.75, lat: 17.3, dx: 62, dy: -30 },
    { name: "St. Lucia", code: "lc", region: "ams", brand: "churchs", url: "https://stlucia.churchstexaschicken.com", lon: -60.98, lat: 13.9, dx: 56, dy: 4 },
    { name: "Trinidad & Tobago", code: "tt", iso3: "TTO", region: "ams", brand: "churchs", url: "https://tt.churchstexaschicken.com/", lon: -61.2, lat: 10.5, dx: 74, dy: 24 },
    { name: "Guyana", code: "gy", iso3: "GUY", region: "ams", brand: "churchs", url: "https://guyana.churchstexaschicken.com", lon: -58.9, lat: 5, dx: 26, dy: 16 },
  ] as Market[],
};

/* --------------------------------------------------------------------------
 * MENU page
 * ------------------------------------------------------------------------ */
export const menuPage = {
  hero: {
    eyebrow: "The full line-up",
    title: ["The", "menu."],
    subtitle: "Hand-battered, fried fresh, built bold. Explore every category — then find your nearest restaurant to order.",
  },
  categories: [
    { id: "star-box", title: "Star Box Combos", tag: "Loaded boxes", image: "/assets/menu-cats/categorie-1.png" },
    { id: "chicken-combos", title: "Chicken Combos", tag: "The signature crunch", image: "/assets/menu-cats/categorie-2.png" },
    { id: "tex-deals", title: "Tex Deals", tag: "Best value", image: "/assets/menu-cats/categorie-3.png" },
    { id: "burger-wraps", title: "Burger & Wraps Combo", tag: "Handhelds", image: "/assets/menu-cats/categorie-4.png" },
    { id: "family-friends", title: "Family & Friends Combo", tag: "Made for sharing", image: "/assets/menu-cats/categorie-5.png" },
    { id: "desserts", title: "Desserts", tag: "Sweet finish", image: "/assets/menu-cats/categorie-6.png" },
    { id: "snacks-sides", title: "Snacks & Sides", tag: "Perfect add-ons", image: "/assets/menu-cats/categorie-7.png" },
  ],
  /**
   * The first three use /assets/menu/* — product-only crops of the wide
   * banner-* artwork, whose baked-in headline and body copy sat on the left
   * and got sliced in half by the card's 4:3 frame. Originals are untouched.
   */
  signatures: [
    { title: "Bone-In Chicken", tag: "Original & Spicy", desc: "Marinated 12 hours, hand-battered, fried to a golden crisp.", image: "/assets/menu/bone-in-chicken.png", cals: "260 cal / pc" },
    { title: "Crunchy Tenders", tag: "Crunchy classic", desc: "Whole-muscle tenders in our signature crunchy coating.", image: "/assets/menu/crunchy-tenders.png", cals: "180 cal / pc" },
    { title: "The Mexicana", tag: "Spicy sandwich", desc: "Spicy fillet, American cheese, tortilla chips, sesame bun.", image: "/assets/menu/the-mexicana.png", cals: "690 cal" },
    { title: "Honey-Butter Biscuits", tag: "The famous side", desc: "Flaky, buttery, glazed with real honey.", image: "/assets/food-biscuits.png", cals: "300 cal" },
    { title: "The Full Tray", tag: "Combo", desc: "Chicken, fries, slaw, biscuit and a drink.", image: "/assets/home-tray.png", cals: "1200 cal" },
    { title: "Classic Sandwich", tag: "Fan favourite", desc: "Hand-breaded fillet, pickles, mayo, toasted bun.", image: "/assets/food-sandwich.png", cals: "560 cal" },
  ],
  note: "Nutrition and availability vary by market. Values shown are indicative.",
};

/* --------------------------------------------------------------------------
 * STORY page
 * ------------------------------------------------------------------------ */
export const storyPage = {
  hero: {
    eyebrow: "Since 1952",
    title: ["Across from", "the Alamo."],
    subtitle: "One stand. One recipe. One promise — hand-battered, fried fresh, every single time. This is how a San Antonio chicken stand became a taste the world drives across town for.",
  },
  heritage: {
    eyebrow: "Heritage & founding",
    heading: "It started across from the Alamo.",
    body: [
      "In 1952, George W. Church opened his first Church's Fried Chicken To-Go stand across the street from the Alamo in San Antonio, Texas. He was 65. No seating, no frills — just chicken marinated and hand-battered to order, fried until the coating shattered.",
      "That obsession with craft is the only thing we've never changed. Seventy-two years later, the same uncompromising recipe travels the world — still made by hand, still fried fresh, one restaurant at a time.",
    ],
    image: "/assets/story/heritage-chicken.jpg",
    place: "San Antonio, TX · 1952",
  },
  evolution: {
    eyebrow: "Brand evolution",
    heading: "One recipe. Two names. One crunch.",
    body: "Born as Church's in San Antonio and known as Texas Chicken across most of the world, the dual brand carries a single hand-battered heritage under one badge — Church's Texas Chicken.",
    logos: [
      { src: "/assets/logo-churchs-badge.svg", label: "Church's · The Americas" },
      { src: "/assets/logo-dual-badge.svg", label: "Texas Chicken · Worldwide" },
    ],
  },
  leadership: {
    eyebrow: "Leadership team",
    heading: "Operators first. Brand-builders always.",
    body: "Seventy-two years of craft doesn't run itself. Meet the leaders steering Texas Chicken across 23 markets — and keeping every piece hand-battered.",
    cta: "Meet the leadership",
    ctaHref: "/our-story/leadership",
  },
  numbers: {
    eyebrow: "By the numbers",
    heading: "Seventy-two years, and counting.",
    stats: [
      { value: 72, label: "Years of craft", suffix: "yrs" },
      { value: 1500, label: "Restaurants worldwide", suffix: "+" },
      { value: 23, label: "Global markets", suffix: "" },
      { value: 40000, label: "Team members", suffix: "+" },
    ],
  },
  missionVision: {
    items: [
      {
        titleImage: "/assets/story/mission-title.webp",
        alt: "Our Mission",
        body: "To serve authentic, bold, fresh fried chicken prepared in small batches, guided by clear standards, real kitchen discipline, and consistent execution that guests can trust in every market we serve.",
      },
      {
        titleImage: "/assets/story/vision-title.webp",
        alt: "Our Vision",
        body: "To lead the fried chicken category as the most culturally magnetic Texas brand, built on strong standards, real preparation, and consistent experiences people choose and return to across all markets.",
      },
    ],
  },
  awards: {
    eyebrow: "Awards & recognition",
    heading: "Recognised for the crunch.",
    items: [
      { src: "/assets/badge-ifa-foty.svg", title: "Franchisee of the Year", org: "IFA" },
      { src: "/assets/badge-franchise-times.svg", title: "Top Global Franchise", org: "Franchise Times" },
      { src: "/assets/badge-ifa-member.svg", title: "Member in good standing", org: "IFA" },
    ],
  },
  timeline: [
    { year: "1952", title: "The first stand", desc: "George W. Church opens across from the Alamo in San Antonio. Two pieces, a roll and jalapeños." },
    { year: "1962", title: "Ten years, a following", desc: "A cult crunch. Locals line up daily; the hand-battered method becomes gospel." },
    { year: "1970s", title: "Texas goes national", desc: "The recipe spreads across the United States, one freshly-fried restaurant at a time." },
    { year: "1990s", title: "Crossing oceans", desc: "The brand travels internationally as Texas Chicken, carrying the same coating worldwide." },
    { year: "2000s", title: "Around the world", desc: "MENA, Southeast Asia and the Pacific fall for the Texas crunch." },
    { year: "Today", title: "23 markets, one craft", desc: "1,500+ restaurants. Still hand-battered. Still fried fresh. Still bold." },
  ],
  values: [
    { title: "Hand-crafted", desc: "If a machine could do it, it wouldn't be us. Every piece is battered by hand." },
    { title: "Fresh, never held", desc: "Fried to order in-restaurant. We'd rather you wait than serve you yesterday." },
    { title: "Boldly Texan", desc: "Big flavor, big hospitality, no apologies. That's the San Antonio spirit." },
    { title: "One recipe, everywhere", desc: "Riyadh or San Antonio — the crunch is identical. That's the whole point." },
  ],
};

/* --------------------------------------------------------------------------
 * COMMUNITY page
 * ------------------------------------------------------------------------ */
export const communityPage = {
  hero: {
    eyebrow: "Bigger than chicken",
    title: ["Good crunch,", "good neighbours."],
    subtitle: "We've fed a lot of people over 70 years — and we take feeding communities seriously. Here's how Texas Chicken shows up beyond the counter.",
  },
  pillars: [
    { title: "Feeding communities", desc: "Meal donations and partnerships with local food banks in every market we serve.", stat: "2M+", statLabel: "Meals shared" },
    { title: "Local jobs", desc: "Restaurants run by local teams, offering first jobs and real career paths.", stat: "40K+", statLabel: "Team members" },
    { title: "Halal & trusted", desc: "Certified halal across our MENA and APAC markets — food everyone can share.", stat: "100%", statLabel: "Halal in-region" },
    { title: "Youth & sport", desc: "Backing grassroots sport and youth programs where our restaurants call home.", stat: "150+", statLabel: "Programs backed" },
  ],
  initiatives: [
    { title: "Ramadan Iftar drives", desc: "Every year we serve thousands of iftar meals to families and workers across the region.", image: "/assets/food-crispy-chicken.png" },
    { title: "Team Texas academy", desc: "In-restaurant training that turns first jobs into hospitality careers.", image: "/assets/home-ceo.png" },
    { title: "Neighbourhood clean-ups", desc: "Local crews giving back to the streets our restaurants sit on.", image: "/assets/food-sandwich.png" },
  ],
};

/* --------------------------------------------------------------------------
 * NEWS page
 * ------------------------------------------------------------------------ */
export const newsPage = {
  hero: {
    eyebrow: "Newsroom",
    title: ["What's new", "at Texas."],
    subtitle:
      "Press releases from the Texas Chicken® and Church's Texas Chicken® press room — new markets, new partners, new milestones.",
  },
  /** Where every release below comes from. */
  source: {
    label: "franchise.texaschicken.com/PressRoom",
    href: "https://franchise.texaschicken.com/PressRoom",
  },
  /** Filter chips — "All" is prepended by the page. */
  categories: ["Expansion", "Awards", "Partnerships", "Milestones", "Brand"],
  featured: {
    tag: "Since 1952",
    category: "Heritage",
    title: "It started across from the Alamo.",
    excerpt:
      "In 1952, George W. Church Sr. opened a single walk-up stand across the street from the Alamo in San Antonio — one recipe, hand-battered and fried fresh all day long.",
    date: "San Antonio, Texas",
    image: "/assets/food-crispy-chicken.png",
    href: "/our-story",
    cta: "Read our story",
  },
  articles: [
    {
      title: "Texas Chicken™ franchisee for Malaysia, Dato' Jaya Tan, named IFA Franchisee of the Year",
      category: "Awards",
      date: "March 1, 2023",
      excerpt:
        "The International Franchise Association handed its top franchisee honour to Texas Chicken™ Malaysia for community engagement and innovation, from plant-based menu additions to staff training.",
      image: "/assets/news/ifa-franchisee-of-the-year.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TexasChickenFranchiseeforMalaysiaDatoJayaTanNamedIFAFranchiseeoftheYear",
    },
    {
      title: "Church's Texas Chicken® and Texas Chicken™ reflect on a successful 2022 as they look toward 2023",
      category: "Milestones",
      date: "January 30, 2023",
      excerpt:
        "Seventy-five new international restaurants opened in 2022, alongside decade milestones in Malaysia and Vietnam and the debut of the Texas Chicken Express™ format in Thailand.",
      image: "/assets/news/reflect-2022-growth-2023.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/ChurchsTexasChickenandTexasChickenReflectonaSuccessful2022asTheyLookTowardContinuedGrowthin2023",
    },
    {
      title: "Church's Texas Chicken® ranks in the Franchise Times Top 500 among the largest U.S.-based franchise systems",
      category: "Awards",
      date: "November 14, 2022",
      excerpt:
        "The brand landed at No. 87 on the Franchise Times Top 500 — a ranking of the largest U.S.-based franchise systems, and a marker of momentum at home and abroad.",
      image: "/assets/news/franchise-times-top-500.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/ChurchsTexasChickenRanksintheFranchiseTimesTop500AmongtheLargestUSBasedFranchiseSystems",
    },
    {
      title: "Texas Chicken's new restaurant design propels international expansion",
      category: "Brand",
      date: "October 27, 2022",
      excerpt:
        "The refreshed restaurant design — bolder signage, dedicated delivery pickup and charging stations — anchors the development of 20 new restaurants in New Zealand.",
      image: "/assets/news/new-restaurant-design.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TexasChickensNewRestaurantDesignPropelsInternationalExpansion",
    },
    {
      title: "Texas Chicken™ signs expansion agreement with New Zealand franchisee",
      category: "Expansion",
      date: "August 22, 2022",
      excerpt:
        "Good Taste Co Pty Limited will open 20 additional restaurants across New Zealand from 2023, building on the five locations the franchisee already runs.",
      image: "/assets/news/new-zealand-expansion.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TexasChickenSignsExpansionAgreementwithNewZealandFranchiseeasPartofContinuedInternationalGrowth",
    },
    {
      title: "Take me to Church",
      category: "Brand",
      date: "August 7, 2022",
      excerpt:
        "Church's Texas Chicken is the international sister brand of Church's Chicken, named to carry its Texas origins abroad — with 61 Canadian sites planned for the year.",
      image: "/assets/news/take-me-to-church.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TAKEMETOCHURCH",
    },
    {
      title: "Church's Texas Chicken™ has bold plans for Canada",
      category: "Expansion",
      date: "June 22, 2022",
      excerpt:
        "With more than 50 Canadian restaurants trading, the brand set out to double that count inside a year — recruiting franchisees who share its standards.",
      image: "/assets/news/bold-plans-canada.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/CHURCHSTEXASCHICKENHASBOLDPLANSFORCANADA",
    },
    {
      title: "Texas Chicken™ Malaysia earns Silver Putra Brand Award for second consecutive year",
      category: "Awards",
      date: "March 30, 2022",
      excerpt:
        "Consumers voted the brand Silver in the Restaurant & Fast Foods category for a second year running, recognising consistent service across 85 Malaysian restaurants.",
      image: "/assets/news/ifa-franchisee-of-the-year.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TexasChickenMalaysiaEarnsSilverPutraBrandAwardforSecondConsecutiveYear",
    },
    {
      title: "Take me to Church — Church's Chicken™ is taking Canada by storm",
      category: "Expansion",
      date: "March 28, 2022",
      excerpt:
        "Forty-seven Canadian restaurants trading and 61 more sites lined up for 2022, with franchisee recruitment focused on Manitoba and the Maritime provinces.",
      image: "/assets/news/canada-by-storm.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TAKEMETOCHURCHCHURCHSCHICKENISTAKINGCANADABYSTORM",
    },
    {
      title: "Envictus International Holdings Ltd renews its franchise rights for Texas Chicken™ Malaysia",
      category: "Partnerships",
      date: "March 5, 2022",
      excerpt:
        "The group that opened Malaysia's first Texas Chicken™ in 2013 committed RM230 million to 115 new restaurants, targeting a 200-strong estate by 2030.",
      image: "/assets/news/envictus-malaysia.webp",
      href: "https://franchise.texaschicken.com/PressRoom/ENVICTUSINTERNATIONALHOLDINGSLTDRENEWSITSFRANCHISERIGHTSTODEVELOPANDOPERATETEXASCHICKENMALAYSIA",
    },
    {
      title: "Stepping up global expansion in 2022 with an estimated 100 new restaurants",
      category: "Expansion",
      date: "February 28, 2022",
      excerpt:
        "Roughly 100 openings were slated across the Americas, the Middle East and Asia, with Ignacio Barbadillo appointed Director of International New Business Development.",
      image: "/assets/news/global-expansion-2022.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TexasChickenTMandChurchsTexasChickenStepUpGlobalExpansionin2022withanEstimated100NewRestaurantsSettoOpenThroughouttheAmericastheMiddleEastandAsia",
    },
    {
      title: "Texas Chicken™ welcomes fifth new restaurant in Cambodia",
      category: "Expansion",
      date: "November 9, 2021",
      excerpt:
        "The fifth Cambodian restaurant opened in Phnom Penh under an exclusive franchise agreement with TH F&B Co. Ltd, deepening the brand's Asia-Pacific footprint.",
      image: "/assets/news/cambodia-fifth-restaurant.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/TEXASCHICKENWELCOMESFIFTHNEWRESTAURANTINCAMBODIA",
    },
    {
      title: "Continuing a long-standing commitment in Canada with 40 more restaurants in 2022",
      category: "Expansion",
      date: "November 3, 2021",
      excerpt:
        "Trading in Canada since 1978, the brand committed to 40 further openings plus a reimaging programme across its existing Canadian restaurants.",
      image: "/assets/news/canada-40-restaurants.jpg",
      href: "https://franchise.texaschicken.com/PressRoom/CHURCHSTEXASCHICKENCONTINUINGLONGSTANDINGCOMMITMENTINCANADAPLANSTOOPEN40MORERESTAURANTSIN2022",
    },
    {
      title: "Church's Texas Chicken™ opens its 100th restaurant in Mexico",
      category: "Milestones",
      date: "July 21, 2021",
      excerpt:
        "With franchise partner Grupo GES, the brand opened its 100th Mexican location in Ciudad del Carmen, Campeche — a free-standing restaurant with new ordering technology.",
      image: "/assets/news/mexico-100th-restaurant.jpeg",
      href: "https://franchise.texaschicken.com/PressRoom/CHURCHSTEXASCHICKENOPENSITS100THRESTAURANTINMEXICO",
    },
  ],
};

/* --------------------------------------------------------------------------
 * FRANCHISING page
 * ------------------------------------------------------------------------ */
export const franchisePage = {
  hero: {
    eyebrow: "Franchise with us",
    title: ["Own a piece", "of the crunch."],
  },
  /** Headline proof — every figure is stated on franchise.texaschicken.com. */
  proof: [
    { value: 1500, label: "Restaurants worldwide", suffix: "+" },
    { value: 24, label: "Countries trading", suffix: "" },
    { value: 20, label: "New markets planned", suffix: "+" },
    { value: 72, label: "Years of brand equity", suffix: "yrs" },
  ],
  credentials: [
    "Member of the International Franchise Association",
    "No. 64 in the 2023 Franchise Times Top 400",
  ],

  /** The four source pages, folded into one tabbed dossier. */
  tabs: [
    { id: "why-us", label: "Why us", blurb: "The brand and the proof" },
    { id: "opportunities", label: "Opportunities", blurb: "Where we're looking" },
    { id: "investment", label: "Investment", blurb: "Terms and costs" },
    { id: "resources", label: "Support", blurb: "What you get from us" },
  ],

  whyUs: {
    heading: "Munch into the crunch.",
    body: [
      "One recipe, hand-battered and fried fresh, has carried this brand from a single San Antonio stand to restaurants on four continents. It travels because the product is genuinely craveable and the operating model is proven.",
      "Two names, one kitchen: Texas Chicken across the Middle East, Asia-Pacific and Europe; Church's Texas Chicken across the Americas and the Caribbean.",
    ],
    /** Recent openings named on the Why Us page. */
    openings: [
      "Texas Chicken™ Qatar",
      "Texas Chicken™ UAE — Garhoud",
      "Texas Chicken™ UAE — Dubai Mall",
      "Texas Chicken™ UAE — JBR",
      "Church's Texas Chicken® — Mexico",
    ],
  },

  opportunities: {
    heading: "Identify an international territory near you.",
    body: "Every country highlighted on the map below is still open — we have no restaurants there yet. We are considering inquiries for these markets, but circumstances may affect whether we proceed with the application and approval process.",
    usNote:
      "Opportunities inside the United States are handled separately by Church's Texas Chicken®.",
    /** US franchising lives on its own site, not on texaschicken.com */
    usUrl: "https://churchschickenfranchise.com/",
    usCta: "Church's US franchising",
    map: {
      allLabel: "Everywhere",
      openLabel: "Open territory",
      servedLabel: "Already serving",
      usLabel: "United States — Church's",
      /** short form, for the search dropdown's right-hand tag */
      usTag: "Church's",
      clear: "Clear search",
      hint: "Tap a highlighted country to start an enquiry",
      openBody: "No Texas Chicken restaurants here yet — this territory is open for development.",
      servedBody: "We already operate in this market. Visit the local site to see the menu and restaurants.",
      visit: "Visit the site",
      enquire: "Enquire about this territory",
      oneOpen: "open territory",
      manyOpen: "open territories",
      searchPlaceholder: "Search for your country…",
      empty: "No country matches that search — try another spelling, or clear the filters.",
    },
  },

  investment: {
    profileHeading: "The partner we're looking for",
    profile: [
      { title: "Food service or retail experience", desc: "You have run customer-facing operations before, at scale." },
      { title: "Multi-unit portfolio company", desc: "You are set up to develop and operate more than one restaurant." },
      { title: "Proven real-estate track record", desc: "A history of securing high-quality sites in your market." },
      { title: "Shared values", desc: "The same standards for product, people and hospitality that we hold." },
    ],
    termsHeading: "Commercial terms",
    terms: [
      { label: "Up-front development fee", value: "US$10,000", note: "per restaurant" },
      { label: "Franchise fee", value: "US$20,000", note: "per restaurant" },
      { label: "Initial term", value: "10 years", note: "" },
      { label: "Royalty", value: "5%", note: "of gross sales" },
      { label: "Brand fund", value: "1%", note: "of gross sales" },
      { label: "Local marketing", value: "4%", note: "minimum spend" },
    ],
    /** The three build models the investment chart is broken down by. */
    models: [
      { id: "low" as const, name: "Non drive-thru", tier: "Low end", total: 525000 },
      { id: "avg" as const, name: "Non drive-thru", tier: "Average", total: 686000 },
      { id: "high" as const, name: "Large venue / drive-thru", tier: "High end", total: 1295400 },
    ],
    /** Full line-by-line chart. `null` = not applicable to that model. */
    lines: [
      { label: "Development fee per restaurant", low: 10000, avg: 10000, high: 10000 },
      { label: "Initial franchise fee (10-year term)", low: 20000, avg: 20000, high: 20000 },
      { label: "Kitchen plans and architectural", low: 10000, avg: 20000, high: 25000 },
      { label: "Professional services, permits & licensing", low: 1000, avg: 3000, high: 5000 },
      { label: "Security deposits", low: 5000, avg: 5000, high: 5000 },
      { label: "Leasehold improvements", low: 312000, avg: 375000, high: 565000 },
      { label: "Site improvements", low: null, avg: null, high: 275000 },
      { label: "Furniture, decor, equipment and smallwares", low: 85000, avg: 125000, high: 215000 },
      { label: "Signage", low: 15000, avg: 25000, high: 35000 },
      { label: "Menu boards", low: 3000, avg: 5000, high: 30000 },
      { label: "POS system", low: 15000, avg: 15000, high: 20400 },
      { label: "Management training", low: 12000, avg: 15000, high: 15000 },
      { label: "Opening inventory", low: 5000, avg: 10000, high: 12000 },
      { label: "Restaurant / launch marketing plan", low: 10000, avg: 20000, high: 20000 },
      { label: "Pre-opening mock operations", low: 10000, avg: 15000, high: 20000 },
      { label: "Insurance (3 months)", low: 2000, avg: 3000, high: 3000 },
      { label: "Additional funds (3 months)", low: 10000, avg: 20000, high: 20000 },
    ],
    disclaimer:
      "Totals exclude real-estate purchase and lease costs. Your investment requirements may vary and could be lower or higher depending on the country and the supply chain for certain items.",
  },

  resources: {
    heading: "How does Texas Chicken support you?",
    body: "Every franchisee gets a dedicated Regional Franchise Manager and four teams standing behind the restaurant.",
    pillars: [
      {
        id: "real-estate",
        title: "Real estate & construction",
        summary: "From territory planning to the day the signage goes up.",
        groups: [
          {
            title: "Market planning",
            items: [
              "Establishing territories and trade areas",
              "Working with brokers to locate high-potential sites",
              "Helping you identify quality locations",
            ],
          },
          {
            title: "Site approval",
            items: ["Site visits", "Site acceptance requests", "Committee decision-making"],
          },
          {
            title: "Design and construction",
            items: [
              "Full design and construction support throughout",
              "Restaurant layout planning",
              "Signage and brand elements",
              "Equipment and smallwares",
            ],
          },
        ],
      },
      {
        id: "operations",
        title: "Training & operations",
        summary:
          "A dedicated Regional Franchise Manager covering development, training, budgeting, accounting, customer service, facilities and marketing.",
        groups: [
          {
            title: "Programmes",
            items: [
              "Strategic business planning",
              "MIT training — a five-week mandatory course for owners and two managers",
              "System initiatives",
              "Cascade training",
              "Executing in-restaurant and local store marketing activities",
            ],
          },
        ],
      },
      {
        id: "marketing",
        title: "Marketing",
        summary: "Market entry, launch and the calendar that follows.",
        groups: [
          {
            title: "Entry & launch",
            items: [
              "Strategic market entry planning with competitive assessment",
              "Brand tracker and market data to inform decisions",
              "Grand opening support with comprehensive asset kits",
            ],
          },
          {
            title: "Ongoing",
            items: [
              "Brand-initiated campaigns and product innovation",
              "Digital channels — mobile app and online ordering",
              "Annual market planning",
              "Social media platform support",
            ],
          },
        ],
      },
      {
        id: "supply-chain",
        title: "Supply chain",
        summary:
          "Quality assurance and supply chain teams make sure food, packaging, equipment and distribution meet the standard — sourcing local first, then regional, then leveraging global buying power.",
        groups: [
          {
            title: "Focus areas",
            items: [
              "Core menu and ingredients",
              "Kitchen systems",
              "Distribution logistics",
              "Quality assurance systems",
            ],
          },
        ],
      },
    ],
  },

  steps: [
    { n: "01", title: "Apply", desc: "Tell us about you, your market and your experience." },
    { n: "02", title: "Discovery", desc: "We align on territory, investment and the opportunity." },
    { n: "03", title: "Development", desc: "Site, design and build with our development team." },
    { n: "04", title: "Open & grow", desc: "Train your team, open the doors, and scale the crunch." },
  ],
};

/* --------------------------------------------------------------------------
 * CONTACT page
 * ------------------------------------------------------------------------ */
export const contactPage = {
  hero: {
    eyebrow: "Get in touch",
    title: ["Let's talk."],
    subtitle: "Questions, feedback, press or partnerships — we're all ears. Reach the right team below.",
  },
  channels: [
    { title: "General enquiries", value: "hello@texaschicken.example", note: "We reply within 2 business days." },
    { title: "Franchising", value: "franchise@texaschicken.example", note: "For market & partnership opportunities." },
    { title: "Press & media", value: "press@texaschicken.example", note: "Newsroom, assets and interviews." },
    { title: "Careers", value: "careers@texaschicken.example", note: "Join a team of 40,000+." },
  ],
  hq: {
    label: "Global support office",
    lines: ["Texas Chicken International", "San Antonio, Texas, USA", "+1 (210) 555-0152"],
  },
  form: {
    heading: "Send us a message",
    subjects: ["General enquiry", "Franchising", "Feedback", "Press", "Careers"],
  },
};

/* --------------------------------------------------------------------------
 * APP page (mirrors the reference AppDataView)
 * ------------------------------------------------------------------------ */
export const appPage = {
  // Real baked banner from the reference CMS (full hero design lives in the image)
  banner: {
    image: "/assets/app-data/banner-hero.jpeg",
  },
  treat: {
    image: "/assets/app-data/treat-hero.png",
  },
  badges: {
    appStore: "/assets/app-data/badge-appstore.webp",
    googlePlay: "/assets/app-data/badge-googleplay.webp",
    appStoreHref: "https://apps.apple.com/app/idXXXXXXXXX",
    googlePlayHref: "https://play.google.com/store/apps/details?id=your.app.id",
  },
  discover: {
    heading: "Discover More with the App",
    features: [
      { title: "Reward Yourself", desc: "Earn points, redeem rewards, and keep track, all in one place", gif: "/assets/app-data/1.gif" },
      { title: "Order on the Go", desc: "Place your order for delivery or pick it up without waiting. Order ahead and collect it in no time", gif: "/assets/app-data/2.gif" },
      { title: "Send the Perfect Gift", desc: "Treat someone to the bold, legendary flavors with a gift card", gif: "/assets/app-data/3.gif" },
      { title: "Wallet", desc: "Ditch the cash and pay the easy way with our in-app wallet", gif: "/assets/app-data/4.gif" },
      { title: "Offers", desc: "Don't miss out! Get exclusive deals made just for you", gif: "/assets/app-data/5.gif" },
      { title: "Find Texas", desc: "Craving Bold Flavors? Your nearest location is just a tap away", gif: "/assets/app-data/6.gif" },
    ],
  },
  // "Find your nearest store" — mirrors the reference FindTexas section
  findUs: {
    title: "Find",
    highlight: "your nearest store",
    body: "Whether you're dining in, picking up, or ordering delivery, Texas Chicken is ready when you are. Find your nearest location and enjoy it your way.",
    cta: "Find Us",
    ctaHref: "/find-your-market",
    map: "/assets/app-data/findus-map.png",
    pins: [
      { src: "/assets/app-data/findus-pin1.png", pos: "right-[30%] top-1/2", amp: -25, dur: 6, delay: 0.8 },
      { src: "/assets/app-data/findus-pin2.png", pos: "bottom-36 right-40", amp: -18, dur: 7, delay: 0.9 },
      { src: "/assets/app-data/findus-pin3.png", pos: "right-[20%] top-32", amp: -22, dur: 8, delay: 1.0 },
    ],
  },
};

/* --------------------------------------------------------------------------
 * Layout: nav + footer
 * ------------------------------------------------------------------------ */
export const nav = {
  links: site.nav,
  topLinks: site.topNav,
  cta: site.cta.label,
  ctaHref: site.cta.href,
  logo: "/assets/logo-full-ondark.svg",
  logoLight: "/assets/logo-full-onlight.svg",
};

export const footer = {
  logo: "/images/logo-dual-badge.svg",
  blurb:
    "Hand-battered. Made fresh. Since 1952. Operated by independent franchisees across the Middle East, Asia Pacific, and beyond.",
  columns: [
    { title: "Discover Texas Chicken", links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Leadership Team", href: "/our-story/leadership" },
      // Hidden for now — uncomment to bring Community back into the footer.
      // { label: "Community", href: "/community" },
      { label: "News", href: "/news" },
    ] },
    { title: "Our Food", links: [
      { label: "Menu", href: "/menu" },
      { label: "What's New", href: "/news" },
    ] },
    { title: "Join the Family", links: [
      { label: "Franchising", href: "/franchising" },
      { label: "Careers", href: "/careers" },
    ] },
    { title: "Get the Most", links: [
      { label: "App", href: "/app" },
      { label: "Rewards", href: "/app#rewards" },
      { label: "FAQs", href: "/faqs" },
    ] },
    { title: "Find Us", links: [
      { label: "Find Your Market", href: "/find-your-market" },
      { label: "Contact Us", href: "/contact-us" },
    ] },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  social: ["facebook", "google", "star", "apple"],
};

/* --------------------------------------------------------------------------
 * LEADERSHIP page (/our-story/leadership)
 * ------------------------------------------------------------------------ */
export const leadershipPage = {
  hero: {
    eyebrow: "Leadership team",
    title: ["The people", "behind the crunch."],
    subtitle: "Seventy-two years of craft doesn't run itself. Meet the leaders steering Texas Chicken across 23 markets — and keeping every piece hand-battered.",
  },
  intro: {
    heading: "Operators first. Brand-builders always.",
    body: "Our leadership blends deep restaurant operations with global brand experience. Together they protect the recipe, support our franchisees, and grow the Texas Chicken name the right way.",
  },
  execs: [
    { name: "Roland Gonzalez", image: "/assets/leadership/exec-1.jpg", role: "Chief Executive Officer", bio: "Sets the vision for the global brand and champions the franchisee-first culture that drives results." },
    { name: "Amelia Hart", image: "/assets/leadership/exec-2.jpg", role: "Chief Operating Officer", bio: "Owns the operational playbook that keeps the crunch identical from Riyadh to San Antonio." },
    { name: "David Okafor", image: "/assets/leadership/exec-3.jpg", role: "Chief Marketing Officer", bio: "Leads the bold, Texas-proud brand voice across every market and every menu drop." },
    { name: "Priya Nair", image: "/assets/leadership/exec-4.jpg", role: "Chief Development Officer", bio: "Guides new-market entry and the franchise pipeline from first handshake to grand opening." },
    { name: "Marcus Lee", image: "/assets/leadership/exec-5.jpg", role: "Chief Financial Officer", bio: "Keeps the growth disciplined and the unit economics healthy for partners worldwide." },
    { name: "Sara Al-Mansoori", image: "/assets/leadership/exec-6.jpg", role: "VP, People & Culture", bio: "Builds the 40,000-strong team and the academies that turn first jobs into careers." },
  ],
  press: {
    heading: "Press & media",
    body: "Journalists and prospective franchisees — request bios, headshots and interviews through our media team.",
    email: "press@texaschicken.example",
  },
};

/* --------------------------------------------------------------------------
 * CAREERS page (/careers)
 * ------------------------------------------------------------------------ */
export const careersPage = {
  hero: {
    eyebrow: "Careers",
    title: ["Bring your", "boldest self."],
    subtitle: "From the fryer to the corner office, a career at Texas Chicken is built on craft, hospitality and real growth. Find your place on Team Texas.",
  },
  culture: {
    heading: "Why work with us",
    body: "We hire for heart and train for skill. Whether it's your first job or your next big move, you'll learn from people who care about doing things properly.",
    points: [
      { title: "Real career paths", desc: "Most of our restaurant leaders started behind the counter. We promote from within." },
      { title: "Learn the craft", desc: "Hands-on training through the Team Texas academy — hospitality skills that last." },
      { title: "Global opportunity", desc: "23 markets and growing. Great people travel far with us." },
      { title: "Culture that delivers", desc: "Bold brand, big hearts, high standards — and we have fun doing it." },
    ],
  },
  stats: [
    { value: 40000, label: "Team members", suffix: "+" },
    { value: 23, label: "Markets hiring", suffix: "" },
    { value: 1500, label: "Restaurants", suffix: "+" },
    { value: 72, label: "Years of craft", suffix: "yrs" },
  ],
  filters: ["All", "Restaurants", "Corporate", "Support office"],
  roles: [
    { title: "Restaurant Team Member", location: "Riyadh, KSA", type: "Restaurants", commitment: "Full-time" },
    { title: "Shift Supervisor", location: "Dubai, UAE", type: "Restaurants", commitment: "Full-time" },
    { title: "Restaurant General Manager", location: "Cairo, Egypt", type: "Restaurants", commitment: "Full-time" },
    { title: "Area Operations Manager", location: "Kuala Lumpur, MY", type: "Corporate", commitment: "Full-time" },
    { title: "Brand Marketing Lead", location: "Global · Remote", type: "Corporate", commitment: "Full-time" },
    { title: "Franchise Development Manager", location: "Singapore", type: "Corporate", commitment: "Full-time" },
    { title: "Supply Chain Analyst", location: "San Antonio, USA", type: "Support office", commitment: "Full-time" },
    { title: "People & Culture Partner", location: "Jakarta, ID", type: "Support office", commitment: "Full-time" },
  ],
};

/* --------------------------------------------------------------------------
 * FAQ page (/faqs)
 * ------------------------------------------------------------------------ */
export const faqsPage = {
  hero: {
    eyebrow: "Help centre",
    title: ["Questions?", "We've got answers."],
    subtitle: "Everything you might want to know about the brand, the food, the app and joining the family — in one place.",
  },
  groups: [
    {
      title: "About the brand",
      items: [
        { q: "Where did Texas Chicken start?", a: "In 1952, George W. Church opened his first stand across from the Alamo in San Antonio, Texas. That hand-battered, fried-fresh craft is still the heart of everything we do." },
        { q: "Are Texas Chicken and Church's the same brand?", a: "Yes — it's a dual brand. Known as Church's Texas Chicken in the Americas and Texas Chicken across most international markets, with one shared recipe and heritage." },
        { q: "How many markets are you in?", a: "We operate 1,500+ restaurants across 23 markets, run by independent franchisees in the Middle East, Asia Pacific and beyond." },
      ],
    },
    {
      title: "Menu & allergens",
      items: [
        { q: "Is your chicken really hand-battered?", a: "Every piece is marinated, hand-breaded and fried fresh in-restaurant — never pre-made or held. That's the whole point." },
        { q: "Do you have allergen and nutrition information?", a: "Yes. Allergen and nutrition details vary slightly by market and local supplier. Check your local market site or ask in-restaurant for the latest." },
        { q: "Is the food halal?", a: "Our restaurants across the MENA and APAC regions are certified halal. Certification is displayed in-restaurant and on local market sites." },
      ],
    },
    {
      title: "App & rewards",
      items: [
        { q: "What can I do in the app?", a: "Order ahead, skip the line, earn rewards on every order, save favourites for one-tap reorder, and unlock members-only deals." },
        { q: "How do rewards work?", a: "Every order stacks points you can redeem for free biscuits, sides and more. Rewards live inside the Texas Chicken app." },
        { q: "Is the app available in my market?", a: "App availability depends on your market. Use Find Your Market to check what's live near you." },
      ],
    },
    {
      title: "Franchising",
      items: [
        { q: "Can I open a Texas Chicken franchise?", a: "Yes — we're actively expanding. We look for partners with local market knowledge, operational capability and a passion for the brand." },
        { q: "What support do franchisees get?", a: "End-to-end: site selection, build-out, training, marketing and an operational playbook that keeps the crunch consistent from day one." },
        { q: "How do I apply?", a: "Head to our Franchising page and submit an inquiry. Our development team will be in touch to align on territory and investment." },
      ],
    },
    {
      title: "Careers",
      items: [
        { q: "How do I apply for a job?", a: "Browse open roles on our Careers page and apply directly. We hire across restaurants, corporate and support-office teams." },
        { q: "Do you offer training?", a: "Absolutely. The Team Texas academy turns first jobs into hospitality careers with hands-on, in-restaurant training." },
        { q: "Do you promote from within?", a: "Most of our restaurant leaders started behind the counter. Real career paths are part of the deal." },
      ],
    },
  ],
};

/* --------------------------------------------------------------------------
 * PRIVACY policy (/privacy)
 * ------------------------------------------------------------------------ */
export const privacyPage = {
  hero: {
    eyebrow: "Legal",
    title: ["Privacy", "policy."],
    subtitle: "How Texas Chicken collects, uses and protects your information across our global websites and app.",
  },
  updated: "Last updated: July 2026",
  sections: [
    { id: "overview", title: "Overview", body: ["This Privacy Policy explains how Texas Chicken International and its franchisees handle personal information collected through our global websites and app. Individual markets may operate local sites governed by additional local notices.", "By using our services you agree to the practices described here. Where local law requires, the local market notice takes precedence."] },
    { id: "collect", title: "Information we collect", body: ["We collect information you provide directly — such as your name, contact details and order history — and information collected automatically, including device data, approximate location and usage analytics.", "We do not knowingly collect personal information from children without appropriate consent."] },
    { id: "use", title: "How we use information", body: ["To process orders and rewards, personalise your experience, improve our products and services, respond to inquiries, and send you relevant offers where you've opted in.", "We never sell your personal information."] },
    { id: "cookies", title: "Cookie policy reference", body: ["Our sites use cookies and similar technologies to keep the site working, remember your preferences and measure performance. You can manage cookies through your browser settings or our on-site preference controls.", "For full detail, see the cookie notice presented when you first visit a market site."] },
    { id: "rights", title: "Your rights", body: ["Depending on your region, you may have the right to access, correct, delete or restrict the use of your personal information. To exercise these rights, contact us using the details below."] },
    { id: "contact", title: "Contact", body: ["Questions about this policy? Reach our team at privacy@texaschicken.example."] },
  ],
};

/* --------------------------------------------------------------------------
 * TERMS & conditions (/terms)
 * ------------------------------------------------------------------------ */
export const termsPage = {
  hero: {
    eyebrow: "Legal",
    title: ["Terms &", "conditions."],
    subtitle: "The terms that govern your use of Texas Chicken's global websites, app and services.",
  },
  updated: "Last updated: July 2026",
  sections: [
    { id: "acceptance", title: "Acceptance of terms", body: ["By accessing or using Texas Chicken's global websites and app, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services."] },
    { id: "use", title: "Use of the site", body: ["You may use our sites for lawful, personal, non-commercial purposes. You agree not to disrupt, reverse-engineer or misuse the site, or to use it in a way that infringes the rights of others."] },
    { id: "orders", title: "Orders & availability", body: ["Menu items, offers and pricing vary by market and are operated by independent franchisees. Availability is not guaranteed and may change without notice.", "Rewards and app features are subject to their own program terms presented in-app."] },
    { id: "ip", title: "Intellectual property", body: ["All content on our sites — text, graphics, logos and imagery — is owned by or licensed to Texas Chicken and protected by intellectual-property laws."] },
    { id: "trademark", title: "Trademark notice (dual brand)", body: ["Church's Texas Chicken®, Texas Chicken® and associated logos are registered trademarks. The brand operates under the Church's Texas Chicken name in the Americas and Texas Chicken across most international markets.", "Use of these marks without prior written permission is strictly prohibited."] },
    { id: "liability", title: "Limitation of liability", body: ["Our sites are provided \"as is\". To the fullest extent permitted by law, Texas Chicken is not liable for any indirect or consequential loss arising from your use of the site."] },
    { id: "contact", title: "Contact", body: ["Questions about these terms? Reach our team at legal@texaschicken.example."] },
  ],
};

/* --------------------------------------------------------------------------
 * SITEMAP page (/sitemap) — human-readable index of the whole site
 * ------------------------------------------------------------------------ */
export const siteMapGroups = [
  {
    title: "Brand & consumer",
    desc: "The pages guests explore most.",
    pages: [
      { name: "Homepage", href: "/", note: "Brand entry point" },
      { name: "Our Story", href: "/our-story", note: "Heritage & the dual brand" },
      { name: "Menu", href: "/menu", note: "Signature items & categories" },
      { name: "App & Rewards", href: "/app", note: "Order ahead & earn points" },
      { name: "Community", href: "/community", note: "How we show up locally" },
      { name: "News", href: "/news", note: "Press releases & brand stories" },
      { name: "Find Your Market", href: "/find-your-market", note: "Locate your local site" },
    ],
  },
  {
    title: "Business & corporate",
    desc: "For partners, press and talent.",
    pages: [
      { name: "Leadership Team", href: "/our-story/leadership", note: "Executive bios" },
      { name: "Franchising", href: "/franchising", note: "Own a piece of the crunch" },
      { name: "Careers", href: "/careers", note: "Join Team Texas" },
      { name: "Contact Us", href: "/contact-us", note: "Reach the right team" },
    ],
  },
  {
    title: "Utility & legal",
    desc: "The essentials.",
    pages: [
      { name: "FAQs", href: "/faqs", note: "Questions answered" },
      { name: "Privacy Policy", href: "/privacy", note: "How we handle your data" },
      { name: "Terms & Conditions", href: "/terms", note: "The fine print" },
      { name: "Sitemap", href: "/sitemap", note: "You are here" },
    ],
  },
];
