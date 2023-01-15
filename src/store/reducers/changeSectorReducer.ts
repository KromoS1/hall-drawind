import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {offAllSelectedSector, PlaceType, removeSector, setSectorInLayer} from "./sectorsReducer";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";
import {offSelectRectsAll, saveChangedRect} from "./rectsReducer";
import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../../components/figures/sectors/cacheCircle";
import {PointType} from "../mainType";
import {
    cacheMiddleColumnPlace,
    calcSidesTriangle, changeSizeIntervalPlaces,
    changeCurveForPlace,
    checkMaxColumnOrRowInSector,
    checkSizeInterval,
    createArraysPointRegion,
    searchCenterCircle
} from "../utils";

export type ChangeSectorType = {
    idLayer: string
    idGroup: string,
    isSelected: boolean
    sizeHorizontal: number
    sizeVertical: number
    middleColumnPlace: { [key: string]: PlaceType }
    curve: number
    sectorPlaces: PlaceType[]
    sectorPlacesCache: PlaceType[]
    rotation: number
}

const initialState: ChangeSectorType = {
    idLayer: '',
    idGroup: '',
    isSelected: false,
    sizeHorizontal: SIZE_IDENT_CIRCLE,
    sizeVertical: SIZE_IDENT_CIRCLE,
    middleColumnPlace: {},
    curve: 0,
    sectorPlaces: [],
    sectorPlacesCache: [],
    rotation: 0
}

const PREFIX = 'changeSector';
let middle: number[] = [];
let maxCol: number = 0;
let centerPlaces: { [key: string]: PointType } = {};

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

            state.sectorPlaces = changeSizeIntervalPlaces(state.sectorPlaces, sizeInterval, radius, col_row, x_y);
            state.sectorPlacesCache = changeSizeIntervalPlaces(state.sectorPlacesCache, sizeInterval, radius, col_row, x_y);

            centerPlaces = searchCenterCircle(state.sectorPlacesCache, maxCol);

            return state;
        },
        calcCurve: (state, action: PayloadAction<{ cornerCurve: number }>) => {

            for (let i = 0; i < state.sectorPlaces.length; i++) {

                const placeCache = state.sectorPlacesCache[i];
                const place = state.sectorPlaces[i];

                const triangle = calcSidesTriangle(centerPlaces[place.numRow], placeCache, action.payload.cornerCurve);

                state.sectorPlaces[i] = changeCurveForPlace(placeCache, action.payload.cornerCurve, middle, triangle, centerPlaces);
            }

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
        },
        setRotation: (state,action: PayloadAction<{corner: number}>) => {

            state.rotation = action.payload.corner;

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

export const saveChangedSector = createAsyncThunk(`${PREFIX}/saveChangedSector`, (_, {dispatch, getState}) => {

    dispatch(offSelectPlaces());

    const state = getState() as RootState;
    const changeSector = state.changeSector;

    if (changeSector.idGroup) {
        dispatch(setSectorInLayer({...changeSector}));
    }
    dispatch(cleanChangeSector());
})

export const setSectorInChange = createAsyncThunk(`${PREFIX}/setSectorInChange`, (data: { idLayer: string, idGroup: string }, {
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

    maxCol = checkMaxColumnOrRowInSector(sector.places, 'numCol');
    middle = [Math.ceil(maxCol / 2)];

    if (maxCol % 2 === 0) {
        middle.push(middle[0] + 1)
    }

    centerPlaces = searchCenterCircle(sector.places, maxCol);

    dispatch(setSectorForChange({
        idLayer: data.idLayer,
        idGroup: data.idGroup,
        sectorPlaces: sector.places,
        sizeHorizontal: interval.horizontal,
        sizeVertical: interval.vertical,
        isSelected: sector.isSelected,
        curve: 0, //todo написать функцию для расчета смещения
        middleColumnPlace: cacheMiddleColumnPlace(sector.places, middle[0]),
        sectorPlacesCache: sector.places,
        rotation: 0
    }));

    dispatch(offSelectRectsAll())
    dispatch(offAllSelectedSector());
    dispatch(removeSector({idLayer: data.idLayer, idGroup: data.idGroup}));
})

export const selectedPlace = createAsyncThunk(`${PREFIX}/selectedPlace`, (_, {dispatch, getState}) => {

    const state = getState() as RootState;

    if (state.changeSector.idGroup && state.selectionArea.isSelection) {

        dispatch(toggleSelectPlace({start: state.mouse.mouseDown, end: state.mouse.move}))
    }
})


export const {
    setSectorForChange,
    cleanChangeSector,
    calcSizeInterval,
    toggleSelectPlace,
    offSelectPlaces,
    calcCurve,
    setRotation
} = slice.actions;
export default slice.reducer