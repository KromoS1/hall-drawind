import {combineReducers, configureStore} from '@reduxjs/toolkit'
// import logger from 'redux-logger';
import mouseReducer from "./reducers/mouseReducer";

const rootReducer = combineReducers({
   mouse: mouseReducer
})

export const store = configureStore({
   reducer: rootReducer,
   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof rootReducer>

