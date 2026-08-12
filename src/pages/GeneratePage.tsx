import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentProject } from "@/store/slices/projectSlice";
import { setSpec } from "@/store/slices/websiteSpecSlice";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  "Analyzing your answers...",
  "Selecting components...",
  "Building page layouts...",
  "Applying your theme...",
  "Finalizing your website...",
];

const GeneratePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((s: any) => s.project);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentProject) {
      navigate("/");
      return;
    }
    generate();
  }, []);

  const generate = async () => {
    try {
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise((r) => setTimeout(r, 800));
      }

      const res = await api.post(
        `/projects/${currentProject.projectId}/generate`
      );
      dispatch(setSpec(res.data));
      dispatch(setCurrentProject({ ...currentProject, status: "generated" }));

      navigate(`/preview/${currentProject.projectId}`);
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "Generation failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Generating Website</h1>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8 text-center">
          {!error ? (
            <>
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />

              <div className="space-y-4">
                <p className="text-lg font-medium text-foreground">{STEPS[currentStep]}</p>
                <div className="space-y-1.5 text-left">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5 text-sm">
                      <span className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-colors",
                        i < currentStep ? "bg-primary/15 text-primary"
                        : i === currentStep ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                      )}>
                        {i < currentStep ? "✓" : i + 1}
                      </span>
                      <span className={cn(
                        i <= currentStep ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-foreground">{error}</p>
              <Button
                type="button"
                onClick={() => {
                  setError(null);
                  setCurrentStep(0);
                  generate();
                }}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;
