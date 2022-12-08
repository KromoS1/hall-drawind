import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";
import {calculateLayerForAllGroups, calculateLayers} from "../calculate/calculateLayers";
import undoable from "redux-undo";

export type PlaceType = PointType & {
    id: string,
    numRow: number
    numCol: number
    isDraggable: boolean
    isSelected: boolean
}

export type SectorsPlacesType = {
    [idGroup: string]: PlaceType[]
}

export type SectorsReducerType = {
    [idLayer: string]: SectorsPlacesType
}

const initialState: SectorsReducerType = {}

const sliceCircles = createSlice({
    name: 'sectorsGroup',
    initialState,
    reducers: {
        setCircle: (state, action: PayloadAction<{ groups: SectorsPlacesType }>) => {

            state = calculateLayerForAllGroups(action.payload.groups);
            return state;
        },
        setCircleSector: (state, action: PayloadAction<{ idGroup: string, circles: PlaceType[] }>) => {

            const newGroup = {
                [action.payload.idGroup]: action.payload.circles
            }
            state = calculateLayers(state, newGroup);
            return state;
        },
        toggleSelectPlace: (state, action: PayloadAction<{ idLayer: string, idGroup: string, idPlace: string, value: boolean }>) => {

            const place = state[action.payload.idLayer][action.payload.idGroup].find(place => place.id === action.payload.idPlace);

            if (place) {
                place.isSelected = action.payload.value;
            }

            return state;
        },
        removeAllCircles: (state) => {
            state = {};
            return state;
        }
    }
})

export const {setCircle, setCircleSector, removeAllCircles, toggleSelectPlace} = sliceCircles.actions;
export const sectorsReducerForTest = sliceCircles.reducer;
export default undoable(sliceCircles.reducer)

