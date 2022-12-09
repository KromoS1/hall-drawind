import {Figures, GeneralFigureType, RectFigureType, TypesFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAllCircles} from "./sectorsReducer";
import {offSelectFigure, removeFigure, toggleSelectFigure} from "./dataFigureReducer";
import undoable from "redux-undo";

export type RectReducerType = {
    rects:  RectFigureType[],
    changeRect: RectFigureType | null
}

const initialState:RectReducerType = {
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
    },
    extraReducers: builder => {
        builder
            .addCase(toggleSelectFigure,(state,action) => {

                if (action.payload.typeFigure === Figures.RECT && !Array.isArray(action.payload.figure)){
                    state.rects = state.rects.filter(rect => rect.id !== action.payload.idSelected);
                    //@ts-ignore todo
                    state.changeRect = action.payload.figure;
                }
                return state;
            })
            .addCase(offSelectFigure,(state) => {
                if (state.changeRect) {
                    state.changeRect.isSelected = false;
                    state.rects = [...state.rects, state.changeRect]
                    state.changeRect = null;
                }
                return state;
            })
            .addCase(removeFigure,(state,action) => {
                state.changeRect = null;
                return state;
            })
            .addCase(removeAllCircles, state => {
                state.rects = [];
                state.changeRect = null;
                return state;
            })
    }
})

export const {setRectFigure,changeDataRect} = slice.actions;
export const RectsReducerForTest = slice.reducer;
export default undoable(slice.reducer);