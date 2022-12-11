import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlaceType, setSectorInLayer} from "./sectorsReducer";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";

export type ChangeSectorType = {
    idLayer: string
    idGroup: string
    sectorPlaces: PlaceType[]
}

const initialState: ChangeSectorType = {
    idLayer: '',
    idGroup: '',
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

export const offSelectSector = createAsyncThunk('changeSector/toggleSelectSector', async (_, {
        dispatch,
        getState
    }) => {
        const state = getState() as RootState;
        const changeData = state.changeSector;

        if (changeData) {
            dispatch(setSectorInLayer(changeData));
            dispatch(cleanChangeSector());
        }
    }
)

export const {setSectorForChange, cleanChangeSector} = slice.actions;
export default slice.reducer