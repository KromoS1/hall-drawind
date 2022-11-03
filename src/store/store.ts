import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mouseReducer from "./reducers/mouseReducer";
import circlesReducer from "./reducers/circlesReducer";
import selectionAreaReducer from "./reducers/selectionAreaReducer";

const rootReducer = combineReducers({
   mouse: mouseReducer,
   selectionArea: selectionAreaReducer,
   circles: circlesReducer,
})

export const store = configureStore({
   reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
