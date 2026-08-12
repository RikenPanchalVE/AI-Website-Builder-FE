import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice";
import builderReducer from "./slices/builderSlice";
import questionnaireReducer from "./slices/questionnaireSlice";
import assetReducer from "./slices/assetSlice";
import websiteSpecReducer from "./slices/websiteSpecSlice";
import revisionReducer from "./slices/revisionSlice";
import pricingReducer from "./slices/pricingSlice";
import paymentReducer from "./slices/paymentSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    builder: builderReducer,
    questionnaire: questionnaireReducer,
    asset: assetReducer,
    websiteSpec: websiteSpecReducer,
    revision: revisionReducer,
    pricing: pricingReducer,
    payment: paymentReducer,
    ui: uiReducer,
  },
});

export default store;
