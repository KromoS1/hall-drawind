import {createReducer, PayloadAction} from "@reduxjs/toolkit";

type MouseReducerType = {
    x: number,
    y: number,
}

const initialState: MouseReducerType = {
    x: 0,
    y: 0,
}

export const mouseReducer = createReducer(initialState,{
    setMouseCoordinate: (state, action:PayloadAction<MouseReducerType>) => {
        return action.payload;
    }
})