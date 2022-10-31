import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";

type CirclesType = PointType & {
    id:number
}

export type CirclesReducerType = {
    [key:number] : CirclesType
}

const initialState:CirclesReducerType = {
    1:{
        id:1,
        x: 20,
        y: 20,
    }
}

const sliceCircles = createSlice({
    name:'mouse',
    initialState,
    reducers:{
        setCirclePosition: (state, action:PayloadAction<CirclesType>) => {
            state[action.payload.id] = action.payload;
            return state;
        }
    }
})

export const {setCirclePosition} = sliceCircles.actions;
export default sliceCircles.reducer