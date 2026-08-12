export interface WebsiteConfig {
  business: {
    name: string;
    type: string;
    industry: string;
    description: string;
    targetAudience: string;
    location: string;
    countriesServed: string;
    email: string;
    phone: string;
    address: string;
    socialLinks: Array<{ platform: string; url: string }>;
  };
  goals: string[];
  pages: string[];
  sections: Record<string, string[]>;
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
    testimonials: Array<{ name: string; role: string; content: string; rating: number }>;
    faq: Array<{ question: string; answer: string }>;
    stats: Array<{ label: string; value: string }>;
    team: Array<{ name: string; role: string; image?: string }>;
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
    targetAudience: "",
    location: "",
    countriesServed: "",
    email: "",
    phone: "",
    address: "",
    socialLinks: [],
  },
  goals: [],
  pages: ["home"],
  sections: { home: ["hero", "services", "testimonials", "cta"] },
  theme: {
    style: "modern",
    primaryColor: "#2563EB",
    secondaryColor: "#1E40AF",
    mode: "light",
    typography: "inter",
    accentStyle: "minimal",
  },
  components: {
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
  },
  branding: {
    logo: null,
    bannerImages: [],
  },
};
