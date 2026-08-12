import { COMPONENT_MAP } from "@/data/componentOptions";
import { DESIGN_STYLES, TYPOGRAPHY_OPTIONS } from "@/data/designOptions";

// Mixes a hex color toward white/black (amount 0 = pure color, 1 = pure
// white/black). Mirrors server/src/services/ai/MockAIProvider.ts so the
// live preview's tinting matches what actually gets generated.
function mixColor(hex: string, amount: number, towards: "white" | "black" = "white"): string {
  const normalized = (hex || "#2563EB").replace("#", "");
  const full = normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized;
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) return hex;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const target = towards === "white" ? 255 : 0;
  const mix = (channel: number) => Math.round(channel + (target - channel) * amount);
  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

function resolveComponent(category: string, selectedId?: string): string {
  const map = (COMPONENT_MAP as Record<string, Record<string, string>>)[category];
  if (!map) return "";
  if (selectedId && map[selectedId]) return map[selectedId];
  const firstKey = Object.keys(map)[0];
  return firstKey ? map[firstKey] : "";
}

const GENERIC_SERVICES = [
  { title: "Service One", description: "A short description of what you offer and why it matters to your customers.", icon: "star" },
  { title: "Service Two", description: "Another core offering that highlights your expertise and value.", icon: "settings" },
  { title: "Service Three", description: "Round out your offering with a third service or specialty.", icon: "heart" },
];

const GENERIC_TESTIMONIALS = [
  { name: "Jamie R.", role: "Customer", content: "Excellent service and attention to detail. Highly recommend to anyone in the area.", rating: 5 },
  { name: "Alex K.", role: "Client", content: "Professional, responsive, and delivered exactly what we needed.", rating: 5 },
  { name: "Morgan T.", role: "Regular Customer", content: "Consistently great experience every single time. Wouldn't go anywhere else.", rating: 5 },
];

const GENERIC_FAQ = [
  { question: "How do I get started?", answer: "Reach out through the contact form and we'll follow up within 24 hours." },
  { question: "What are your hours?", answer: "We're available Monday through Friday, with weekend appointments on request." },
  { question: "Do you offer consultations?", answer: "Yes — we offer a free initial consultation to understand your needs." },
];

const GENERIC_REASONS = [
  { title: "Expert Team", description: "Experienced professionals dedicated to great results." },
  { title: "Quality First", description: "We never compromise on quality or attention to detail." },
  { title: "Customer Focused", description: "Your satisfaction drives everything we do." },
];

const GENERIC_PLANS = [
  { name: "Basic", price: "$29", period: "mo", features: ["Core feature", "Email support"] },
  { name: "Pro", price: "$79", period: "mo", features: ["Everything in Basic", "Priority support", "Advanced feature"], popular: true },
  { name: "Enterprise", price: "$199", period: "mo", features: ["Everything in Pro", "Dedicated manager"] },
];

const GENERIC_PORTFOLIO = [
  { title: "Project One", description: "A brief description of this project and the results achieved.", image: null },
  { title: "Project Two", description: "Another example of work you're proud to show off.", image: null },
  { title: "Project Three", description: "A third project showcasing your range and skill.", image: null },
];

const GENERIC_TEAM = [
  { name: "Jane Doe", role: "Founder & CEO", bio: "", avatar: null },
  { name: "John Smith", role: "Operations Lead", bio: "", avatar: null },
];

const GENERIC_GALLERY = Array.from({ length: 6 }, (_, i) => ({ url: "", alt: `Gallery image ${i + 1}` }));

const GENERIC_MENU_ITEMS = [
  { name: "Signature Dish", description: "A crowd favorite made with fresh, quality ingredients.", price: "$18", image: null },
  { name: "Chef's Special", description: "A seasonal creation you won't find anywhere else.", price: "$24", image: null },
  { name: "House Favorite", description: "The dish our regulars keep coming back for.", price: "$16", image: null },
];

const GENERIC_DAILY_SPECIALS = [
  { name: "Today's Special", description: "A limited-time dish available only today.", price: "$15", tag: "Today's Special" },
  { name: "Weekend Feature", description: "Available Friday through Sunday while supplies last.", price: "$22", tag: "Weekend Only" },
];

const GENERIC_STATS = [
  { label: "Happy Clients", value: "250+" },
  { label: "Years of Experience", value: "10+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Team Members", value: "15+" },
];

