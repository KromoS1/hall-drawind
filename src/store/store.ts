import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import mouseReducer from "./reducers/mouseReducer";
import circlesGroupReducer from "./reducers/sectorsReducer";
import selectionAreaReducer from "./reducers/selectionAreaReducer";
import stageReducer from "./reducers/stageReducer";
import listInfoReducer from "./reducers/listInfoReducer";
import rectsReducer from "./reducers/rectsReducer";
import ellipsesReducer from "./reducers/ellipsesReducer";
import textsReducer from "./reducers/textsReducer";
import changeSectorReducer from "./reducers/changeSectorReducer";

const rootReducer = combineReducers({
    stage: stageReducer,
    mouse: mouseReducer,
    selectionArea: selectionAreaReducer,
    sectors: circlesGroupReducer,
    changeSector: changeSectorReducer,
    listInfo: listInfoReducer,
    rects: rectsReducer,
    ellipses: ellipsesReducer,
    texts: textsReducer,
})

const immutableStateInvariant = require('redux-immutable-state-invariant').default()

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>