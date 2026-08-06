export const ENDPOINTS = {
  PROJECTS: {
    CREATE: "/projects",
    GET: (id) => `/projects/${id}`,
    UPDATE_STATUS: (id) => `/projects/${id}/status`,
  },
  QUESTIONNAIRE: {
    SAVE: (projectId) => `/projects/${projectId}/questionnaire`,
    GET: (projectId) => `/projects/${projectId}/questionnaire`,
  },
  ASSETS: {
    UPLOAD: (projectId) => `/projects/${projectId}/assets/upload`,
    LIST: (projectId) => `/projects/${projectId}/assets`,
    DELETE: (projectId, assetId) =>
      `/projects/${projectId}/assets/${assetId}`,
  },
  AI: {
    GENERATE: (projectId) => `/projects/${projectId}/generate`,
  },
  WEBSITE_SPEC: {
    GET: (projectId) => `/projects/${projectId}/website-spec`,
    GET_VERSION: (projectId, version) =>
      `/projects/${projectId}/website-spec/${version}`,
  },
  REVISIONS: {
    CREATE: (projectId) => `/projects/${projectId}/revisions`,
    LIST: (projectId) => `/projects/${projectId}/revisions`,
    UPDATE: (projectId, id) => `/projects/${projectId}/revisions/${id}`,
  },
  APPROVAL: {
    APPROVE: (projectId) => `/projects/${projectId}/approve`,
  },
  PRICING: {
    CALCULATE: (projectId) => `/projects/${projectId}/pricing/calculate`,
    GET: (projectId) => `/projects/${projectId}/pricing`,
  },
  PAYMENT: {
    PROCESS: (projectId) => `/projects/${projectId}/payment/process`,
    GET: (projectId) => `/projects/${projectId}/payment`,
  },
  PUBLISH: {
    PUBLISH: (projectId) => `/projects/${projectId}/publish`,
  },
};
