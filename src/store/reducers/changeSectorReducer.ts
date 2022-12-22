import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {offAllSelectedSector, PlaceType, removeSector, setSectorInLayer} from "./sectorsReducer";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";
import {offSelectRectsAll, saveChangedRect} from "./rectsReducer";
import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../../components/figures/sectors/cacheCircle";
import {PointType} from "../mainType";
import {checkSizeInterval, createArraysPointRegion} from "../utils";

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
        setSectorForChange: (state, action: PayloadAction<ChangeSectorType>) => {
            state = action.payload;
            return state;
        },
        cleanChangeSector: (state) => {
            state.idGroup = '';
            state.idLayer = '';
            state.sectorPlaces = [];
            return state;
        },
        calcSizeInterval: (state, action: PayloadAction<{ size: number, col_row: 'numCol' | 'numRow', x_y: 'x' | 'y' }>) => {

            const {size, col_row, x_y} = action.payload;

            const sizeInterval = SIZE_CIRCLE + size;
            const radius = (SIZE_CIRCLE / 2);

            let start = 0;
            state.sectorPlaces = state.sectorPlaces.map(place => {

                if (place[col_row] === 1) {
                    start = place[x_y] - radius;
                } else {
                    place[x_y] = start + ((place[col_row] - 1) * sizeInterval) + radius;
                }

                return place;
            })

            return state;
        },
        toggleSelectPlace: (state, action: PayloadAction<{ start: PointType, end: PointType }>) => {

            const result = createArraysPointRegion(action.payload.start, action.payload.end);

            state.sectorPlaces.forEach(place => {

                if (result.pointsX.includes(place.x) && result.pointsY.includes(place.y)) {
                    place.isSelected = true;
                }
            });

            return state;
        },
        offSelectPlaces: (state) => {

            state.sectorPlaces.forEach(place => {
                place.isSelected = false;
            })

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

    dispatch(offSelectPlaces());

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

export const selectedPlace = createAsyncThunk('changeSector/selectedPlace', (_, {dispatch, getState}) => {

    const state = getState() as RootState;

    if (state.changeSector.idGroup && state.selectionArea.isSelection) {

        dispatch(toggleSelectPlace({start: state.mouse.mouseDown, end: state.mouse.move}))
    }
})


export const {setSectorForChange, cleanChangeSector, calcSizeInterval, toggleSelectPlace, offSelectPlaces} = slice.actions;
export default slice.reducer