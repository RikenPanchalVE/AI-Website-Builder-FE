import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "@/store/slices/projectSlice";
import { setAssets, addAsset, removeAsset, setUploading } from "@/store/slices/assetSlice";
import api from "@/api/axios";
import FileUploader from "@/components/asset-upload/FileUploader";
import FilePreview from "@/components/asset-upload/FilePreview";

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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-foreground">Upload Assets</h1>
          <span className="text-sm text-muted-foreground">
            {assets.length} file{assets.length !== 1 ? "s" : ""} uploaded
          </span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-2xl">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Add your files
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload your logo, images, and documents. These will be used to
              personalize your website.
            </p>
          </div>

          <FileUploader onUpload={handleUpload} uploading={uploading} />

          <FilePreview assets={assets} onDelete={handleDelete} />

          <div className="flex justify-between pt-4">
            <button
              onClick={() => navigate("/start")}
              className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer"
            >
              Generate Website
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssetUploadPage;
