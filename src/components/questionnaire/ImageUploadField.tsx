import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";

interface ImageUploadFieldProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  assetType?: string;
  className?: string;
}

const ImageUploadField = ({ value, onChange, label, assetType = "image", className }: ImageUploadFieldProps) => {
  const { currentProject } = useSelector((s: any) => s.project);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file || !currentProject?.projectId) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", assetType);
      const res = await api.post(
        `/projects/${currentProject.projectId}/assets/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onChange(res.data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {label && <p className="mb-1.5 text-xs text-muted-foreground">{label}</p>}
      <div className="flex items-center gap-3">
        <div
          onClick={() => inputRef.current?.click()}
          className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/50 hover:border-primary/40"
        >
          {uploading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <div className="flex flex-col gap-1">
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {value ? "Change" : "Upload"} Image
          </Button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-left text-xs text-muted-foreground hover:text-destructive"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default ImageUploadField;
