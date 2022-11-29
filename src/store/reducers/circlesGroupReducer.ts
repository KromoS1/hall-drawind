import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";
import {calculateLayerForAllGroups, calculateLayers} from "../calculate/calculateLayers";
import undoable from "redux-undo";

export type CirclesType = PointType & {
    id: string,
    numRow: number
    numCol: number
    isDraggable: boolean
    isSelected: boolean
}

export type SectorsCirclesType = {
    [idGroup: string]: CirclesType[]
}

export type SectorsReducerType = {
    [idLayer: string]: SectorsCirclesType
}

const initialState: SectorsReducerType = {}

const sliceCircles = createSlice({
    name: 'circlesGroup',
    initialState,
    reducers: {
        setCircle: (state, action: PayloadAction<{groups: SectorsCirclesType}>) => {

            state = calculateLayerForAllGroups(action.payload.groups);
            return state;
        },
        setCircleSector: (state, action: PayloadAction<{idGroup: string, circles: CirclesType[]}>) => {

            const newGroup = {
                [action.payload.idGroup]: action.payload.circles
            }
            state = calculateLayers(state, newGroup);
            return state;
        },
        toggleSelect: (state, action:PayloadAction<{idGroup: string,idCircle:string, value: boolean}>) => {

           return state;
        },
        removeAllCircles: (state) => {
            state = {};
            return state;
        }
    }
})

export const {setCircle, setCircleSector, removeAllCircles, toggleSelect} = sliceCircles.actions;
export const sectorsReducerForTest = sliceCircles.reducer;
export default undoable(sliceCircles.reducer)

