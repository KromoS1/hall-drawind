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
    isSelected: boolean,
    rotation: number
}

export type SectorsPlacesType = {
    [idGroup: string]: {
        places: PlaceType[],
        isSelected: boolean
    }
}

export type SectorsReducerType = {
    [idLayer: string]: SectorsPlacesType
}

const initialState: SectorsReducerType = {}

const sliceCircles = createSlice({
    name: 'sectorsGroup',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<{ groups: SectorsPlacesType }>) => {

            state = calculateLayerForAllGroups(action.payload.groups);
            return state;
        },
        setPlaceSector: (state, action: PayloadAction<{ idGroup: string, places: PlaceType[] }>) => {

            const newGroup = {
                [action.payload.idGroup]: {
                    places: action.payload.places,
                    isSelected: false
                }
            }
            state = calculateLayers(state, newGroup);
            return state;
        },
        setSectorInLayer: (state, action: PayloadAction<ChangeSectorType>) => {
            state[action.payload.idLayer] = {
                ...state[action.payload.idLayer],
                [action.payload.idGroup]: {
                    places: action.payload.sectorPlaces,
                    isSelected: false,
                }
            }
            return state;
        },
        toggleSelectSector: (state, action: PayloadAction<{ idLayer: string, idGroup: string, value: boolean }>) => {

            state[action.payload.idLayer][action.payload.idGroup].isSelected = action.payload.value;
            return state;
        },
        offAllSelectedSector: (state) => {

            const keysLayers = Object.keys(state);

            keysLayers.forEach(idLayer => {

                const keysGroup = Object.keys(state[idLayer]);

                keysGroup.forEach(idGroup => {
                    state[idLayer][idGroup].isSelected = false;
                })
            })

            return state;
        },
        removeSector: (state, action: PayloadAction<{ idLayer: string, idGroup: string, }>) => {

            if (state[action.payload.idLayer][action.payload.idGroup].isSelected) {
                delete state[action.payload.idLayer][action.payload.idGroup];
            }

            return state;
        }
    },
    extraReducers: builder => builder
        .addCase(setSectorForChange, (state, action) => {
            delete state[action.payload.idLayer][action.payload.idGroup];
            return state;
        })
        .addCase(cleanCanvas, (state) => {
            state = {};
            return state;
        })
})

export const {
    setPlaces,
    setPlaceSector,
    setSectorInLayer,
    toggleSelectSector,
    removeSector,
    offAllSelectedSector,
} = sliceCircles.actions;
export const sectorsReducerForTest = sliceCircles.reducer;
export default undoable(sliceCircles.reducer)

