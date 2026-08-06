import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import QuestionnairePage from "@/pages/QuestionnairePage";
import AssetUploadPage from "@/pages/AssetUploadPage";
import GeneratePage from "@/pages/GeneratePage";
import PreviewPage from "@/pages/PreviewPage";
import RevisionPage from "@/pages/RevisionPage";
import PricingPage from "@/pages/PricingPage";
import PaymentPage from "@/pages/PaymentPage";
import PublishPage from "@/pages/PublishPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<QuestionnairePage />} />
        <Route path="/upload" element={<AssetUploadPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/preview/:projectId" element={<PreviewPage />} />
        <Route path="/revision/:projectId" element={<RevisionPage />} />
        <Route path="/pricing/:projectId" element={<PricingPage />} />
        <Route path="/payment/:projectId" element={<PaymentPage />} />
        <Route path="/publish/:projectId" element={<PublishPage />} />
      </Routes>
    </Router>
  );
}

export default App;