const GENERIC_TIMELINE = [
  { year: "2018", title: "Founded", description: "Started with a simple idea and a small team." },
  { year: "2021", title: "Grew the Team", description: "Expanded to serve more customers with a bigger team." },
  { year: "2024", title: "Where We Are Today", description: "A trusted name serving hundreds of happy customers." },
];

const GENERIC_BUSINESS_HOURS = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const GENERIC_CLASS_SCHEDULE = [
  { day: "Monday", time: "6:00 AM", className: "Morning Strength" },
  { day: "Wednesday", time: "5:30 PM", className: "Evening Cardio" },
  { day: "Saturday", time: "9:00 AM", className: "Weekend Bootcamp" },
];

const GENERIC_COURSES = [
  { title: "Getting Started", description: "A foundational course covering everything you need to begin.", price: "$49", category: "Beginner", level: "Beginner", duration: "4 weeks", image: null },
  { title: "Level Up", description: "Build on the fundamentals with hands-on projects and feedback.", price: "$99", category: "Intermediate", level: "Intermediate", duration: "6 weeks", image: null },
  { title: "Advanced Mastery", description: "Go deep on advanced techniques with expert-led instruction.", price: "$149", category: "Advanced", level: "Advanced", duration: "8 weeks", image: null },
];

const GENERIC_DESTINATIONS = [
  { name: "Coastal Getaway", price: "$899", image: null },
  { name: "Mountain Retreat", price: "$1,199", image: null },
  { name: "City Escape", price: "$649", image: null },
];

const GENERIC_BLOG_POSTS = [
  { title: "A Behind-the-Scenes Look", excerpt: "Get a look at how we work and what makes us different.", author: "", date: "", image: null, category: "" },
  { title: "Tips From Our Team", excerpt: "Practical advice based on years of experience.", author: "", date: "", image: null, category: "" },
  { title: "What's New This Season", excerpt: "The latest updates from our business.", author: "", date: "", image: null, category: "" },
];

