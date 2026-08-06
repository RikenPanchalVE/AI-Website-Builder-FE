import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const projectApi = {
  async saveQuestionnaire(projectId: string, answers: Record<string, any>) {
    return api.post(ENDPOINTS.QUESTIONNAIRE.SAVE(projectId), { answers });
  },

  async generate(projectId: string) {
    return api.post(ENDPOINTS.AI.GENERATE(projectId));
  },

  async getProject(projectId: string) {
    return api.get(ENDPOINTS.PROJECTS.GET(projectId));
  },

  async getQuestionnaire(projectId: string) {
    return api.get(ENDPOINTS.QUESTIONNAIRE.GET(projectId));
  },

  async uploadAssets(projectId: string, files: FormData) {
    return api.post(ENDPOINTS.ASSETS.UPLOAD(projectId), files, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async getAssets(projectId: string) {
    return api.get(ENDPOINTS.ASSETS.LIST(projectId));
  },

  async deleteAsset(projectId: string, assetId: string) {
    return api.delete(ENDPOINTS.ASSETS.DELETE(projectId, assetId));
  },

  async getWebsiteSpec(projectId: string) {
    return api.get(ENDPOINTS.WEBSITE_SPEC.GET(projectId));
  },
};
