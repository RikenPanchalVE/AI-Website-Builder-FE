import { COMPONENT_MAP } from "@/data/componentOptions";
import { TYPOGRAPHY_OPTIONS } from "@/data/designOptions";

// The full visual identity behind each of the 12 design styles - not just a
// font and a border radius. Mirrors server/src/services/ai/MockAIProvider.ts's
// _buildTheme exactly, so the live preview matches what actually generates.
const STYLE_THEME_PROFILES: Record<string, {
  font: string; darkMode: boolean; borderRadius: string; buttonStyle: string;
  spacing: string; shadow: string; letterSpacing: string; borderWidth: string;
  backgroundTreatment: string;
}> = {
  minimal: { font: "Inter", darkMode: false, borderRadius: "4px", buttonStyle: "square", spacing: "compact", shadow: "none", letterSpacing: "wide", borderWidth: "1px", backgroundTreatment: "plain" },
  modern: { font: "Inter", darkMode: false, borderRadius: "8px", buttonStyle: "rounded", spacing: "normal", shadow: "sm", letterSpacing: "normal", borderWidth: "1px", backgroundTreatment: "plain" },
  premium: { font: "Playfair Display", darkMode: true, borderRadius: "2px", buttonStyle: "sharp", spacing: "relaxed", shadow: "lg", letterSpacing: "wide", borderWidth: "2px", backgroundTreatment: "gradient" },
  corporate: { font: "Source Sans 3", darkMode: false, borderRadius: "4px", buttonStyle: "square", spacing: "normal", shadow: "md", letterSpacing: "normal", borderWidth: "1px", backgroundTreatment: "plain" },
  creative: { font: "Poppins", darkMode: false, borderRadius: "16px", buttonStyle: "pill", spacing: "relaxed", shadow: "md", letterSpacing: "normal", borderWidth: "0px", backgroundTreatment: "gradient" },
  luxury: { font: "Playfair Display", darkMode: true, borderRadius: "0px", buttonStyle: "sharp", spacing: "relaxed", shadow: "lg", letterSpacing: "wide", borderWidth: "1px", backgroundTreatment: "gradient" },
  friendly: { font: "Nunito", darkMode: false, borderRadius: "20px", buttonStyle: "pill", spacing: "normal", shadow: "sm", letterSpacing: "normal", borderWidth: "0px", backgroundTreatment: "plain" },
  professional: { font: "Lato", darkMode: false, borderRadius: "6px", buttonStyle: "rounded", spacing: "normal", shadow: "md", letterSpacing: "normal", borderWidth: "1px", backgroundTreatment: "plain" },
  bold: { font: "Montserrat", darkMode: true, borderRadius: "4px", buttonStyle: "square", spacing: "compact", shadow: "xl", letterSpacing: "tight", borderWidth: "2px", backgroundTreatment: "gradient" },
  elegant: { font: "Cormorant Garamond", darkMode: true, borderRadius: "0px", buttonStyle: "sharp", spacing: "relaxed", shadow: "lg", letterSpacing: "wide", borderWidth: "1px", backgroundTreatment: "gradient" },
  tech: { font: "Inter", darkMode: true, borderRadius: "8px", buttonStyle: "rounded", spacing: "compact", shadow: "md", letterSpacing: "normal", borderWidth: "1px", backgroundTreatment: "plain" },
  editorial: { font: "Playfair Display", darkMode: false, borderRadius: "2px", buttonStyle: "sharp", spacing: "relaxed", shadow: "none", letterSpacing: "wide", borderWidth: "1px", backgroundTreatment: "plain" },
};

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

// Hero2 (Split Editorial) has an image slot too - its right column falls
// back to a decorative gradient with no image, same as Hero1/Hero4 - it was
// just missing from this set, so an uploaded image was silently dropped.
const IMAGE_HERO_COMPONENTS = new Set(["Hero1", "Hero2", "Hero4"]);

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
  { question: "Do you offer consultations?", answer: "Yes - we offer a free initial consultation to understand your needs." },
];

const GENERIC_REASONS = [
  { title: "Expert Team", description: "Experienced professionals dedicated to great results." },
  { title: "Quality First", description: "We never compromise on quality or attention to detail." },
  { title: "Customer Focused", description: "Your satisfaction drives everything we do." },
];

