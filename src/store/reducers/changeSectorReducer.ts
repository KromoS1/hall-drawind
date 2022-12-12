import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {offAllSelectedSector, PlaceType, removeSector, setSectorInLayer} from "./sectorsReducer";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";
import {offSelectRectsAll, saveChangedRect} from "./rectsReducer";

export type ChangeSectorType = {
    idLayer: string
    idGroup: string,
    isSelected: boolean
    sectorPlaces: PlaceType[]
}

const initialState: ChangeSectorType = {
    idLayer: '',
    idGroup: '',
    isSelected: false,
    sectorPlaces: []
}

const slice = createSlice({
    name: 'changeSector',
    initialState,
    reducers: {
        setSectorForChange: (state, action: PayloadAction<ChangeSectorType>) => {
            state = action.payload;
            return state;
        },
        cleanChangeSector: (state) => {
            state.idGroup = '';
            state.idLayer = '';
            state.sectorPlaces = [];
            return state;
        }
    },
    extraReducers: builder => builder
        .addCase(cleanCanvas, (state) => {
            state.idGroup = '';
            state.idLayer = '';
            state.sectorPlaces = [];
            return state;
        })
})

export const saveChangedSector = createAsyncThunk('changeSector/saveChangedSector', (_, {dispatch, getState}) => {

    const state = getState() as RootState;
    const changeSector = state.changeSector;

    if (changeSector.idGroup) {
        dispatch(setSectorInLayer({...changeSector}));
    }
    dispatch(cleanChangeSector());
})

export const setSectorInChange = createAsyncThunk('changeSector/setSectorInChange', (data: { idLayer: string, idGroup: string }, {
    dispatch,
    getState
}) => {

    const state = getState() as RootState;
    const sector = state.sectors.present[data.idLayer][data.idGroup];
    const changeSector = state.changeSector;

    if (state.rects.present.changeRect) {
        dispatch(saveChangedRect());
    }

    if (changeSector.idGroup) {
        dispatch(setSectorInLayer({...changeSector}));
    }

    dispatch(setSectorForChange({
        idLayer: data.idLayer,
        idGroup: data.idGroup,
        sectorPlaces: sector.places,
        isSelected: sector.isSelected
    }));

    dispatch(offSelectRectsAll())
    dispatch(offAllSelectedSector());
    dispatch(removeSector({idLayer: data.idLayer, idGroup: data.idGroup}));
})

export const {setSectorForChange, cleanChangeSector} = slice.actions;
export default slice.reducer