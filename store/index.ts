
import { configureStore } from "@reduxjs/toolkit";
import {
  coreApiSlice,
  mentorReducer,
  mentorMiddleware,
} from "@iblai/iblai-js/data-layer";
import {
  chatInputSliceReducer,
  chatSliceReducerShared,
  filesReducer,
  hostChatReducer,
  rbacReducer,
  subscriptionReducer,
  topBannerReducer,
} from "@iblai/iblai-js/web-utils";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: hostChatReducer,
      chatInput: chatInputSliceReducer,
      chatSliceShared: chatSliceReducerShared,
      files: filesReducer,
      rbac: rbacReducer,
      subscription: subscriptionReducer,
      topBanner: topBannerReducer,
      [coreApiSlice.reducerPath]: coreApiSlice.reducer,
      ...mentorReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(coreApiSlice.middleware)
        .concat(...mentorMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
