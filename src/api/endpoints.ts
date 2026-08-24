export const ENDPOINTS = {
  PROJECTS: {
    CREATE: "/projects",
    GET: (id: string) => `/projects/${id}`,
    UPDATE_STATUS: (id: string) => `/projects/${id}/status`,
  },
  QUESTIONNAIRE: {
    SAVE: (projectId: string) => `/projects/${projectId}/questionnaire`,
    GET: (projectId: string) => `/projects/${projectId}/questionnaire`,
  },
  ASSETS: {
    UPLOAD: (projectId: string) => `/projects/${projectId}/assets/upload`,
    LIST: (projectId: string) => `/projects/${projectId}/assets`,
    DELETE: (projectId: string, assetId: string) =>
      `/projects/${projectId}/assets/${assetId}`,
  },
  AI: {
    GENERATE: (projectId: string) => `/projects/${projectId}/generate`,
  },
  WEBSITE_SPEC: {
    GET: (projectId: string) => `/projects/${projectId}/website-spec`,
    GET_VERSION: (projectId: string, version: number) =>
      `/projects/${projectId}/website-spec/${version}`,
  },
  REVISIONS: {
    CREATE: (projectId: string) => `/projects/${projectId}/revisions`,
    LIST: (projectId: string) => `/projects/${projectId}/revisions`,
    UPDATE: (projectId: string, id: string) => `/projects/${projectId}/revisions/${id}`,
  },
  APPROVAL: {
    APPROVE: (projectId: string) => `/projects/${projectId}/approve`,
  },
  PRICING: {
    CALCULATE: (projectId: string) => `/projects/${projectId}/pricing/calculate`,
    GET: (projectId: string) => `/projects/${projectId}/pricing`,
  },
  PAYMENT: {
    PROCESS: (projectId: string) => `/projects/${projectId}/payment/process`,
    GET: (projectId: string) => `/projects/${projectId}/payment`,
  },
  PUBLISH: {
    PUBLISH: (projectId: string) => `/projects/${projectId}/publish`,
  },
  DOWNLOAD: {
    SOURCE: (projectId: string) => `/projects/${projectId}/download`,
    PROTOTYPE: (projectId: string) => `/projects/${projectId}/download/prototype`,
  },
};
