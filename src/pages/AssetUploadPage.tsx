import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAssets, addAsset, removeAsset, setUploading } from "@/store/slices/assetSlice";
import api from "@/api/axios";
import FileUploader from "@/components/asset-upload/FileUploader";
import FilePreview from "@/components/asset-upload/FilePreview";
import { Button } from "@/components/ui/button";

const AssetUploadPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((s: any) => s.project);
  const { assets, uploading } = useSelector((s: any) => s.asset);

  useEffect(() => {
    if (!currentProject) {
      navigate("/");
      return;
    }
    loadAssets();
  }, [currentProject]);

  const loadAssets = async () => {
    try {
      const res = await api.get(`/projects/${currentProject.projectId}/assets`);
      dispatch(setAssets(res.data));
    } catch (err) {
      console.error("Failed to load assets:", err);
    }
  };

  const handleUpload = async (file: File, type: string) => {
    dispatch(setUploading(true));
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await api.post(
        `/projects/${currentProject.projectId}/assets/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(addAsset(res.data));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      dispatch(setUploading(false));
    }
  };

  const handleDelete = async (assetId: string) => {
    try {
      await api.delete(
        `/projects/${currentProject.projectId}/assets/${assetId}`
      );
      dispatch(removeAsset(assetId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleContinue = () => {
    navigate(`/generate`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">Upload Assets</h1>
          <span className="text-sm text-muted-foreground">
            {assets.length} file{assets.length !== 1 ? "s" : ""} uploaded
          </span>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl flex-1 px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="mb-1 text-xl font-semibold text-foreground">Add your files</h2>
            <p className="text-sm text-muted-foreground">
              Upload your logo, images, and documents. These will be used to personalize your website. This step is optional — you can skip straight to generation.
            </p>
          </div>

          <div className="space-y-8">
            <FileUploader onUpload={handleUpload} uploading={uploading} />
            <FilePreview assets={assets} onDelete={handleDelete} />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate("/start")}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue}>
            {assets.length > 0 ? "Continue" : "Skip & Continue"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AssetUploadPage;
