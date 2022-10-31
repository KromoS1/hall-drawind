import {combineReducers, configureStore} from '@reduxjs/toolkit'
// import logger from 'redux-logger';
import mouseReducer from "./reducers/mouseReducer";
import circlesReducer from "./reducers/circlesReducer";

const rootReducer = combineReducers({
   mouse: mouseReducer,
   circles: circlesReducer,
})

export const store = configureStore({
   reducer: rootReducer,
   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof rootReducer>
