import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectApi } from "@/api/projectApi";
import { BUSINESS_TYPES, type BusinessTypeConfig } from "@/config/businessTypes";

const ALL_INDUSTRY_OPTIONS = [
  "Fashion",
  "Electronics",
  "Grocery",
  "Furniture",
  "Beauty",
  "Sports",
  "Jewelry",
  "Books",
  "Restaurant",
  "Healthcare",
  "Education",
  "Real Estate",
  "Travel",
  "Pet Store",
  "Automotive",
  "Home Services",
  "Other",
];

const TARGET_AUDIENCE_OPTIONS = ["Everyone", "Men", "Women", "Kids", "Businesses B2B"];
const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];
const SHIPPING_TYPE_OPTIONS = ["Domestic Only", "International", "Both"];
const THEME_STYLE_OPTIONS = [
  { value: "Modern", desc: "Clean, bold, contemporary" },
  { value: "Luxury", desc: "Premium, sophisticated" },
  { value: "Minimal", desc: "Simple, focused, elegant" },
  { value: "Elegant", desc: "Graceful, refined" },
  { value: "Dark", desc: "Bold, dramatic" },
  { value: "Friendly", desc: "Warm, approachable" },
  { value: "Professional", desc: "Corporate, trustworthy" },
  { value: "Playful", desc: "Fun, energetic" },
];
const FONT_STYLE_OPTIONS = [
  "Inter",
  "Poppins",
  "Montserrat",
  "Playfair Display",
  "Roboto",
  "Open Sans",
  "Lora",
  "Merriweather",
  "Nunito",
  "Source Sans Pro",
  "Cormorant Garamond",
  "Quicksand",
  "Barlow",
  "Lato",
];
const BUTTON_STYLE_OPTIONS = ["Rounded", "Square", "Pill", "Soft", "Minimal"];
const BORDER_RADIUS_OPTIONS = ["None", "Small", "Medium", "Large"];
const ANIMATION_LEVEL_OPTIONS = ["None", "Subtle", "Moderate", "Elaborate"];
const SOCIAL_PLATFORMS = ["Facebook", "Instagram", "Twitter/X", "LinkedIn", "YouTube", "TikTok"];

const COMMON_FEATURES = [
  "Product Search",
  "Product Filters",
  "Shopping Cart",
  "Wishlist",
  "Compare Products",
  "Coupon System",
  "Discount Offers",
  "Related Products",
  "Recently Viewed",
  "Product Reviews",
  "Live Chat",
  "Newsletter",
  "Inventory Management",
  "Order Tracking",
  "Gift Cards",
  "Multi-language",
  "Multi-currency",
];

interface Step {
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  { title: "Business Information", subtitle: "Tell us about your business" },
  { title: "Target Audience", subtitle: "Who are your customers?" },
  { title: "Website Pages", subtitle: "Which pages do you need?" },
  { title: "Categories", subtitle: "Product/service categories" },
  { title: "Product Information", subtitle: "Tell us about your products" },
  { title: "Features", subtitle: "Select the features you need" },
  { title: "Payments", subtitle: "How will customers pay?" },
  { title: "Shipping", subtitle: "Shipping configuration" },
  { title: "Branding", subtitle: "Upload your brand assets" },
  { title: "Design Preferences", subtitle: "Customize your look" },
  { title: "Homepage Sections", subtitle: "What goes on your homepage?" },
  { title: "SEO", subtitle: "Search engine optimization" },
];

function CheckboxGroup({
  options,
  value,
  onChange,
  disabledOptions,
  highlightedOptions,
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  disabledOptions?: string[];
  highlightedOptions?: string[];
}) {
  const toggle = (item: string) => {
    if (disabledOptions?.includes(item)) return;
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = value.includes(opt);
        const isDisabled = disabledOptions?.includes(opt);
        const isHighlighted = highlightedOptions?.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-all ${checked
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : isDisabled
                ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                : isHighlighted
                  ? "bg-purple-50 border-purple-300 text-purple-700"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
          >
            <span
              className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300"
                }`}
            >
              {checked && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
  renderOption,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  renderOption?: (opt: string) => React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-all ${value === opt
            ? "bg-blue-50 border-blue-500 text-blue-700"
            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
        >
          <span
            className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${value === opt ? "border-blue-500" : "border-gray-300"
              }`}
          >
            {value === opt && <span className="w-2 h-2 rounded-full bg-blue-500" />}
          </span>
          <span>{renderOption ? renderOption(opt) : opt}</span>
        </button>
      ))}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${readOnly ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""
          }`}
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    </div>
  );
}

function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-blue-500" : "bg-gray-300"
          }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : ""
            }`}
        />
      </button>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
        />
      </div>
    </div>
  );
}

