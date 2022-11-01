import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";

export type CirclesType = PointType & {
    id:string
}

export type CirclesReducerType = CirclesType[]

const initialState:CirclesReducerType = []

const sliceCircles = createSlice({
    name:'mouse',
    initialState,
    reducers:{
        setCirclePosition: (state, action:PayloadAction<CirclesType[]>) => {
            state = action.payload;
            return state;
        }
    }
})

export const {setCirclePosition} = sliceCircles.actions;
export default sliceCircles.reducer