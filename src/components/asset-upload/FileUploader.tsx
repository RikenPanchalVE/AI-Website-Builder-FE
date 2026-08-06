import { useState, useRef, useCallback } from "react";

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
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground font-medium">File type:</span>
        <div className="flex gap-2">
          {FILE_TYPES.map((ft) => (
            <button
              key={ft.value}
              onClick={() => setSelectedType(ft.value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors cursor-pointer ${
                selectedType === ft.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              }`}
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
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="space-y-2">
          <svg
            className="w-10 h-10 mx-auto text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16v-8m0 0l-3 3m3-3l3 3M9 20H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2h-2"
            />
          </svg>
          <p className="text-sm text-foreground">
            {uploading
              ? "Uploading..."
              : "Drag & drop files here, or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground">
            Images, PDF, DOCX, TXT — Max 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
