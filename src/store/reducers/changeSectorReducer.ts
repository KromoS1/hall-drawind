import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {offAllSelectedSector, PlaceType, removeSector, setSectorInLayer} from "./sectorsReducer";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";
import {offSelectRectsAll, saveChangedRect} from "./rectsReducer";
import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../../components/figures/sectors/cacheCircle";

export type ChangeSectorType = {
    idLayer: string
    idGroup: string,
    isSelected: boolean
    sizeHorizontal: number
    sizeVertical: number
    sectorPlaces: PlaceType[]
}

const initialState: ChangeSectorType = {
    idLayer: '',
    idGroup: '',
    isSelected: false,
    sizeHorizontal: SIZE_IDENT_CIRCLE,
    sizeVertical: SIZE_IDENT_CIRCLE,
    sectorPlaces: []
}

const slice = createSlice({
    name: 'changeSector',
    initialState,
    reducers: {
        calcSizeHorizontal: (state, action: PayloadAction<{ size: number }>) => {

            const sizeInterval = SIZE_CIRCLE + action.payload.size;
            const radius = (SIZE_CIRCLE / 2);

            let startX = 0;
            state.sectorPlaces = state.sectorPlaces.map((place, ) => {

                if (place.numCol === 1) {
                    startX = place.x - radius;
                }else{
                    place.x = startX + ((place.numCol - 1) * sizeInterval) + radius;
                }

                return place;
            })

            return state;
        },
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

    const interval = checkSizeInterval(sector.places);

    dispatch(setSectorForChange({
        idLayer: data.idLayer,
        idGroup: data.idGroup,
        sectorPlaces: sector.places,
        sizeHorizontal: interval.horizontal,
        sizeVertical: interval.vertical,
        isSelected: sector.isSelected,
    }));

    dispatch(offSelectRectsAll())
    dispatch(offAllSelectedSector());
    dispatch(removeSector({idLayer: data.idLayer, idGroup: data.idGroup}));
})

const checkSizeInterval = (places: PlaceType[]) => {

    let placeOne: PlaceType | null = null;
    let placeVert: PlaceType | null = null;
    let placeHor: PlaceType | null = null;

    places.forEach(place => {
        if (place.numCol === 1 && place.numRow === 1) {
            placeOne = place
        }
        if (place.numCol === 1 && place.numRow === 2) {
            placeVert = place;
        }
        if (place.numCol === 2 && place.numRow === 1) {
            placeHor = place;
        }
    })
    if (placeOne && placeVert && placeHor) {
        //@ts-ignore todo
        return {horizontal: placeHor.x - placeOne.x - SIZE_CIRCLE, vertical: placeVert.y - placeOne - SIZE_CIRCLE}
    }
    return {horizontal: SIZE_IDENT_CIRCLE, vertical: SIZE_IDENT_CIRCLE}
}

export const {setSectorForChange, cleanChangeSector, calcSizeHorizontal} = slice.actions;
export default slice.reducer