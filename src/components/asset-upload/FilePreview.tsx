interface Asset {
  _id: string;
  type: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
}

interface FilePreviewProps {
  assets: Asset[];
  onDelete: (id: string) => void;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return "🖼️";
  if (mimeType === "application/pdf") return "📄";
  if (mimeType.includes("wordprocessingml")) return "📝";
  return "📄";
};

const FilePreview = ({ assets, onDelete }: FilePreviewProps) => {
  if (assets.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-foreground">
        Uploaded Files ({assets.length})
      </h3>
      <div className="grid gap-2">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{getFileIcon(asset.mimeType)}</span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {asset.originalName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {asset.type} • {formatSize(asset.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDelete(asset._id)}
              className="text-xs text-destructive hover:underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
