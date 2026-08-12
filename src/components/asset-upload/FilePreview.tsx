import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Asset {
  _id: string;
  type: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  url?: string;
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

const DocIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0013.586 3H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const FilePreview = ({ assets, onDelete }: FilePreviewProps) => {
  if (assets.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-foreground">Uploaded Files ({assets.length})</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {assets.map((asset) => {
          const isImage = asset.mimeType?.startsWith("image/");
          return (
            <div
              key={asset._id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                {isImage && asset.url ? (
                  <img
                    src={asset.url}
                    alt={asset.originalName}
                    className="h-10 w-10 shrink-0 rounded-md border border-border object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <DocIcon />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{asset.originalName}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[10px] capitalize">{asset.type}</Badge>
                    <span className="text-xs text-muted-foreground">{formatSize(asset.size)}</span>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="shrink-0 text-destructive hover:text-destructive"
                onClick={() => onDelete(asset._id)}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;
