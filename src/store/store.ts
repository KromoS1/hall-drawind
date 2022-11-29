import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import mouseReducer from "./reducers/mouseReducer";
import circlesGroupReducer from "./reducers/circlesGroupReducer";
import selectionAreaReducer from "./reducers/selectionAreaReducer";
import stageReducer from "./reducers/stageReducer";
import listInfoReducer from "./reducers/listInfoReducer";
import otherFigureReducer from "./reducers/otherFigureReducer";

const rootReducer = combineReducers({
    stage: stageReducer,
    mouse: mouseReducer,
    selectionArea: selectionAreaReducer,
    sectors: circlesGroupReducer,
    listInfo: listInfoReducer,
    otherFigure: otherFigureReducer,
})

const immutableStateInvariant = require('redux-immutable-state-invariant').default()

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>