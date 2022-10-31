import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type MouseReducerType = {
    x: number,
    y: number,
}

const initialState: MouseReducerType = {
    x: 0,
    y: 0,
}

const sliceMouse = createSlice({
    name:'mouse',
    initialState,
    reducers:{
        setMousePosition: (state, action:PayloadAction<MouseReducerType>) => {
            return action.payload;
        }
    }
})

export const {setMousePosition} = sliceMouse.actions;
export default sliceMouse.reducer
