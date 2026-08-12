import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="revision-request" className="mb-2">Describe your revision</Label>
        <Textarea
          id="revision-request"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="e.g. Change the hero headline to 'Welcome to Our Company'"
          rows={3}
        />
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRequest(s)}
              className="cursor-pointer rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={!request.trim() || loading}>
        {loading ? "Submitting..." : "Submit Revision"}
      </Button>
    </form>
  );
};

export default RevisionForm;
