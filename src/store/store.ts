import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mouseReducer from "./reducers/mouseReducer";
import circlesReducer from "./reducers/circlesReducer";
import selectionAreaReducer from "./reducers/selectionAreaReducer";
import stageReducer from "./reducers/stageReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   stage: stageReducer,
   mouse: mouseReducer,
   selectionArea: selectionAreaReducer,
   circles: circlesReducer,
})

const immutableStateInvariant = require('redux-immutable-state-invariant').default()

export const store = configureStore({
   reducer: rootReducer,
   middleware:[thunk]
})

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>