// BlogPreview/BlogGrid use post.id as a React key and link to /blog/{slug} —
// neither exists on hand-typed blog content, so derive them from the title.
function withBlogMeta(
  posts: Array<{ title: string; excerpt: string; author?: string; date?: string; image?: string | null; category?: string }>
): Array<Record<string, unknown>> {
  return posts.map((post, i) => ({
    ...post,
    id: String(i + 1),
    slug: (post.title || `post-${i + 1}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `post-${i + 1}`,
  }));
}

export const AVAILABLE_PAGES = [
  { id: "home", label: "Home", required: true },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "pricing", label: "Pricing" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Team" },
  { id: "menu", label: "Menu" },
  { id: "properties", label: "Properties" },
  { id: "courses", label: "Courses" },
  { id: "classes", label: "Classes" },
  { id: "destinations", label: "Destinations" },
  { id: "features", label: "Features" },
  { id: "inventory", label: "Inventory" },
];

// Per-page hero copy for the preview. Any page not listed falls back to a
// generic "{Page Label}" headline.
const PAGE_HERO_COPY: Record<string, { headline: string; subheadline: string }> = {
  about: { headline: "About Us", subheadline: "Learn more about who we are and what drives us." },
  services: { headline: "Our Services", subheadline: "A closer look at what we offer." },
  portfolio: { headline: "Our Work", subheadline: "A selection of recent projects." },
  pricing: { headline: "Pricing", subheadline: "Simple, transparent plans for every need." },
  blog: { headline: "Blog", subheadline: "News, updates, and insights." },
  contact: { headline: "Get In Touch", subheadline: "We'd love to hear from you." },
  faq: { headline: "Frequently Asked Questions", subheadline: "Answers to common questions." },
  testimonials: { headline: "What Clients Say", subheadline: "Real feedback from real customers." },
  gallery: { headline: "Gallery", subheadline: "A look at our work and space." },
  team: { headline: "Meet the Team", subheadline: "The people behind the business." },
};

// Maps the various page-specific section ids (from designOptions.ts's
// PAGE_SECTIONS) onto the handful of generic, content-bearing sections this
// preview (and the per-page content editor in QuestionnairePage.tsx) know
// how to render/edit. Unmapped ids are simply skipped — this is an
// approximation, not the full content engine. Exported so the questionnaire
// UI stays in sync with what the preview actually supports.
export const SECTION_ALIASES: Record<string, string> = {
  services: "services",
  "services-list": "services",
  testimonials: "testimonials",
  faq: "faq",
  cta: "cta",
  pricing: "pricing",
  "pricing-table": "pricing",
  story: "about_story",
  about_story: "about_story",
  values: "why_choose_us",
  why_choose_us: "why_choose_us",
  benefits: "why_choose_us",
  portfolio: "portfolio",
  "portfolio-grid": "portfolio",
  gallery: "gallery",
  team: "team",
  blog_preview: "blog_preview",
  "blog-grid": "blog_preview",
  "contact-form": "contact",
  "menu-grid": "menu_items",
  specials: "daily_specials",
  stats: "stats",
  timeline: "timeline",
  map: "map",
  info: "contact_info",
  hours: "business_hours",
  agents: "agents",
  "course-grid": "course_grid",
  features: "why_choose_us",
  "class-schedule": "class_schedule",
  trainers: "trainers",
  "destination-grid": "destination_grid",
  deals: "travel_deals",
  "feature-grid": "feature_grid",
  "inventory-grid": "inventory_grid",
};

export function sectionType(rawId: string): string | undefined {
  return SECTION_ALIASES[rawId];
}

interface PageContentOverride {
  hero?: { headline?: string; subheadline?: string; ctaText?: string };
  about_story?: { content?: string };
  cta?: { headline?: string; subheadline?: string; ctaText?: string };
}

interface PreviewCtx {
  businessName: string;
  components: Record<string, string>;
  services: Array<{ title: string; description: string; icon: string }>;
  testimonials: Array<{ name: string; role: string; content: string; rating: number; avatar?: string | null }>;
  faq: Array<{ question: string; answer: string }>;
  reasons: Array<{ title: string; description: string }>;
  plans: Array<{ name: string; price: string; period?: string; features: string[]; popular?: boolean }>;
  portfolio: Array<{ title: string; description: string; image?: string | null }>;
  gallery: Array<{ url: string; alt?: string }>;
  team: Array<{ name: string; role: string; bio?: string; avatar?: string | null }>;
  menuItems: Array<{ name: string; description: string; price: string; image?: string | null }>;
  dailySpecials: Array<{ name: string; description: string; price: string; tag?: string; originalPrice?: string }>;
  blogPosts: Array<{ title: string; excerpt: string; author?: string; date?: string; image?: string | null; category?: string }>;
  stats: Array<{ label: string; value: string }>;
  timeline: Array<{ year: string; title: string; description?: string }>;
  businessHours: Array<{ day: string; hours: string }>;
  classSchedule: Array<{ day: string; time: string; className: string }>;
  courses: Array<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>;
  destinations: Array<{ name: string; price?: string; image?: string | null }>;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  pageContent?: PageContentOverride;
}

function buildBodySections(selectedIds: string[], ctx: PreviewCtx) {
  const seen = new Set<string>();
  const sections: Array<Record<string, unknown>> = [];
  let order = 2;

  for (const rawId of selectedIds) {
    const type = SECTION_ALIASES[rawId];
    if (!type || seen.has(type)) continue;
    seen.add(type);

    switch (type) {
      case "services":
        sections.push({
          id: "services",
          component: resolveComponent("services", ctx.components.services),
          props: { title: "Our Services", subtitle: "What we offer", services: ctx.services },
          order: order++,
        });
        break;
      case "testimonials":
        sections.push({
          id: "testimonials",
          component: resolveComponent("testimonials", ctx.components.testimonials),
          props: { title: "What Clients Say", subtitle: "Trusted by our customers", testimonials: ctx.testimonials },
          order: order++,
        });
        break;
      case "faq":
        sections.push({
          id: "faq",
          component: resolveComponent("faq", ctx.components.faq),
          props: { title: "Frequently Asked Questions", faqs: ctx.faq },
          order: order++,
        });
        break;
      case "pricing":
        sections.push({
          id: "pricing",
          component: resolveComponent("pricing", ctx.components.pricing),
          props: { title: "Pricing Plans", subtitle: "Choose what fits you", plans: ctx.plans },
          order: order++,
        });
        break;
      case "why_choose_us":
        sections.push({
          id: "why_choose_us",
          component: "WhyChooseUs",
          props: { title: "Why Choose Us", subtitle: "What sets us apart", reasons: ctx.reasons },
          order: order++,
        });
        break;
      case "portfolio":
        sections.push({
          id: "portfolio",
          component: resolveComponent("portfolio", ctx.components.portfolio),
          // Portfolio1/2/3 all take a `projects` prop, not `items`, and
          // Portfolio3 also uses `category` to build its filter pills —
          // without a default every card/pill would show "undefined".
          props: {
            title: "Our Work",
            projects: ctx.portfolio.map((p) => ({ category: "Featured", ...p })),
          },
          order: order++,
        });
        break;
      case "gallery":
        sections.push({
          id: "gallery",
          component: resolveComponent("gallery", ctx.components.gallery),
          // Gallery1/2 take `images` as a plain array of URL strings.
          props: { title: "Gallery", images: ctx.gallery.map((g) => g.url) },
          order: order++,
        });
        break;
      case "team":
        sections.push({
          id: "team",
          component: "TeamSection",
          props: { title: "Meet the Team", subtitle: "The people behind the business", members: ctx.team },
          order: order++,
        });
        break;
      case "blog_preview":
        sections.push({
          id: "blog_preview",
          component: resolveComponent("blog", ctx.components.blog),
          props: {
            title: "Latest Insights",
            posts: withBlogMeta(ctx.blogPosts),
          },
          order: order++,
        });
        break;
      case "menu_items":
        sections.push({
          id: "menu_items",
          component: "MenuHighlights",
          props: { title: "Our Menu", subtitle: "Carefully crafted selections", items: ctx.menuItems },
          order: order++,
        });
        break;
      case "daily_specials":
        sections.push({
          id: "daily_specials",
          component: "DailySpecials",
          props: { title: "Today's Specials", subtitle: "Chef's picks for today", items: ctx.dailySpecials },
          order: order++,
        });
        break;
      case "stats":
        sections.push({
          id: "stats",
          component: "Stats",
          props: { title: "By the Numbers", stats: ctx.stats },
          order: order++,
        });
        break;
      case "timeline":
        sections.push({
          id: "timeline",
          component: "Timeline",
          props: { title: "Our Journey", milestones: ctx.timeline },
          order: order++,
        });
        break;
      case "contact":
        sections.push({
          id: "contact",
          component: resolveComponent("contact", ctx.components.contact),
          props: {
            title: "Get In Touch",
            email: ctx.contactEmail,
            phone: ctx.contactPhone,
            address: ctx.contactAddress,
          },
          order: order++,
        });
        break;
      case "map":
        sections.push({
          id: "map",
          component: "MapEmbed",
          props: { title: "Find Us", address: ctx.contactAddress },
          order: order++,
        });
        break;
      case "contact_info":
        sections.push({
          id: "contact_info",
          component: "ContactInfo",
          props: {
            methods: [
              { title: "Phone", value: ctx.contactPhone, description: "Call us directly" },
              { title: "Email", value: ctx.contactEmail, description: "Send us a message" },
              { title: "Address", value: ctx.contactAddress, description: "" },
            ],
          },
          order: order++,
        });
        break;
      case "business_hours":
        sections.push({
          id: "business_hours",
          component: "BusinessHours",
          props: { title: "Business Hours", hours: ctx.businessHours },
          order: order++,
        });
        break;
      case "agents":
        sections.push({
          id: "agents",
          component: "AgentProfiles",
          props: {
            title: "Meet Our Agents",
            agents: ctx.team.map((t) => ({ name: t.name, specialty: t.role, avatar: t.avatar })),
          },
          order: order++,
        });
        break;
      case "trainers":
        sections.push({
          id: "trainers",
          component: "TeamSection",
          props: { title: "Meet Our Trainers", subtitle: "The coaches who keep you moving", members: ctx.team },
          order: order++,
        });
        break;
      case "class_schedule":
        sections.push({
          id: "class_schedule",
          component: "ClassSchedule",
          props: { title: "Class Schedule", subtitle: "Find a class that fits your week", schedule: ctx.classSchedule },
          order: order++,
        });
        break;
      case "course_grid":
        sections.push({
          id: "course_grid",
          component: "CourseGrid",
          props: { title: "Our Courses", subtitle: "Pick the path that's right for you", courses: ctx.courses },
          order: order++,
        });
        break;
      case "destination_grid":
        sections.push({
          id: "destination_grid",
          component: "DestinationGrid",
          props: { title: "Popular Destinations", subtitle: "Where our travelers love to go", destinations: ctx.destinations },
          order: order++,
        });
        break;
      case "travel_deals":
        sections.push({
          id: "travel_deals",
          component: "TravelDeals",
          props: {
            title: "Travel Deals",
            subtitle: "Limited-time offers you won't want to miss",
            deals: ctx.dailySpecials.map((d) => ({ title: d.name, description: d.description, price: d.price, originalPrice: d.originalPrice })),
          },
          order: order++,
        });
        break;
      case "feature_grid":
        sections.push({
          id: "feature_grid",
          component: resolveComponent("services", ctx.components.services),
          props: { title: "Features", subtitle: "Everything you get, built in", services: ctx.services },
          order: order++,
        });
        break;
      case "inventory_grid":
        sections.push({
          id: "inventory_grid",
          component: resolveComponent("portfolio", ctx.components.portfolio),
          props: {
            title: "Our Inventory",
            projects: ctx.portfolio.map((p) => ({ category: "Featured", ...p })),
          },
          order: order++,
        });
        break;
      case "about_story":
        sections.push({
          id: "about_story",
          component: "AboutStory",
          props: {
            title: "Our Story",
            subtitle: "Learn about our journey",
            content: ctx.pageContent?.about_story?.content?.trim()
              || `${ctx.businessName} was founded to deliver excellent service and real results for every customer.`,
            image: null,
          },
          order: order++,
        });
        break;
      case "cta":
        sections.push({
          id: "cta",
          component: resolveComponent("cta", ctx.components.cta),
          props: {
            headline: ctx.pageContent?.cta?.headline?.trim() || "Ready to Get Started?",
            subheadline: ctx.pageContent?.cta?.subheadline?.trim() || `Contact ${ctx.businessName} today to learn more.`,
            ctaText: ctx.pageContent?.cta?.ctaText?.trim() || "Contact Us",
            ctaLink: "/contact",
          },
          order: order++,
        });
        break;
      default:
        break;
    }
  }

  return sections;
}

/**
 * Builds an approximate WebsiteRenderer-compatible spec straight from the
 * in-progress questionnaire config, so the client can see a live preview of
 * their choices before generation. This is a client-side approximation —
 * not the same content engine as MockAIProvider — but it uses the exact
 * same theme + component resolution rules and the real WebsiteRenderer, so
 * colors, fonts, layout variants, and section choices all match what will
 * actually be generated.
 */
export function buildPreviewSpec(config: any) {
  const business = config.business || {};
  const theme = config.theme || {};
  const components = config.components || {};
  const content = config.content || {};
  const logo = config.branding?.logo || null;

  const businessName = (business.name || "").trim() || "Your Business";
  const styleProfile = DESIGN_STYLES.find((s) => s.id === theme.style) || DESIGN_STYLES[1];
  const typography = TYPOGRAPHY_OPTIONS.find((t) => t.id === theme.typography);

  const primaryColor = theme.primaryColor || "#2563EB";
  const secondaryColor = theme.secondaryColor || "#1E40AF";
  const darkMode = theme.mode === "dark";
  const fontFamily = typography?.fontFamily || styleProfile.preview.fontFamily || "Inter";
  const borderRadius = styleProfile.preview.borderRadius || "8px";
  // Every accent style used to collapse onto the same "rounded" button shape
  // unless it was exactly "gradient" — so Minimal/Bold/Monochrome all looked
  // identical. Give each its own look, mirroring the server's _buildTheme.
  const accentStyleMap: Record<string, { buttonStyle: string; borderWidth: string }> = {
    minimal: { buttonStyle: "rounded", borderWidth: "1px" },
    bold: { buttonStyle: "square", borderWidth: "2px" },
    gradient: { buttonStyle: "pill", borderWidth: "0px" },
    monochrome: { buttonStyle: "sharp", borderWidth: "1px" },
  };
  const accent = accentStyleMap[theme.accentStyle] || (borderRadius === "0px" ? { buttonStyle: "sharp", borderWidth: "1px" } : { buttonStyle: "rounded", borderWidth: "1px" });

  const backgroundColor = darkMode ? "#0F0F0F" : mixColor(primaryColor, 0.94);
  const mutedColor = darkMode ? "#262626" : mixColor(primaryColor, 0.88);
  const borderColor = darkMode ? "#333333" : mixColor(primaryColor, 0.8);
  const foregroundColor = darkMode ? "#F5F5F5" : "#1A1A1A";

  const themeSpec = {
    primaryColor,
    secondaryColor,
    backgroundColor,
    background: backgroundColor,
    foregroundColor,
    textColor: foregroundColor,
    mutedColor,
    borderColor,
    fontFamily,
    fontStyle: fontFamily,
    darkMode,
    borderRadius,
    buttonStyle: accent.buttonStyle,
    spacing: "normal",
    shadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    letterSpacing: "normal",
    borderWidth: accent.borderWidth,
    backgroundTreatment: "plain",
  };

  const selectedPageIds: string[] = config.pages?.length ? config.pages : ["home"];
  const navLinks = selectedPageIds.map((slug) => ({
    label: AVAILABLE_PAGES.find((p) => p.id === slug)?.label || slug,
    href: `/${slug}`,
  }));

  const navbarComponent = resolveComponent("navbar", components.navbar);
  const footerComponent = resolveComponent("footer", components.footer);
  const heroComponent = resolveComponent("hero", components.hero);

  const pageContentMap: Record<string, PageContentOverride> = config.pageContent || {};

  const pages = selectedPageIds.map((pageId) => {
    const isHome = pageId === "home";
    const pageContent = pageContentMap[pageId];
    const defaultCopy = isHome
      ? { headline: `Welcome to ${businessName}`, subheadline: business.description?.trim() || "Tell your customers what makes your business special — this updates live as you type." }
      : PAGE_HERO_COPY[pageId] || { headline: AVAILABLE_PAGES.find((p) => p.id === pageId)?.label || pageId, subheadline: `Learn more about ${businessName}.` };

    const heroSection = {
      id: "hero",
      component: heroComponent,
      props: {
        headline: pageContent?.hero?.headline?.trim() || defaultCopy.headline,
        subheadline: pageContent?.hero?.subheadline?.trim() || defaultCopy.subheadline,
        ctaText: pageContent?.hero?.ctaText?.trim() || "Get Started",
        ctaLink: "/contact",
        badge: isHome ? "Welcome" : undefined,
        logo,
      },
      order: 1,
    };

    const ctx: PreviewCtx = {
      businessName,
      components,
      services: content.services?.length ? content.services : GENERIC_SERVICES,
      testimonials: content.testimonials?.length ? content.testimonials : GENERIC_TESTIMONIALS,
      faq: content.faq?.length ? content.faq : GENERIC_FAQ,
      reasons: content.whyChooseUs?.length ? content.whyChooseUs : GENERIC_REASONS,
      plans: content.pricingPlans?.length ? content.pricingPlans : GENERIC_PLANS,
      portfolio: content.portfolio?.length ? content.portfolio : GENERIC_PORTFOLIO,
      gallery: content.gallery?.length ? content.gallery : GENERIC_GALLERY,
      team: content.team?.length ? content.team : GENERIC_TEAM,
      menuItems: content.menuItems?.length ? content.menuItems : GENERIC_MENU_ITEMS,
      dailySpecials: content.dailySpecials?.length ? content.dailySpecials : GENERIC_DAILY_SPECIALS,
      blogPosts: content.blogPosts?.length ? content.blogPosts : GENERIC_BLOG_POSTS,
      stats: content.stats?.length ? content.stats : GENERIC_STATS,
      timeline: content.timeline?.length ? content.timeline : GENERIC_TIMELINE,
      businessHours: content.businessHours?.length ? content.businessHours : GENERIC_BUSINESS_HOURS,
      classSchedule: content.classSchedule?.length ? content.classSchedule : GENERIC_CLASS_SCHEDULE,
      courses: content.courses?.length ? content.courses : GENERIC_COURSES,
      destinations: content.destinations?.length ? content.destinations : GENERIC_DESTINATIONS,
      contactPhone: business.phone?.trim() || "+1 (555) 123-4567",
      contactEmail: business.email?.trim() || "hello@example.com",
      contactAddress: business.address?.trim() || "123 Business St, Suite 100",
      pageContent,
    };

    const bodySections = buildBodySections(config.sections?.[pageId] || [], ctx);

    const navbarSection = {
      id: "navbar",
      component: navbarComponent,
      props: { logo, brandName: businessName, links: navLinks },
      order: 0,
    };

    const footerSection = {
      id: "footer",
      component: footerComponent,
      props: {
        brandName: businessName,
        description: business.description?.trim() || `${businessName} — professional services you can trust.`,
        links: navLinks,
        socialLinks: (business.socialLinks || []).map((l: { platform: string; url: string }) => ({ platform: l.platform, href: l.url })),
      },
      order: bodySections.length + 2,
    };

    return {
      slug: pageId,
      title: AVAILABLE_PAGES.find((p) => p.id === pageId)?.label || pageId,
      sections: [navbarSection, heroSection, ...bodySections, footerSection],
    };
  });

  return {
    name: businessName,
    description: business.description || "",
    logo,
    pages,
    theme: themeSpec,
  };
}
