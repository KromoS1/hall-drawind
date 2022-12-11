import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";
import {calculateLayerForAllGroups, calculateLayers} from "../calculate/calculateLayers";
import undoable from "redux-undo";
import {ChangeSectorType, setSectorForChange} from "./changeSectorReducer";
import {cleanCanvas} from "./stageReducer";

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
        setSectorInLayer:(state,action:PayloadAction<ChangeSectorType>) => {
            state[action.payload.idLayer] = {
                ...state[action.payload.idLayer],
                [action.payload.idGroup]: action.payload.sectorPlaces
            }
            return state;
        },
        //пока не используется
        toggleSelectPlace: (state, action: PayloadAction<{ idLayer: string, idGroup: string, idPlace: string, value: boolean }>) => {

            const place = state[action.payload.idLayer][action.payload.idGroup].find(place => place.id === action.payload.idPlace);

            if (place) {
                place.isSelected = action.payload.value;
            }

            return state;
        },
    },
    extraReducers: builder => builder
        .addCase(setSectorForChange,(state, action) => {
            delete state[action.payload.idLayer][action.payload.idGroup];
            return state;
        })
        .addCase(cleanCanvas,(state) => {
            state = {};
            return state;
        })
})

export const {setCircle, setCircleSector, setSectorInLayer,toggleSelectPlace} = sliceCircles.actions;
export const sectorsReducerForTest = sliceCircles.reducer;
export default undoable(sliceCircles.reducer)

