export interface WebsiteConfig {
  business: {
    name: string;
    type: string;
    industry: string;
    description: string;
    location: string;
    countriesServed: string;
    email: string;
    phone: string;
    address: string;
    socialLinks: Array<{ platform: string; url: string }>;
  };
  pages: string[];
  sections: Record<string, string[]>;
  // Custom text the client writes for a specific page's Hero / About-story /
  // CTA sections, keyed by page slug. Anything left blank falls back to
  // mock content suited to the business type.
  pageContent: Record<string, {
    hero?: { headline?: string; subheadline?: string; ctaText?: string };
    about_story?: { content?: string };
    cta?: { headline?: string; subheadline?: string; ctaText?: string };
  }>;
  theme: {
    style: string;
    primaryColor: string;
    secondaryColor: string;
    mode: "light" | "dark" | "auto";
    typography: string;
    accentStyle: string;
  };
  components: Record<string, string>;
  content: {
    services: Array<{ title: string; description: string; icon: string }>;
    testimonials: Array<{ name: string; role: string; content: string; rating: number; avatar?: string | null }>;
    faq: Array<{ question: string; answer: string }>;
    stats: Array<{ label: string; value: string }>;
    team: Array<{ name: string; role: string; bio?: string; avatar?: string | null }>;
    portfolio: Array<{ title: string; description: string; image?: string | null }>;
    gallery: Array<{ url: string; alt?: string }>;
    whyChooseUs: Array<{ title: string; description: string }>;
    pricingPlans: Array<{ name: string; price: string; period?: string; features: string[]; popular?: boolean }>;
    menuItems: Array<{ name: string; description: string; price: string; image?: string | null }>;
    dailySpecials: Array<{ name: string; description: string; price: string; tag?: string; originalPrice?: string }>;
    blogPosts: Array<{ title: string; excerpt: string; author?: string; date?: string; image?: string | null; category?: string }>;
    timeline: Array<{ year: string; title: string; description?: string }>;
    businessHours: Array<{ day: string; hours: string }>;
    classSchedule: Array<{ day: string; time: string; className: string }>;
    courses: Array<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>;
    destinations: Array<{ name: string; price?: string; image?: string | null }>;
    solutions: Array<{ title: string; description: string; icon: string }>;
    industries: Array<{ title: string; description: string; icon: string }>;
    caseStudies: Array<{ title: string; description: string; image?: string | null }>;
    rooms: Array<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>;
    amenities: Array<{ title: string; description: string }>;
    experiences: Array<{ title: string; description: string; image?: string | null }>;
    travelPackages: Array<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>;
    process: Array<{ title: string; description: string; icon?: string }>;
    programs: Array<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>;
    facilities: Array<{ title: string; description: string }>;
    skills: Array<{ title: string; description: string }>;
  };
  branding: {
    logo: string | null;
    bannerImages: string[];
  };
}

export const DEFAULT_WEBSITE_CONFIG: WebsiteConfig = {
  business: {
    name: "",
    type: "",
    industry: "",
    description: "",
    location: "",
    countriesServed: "",
    email: "",
    phone: "",
    address: "",
    socialLinks: [],
  },
  pages: ["home"],
  sections: { home: ["services", "testimonials", "cta"] },
  pageContent: {},
  theme: {
    style: "modern",
    primaryColor: "#2563EB",
    secondaryColor: "#1E40AF",
    // "auto" lets each design style show its own intended light/dark
    // character (Luxury, Premium, Bold, Elegant, and Tech / SaaS are all
    // meant to read as dark by default) — defaulting to "light" pinned
    // every style to a light background regardless of what it was
    // designed to look like, which was a big part of why styles all
    // looked so similar. The Theme Mode step still lets the client force
    // Light or Dark explicitly.
    mode: "auto",
    typography: "inter",
    accentStyle: "minimal",
  },
  components: {
    navbar: "navbar1",
    hero: "hero1",
    services: "services1",
    testimonials: "testimonials1",
    footer: "footer1",
    about: "about1",
    portfolio: "portfolio1",
    pricing: "pricing1",
    faq: "faq1",
    cta: "cta1",
    contact: "contact1",
    gallery: "gallery1",
    blog: "blog1",
  },
  content: {
    services: [],
    testimonials: [],
    faq: [],
    stats: [],
    team: [],
    portfolio: [],
    gallery: [],
    whyChooseUs: [],
    pricingPlans: [],
    menuItems: [],
    dailySpecials: [],
    blogPosts: [],
    timeline: [],
    businessHours: [],
    classSchedule: [],
    courses: [],
    destinations: [],
    solutions: [],
    industries: [],
    caseStudies: [],
    rooms: [],
    amenities: [],
    experiences: [],
    travelPackages: [],
    process: [],
    programs: [],
    facilities: [],
    skills: [],
  },
  branding: {
    logo: null,
    bannerImages: [],
  },
};
