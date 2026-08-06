import { useState } from "react";

interface RevisionFormProps {
  onSubmit: (request: string) => Promise<void>;
  loading: boolean;
}

const RevisionForm = ({ onSubmit, loading }: RevisionFormProps) => {
  const [request, setRequest] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    await onSubmit(request.trim());
    setRequest("");
  };

  const suggestions = [
    "Change the hero image",
    "Use a blue theme instead",
    "Move testimonials above services",
    "Add a gallery section",
    "Make the navbar transparent",
    "Change the font to sans-serif",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Describe your revision
        </label>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="e.g. Change the hero headline to 'Welcome to Our Company'"
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRequest(s)}
              className="px-3 py-1 rounded-full text-xs border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!request.trim() || loading}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit Revision"}
      </button>
    </form>
  );
};

export default RevisionForm;
