import {RectFigureType} from "../mainType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import undoable from "redux-undo";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";
import {saveChangedSector} from "./changeSectorReducer";
import {offAllSelectedSector} from "./sectorsReducer";

export type RectReducerType = {
    rects: RectFigureType[],
    changeRect: RectFigureType | null
}

const initialState: RectReducerType = {
    rects: [],
    changeRect: null
}

const slice = createSlice({
    name: 'rects',
    initialState,
    reducers: {
        setRectFigure: (state, action: PayloadAction<{ rect: RectFigureType }>) => {

            state.rects = [...state.rects, action.payload.rect];
            return state;
        },
        changeDataRect: (state, action: PayloadAction<{ rect: RectFigureType }>) => {

            state.changeRect = action.payload.rect;
            return state;
        },
        toggleSelectRect: (state, action: PayloadAction<{ idRect: string, value: boolean }>) => {

            state.rects = state.rects.map(rect => {
                if (rect.id === action.payload.idRect) {
                    rect.isSelected = action.payload.value;
                }
                return rect;
            });
            return state;
        },
        setRectInChange: (state, action: PayloadAction<{ rect: RectFigureType }>) => {

            state.changeRect = action.payload.rect;
            state.changeRect.isSelected = true;
            state.rects = state.rects.filter(rect => rect.id !== action.payload.rect.id);

            return state;
        },
        saveChangedRect: (state) => {

            if (state.changeRect) {
                state.changeRect.isSelected = false;
                state.rects.push(state.changeRect);
            }

            state.changeRect = null;
            return state;
        },
        offSelectRectsAll: (state) => {

            state.rects = state.rects.map(rect => {
                rect.isSelected = false;
                return rect;
            })
            return state;
        },
        removeRects: (state) => {

            state.rects = state.rects.filter(rect => !rect.isSelected);
            state.changeRect = null;
            return state;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(cleanCanvas, state => {
                state.rects = [];
                state.changeRect = null;
                return state;
            })
    }
})

export const setRectForChange = createAsyncThunk('rects/setRectForChange', (rect: RectFigureType, {
    dispatch,
    getState
}) => {

    const state = getState() as RootState;

    if (state.changeSector.idGroup) {
        dispatch(saveChangedSector());
    }

    if (state.rects.present.changeRect) {
        dispatch(saveChangedRect());
    }

    dispatch(offAllSelectedSector());
    dispatch(offSelectRectsAll());
    dispatch(setRectInChange({rect}));

})

export const {
    setRectFigure,
    changeDataRect,
    toggleSelectRect,
    setRectInChange,
    saveChangedRect,
    removeRects,
    offSelectRectsAll,
} = slice.actions;
export const RectsReducerForTest = slice.reducer;
export default undoable(slice.reducer);