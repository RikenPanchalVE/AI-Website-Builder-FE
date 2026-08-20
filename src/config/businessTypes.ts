export interface BusinessTypeConfig {
  label: string;
  icon: string;
  suggestedPages: string[];
  suggestedSections: string[];
  suggestedFeatures: string[];
  suggestedComponents: Record<string, string>;
  colorSchemes: Array<{ primary: string; secondary: string; label: string }>;
  designStyle: {
    themeStyle: string;
    fontStyle: string;
    typography: string;
  };
  metaDefaults: {
    titleTemplate: string;
    descriptionTemplate: string;
  };
}

export const BUSINESS_TYPES: Record<string, BusinessTypeConfig> = {
  "corporate-it": {
    label: "Corporate / IT Company",
    icon: "💻",
    suggestedPages: ["home", "about", "services", "solutions", "portfolio", "testimonials", "faq", "contact"],
    suggestedSections: ["hero", "services", "solutions", "portfolio", "testimonials", "cta"],
    suggestedFeatures: ["Solutions Overview", "Client Portfolio", "Case Studies", "FAQ", "Newsletter"],
    suggestedComponents: { hero: "hero3", services: "services1", portfolio: "portfolio2", testimonials: "testimonials3", cta: "cta1", footer: "footer1" },
    colorSchemes: [
      { primary: "#1E3A5F", secondary: "#2563EB", label: "Navy & Blue" },
      { primary: "#0F172A", secondary: "#3B82F6", label: "Midnight & Sky" },
    ],
    designStyle: { themeStyle: "tech", fontStyle: "Inter", typography: "inter" },
    metaDefaults: {
      titleTemplate: "{brandName} - Corporate & IT Solutions",
      descriptionTemplate: "{brandName} delivers reliable IT solutions and services for growing businesses. Explore our services and get in touch.",
    },
  },
  agency: {
    label: "Digital Marketing Agency",
    icon: "🚀",
    suggestedPages: ["home", "about", "services", "case-studies", "portfolio", "testimonials", "contact"],
    suggestedSections: ["hero", "services", "case-studies", "portfolio", "testimonials", "cta"],
    suggestedFeatures: ["Case Studies", "Client Logos", "Process Section", "Team Section", "Blog"],
    suggestedComponents: { hero: "hero1", services: "services1", portfolio: "portfolio1", testimonials: "testimonials1", footer: "footer1" },
    colorSchemes: [
      { primary: "#7C3AED", secondary: "#3B82F6", label: "Purple & Blue" },
      { primary: "#6D28D9", secondary: "#2563EB", label: "Violet & Royal Blue" },
    ],
    designStyle: { themeStyle: "creative", fontStyle: "Poppins", typography: "poppins" },
    metaDefaults: {
      titleTemplate: "{brandName} - Digital Marketing Agency",
      descriptionTemplate: "Transform your digital presence with {brandName}. Web design, SEO, and marketing services. Get a free consultation.",
    },
  },
  consulting: {
    label: "Consulting Business",
    icon: "💼",
    suggestedPages: ["home", "about", "services", "industries", "case-studies", "testimonials", "faq", "contact"],
    suggestedSections: ["hero", "services", "industries", "case-studies", "testimonials", "cta"],
    suggestedFeatures: ["Case Studies", "Industries Served", "Process Section", "Team Section", "Resources"],
    suggestedComponents: { hero: "hero2", services: "services1", testimonials: "testimonials3", cta: "cta1", footer: "footer1" },
    colorSchemes: [
      { primary: "#1E3A5F", secondary: "#D4AF37", label: "Navy & Gold" },
      { primary: "#0F2942", secondary: "#C9A96E", label: "Deep Navy & Antique Gold" },
    ],
    designStyle: { themeStyle: "premium", fontStyle: "Playfair Display", typography: "playfair" },
    metaDefaults: {
      titleTemplate: "{brandName} - Consulting Services | Strategic Solutions",
      descriptionTemplate: "Expert consulting from {brandName}. Strategic solutions for your business. Schedule a consultation today.",
    },
  },
  "real-estate": {
    label: "Real Estate Agency",
    icon: "🏠",
    suggestedPages: ["home", "about", "properties", "services", "agents", "gallery", "testimonials", "contact"],
    suggestedSections: ["hero", "properties", "services", "agents", "testimonials", "cta"],
    suggestedFeatures: ["Property Listings", "Agent Profiles", "Virtual Tours", "Saved Searches", "Neighborhood Guides"],
    suggestedComponents: { hero: "hero4", services: "services2", testimonials: "testimonials2", contact: "contact2", footer: "footer1" },
    colorSchemes: [
      { primary: "#36454F", secondary: "#D4AF37", label: "Charcoal & Gold" },
      { primary: "#2D3436", secondary: "#C9A96E", label: "Slate & Antique Gold" },
    ],
    designStyle: { themeStyle: "luxury", fontStyle: "Playfair Display", typography: "playfair" },
    metaDefaults: {
      titleTemplate: "{brandName} - Real Estate | Buy, Sell, Rent Properties",
      descriptionTemplate: "Find your dream property with {brandName}. Browse listings and connect with our agents. Schedule a viewing today.",
    },
  },
  restaurant: {
    label: "Restaurant",
    icon: "🍽️",
    suggestedPages: ["home", "about", "menu", "gallery", "testimonials", "location", "contact"],
    suggestedSections: ["hero", "menu-highlights", "gallery", "testimonials", "location", "contact"],
    suggestedFeatures: ["Menu Highlights", "Daily Specials", "Photo Gallery", "Location & Hours", "Catering Inquiry"],
    suggestedComponents: { hero: "hero4", services: "services3", gallery: "gallery1", testimonials: "testimonials2", footer: "footer1" },
    colorSchemes: [
      { primary: "#6D2932", secondary: "#D4AF37", label: "Burgundy & Gold" },
      { primary: "#800020", secondary: "#C9A96E", label: "Deep Burgundy & Antique Gold" },
    ],
    designStyle: { themeStyle: "elegant", fontStyle: "Cormorant Garamond", typography: "cormorant" },
    metaDefaults: {
      titleTemplate: "{brandName} - Restaurant | Reserve Your Table",
      descriptionTemplate: "Experience the finest cuisine at {brandName}. Dine-in, takeaway & delivery. Reserve your table today.",
    },
  },
  cafe: {
    label: "Café / Coffee Shop",
    icon: "☕",
    suggestedPages: ["home", "about", "menu", "gallery", "our-story", "location", "contact"],
    suggestedSections: ["hero", "menu-highlights", "gallery", "our-story", "location", "contact"],
    suggestedFeatures: ["Menu Highlights", "Our Story", "Photo Gallery", "Location & Hours", "Loyalty Program"],
    suggestedComponents: { hero: "hero4", services: "services3", gallery: "gallery2", testimonials: "testimonials2", footer: "footer2" },
    colorSchemes: [
      { primary: "#6F4E37", secondary: "#D2B48C", label: "Brown & Beige" },
      { primary: "#4E342E", secondary: "#D7CCC8", label: "Coffee & Cream" },
    ],
    designStyle: { themeStyle: "friendly", fontStyle: "Nunito", typography: "nunito" },
    metaDefaults: {
      titleTemplate: "{brandName} - Café & Coffee Shop",
      descriptionTemplate: "Warm, welcoming, and full of flavor - {brandName} is your neighborhood café. Stop by today.",
    },
  },
  hotel: {
    label: "Hotel / Resort",
    icon: "🏨",
    suggestedPages: ["home", "about", "rooms", "amenities", "gallery", "experiences", "testimonials", "contact"],
    suggestedSections: ["hero", "rooms", "amenities", "experiences", "testimonials", "cta"],
    suggestedFeatures: ["Room Booking", "Amenities Overview", "Curated Experiences", "Photo Gallery", "Guest Reviews"],
    suggestedComponents: { hero: "hero4", services: "services2", testimonials: "testimonials2", contact: "contact2", footer: "footer1" },
    colorSchemes: [
      { primary: "#1E3A5F", secondary: "#D4AF37", label: "Navy & Gold" },
      { primary: "#0A0A0A", secondary: "#C9A96E", label: "Black & Antique Gold" },
    ],
    designStyle: { themeStyle: "luxury", fontStyle: "Playfair Display", typography: "playfair" },
    metaDefaults: {
      titleTemplate: "{brandName} - Hotel & Resort | Book Your Stay",
      descriptionTemplate: "Escape to {brandName}. Elegant rooms, world-class amenities, and unforgettable experiences. Book your stay today.",
    },
  },
  travel: {
    label: "Travel Agency",
    icon: "✈️",
    suggestedPages: ["home", "about", "destinations", "travel-packages", "gallery", "testimonials", "faq", "contact"],
    suggestedSections: ["hero", "destinations", "travel-packages", "testimonials", "cta", "contact"],
    suggestedFeatures: ["Destination Guides", "Travel Packages", "Itinerary Builder", "Newsletter", "Travel Blog"],
    suggestedComponents: { hero: "hero4", services: "services3", testimonials: "testimonials2", cta: "cta2", footer: "footer1" },
    colorSchemes: [
      { primary: "#0D9488", secondary: "#2563EB", label: "Teal & Blue" },
      { primary: "#00838F", secondary: "#0277BD", label: "Tropical Teal & Ocean Blue" },
    ],
    designStyle: { themeStyle: "modern", fontStyle: "Poppins", typography: "poppins" },
    metaDefaults: {
      titleTemplate: "{brandName} - Travel Deals & Vacation Packages | Book Now",
      descriptionTemplate: "Explore the world with {brandName}. Curated destinations and travel packages. Book your dream vacation today.",
    },
  },
  photography: {
    label: "Photography",
    icon: "📷",
    suggestedPages: ["home", "about", "portfolio", "gallery", "services", "testimonials", "contact"],
    suggestedSections: ["hero", "portfolio", "gallery", "services", "testimonials", "cta"],
    suggestedFeatures: ["Portfolio Gallery", "Session Packages", "Client Testimonials", "Booking Inquiry", "Print Shop"],
    suggestedComponents: { hero: "hero5", portfolio: "portfolio1", gallery: "gallery1", testimonials: "testimonials1", footer: "footer3" },
    colorSchemes: [
      { primary: "#111111", secondary: "#6B7280", label: "Black & Gray" },
      { primary: "#000000", secondary: "#9CA3AF", label: "Pure Black & Silver Gray" },
    ],
    designStyle: { themeStyle: "minimal", fontStyle: "Inter", typography: "inter" },
    metaDefaults: {
      titleTemplate: "{brandName} - Photography Portfolio",
      descriptionTemplate: "Explore the work of {brandName}. Portraits, events, and fine art photography. Book your session today.",
    },
  },
  "interior-design": {
    label: "Interior Design",
    icon: "🛋️",
    suggestedPages: ["home", "about", "services", "portfolio", "gallery", "process", "testimonials", "contact"],
    suggestedSections: ["hero", "services", "portfolio", "process", "testimonials", "cta"],
    suggestedFeatures: ["Project Gallery", "Our Process", "Design Packages", "Client Testimonials", "Consultation Booking"],
    suggestedComponents: { hero: "hero2", services: "services2", portfolio: "portfolio2", testimonials: "testimonials1", footer: "footer2" },
    colorSchemes: [
      { primary: "#A47551", secondary: "#D9C7A7", label: "Beige & Brown" },
      { primary: "#8B6F47", secondary: "#EFE6D9", label: "Warm Brown & Cream" },
    ],
    designStyle: { themeStyle: "elegant", fontStyle: "Playfair Display", typography: "playfair" },
    metaDefaults: {
      titleTemplate: "{brandName} - Interior Design Studio",
      descriptionTemplate: "Thoughtful, tailored interiors from {brandName}. Explore our portfolio and start your project today.",
    },
  },
  beauty: {
    label: "Beauty Salon",
    icon: "💄",
    suggestedPages: ["home", "about", "services", "gallery", "pricing", "testimonials", "contact"],
    suggestedSections: ["hero", "services", "gallery", "pricing", "testimonials", "contact"],
    suggestedFeatures: ["Online Booking", "Service Menu", "Before & After Gallery", "Pricing", "Loyalty Program"],
    suggestedComponents: { hero: "hero4", services: "services3", gallery: "gallery1", testimonials: "testimonials2", footer: "footer2" },
    colorSchemes: [
      { primary: "#EC4899", secondary: "#E8C4A0", label: "Pink & Nude" },
      { primary: "#D6336C", secondary: "#D4A574", label: "Rose & Nude" },
    ],
    designStyle: { themeStyle: "friendly", fontStyle: "Nunito", typography: "nunito" },
    metaDefaults: {
      titleTemplate: "{brandName} - Beauty & Salon | Book Your Appointment",
      descriptionTemplate: "Premium beauty services at {brandName}. Book your appointment today. Experience the difference.",
    },
  },
  fitness: {
    label: "Fitness / Gym",
    icon: "💪",
    suggestedPages: ["home", "about", "programs", "trainers", "services", "gallery", "testimonials", "contact"],
    suggestedSections: ["hero", "programs", "trainers", "services", "testimonials", "cta"],
    suggestedFeatures: ["Program Overview", "Trainer Profiles", "Membership Plans", "Class Booking", "Progress Tracking"],
    suggestedComponents: { hero: "hero4", services: "services3", pricing: "pricing1", testimonials: "testimonials2", footer: "footer1" },
    colorSchemes: [
      { primary: "#000000", secondary: "#DC2626", label: "Black & Red" },
      { primary: "#111111", secondary: "#B71C1C", label: "Jet Black & Deep Red" },
    ],
    designStyle: { themeStyle: "bold", fontStyle: "Montserrat", typography: "montserrat" },
    metaDefaults: {
      titleTemplate: "{brandName} - Fitness & Gym | Join Today",
      descriptionTemplate: "Transform your fitness at {brandName}. Programs, trainers, and modern equipment. Start your journey today.",
    },
  },
  healthcare: {
    label: "Healthcare / Clinic",
    icon: "🏥",
    suggestedPages: ["home", "about", "services", "doctors", "facilities", "testimonials", "faq", "contact"],
    suggestedSections: ["hero", "services", "doctors", "facilities", "testimonials", "contact"],
    suggestedFeatures: ["Appointment Booking", "Doctor Profiles", "Facility Overview", "Patient Portal", "Insurance Checker"],
    suggestedComponents: { hero: "hero2", services: "services2", testimonials: "testimonials1", contact: "contact1", footer: "footer1" },
    colorSchemes: [
      { primary: "#2563EB", secondary: "#0D9488", label: "Blue & Teal" },
      { primary: "#0277BD", secondary: "#00897B", label: "Medical Blue & Healing Teal" },
    ],
    designStyle: { themeStyle: "professional", fontStyle: "Lato", typography: "lato" },
    metaDefaults: {
      titleTemplate: "{brandName} - Healthcare & Medical Services | Book Now",
      descriptionTemplate: "Quality healthcare at {brandName}. Meet our doctors and book your appointment today.",
    },
  },
  education: {
    label: "Education / Training",
    icon: "🎓",
    suggestedPages: ["home", "about", "courses", "programs", "instructors", "testimonials", "faq", "contact"],
    suggestedSections: ["hero", "courses", "programs", "instructors", "testimonials", "cta"],
    suggestedFeatures: ["Course Catalog", "Program Overview", "Instructor Profiles", "Student Dashboard", "Career Services"],
    suggestedComponents: { hero: "hero3", services: "services2", testimonials: "testimonials1", cta: "cta2", footer: "footer1" },
    colorSchemes: [
      { primary: "#2563EB", secondary: "#F97316", label: "Blue & Orange" },
      { primary: "#1565C0", secondary: "#E65100", label: "Academic Blue & Energetic Orange" },
    ],
    designStyle: { themeStyle: "modern", fontStyle: "Roboto", typography: "roboto" },
    metaDefaults: {
      titleTemplate: "{brandName} - Online Courses & Training | Enroll Now",
      descriptionTemplate: "Advance your career with {brandName}. Courses, programs, and expert instructors. Start learning today.",
    },
  },
  portfolio: {
    label: "Portfolio / Freelancer",
    icon: "🎨",
    suggestedPages: ["home", "about", "skills", "services", "projects", "experience", "testimonials", "contact"],
    suggestedSections: ["hero", "skills", "services", "projects", "experience", "testimonials", "contact"],
    suggestedFeatures: ["Skills Overview", "Project Gallery", "Work Experience", "Client Testimonials", "Download Resume"],
    suggestedComponents: { hero: "hero5", portfolio: "portfolio1", about: "about1", testimonials: "testimonials1", footer: "footer3" },
    colorSchemes: [
      { primary: "#111111", secondary: "#7C3AED", label: "Black & Purple" },
      { primary: "#000000", secondary: "#6D28D9", label: "Jet Black & Violet" },
    ],
    designStyle: { themeStyle: "minimal", fontStyle: "Montserrat", typography: "montserrat" },
    metaDefaults: {
      titleTemplate: "{brandName} - Portfolio",
      descriptionTemplate: "Explore the work and experience of {brandName}. Skills, projects, and client testimonials. Let's work together.",
    },
  },
};