const GENERIC_ABOUT_VALUES = [
  { title: "Excellence", description: "We strive for excellence in everything we do, setting high standards and exceeding expectations." },
  { title: "Integrity", description: "We conduct our business with honesty, transparency, and ethical practices." },
  { title: "Innovation", description: "We embrace new ideas and continuously improve our approach to better serve our clients." },
  { title: "Customer Focus", description: "Our clients are at the heart of every decision we make." },
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

const GENERIC_SOLUTIONS = [
  { title: "Cloud Infrastructure", description: "Scalable, secure infrastructure tailored to your business needs.", icon: "settings" },
  { title: "Custom Software", description: "Purpose-built software that solves your specific challenges.", icon: "star" },
  { title: "IT Consulting", description: "Strategic guidance to help you make the right technology decisions.", icon: "heart" },
];

const GENERIC_INDUSTRIES = [
  { title: "Healthcare", description: "Solutions tailored to the unique needs of healthcare organizations.", icon: "heart" },
  { title: "Finance", description: "Secure, compliant solutions for financial institutions.", icon: "star" },
  { title: "Retail", description: "Tools that help retailers compete and grow.", icon: "settings" },
];

const GENERIC_CASE_STUDIES = [
  { title: "Doubling Conversion Rates", description: "How we helped a growing brand double its online conversion rate in three months.", image: null },
  { title: "A Full Brand Refresh", description: "From dated to distinctive - a complete visual identity overhaul.", image: null },
  { title: "Scaling to 10x Traffic", description: "The strategy behind a tenfold increase in organic traffic.", image: null },
];

const GENERIC_ROOMS = [
  { title: "Deluxe Room", description: "Spacious comfort with a king bed and city views.", price: "$189/night", category: "Deluxe", duration: "", image: null },
  { title: "Executive Suite", description: "A separate living area and premium amenities.", price: "$289/night", category: "Suite", duration: "", image: null },
  { title: "Presidential Suite", description: "Our most luxurious accommodations, with panoramic views.", price: "$549/night", category: "Suite", duration: "", image: null },
];

const GENERIC_AMENITIES = [
  { title: "Pool & Spa", description: "Unwind in our resort-style pool and full-service spa." },
  { title: "Fitness Center", description: "State-of-the-art equipment, open 24 hours." },
  { title: "Free Wi-Fi", description: "High-speed internet throughout the property." },
];

const GENERIC_EXPERIENCES = [
  { title: "Sunset Wine Tasting", description: "An evening of curated wines paired with local bites.", image: null },
  { title: "Guided City Tour", description: "Explore the highlights with a local expert guide.", image: null },
  { title: "Private Chef's Table", description: "An intimate multi-course dinner prepared just for you.", image: null },
];

const GENERIC_TRAVEL_PACKAGES = [
  { title: "Weekend Getaway", description: "A quick escape to recharge, all-inclusive.", price: "$599", category: "Short Trip", level: "", duration: "3 days", image: null },
  { title: "Classic Adventure", description: "Our most popular week-long itinerary.", price: "$1,299", category: "Adventure", level: "", duration: "7 days", image: null },
  { title: "Luxury Escape", description: "Premium accommodations and exclusive experiences.", price: "$2,499", category: "Luxury", level: "", duration: "10 days", image: null },
];

const GENERIC_PROCESS = [
  { title: "Discover", description: "We start by understanding your goals, space, and style.", icon: "1" },
  { title: "Design", description: "We create a tailored plan and bring it to life in concept form.", icon: "2" },
  { title: "Deliver", description: "We execute the plan and hand over a finished space you'll love.", icon: "3" },
];

const GENERIC_PROGRAMS = [
  { title: "Beginner Program", description: "A gentle introduction built for lasting habits.", price: "$49/mo", category: "Beginner", level: "Beginner", duration: "4 weeks", image: null },
  { title: "Performance Program", description: "Structured training to hit your next milestone.", price: "$89/mo", category: "Intermediate", level: "Intermediate", duration: "8 weeks", image: null },
  { title: "Elite Program", description: "Advanced coaching for serious, dedicated athletes.", price: "$149/mo", category: "Advanced", level: "Advanced", duration: "12 weeks", image: null },
];

const GENERIC_FACILITIES = [
  { title: "Modern Exam Rooms", description: "Comfortable, private spaces equipped with the latest technology." },
  { title: "On-Site Lab", description: "Fast, accurate testing without the extra trip." },
  { title: "Accessible Facility", description: "Fully accessible for patients of all mobility levels." },
];

const GENERIC_SKILLS = [
  { title: "Brand Strategy", description: "Defining a clear, compelling identity for growing businesses." },
  { title: "Visual Design", description: "Crafting polished, on-brand visuals across every touchpoint." },
  { title: "Web Development", description: "Building fast, accessible, well-crafted websites." },
];

const GENERIC_BLOG_POSTS = [
  { title: "A Behind-the-Scenes Look", excerpt: "Get a look at how we work and what makes us different.", author: "", date: "", image: null, category: "" },
  { title: "Tips From Our Team", excerpt: "Practical advice based on years of experience.", author: "", date: "", image: null, category: "" },
  { title: "What's New This Season", excerpt: "The latest updates from our business.", author: "", date: "", image: null, category: "" },
];

// BlogPreview/BlogGrid use post.id as a React key and link to /blog/{slug} -
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
  { id: "solutions", label: "Solutions" },
  { id: "case-studies", label: "Case Studies" },
  { id: "industries", label: "Industries" },
  { id: "agents", label: "Agents" },
  { id: "location", label: "Location" },
  { id: "our-story", label: "Our Story" },
  { id: "rooms", label: "Rooms" },
  { id: "amenities", label: "Amenities" },
  { id: "experiences", label: "Experiences" },
  { id: "travel-packages", label: "Travel Packages" },
  { id: "process", label: "Process" },
  { id: "programs", label: "Programs" },
  { id: "trainers", label: "Trainers" },
  { id: "doctors", label: "Doctors" },
  { id: "facilities", label: "Facilities" },
  { id: "instructors", label: "Instructors" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
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
  solutions: { headline: "Our Solutions", subheadline: "How we solve problems for businesses like yours." },
  "case-studies": { headline: "Case Studies", subheadline: "Real results for real clients." },
  industries: { headline: "Industries We Serve", subheadline: "Specialized expertise across sectors." },
  agents: { headline: "Meet Our Agents", subheadline: "Local experts ready to help." },
  location: { headline: "Find Us", subheadline: "Come say hello." },
  "our-story": { headline: "Our Story", subheadline: "How it all began." },
  rooms: { headline: "Rooms & Suites", subheadline: "Comfort designed around you." },
  amenities: { headline: "Amenities", subheadline: "Everything you need for a great stay." },
  experiences: { headline: "Experiences", subheadline: "Curated moments you won't forget." },
  "travel-packages": { headline: "Travel Packages", subheadline: "Thoughtfully planned trips, ready to book." },
  process: { headline: "Our Process", subheadline: "How we bring your vision to life." },
  programs: { headline: "Our Programs", subheadline: "Find the program that's right for you." },
  trainers: { headline: "Meet Our Trainers", subheadline: "The coaches who keep you moving." },
  doctors: { headline: "Meet Our Doctors", subheadline: "Experienced, compassionate care." },
  facilities: { headline: "Our Facilities", subheadline: "A comfortable, modern space for your care." },
  instructors: { headline: "Meet Your Instructors", subheadline: "Learn from experienced professionals." },
  skills: { headline: "Skills & Expertise", subheadline: "What I bring to every project." },
  projects: { headline: "Selected Projects", subheadline: "A look at recent work." },
  experience: { headline: "Experience", subheadline: "Where I've been and what I've learned." },
};

// Maps the various page-specific section ids (from designOptions.ts's
// PAGE_SECTIONS) onto the handful of generic, content-bearing sections this
// preview (and the per-page content editor in QuestionnairePage.tsx) know
// how to render/edit. Unmapped ids are simply skipped - this is an
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
  // "values" is the About page's own Values/mission section (rendered via
  // AboutValues, matching the server) - it used to alias to the same type
  // as "why_choose_us"/"benefits" (a completely different component used
  // by other pages' "reasons to choose us" sections), so the live preview
  // showed the wrong section entirely for About's Values checkbox.
  values: "about_values",
  about_values: "about_values",
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
  "solutions-grid": "solutions",
  "case-studies-grid": "case_studies",
  "industries-grid": "industries",
  "rooms-grid": "rooms",
  "amenities-grid": "amenities",
  "experiences-grid": "experiences",
  "packages-grid": "travel_packages",
  "process-steps": "process",
  "programs-grid": "programs",
  "doctors-grid": "doctors",
  "facilities-grid": "facilities",
  "instructors-grid": "instructors",
  "skills-grid": "skills",
  "projects-grid": "portfolio",
  "experience-timeline": "timeline",
};

