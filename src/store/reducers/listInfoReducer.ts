import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CirclesType, removeAllCircles, setCircleGroup} from "./circlesGroupReducer";
import {ActionCreators as UndoActionCreators} from "redux-undo";

export type listInfoReducerType = {
    idGroup: string
    name: string
    count: number
}

const initialState: listInfoReducerType[] = [];

const slice = createSlice({
    name: 'listInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setCircleGroup, (state, action:PayloadAction<{idGroup: string, circles: CirclesType[]}>) => {
                const info = {
                    idGroup: action.payload.idGroup,
                    name: `Group ${state.length + 1}`,
                    count: action.payload.circles.length
                }
                state = [...state,info]
                return state;
            })
            .addCase(removeAllCircles, (state, ) => {
                state = [];
                return state;
            })
    },

})

export default slice.reducer

