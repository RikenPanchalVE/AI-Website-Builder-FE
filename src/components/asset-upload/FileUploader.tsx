import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onUpload: (file: File, type: string) => Promise<void>;
  uploading: boolean;
}

const FILE_TYPES = [
  { value: "logo", label: "Logo" },
  { value: "image", label: "Image" },
  { value: "pdf", label: "PDF Document" },
  { value: "docx", label: "Word Document" },
  { value: "txt", label: "Text File" },
];

const ACCEPTED = "image/*,.pdf,.docx,.doc,.txt";

const FileUploader = ({ onUpload, uploading }: FileUploaderProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedType, setSelectedType] = useState("image");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files) return;
      for (let i = 0; i < files.length; i++) {
        await onUpload(files[i], selectedType);
      }
    },
    [onUpload, selectedType]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-foreground">File type:</span>
        <div className="flex flex-wrap gap-2">
          {FILE_TYPES.map((ft) => (
            <button
              key={ft.value}
              type="button"
              onClick={() => setSelectedType(ft.value)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                selectedType === ft.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50"
              )}
            >
              {ft.label}
            </button>
          ))}
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/40"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {uploading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M12 16v-8m0 0l-3 3m3-3l3 3M9 20H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2h-2"
                />
              </svg>
            )}
          </div>
          <p className="text-sm font-medium text-foreground">
            {uploading ? "Uploading..." : "Drag & drop files here, or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground">Images, PDF, DOCX, TXT — Max 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