export function sectionType(rawId: string): string | undefined {
  return SECTION_ALIASES[rawId];
}

interface PageContentOverride {
  hero?: {
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    socialProofText?: string;
    socialProofSubtext?: string;
    secondaryCtaText?: string;
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;
  };
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
  aboutValues: Array<{ title: string; description: string; icon?: string }>;
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
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactContent: { heading?: string; intro?: string; submitButtonText?: string; infoHeading?: string; infoSubtitle?: string };
  projectId?: string;
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
          component: resolveComponent("why_choose_us", ctx.components.why_choose_us),
          props: { title: "Why Choose Us", subtitle: "What sets us apart", reasons: ctx.reasons },
          order: order++,
        });
        break;
      case "about_values":
        sections.push({
          id: "about_values",
          component: resolveComponent("about_values", ctx.components.about_values),
          props: {
            title: "Our Values",
            values: ctx.aboutValues,
          },
          order: order++,
        });
        break;
      case "portfolio":
        sections.push({
          id: "portfolio",
          component: resolveComponent("portfolio", ctx.components.portfolio),
          // Portfolio1/2/3 all take a `projects` prop, not `items`, and
          // Portfolio3 also uses `category` to build its filter pills -
          // without a default every card/pill would show "undefined".
          props: {
            title: "Our Work",
            projects: ctx.portfolio.map((p) => ({ category: "Featured", ...p })),
          },
          order: order++,
        });
        break;
      case "gallery": {
        // Gallery1/2 take `images` as a plain array of URL strings. With
        // nothing uploaded yet, that array was simply empty - .map() over
        // it renders nothing at all below the heading, so the whole grid
        // looked missing/invisible instead of showing the same placeholder
        // tiles the real generated site falls back to (see
        // _buildGallerySections server-side, which fills 9 nulls).
        const galleryUrls = ctx.gallery.length > 0 ? ctx.gallery.map((g) => g.url) : Array.from({ length: 9 }, () => null as unknown as string);
        sections.push({
          id: "gallery",
          component: resolveComponent("gallery", ctx.components.gallery),
          props: { title: "Gallery", images: galleryUrls },
          order: order++,
        });
        break;
      }
      case "team":
        sections.push({
          id: "team",
          component: resolveComponent("team", ctx.components.team),
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
          component: resolveComponent("menu_items", ctx.components.menu_items),
          props: { title: "Our Menu", subtitle: "Carefully crafted selections", items: ctx.menuItems },
          order: order++,
        });
        break;
      case "daily_specials":
        sections.push({
          id: "daily_specials",
          component: resolveComponent("daily_specials", ctx.components.daily_specials),
          props: { title: "Today's Specials", subtitle: "Chef's picks for today", items: ctx.dailySpecials },
          order: order++,
        });
        break;
      case "stats":
        sections.push({
          id: "stats",
          component: resolveComponent("stats", ctx.components.stats),
          props: { title: "By the Numbers", stats: ctx.stats },
          order: order++,
        });
        break;
      case "timeline":
        sections.push({
          id: "timeline",
          component: resolveComponent("timeline", ctx.components.timeline),
          props: { title: "Our Journey", milestones: ctx.timeline },
          order: order++,
        });
        break;
      case "contact":
        sections.push({
          id: "contact",
          component: resolveComponent("contact", ctx.components.contact),
          props: {
            title: ctx.contactContent.heading?.trim() || "Get In Touch",
            email: ctx.contactEmail,
            phone: ctx.contactPhone,
            address: ctx.contactAddress,
            intro: ctx.contactContent.intro?.trim() || undefined,
            submitButtonText: ctx.contactContent.submitButtonText?.trim() || undefined,
            projectId: ctx.projectId,
          },
          order: order++,
        });
        break;
      case "map":
        sections.push({
          id: "map",
          component: resolveComponent("map", ctx.components.map),
          props: { title: "Find Us", address: ctx.contactAddress },
          order: order++,
        });
        break;
      case "contact_info":
        sections.push({
          id: "contact_info",
          component: resolveComponent("contact_info", ctx.components.contact_info),
          props: {
            title: ctx.contactContent.infoHeading?.trim() || undefined,
            subtitle: ctx.contactContent.infoSubtitle?.trim() || undefined,
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
          component: resolveComponent("business_hours", ctx.components.business_hours),
          props: { title: "Business Hours", hours: ctx.businessHours },
          order: order++,
        });
        break;
      case "agents":
        sections.push({
          id: "agents",
          component: resolveComponent("agents", ctx.components.agents),
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
          component: resolveComponent("team", ctx.components.team),
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
          component: resolveComponent("course_grid", ctx.components.course_grid),
          props: { title: "Our Courses", subtitle: "Pick the path that's right for you", courses: ctx.courses },
          order: order++,
        });
        break;
      case "destination_grid":
        sections.push({
          id: "destination_grid",
          component: resolveComponent("destination_grid", ctx.components.destination_grid),
          props: { title: "Popular Destinations", subtitle: "Where our travelers love to go", destinations: ctx.destinations },
          order: order++,
        });
        break;
      case "travel_deals":
        sections.push({
          id: "travel_deals",
          component: resolveComponent("travel_deals", ctx.components.travel_deals),
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
      case "solutions":
        sections.push({
          id: "solutions",
          component: resolveComponent("services", ctx.components.services),
          props: { title: "Our Solutions", subtitle: "How we solve problems for businesses like yours", services: ctx.solutions },
          order: order++,
        });
        break;
      case "case_studies":
        sections.push({
          id: "case_studies",
          component: resolveComponent("portfolio", ctx.components.portfolio),
          props: {
            title: "Case Studies",
            projects: ctx.caseStudies.map((c) => ({ category: "Case Study", ...c })),
          },
          order: order++,
        });
        break;
      case "industries":
        sections.push({
          id: "industries",
          component: resolveComponent("services", ctx.components.services),
          props: { title: "Industries We Serve", subtitle: "Specialized expertise across sectors", services: ctx.industries },
          order: order++,
        });
        break;
      case "rooms":
        sections.push({
          id: "rooms",
          component: resolveComponent("course_grid", ctx.components.course_grid),
          props: { title: "Rooms & Suites", subtitle: "Comfort designed around you", courses: ctx.rooms },
          order: order++,
        });
        break;
      case "amenities":
        sections.push({
          id: "amenities",
          component: resolveComponent("why_choose_us", ctx.components.why_choose_us),
          props: { title: "Amenities", subtitle: "Everything you need for a great stay", reasons: ctx.amenities },
          order: order++,
        });
        break;
      case "experiences":
        sections.push({
          id: "experiences",
          component: resolveComponent("portfolio", ctx.components.portfolio),
          props: {
            title: "Experiences",
            projects: ctx.experiences.map((e) => ({ category: "Featured", ...e })),
          },
          order: order++,
        });
        break;
      case "travel_packages":
        sections.push({
          id: "travel_packages",
          component: resolveComponent("course_grid", ctx.components.course_grid),
          props: { title: "Travel Packages", subtitle: "Thoughtfully planned trips, ready to book", courses: ctx.travelPackages },
          order: order++,
        });
        break;
      case "process":
        sections.push({
          id: "process",
          component: resolveComponent("process", ctx.components.process),
          props: { title: "Our Process", subtitle: "How we bring your vision to life", steps: ctx.process },
          order: order++,
        });
        break;
      case "programs":
        sections.push({
          id: "programs",
          component: resolveComponent("course_grid", ctx.components.course_grid),
          props: { title: "Our Programs", subtitle: "Find the program that's right for you", courses: ctx.programs },
          order: order++,
        });
        break;
      case "doctors":
        sections.push({
          id: "doctors",
          component: resolveComponent("doctors", ctx.components.doctors),
          props: {
            title: "Meet Our Doctors",
            subtitle: "Experienced, compassionate care",
            doctors: ctx.team.map((t) => ({ name: t.name, specialty: t.role, image: t.avatar, description: t.bio })),
          },
          order: order++,
        });
        break;
      case "facilities":
        sections.push({
          id: "facilities",
          component: resolveComponent("why_choose_us", ctx.components.why_choose_us),
          props: { title: "Our Facilities", subtitle: "A comfortable, modern space for your care", reasons: ctx.facilities },
          order: order++,
        });
        break;
      case "instructors":
        sections.push({
          id: "instructors",
          component: resolveComponent("instructors", ctx.components.instructors),
          props: {
            title: "Meet Your Instructors",
            subtitle: "Learn from experienced professionals",
            instructors: ctx.team.map((t) => ({ name: t.name, specialty: t.role, avatar: t.avatar })),
          },
          order: order++,
        });
        break;
      case "skills":
        sections.push({
          id: "skills",
          component: resolveComponent("why_choose_us", ctx.components.why_choose_us),
          props: { title: "Skills & Expertise", subtitle: "What I bring to every project", reasons: ctx.skills },
          order: order++,
        });
        break;
      case "about_story":
        sections.push({
          id: "about_story",
          component: resolveComponent("about_story", ctx.components.about_story),
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
 * their choices before generation. This is a client-side approximation -
 * not the same content engine as MockAIProvider - but it uses the exact
 * same theme + component resolution rules and the real WebsiteRenderer, so
 * colors, fonts, layout variants, and section choices all match what will
 * actually be generated.
 */
export function buildPreviewSpec(config: any, projectId?: string) {
  const business = config.business || {};
  const theme = config.theme || {};
  const components = config.components || {};
  const content = config.content || {};
  const logo = config.branding?.logo || null;

  const businessName = (business.name || "").trim() || "Your Business";
  const typography = TYPOGRAPHY_OPTIONS.find((t) => t.id === theme.typography);

  const primaryColor = theme.primaryColor || "#2563EB";
  const secondaryColor = theme.secondaryColor || "#1E40AF";

  // Each of the 12 design styles used to only change the font and border
  // radius here - every other knob (spacing, shadow depth, letter spacing,
  // border width, light/dark mode, gradient vs. plain background) was
  // hardcoded to the same "normal" value regardless of style, so switching
  // styles in the live preview barely looked different. This profile table
  // mirrors the server's _buildTheme exactly, so the preview you configure
  // against is the theme you actually get.
  const styleKey = (theme.style || "modern").toLowerCase();
  const profile = STYLE_THEME_PROFILES[styleKey] || STYLE_THEME_PROFILES.modern;

  // Respect an explicit Light/Dark choice; "auto" (or unset) falls back to
  // whatever the design style normally uses.
  const mode = (theme.mode || "auto").toLowerCase();
  const darkMode = mode === "dark" ? true : mode === "light" ? false : profile.darkMode;

  const fontFamily = typography?.fontFamily || profile.font || "Inter";
  const borderRadius = profile.borderRadius || "8px";

  // An explicit accent choice (Minimal/Bold/Gradient/Monochrome) wins over
  // the design style's own default button shape / border / background
  // treatment, mirroring the server's _buildTheme.
  //
  // The button treatment used to only reach a handful of `bg-primary`
  // buttons - most hero CTAs actually use bg-foreground or bg-background,
  // so the accent choice barely showed up anywhere. WebsiteRenderer now
  // targets every CTA button pattern in the library, and each accent has
  // its own fill AND shadow treatment (not just corner radius/border), so
  // the difference reads clearly at a glance instead of needing a
  // side-by-side close-up to spot:
  //   Minimal    - soft round, solid fill, no shadow: quiet and clean.
  //   Bold       - square, solid fill, hard offset "brutalist" shadow that
  //                shifts on hover: loud and graphic.
  //   Gradient   - pill, the button itself is gradient-filled (not just the
  //                page background) with a soft colored glow: vivid, modern.
  //   Monochrome - square, transparent/outlined, fills in on hover, no
  //                shadow: understated and refined.
  const accentStyleMap: Record<string, { buttonStyle: string; borderWidth: string; backgroundTreatment: string; buttonFill: string; buttonShadow: string }> = {
    minimal: { buttonStyle: "rounded", borderWidth: "1px", backgroundTreatment: "plain", buttonFill: "solid", buttonShadow: "none" },
    bold: { buttonStyle: "square", borderWidth: "3px", backgroundTreatment: "plain", buttonFill: "solid", buttonShadow: "offset" },
    gradient: { buttonStyle: "pill", borderWidth: "0px", backgroundTreatment: "gradient", buttonFill: "gradient", buttonShadow: "glow" },
    monochrome: { buttonStyle: "sharp", borderWidth: "2px", backgroundTreatment: "plain", buttonFill: "outline", buttonShadow: "none" },
  };
  const accent = accentStyleMap[(theme.accentStyle || "").toLowerCase()];

  // Both light AND dark mode get a subtle tint of the chosen primary color
  // instead of a flat neutral, so the brand color is visible across the
  // whole page, not just on buttons. Dark mode used to hardcode the exact
  // same "#0F0F0F"/"#262626"/"#333333" for every style, so any two
  // dark-mode styles (Premium, Luxury, Bold, Elegant, Tech) rendered an
  // identical page background and only differed by a small accent color -
  // easy to miss, especially between styles with muted/desaturated
  // primaries like Premium's crimson and Luxury's gold. Mirrors the
  // server's _buildTheme.
  const backgroundColor = darkMode ? mixColor(primaryColor, 0.93, "black") : mixColor(primaryColor, 0.94);
  const mutedColor = darkMode ? mixColor(primaryColor, 0.85, "black") : mixColor(primaryColor, 0.88);
  const borderColor = darkMode ? mixColor(primaryColor, 0.72, "black") : mixColor(primaryColor, 0.8);
  const foregroundColor = darkMode ? "#F5F5F5" : "#1A1A1A";

  const shadowMap: Record<string, string> = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
  };

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
    buttonStyle: accent?.buttonStyle || profile.buttonStyle,
    spacing: profile.spacing,
    shadow: shadowMap[profile.shadow],
    letterSpacing: profile.letterSpacing,
    borderWidth: accent?.borderWidth || profile.borderWidth,
    backgroundTreatment: accent?.backgroundTreatment || profile.backgroundTreatment,
    buttonFill: accent?.buttonFill || "solid",
    buttonShadow: accent?.buttonShadow || "none",
    // Per-section color overrides, keyed by component category - see
    // WebsiteRenderer.tsx's buildSectionStyleOverride, which is what
    // actually applies these.
    sectionColors: config.sectionColors || {},
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
      ? { headline: `Welcome to ${businessName}`, subheadline: business.description?.trim() || "Tell your customers what makes your business special - this updates live as you type." }
      : PAGE_HERO_COPY[pageId] || { headline: AVAILABLE_PAGES.find((p) => p.id === pageId)?.label || pageId, subheadline: `Learn more about ${businessName}.` };

    // Only Home gets the real Hero1-5 component the client picked - every
    // other page gets the compact PageHero title bar. These used to share
    // one hero section built with the same component + props for every
    // page, which meant every single page in the site rendered as a
    // repeat of the Home hero with different text.
    const heroSection = isHome
      ? {
        id: "hero",
        component: heroComponent,
        props: {
          headline: pageContent?.hero?.headline?.trim() || defaultCopy.headline,
          subheadline: pageContent?.hero?.subheadline?.trim() || defaultCopy.subheadline,
          ctaText: pageContent?.hero?.ctaText?.trim() || "Get Started",
          ctaLink: "/contact",
          badge: "Welcome",
          logo,
          // Hero1 (Full-Screen Statement), Hero2 (Split Editorial), and
          // Hero4 (Image-Focused) are the layouts built around a photo -
          // the other layouts are text-first, so don't hand them a
          // background image even if one was uploaded while a different
          // hero style was selected.
          backgroundImage: IMAGE_HERO_COMPONENTS.has(heroComponent) ? config.branding?.bannerImages?.[0] || null : null,
          // Hero2's social-proof line and Hero3's second button/stats bar
          // - harmless no-ops for every other hero, which just ignores
          // whatever extra props it doesn't read.
          socialProofText: pageContent?.hero?.socialProofText?.trim() || undefined,
          socialProofSubtext: pageContent?.hero?.socialProofSubtext?.trim() || undefined,
          secondaryCtaText: pageContent?.hero?.secondaryCtaText?.trim() || undefined,
          stats: [1, 2, 3].some((n) => (pageContent?.hero as Record<string, string> | undefined)?.[`stat${n}Value`] || (pageContent?.hero as Record<string, string> | undefined)?.[`stat${n}Label`])
            ? [1, 2, 3].map((n) => ({
              value: (pageContent?.hero as Record<string, string> | undefined)?.[`stat${n}Value`]?.trim() || ["500+", "98%", "24/7"][n - 1],
              label: (pageContent?.hero as Record<string, string> | undefined)?.[`stat${n}Label`]?.trim() || ["Projects", "Satisfaction", "Support"][n - 1],
            }))
            : undefined,
        },
        order: 1,
      }
      : {
        id: "page_hero",
        component: "PageHero",
        props: {
          title: pageContent?.hero?.headline?.trim() || defaultCopy.headline,
          subtitle: pageContent?.hero?.subheadline?.trim() || defaultCopy.subheadline,
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
      aboutValues: content.aboutValues?.length ? content.aboutValues : GENERIC_ABOUT_VALUES,
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
      solutions: content.solutions?.length ? content.solutions : GENERIC_SOLUTIONS,
      industries: content.industries?.length ? content.industries : GENERIC_INDUSTRIES,
      caseStudies: content.caseStudies?.length ? content.caseStudies : GENERIC_CASE_STUDIES,
      rooms: content.rooms?.length ? content.rooms : GENERIC_ROOMS,
      amenities: content.amenities?.length ? content.amenities : GENERIC_AMENITIES,
      experiences: content.experiences?.length ? content.experiences : GENERIC_EXPERIENCES,
      travelPackages: content.travelPackages?.length ? content.travelPackages : GENERIC_TRAVEL_PACKAGES,
      process: content.process?.length ? content.process : GENERIC_PROCESS,
      programs: content.programs?.length ? content.programs : GENERIC_PROGRAMS,
      facilities: content.facilities?.length ? content.facilities : GENERIC_FACILITIES,
      skills: content.skills?.length ? content.skills : GENERIC_SKILLS,
      contactPhone: business.phone?.trim() || "+1 (555) 123-4567",
      contactEmail: business.email?.trim() || "hello@example.com",
      contactAddress: business.address?.trim() || "123 Business St, Suite 100",
      contactContent: config.content?.contact || {},
      projectId,
      pageContent,
    };

    const bodySections = buildBodySections(config.sections?.[pageId] || [], ctx);

    const navbarSection = {
      id: "navbar",
      component: navbarComponent,
      props: { logo, brandName: businessName, links: navLinks },
      order: 0,
    };

    const footerContent = config.content?.footer || {};
    const footerSection = {
      id: "footer",
      component: footerComponent,
      props: {
        brandName: businessName,
        description: footerContent.tagline?.trim() || business.description?.trim() || `${businessName} - professional services you can trust.`,
        links: navLinks,
        socialLinks: (business.socialLinks || []).map((l: { platform: string; url: string }) => ({ platform: l.platform, href: l.url })),
        copyrightText: footerContent.copyrightText?.trim() || undefined,
        ctaHeading: footerContent.ctaHeading?.trim() || undefined,
        ctaSubtext: footerContent.ctaSubtext?.trim() || undefined,
        ctaButtonText: footerContent.ctaButtonText?.trim() || undefined,
        // Was hardcoded to "#contact" inside Footer1 itself - a fragment
        // with no matching element anywhere on the page, so the button
        // didn't go anywhere when clicked. Same target Hero's CTA already
        // uses above.
        ctaLink: "/contact",
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
