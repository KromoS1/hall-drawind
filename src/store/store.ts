import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mouseReducer from "./reducers/mouseReducer";
import circlesGroupReducer from "./reducers/circlesGroupReducer";
import selectionAreaReducer from "./reducers/selectionAreaReducer";
import stageReducer from "./reducers/stageReducer";
import thunk from "redux-thunk";
import undoable from "redux-undo";

const rootReducer = combineReducers({
   stage: stageReducer,
   mouse: mouseReducer,
   selectionArea: selectionAreaReducer,
   circlesGroup: undoable(circlesGroupReducer),
})

const immutableStateInvariant = require('redux-immutable-state-invariant').default()

export const store = configureStore({
   reducer: rootReducer,
   middleware:[thunk]
})

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>