export const BUSINESS_TYPE_OPTIONS = Object.entries(BUSINESS_TYPES).map(([value, config]) => ({
  value,
  label: config.label,
}));

export const normalizeBusinessType = (value?: string): string => {
  if (!value) return "corporate-it";

  const normalized = value.trim().toLowerCase();
  const directMatch = Object.keys(BUSINESS_TYPES).find((key) => key.toLowerCase() === normalized);
  if (directMatch) return directMatch;

  const synonyms: Record<string, string> = {
    "it company": "corporate-it",
    "it services": "corporate-it",
    corporate: "corporate-it",
    technology: "corporate-it",
    saas: "corporate-it",
    software: "corporate-it",
    "digital agency": "agency",
    "marketing agency": "agency",
    "creative agency": "agency",
    consulting: "consulting",
    "management consulting": "consulting",
    "business consulting": "consulting",
    "real estate": "real-estate",
    property: "real-estate",
    "food & beverage": "restaurant",
    diner: "restaurant",
    "coffee shop": "cafe",
    "coffee house": "cafe",
    resort: "hotel",
    hospitality: "hotel",
    tourism: "travel",
    "travel agency": "travel",
    photographer: "photography",
    "interior designer": "interior-design",
    "interior decorating": "interior-design",
    salon: "beauty",
    spa: "beauty",
    gym: "fitness",
    wellness: "fitness",
    medical: "healthcare",
    clinic: "healthcare",
    "e-learning": "education",
    "online courses": "education",
    training: "education",
    freelance: "portfolio",
    freelancer: "portfolio",
    creative: "portfolio",
  };

  return synonyms[normalized] || "corporate-it";
};
