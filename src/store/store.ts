import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mouseReducer from "./reducers/mouseReducer";
import circlesReducer from "./reducers/circlesReducer";
import selectionAreaReducer from "./reducers/selectionAreaReducer";
import stageReducer from "./reducers/stageReducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
   stage: stageReducer,
   mouse: mouseReducer,
   selectionArea: selectionAreaReducer,
   circles: circlesReducer,
})

export const store = configureStore({
   reducer: rootReducer,
})

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>
type AppTHunkType = ThunkDispatch<RootState, void, AnyAction>

export const useAppDispatch = () => useDispatch<AppTHunkType>()