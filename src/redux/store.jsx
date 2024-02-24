import { configureStore } from "@reduxjs/toolkit"
import { persistedReducer, rootReducer } from "./reducers/rootReducer"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

const usePersistReducer =
  JSON.parse(localStorage.getItem("rememberMe")) || false
let store
let persistor = null
try {
  store = configureStore({
    reducer: usePersistReducer ? persistedReducer : rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  if (usePersistReducer) persistor = persistStore(store)
} catch (error) {}
export { store, persistor }
