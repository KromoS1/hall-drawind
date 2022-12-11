import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlaceType, setPlaceSector} from "./sectorsReducer";
import undoable from "redux-undo";
import {cleanCanvas} from "./stageReducer";

export type listInfoReducerType = {
    idGroup: string
    name: string
    count: number
}

const initialState: listInfoReducerType[] = [];

const slice = createSlice({
    name: 'listInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setPlaceSector, (state, action:PayloadAction<{idGroup: string, places: PlaceType[]}>) => {
                const info = {
                    idGroup: action.payload.idGroup,
                    name: `Group ${state.length + 1}`,
                    count: action.payload.places.length
                }
                state = [...state,info]
                return state;
            })
            .addCase(cleanCanvas, (state, ) => {
                state = [];
                return state;
            })
    },

})

export default undoable(slice.reducer);

