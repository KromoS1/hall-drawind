import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";

export type CirclesType = PointType & {
    id:string
}

export type CountCirclesDrawType = {
    countX: number,
    countY: number
}

export type CirclesReducerType = {
    countCirclesDraw: CountCirclesDrawType
    circles: CirclesType[]
}

const initialState:CirclesReducerType = {
    countCirclesDraw: {
       countX: 0,
       countY: 0
    },
    circles:[],
}

const sliceCircles = createSlice({
    name:'mouse',
    initialState,
    reducers:{
        setCirclePosition: (state, action:PayloadAction<CirclesType[]>) => {
            state.circles = [...state.circles,...action.payload];
            return state;
        },
        setCountCirclesDraw: (state,action:PayloadAction<CountCirclesDrawType>) => {
            state.countCirclesDraw = action.payload;
            return state;
        },
        removeAllCircles: (state) => {
            state.circles = [];
            return state;
        }
    }
})

export const {setCirclePosition, setCountCirclesDraw, removeAllCircles} = sliceCircles.actions;
export default sliceCircles.reducer