import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";
import {calculateLayerForAllGroups, calculateLayers} from "../calculate/calculateLayers";

export type CirclesType = PointType & {
    id: string,
    numRow: number
    numCol: number
    isDraggable: boolean
    isSelected: boolean
}

export type GroupCirclesType = {
    [idGroup: string]: CirclesType[]
}

export type CircleGroupReducerType = {
    [idLayer: string]: GroupCirclesType
}

const initialState: CircleGroupReducerType = {}

const sliceCircles = createSlice({
    name: 'circlesGroup',
    initialState,
    reducers: {
        setCircle: (state, action: PayloadAction<{groups: GroupCirclesType}>) => {

            state = calculateLayerForAllGroups(action.payload.groups);
            return state;
        },
        setCircleGroup: (state, action: PayloadAction<{idGroup: string, circles: CirclesType[]}>) => {

            const newGroup = {
                [action.payload.idGroup]: action.payload.circles
            }
            state = calculateLayers(state, newGroup);
            return state;
        },
        toggleSelect: (state, action:PayloadAction<{idGroup: string,idCircle:string, value: boolean}>) => {
           //
           // state[action.payload.idGroup][action.payload.idCircle].isSelected = action.payload.value;
           return state;
        },
        removeAllCircles: (state) => {
            state = {};
            return state;
        }
    }
})

export const {setCircle, setCircleGroup, removeAllCircles, toggleSelect} = sliceCircles.actions;
export default sliceCircles.reducer

