import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import optionsReducer from "./features/options.slice";
import { countriesApi } from "./features/countries.slice";

const persistConfig = {
  key: "ovasabi-persist",
  storage,
  blacklist: ["options"],
};

const rootReducer = combineReducers({
  options: optionsReducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(countriesApi.middleware),
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(countriesApi.middleware),
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

// Infer the type of makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// documentation on connecting persist to Next.js / Redux store.
// https://stackoverflow.com/questions/77783551/how-to-use-redux-persist-with-next-js-app-router
// https://blog.logrocket.com/use-redux-next-js/

// ! NOTE: This basically resolving noop storage issue and
// ! able to see data updation in localstorage. but not consistent. sometimes., when we stop and restart app., persist is not getting created. Not sure why

// We need to know of the server and client mode in Next.js
// because we don't eventually need persistence on the server side.
