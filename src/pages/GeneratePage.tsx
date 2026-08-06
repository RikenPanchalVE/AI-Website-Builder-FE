import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentProject } from "@/store/slices/projectSlice";
import { setSpec } from "@/store/slices/websiteSpecSlice";
import api from "@/api/axios";

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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">
            Generating Website
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8">
          {!error ? (
            <>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />

              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">
                  {STEPS[currentStep]}
                </p>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {STEPS.length}
                </p>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-foreground">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setCurrentStep(0);
                  generate();
                }}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;