function FileUploadField({
  label,
  accept,
  multiple = false,
  files,
  onChange,
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  files: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileList = Array.isArray(files) ? files : files ? [files] : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (multiple) {
      onChange(e.target.files ? Array.from(e.target.files) : null);
    } else {
      onChange(e.target.files?.[0] || null);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        {fileList.length > 0 ? (
          <div className="space-y-1">
            {fileList.map((f, i) => (
              <p key={i} className="text-sm text-green-600 font-medium">
                {f.name}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
        )}
      </div>
    </div>
  );
}

function DynamicQuestionField({
  question,
  value,
  onChange,
}: {
  question: BusinessTypeConfig["productQuestions"][number];
  value: any;
  onChange: (val: any) => void;
}) {
  switch (question.type) {
    case "select":
      return (
        <SelectField
          label={question.label}
          value={value || ""}
          onChange={onChange}
          options={question.options || []}
          placeholder="Select..."
        />
      );
    case "multiselect":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{question.label}</label>
          <CheckboxGroup
            options={question.options || []}
            value={value || []}
            onChange={onChange}
          />
        </div>
      );
    case "toggle":
      return <ToggleField label={question.label} value={!!value} onChange={onChange} />;
    case "text":
      return (
        <TextField
          label={question.label}
          value={value || ""}
          onChange={onChange}
          placeholder={question.placeholder || ""}
        />
      );
    default:
      return null;
  }
}

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((s: any) => s.project);
  const enquiry = currentProject?.enquiry;

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const answersRef = useRef<Record<string, any>>({
    businessName: enquiry?.businessName || "",
    businessDescription: "",
    industry: enquiry?.businessType || "",
    businessLocation: "",
    targetAudience: "",
    targetCountries: "",
    currency: "USD",
    pages: ["Home"],
    categories: [],
    productInfo: {},
    features: [],
    paymentMethods: [],
    shippingType: "",
    shippingOptions: [],
    logo: null,
    productImages: [],
    bannerImages: [],
    brandGuidelines: "",
    themeStyle: "Modern",
    primaryColor: "#2563EB",
    secondaryColor: "#1E40AF",
    fontStyle: "Inter",
    buttonStyle: "Rounded",
    borderRadius: "Medium",
    animationLevel: "Subtle",
    homepageSections: [],
    seoKeywords: "",
    seoLocation: "",
    metaTitle: "",
    metaDescription: "",
    socialMediaLinks: SOCIAL_PLATFORMS.map((p) => ({ platform: p, url: "" })),
  });

  const [, forceRender] = useState(0);
  const forceUpdate = useCallback(() => forceRender((n) => n + 1), []);

  const industry = getAnswer("industry") as string;
  const config: BusinessTypeConfig | undefined = industry ? BUSINESS_TYPES[industry] : undefined;

  useEffect(() => {
    if (!currentProject) {
      navigate("/");
    }
  }, [currentProject, navigate]);

  useEffect(() => {
    if (config) {
      const defaults = {
        features: [...config.suggestedFeatures, ...COMMON_FEATURES.slice(0, 6)],
        paymentMethods: config.paymentMethods,
        shippingOptions: config.shippingOptions,
        homepageSections: config.homepageSections,
        themeStyle: config.designStyle.themeStyle,
        fontStyle: config.designStyle.fontStyle,
        buttonStyle: config.designStyle.buttonStyle,
        borderRadius: config.designStyle.borderRadius,
        primaryColor: config.colorSchemes[0]?.primary || "#2563EB",
        secondaryColor: config.colorSchemes[0]?.secondary || "#1E40AF",
      };
      Object.entries(defaults).forEach(([key, val]) => {
        answersRef.current[key] = val;
      });
      const meta = config.metaDefaults;
      if (meta) {
        const name = getAnswer("businessName");
        answersRef.current.metaTitle = meta.titleTemplate.replace("{brandName}", name || "My Brand");
        answersRef.current.metaDescription = meta.descriptionTemplate.replace("{brandName}", name || "My Brand").replace("{category}", config.categories[0]?.name || "products");
      }
      forceUpdate();
    }
  }, [industry, config, forceUpdate]);

  function getAnswer(key: string) {
    return answersRef.current[key];
  }

  function setAnswer(key: string, value: any) {
    answersRef.current[key] = value;
    forceUpdate();
  }

  const canNext = (): boolean => {
    switch (currentStep) {
      case 0:
        return !!getAnswer("businessDescription") && !!getAnswer("industry");
      case 1:
        return !!getAnswer("targetAudience") && !!getAnswer("currency");
      case 2:
        return (getAnswer("pages") as string[]).length > 0;
      case 3:
        return (getAnswer("categories") as string[]).length > 0;
      case 4:
        return true;
      case 5:
        return (getAnswer("features") as string[]).length > 0;
      case 6:
        return (getAnswer("paymentMethods") as string[]).length > 0;
      case 7:
        return !!getAnswer("shippingType") && (getAnswer("shippingOptions") as string[]).length > 0;
      case 8:
        return true;
      case 9:
        return !!getAnswer("themeStyle") && !!getAnswer("primaryColor");
      case 10:
        return (getAnswer("homepageSections") as string[]).length > 0;
      case 11:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const toSlug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "");

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const projectId = currentProject.projectId;
      const raw = { ...answersRef.current };
      delete raw.logo;
      delete raw.productImages;
      delete raw.bannerImages;

      const answers: Record<string, any> = { ...raw };
      const slugArrays = [
        "pages",
        "categories",
        "features",
        "paymentMethods",
        "shippingOptions",
        "homepageSections",
      ];
      slugArrays.forEach((key) => {
        if (Array.isArray(answers[key])) {
          answers[key] = answers[key].map(toSlug);
        }
      });

      console.log("Files to upload:", {
        logo: answersRef.current.logo,
        productImages: answersRef.current.productImages,
        bannerImages: answersRef.current.bannerImages,
      });

      await projectApi.saveQuestionnaire(projectId, answers);
      await projectApi.generate(projectId);
      navigate(`/preview/${projectId}`);
    } catch (err: any) {
      console.error("Failed:", err);
      alert("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const getPageOptions = () => {
    const base = ["Home", "Shop", "About Us", "Contact Us", "Blog", "FAQ", "Cart", "Checkout"];
    const special: Record<string, string[]> = {
      Restaurant: ["Menu", "Reservations"],
      Healthcare: ["Services", "Book Appointment"],
      "Real Estate": ["Properties", "Listings"],
      Education: ["Courses", "Admissions"],
      Travel: ["Destinations", "Itineraries"],
    };
    const extra = special[industry] || [];
    return [...extra, ...base];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <TextField
              label="Business Name"
              value={getAnswer("businessName")}
              onChange={() => { }}
              readOnly
            />
            <TextareaField
              label="What does your business sell?"
              value={getAnswer("businessDescription")}
              onChange={(v) => setAnswer("businessDescription", v)}
              placeholder="Describe your products or services..."
            />
            <SelectField
              label="Industry"
              value={getAnswer("industry")}
              onChange={(v) => setAnswer("industry", v)}
              options={ALL_INDUSTRY_OPTIONS}
              placeholder="Select industry"
            />
            <TextField
              label="Business Location"
              value={getAnswer("businessLocation")}
              onChange={(v) => setAnswer("businessLocation", v)}
              placeholder="City, State, Country"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <RadioGroup
                options={TARGET_AUDIENCE_OPTIONS}
                value={getAnswer("targetAudience")}
                onChange={(v) => setAnswer("targetAudience", v)}
              />
            </div>
            <TextField
              label="Which countries do you sell to?"
              value={getAnswer("targetCountries")}
              onChange={(v) => setAnswer("targetCountries", v)}
              placeholder="e.g. USA, Canada, UK"
            />
            <SelectField
              label="Currency"
              value={getAnswer("currency")}
              onChange={(v) => setAnswer("currency", v)}
              options={CURRENCY_OPTIONS}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Home is always included. Industry-specific pages are highlighted.</p>
            <CheckboxGroup
              options={getPageOptions()}
              value={getAnswer("pages")}
              onChange={(v) => setAnswer("pages", v)}
              disabledOptions={["Home"]}
              highlightedOptions={
                config
                  ? [
                    ...(config === BUSINESS_TYPES.Restaurant ? ["Menu", "Reservations"] : []),
                    ...(config === BUSINESS_TYPES.Healthcare ? ["Services", "Book Appointment"] : []),
                    ...(config === BUSINESS_TYPES["Real Estate"] ? ["Properties", "Listings"] : []),
                    ...(config === BUSINESS_TYPES.Education ? ["Courses", "Admissions"] : []),
                    ...(config === BUSINESS_TYPES.Travel ? ["Destinations", "Itineraries"] : []),
                  ]
                  : []
              }
            />
          </div>
        );

      case 3:
        if (!config) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Please select an industry first (Step 1).</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <div>
                <p className="text-sm text-gray-500">
                  Select the categories for your <span className="font-medium text-gray-700">{config.label}</span> business.
                </p>
              </div>
            </div>
            <CheckboxGroup
              options={config.categories.map((c) => c.name)}
              value={getAnswer("categories")}
              onChange={(v) => setAnswer("categories", v)}
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              {config.categories.map((cat) => (
                <div key={cat.name} className="text-xs text-gray-400 pl-6">
                  {cat.description}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        if (!config) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Please select an industry first (Step 1).</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <p className="text-sm text-gray-500">
                Answer these questions about your <span className="font-medium text-gray-700">{config.label}</span> products.
              </p>
            </div>
            {config.productQuestions.map((q) => {
              const productInfo = getAnswer("productInfo") || {};
              return (
                <DynamicQuestionField
                  key={q.key}
                  question={q}
                  value={productInfo[q.key]}
                  onChange={(val) => {
                    const updated = { ...productInfo, [q.key]: val };
                    setAnswer("productInfo", updated);
                  }}
                />
              );
            })}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Suggested features for your industry are pre-selected.</p>
            <CheckboxGroup
              options={[...new Set([...(config?.suggestedFeatures || []), ...COMMON_FEATURES])]}
              value={getAnswer("features")}
              onChange={(v) => setAnswer("features", v)}
              highlightedOptions={config?.suggestedFeatures || []}
            />
          </div>
        );

      case 6:
        if (!config) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Please select an industry first (Step 1).</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <p className="text-sm text-gray-500">
                Recommended payment methods for <span className="font-medium text-gray-700">{config.label}</span>.
              </p>
            </div>
            <CheckboxGroup
              options={config.paymentMethods}
              value={getAnswer("paymentMethods")}
              onChange={(v) => setAnswer("paymentMethods", v)}
            />
          </div>
        );

      case 7:
        if (!config) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Please select an industry first (Step 1).</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Type</label>
              <RadioGroup
                options={SHIPPING_TYPE_OPTIONS}
                value={getAnswer("shippingType")}
                onChange={(v) => setAnswer("shippingType", v)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Options</label>
              <CheckboxGroup
                options={config.shippingOptions}
                value={getAnswer("shippingOptions")}
                onChange={(v) => setAnswer("shippingOptions", v)}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <FileUploadField
              label="Logo"
              accept="image/*"
              files={getAnswer("logo")}
              onChange={(v) => setAnswer("logo", v)}
            />
            <FileUploadField
              label="Product Images"
              accept="image/*"
              multiple
              files={getAnswer("productImages")}
              onChange={(v) => setAnswer("productImages", v)}
            />
            <FileUploadField
              label="Banner Images"
              accept="image/*"
              multiple
              files={getAnswer("bannerImages")}
              onChange={(v) => setAnswer("bannerImages", v)}
            />
            <TextareaField
              label="Brand Guidelines (optional)"
              value={getAnswer("brandGuidelines")}
              onChange={(v) => setAnswer("brandGuidelines", v)}
              placeholder="Describe any brand guidelines, tone, or style preferences..."
            />
          </div>
        );

      case 9:
        if (!config) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Please select an industry first (Step 1).</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <p className="text-sm text-gray-500">
                Suggested design for <span className="font-medium text-gray-700">{config.label}</span>.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme Style</label>
              <div className="grid grid-cols-2 gap-2">
                {THEME_STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswer("themeStyle", opt.value)}
                    className={`px-3 py-2 rounded-lg border text-sm text-left transition-all ${getAnswer("themeStyle") === opt.value
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    <div className="font-medium">{opt.value}</div>
                    <div className="text-xs text-gray-500">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {config.colorSchemes.map((scheme) => (
                  <button
                    key={scheme.label}
                    type="button"
                    onClick={() => {
                      setAnswer("primaryColor", scheme.primary);
                      setAnswer("secondaryColor", scheme.secondary);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm text-left transition-all ${getAnswer("primaryColor") === scheme.primary &&
                      getAnswer("secondaryColor") === scheme.secondary
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex gap-1">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: scheme.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: scheme.secondary }}
                      />
                    </div>
                    <span>{scheme.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <ColorField
              label="Primary Color"
              value={getAnswer("primaryColor")}
              onChange={(v) => setAnswer("primaryColor", v)}
            />
            <ColorField
              label="Secondary Color"
              value={getAnswer("secondaryColor")}
              onChange={(v) => setAnswer("secondaryColor", v)}
            />
            <SelectField
              label="Font Style"
              value={getAnswer("fontStyle")}
              onChange={(v) => setAnswer("fontStyle", v)}
              options={FONT_STYLE_OPTIONS}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Style</label>
              <RadioGroup
                options={BUTTON_STYLE_OPTIONS}
                value={getAnswer("buttonStyle")}
                onChange={(v) => setAnswer("buttonStyle", v)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
              <RadioGroup
                options={BORDER_RADIUS_OPTIONS}
                value={getAnswer("borderRadius")}
                onChange={(v) => setAnswer("borderRadius", v)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Animation Level</label>
              <RadioGroup
                options={ANIMATION_LEVEL_OPTIONS}
                value={getAnswer("animationLevel")}
                onChange={(v) => setAnswer("animationLevel", v)}
              />
            </div>
          </div>
        );

      case 10:
        if (!config) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Please select an industry first (Step 1).</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <p className="text-sm text-gray-500">
                Recommended homepage sections for <span className="font-medium text-gray-700">{config.label}</span>.
              </p>
            </div>
            <CheckboxGroup
              options={config.homepageSections}
              value={getAnswer("homepageSections")}
              onChange={(v) => setAnswer("homepageSections", v)}
            />
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <TextField
              label="SEO Keywords"
              value={getAnswer("seoKeywords")}
              onChange={(v) => setAnswer("seoKeywords", v)}
              placeholder="e.g. online fashion store, buy clothes online"
            />
            <TextField
              label="SEO Location"
              value={getAnswer("seoLocation")}
              onChange={(v) => setAnswer("seoLocation", v)}
              placeholder="City, State, Country"
            />
            <TextField
              label="Meta Title"
              value={getAnswer("metaTitle")}
              onChange={(v) => setAnswer("metaTitle", v)}
              placeholder="Your website title for search engines"
            />
            <TextareaField
              label="Meta Description"
              value={getAnswer("metaDescription")}
              onChange={(v) => setAnswer("metaDescription", v)}
              placeholder="Brief description for search engine results"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
              <div className="space-y-2">
                {SOCIAL_PLATFORMS.map((platform, i) => {
                  const links = getAnswer("socialMediaLinks") as { platform: string; url: string }[];
                  return (
                    <div key={platform} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-24 flex-shrink-0">{platform}</span>
                      <input
                        type="url"
                        value={links[i]?.url || ""}
                        onChange={(e) => {
                          const newLinks = [...links];
                          newLinks[i] = { platform, url: e.target.value };
                          setAnswer("socialMediaLinks", newLinks);
                        }}
                        placeholder={`https://${platform.toLowerCase()}.com/yourpage`}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentProject) return null;

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Generating your website...</p>
          <p className="text-sm text-gray-400 mt-1">This may take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Website Setup
              {config && <span className="text-xl">{config.icon}</span>}
            </h1>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex mt-3 gap-1 overflow-x-auto">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs ${i === currentStep
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : i < currentStep
                    ? "text-green-600"
                    : "text-gray-400"
                  }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${i < currentStep
                    ? "bg-green-100 text-green-600"
                    : i === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {i < currentStep ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {config && <span className="text-xl">{config.icon}</span>}
            {STEPS[currentStep].title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{STEPS[currentStep].subtitle}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">{renderStep()}</div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {currentStep === STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canNext()}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Generate Website
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext()}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuestionnairePage;
