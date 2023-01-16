import {EllipseFigureType} from "../mainType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {saveChangedSector} from "./changeSectorReducer";
import {offAllSelectedSector} from "./sectorsReducer";
import undoable from "redux-undo";
import {cleanCanvas} from "./stageReducer";

export type EllipseReducerType = {
    ellipses: EllipseFigureType[],
    changeEllipse: EllipseFigureType | null
}

const initialState: EllipseReducerType = {
    ellipses: [],
    changeEllipse: null
}

const slice = createSlice({
    name: 'ellipses',
    initialState,
    reducers: {
        setEllipseFigure: (state, action: PayloadAction<{ ellipse: EllipseFigureType }>) => {
            state.ellipses = [...state.ellipses, action.payload.ellipse];
            return state;
        },
        changeDataEllipse: (state, action: PayloadAction<{ ellipse: EllipseFigureType }>) => {
            state.changeEllipse = action.payload.ellipse;
            return state;
        },
        toggleSelectEllipse: (state, action: PayloadAction<{ idEllipse: string, value: boolean }>) => {
            state.ellipses = state.ellipses.map(ellipse => {
                if (ellipse.id === action.payload.idEllipse) {
                    ellipse.isSelected = action.payload.value;
                }
                return ellipse;
            });
            return state;
        },
        setEllipseInChange: (state, action: PayloadAction<{ ellipse: EllipseFigureType }>) => {
            state.changeEllipse = action.payload.ellipse;
            state.changeEllipse.isSelected = true;
            state.ellipses = state.ellipses.filter(ellipse => ellipse.id !== action.payload.ellipse.id);
            return state;
        },
        saveChangedEllipse: (state) => {
            if (state.changeEllipse) {
                state.changeEllipse.isSelected = false;
                state.ellipses.push(state.changeEllipse);
            }
            state.changeEllipse = null;
            return state;
        },
        offSelectEllipsesAll: (state) => {
            state.ellipses = state.ellipses.map(ellipse => {
                ellipse.isSelected = false;
                return ellipse;
            })
            return state;
        },
        removeEllipses: (state) => {
            state.ellipses = state.ellipses.filter(ellipse => !ellipse.isSelected);
            state.changeEllipse = null;
            return state;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(cleanCanvas, state => {
                state.ellipses = [];
                state.changeEllipse = null;
                return state;
            })
    }
})

export const setEllipseForChange = createAsyncThunk('ellipses/setEllipseForChange',
    (ellipse: EllipseFigureType, {dispatch, getState}) => {

    const state = getState() as RootState;

    if (state.changeSector.idGroup) {
        dispatch(saveChangedSector());
    }
    if (state.ellipses.present.changeEllipse) {
        dispatch(saveChangedEllipse());
    }

    dispatch(offAllSelectedSector());
    dispatch(offSelectEllipsesAll());
    dispatch(setEllipseInChange({ellipse}));
})

export const {
    setEllipseFigure,
    changeDataEllipse,
    toggleSelectEllipse,
    setEllipseInChange,
    saveChangedEllipse,
    offSelectEllipsesAll,
    removeEllipses
} = slice.actions;

export const EllipsesReducerForTest = slice.reducer;
export default undoable(slice.reducer);