import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";

export type CirclesType = PointType & {
    id: string,
    numRow: number
    numCol: number
    isDraggable: boolean
    isSelected: boolean
}

export type CircleGroupReducerType = {
    [idGroup: string]: {
        [id:string]: CirclesType
    }
}

const initialState: CircleGroupReducerType = {}

const sliceCircles = createSlice({
    name: 'circlesGroup',
    initialState,
    reducers: {
        setCirclePosition: (state, action: PayloadAction<{idGroup: string, circles: CirclesType[]}>) => {

            state[action.payload.idGroup] = {};
            action.payload.circles.forEach(circle => {

                state[action.payload.idGroup][circle.id] = circle
            })
            return state;
        },
        toggleSelect: (state, action:PayloadAction<{idGroup: string,idCircle:string, value: boolean}>) => {

           state[action.payload.idGroup][action.payload.idCircle].isSelected = action.payload.value;
           return state
        },
        resetSelected:(state) => {
            // state = state.map(circle => {
            //     circle.isSelected = false;
            //     return circle;
            // })
            return state;
        },
        removeAllCircles: (state) => {
            state = {};
            return state;
        }
    }
})

export const {setCirclePosition, removeAllCircles, toggleSelect, resetSelected} = sliceCircles.actions;
export default sliceCircles.reducer

