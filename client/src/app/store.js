import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import clientReducer from "./features/clientSlice";
import supplierReducer from "./features/supplierSlice";
import qualityReducer from "./features/qualitySlice";
import colorReducer from "./features/colorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    supplier: supplierReducer,
    quality: qualityReducer,
    color: colorReducer,
  },
});

export default store;
