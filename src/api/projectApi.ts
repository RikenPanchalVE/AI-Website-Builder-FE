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

  // `changes` is the structured diff produced by configDiff.ts - the actual
  // edits were already applied via saveQuestionnaire + generate before this
  // call; this just records what changed, for Revision History to display.
  async submitRevision(projectId: string, changes: Array<{ path: string; label: string; oldValue: unknown; newValue: unknown }>) {
    return api.post(ENDPOINTS.REVISIONS.CREATE(projectId), { changes });
  },
};
