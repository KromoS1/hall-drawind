import {EllipseFigureType, Figures, RectFigureType, TextFigureType, TypesFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAllCircles} from "./circlesGroupReducer";
import undoable, {includeAction} from "redux-undo";

export type AllFiguresType = RectFigureType | EllipseFigureType | TextFigureType

export type OtherFigureReducerType = {
    drawFigure: TypesFigureType | null
    figures: {
        rect: RectFigureType[],
        ellipses: EllipseFigureType[],
        text: TextFigureType[]
    }
}

const initialState: OtherFigureReducerType = {
    drawFigure: null,
    figures: {
        rect: [],
        ellipses: [],
        text: []
    }
}

const checkFigure = (figure: TypesFigureType) => {
    switch (figure) {
        case Figures.RECT: return 'rect';
        case Figures.ELLIPSE: return 'ellipses';
        case Figures.TEXT: return 'text';
    }
}

const slice = createSlice({
    name: 'otherFigure',
    initialState,
    reducers: {
        setFigureDraw: (state, action: PayloadAction<{ typeFigure: TypesFigureType | null }>) => {
            state.drawFigure = action.payload.typeFigure;
            return state;
        },
        setFigure: (state, action: PayloadAction<{ figure: AllFiguresType }>) => {
            switch (action.payload.figure.typeFigure) {
                case Figures.RECT: {
                    state.figures.rect = [...state.figures.rect, action.payload.figure as RectFigureType];
                    return state;
                }
                case Figures.ELLIPSE: {
                    state.figures.ellipses = [...state.figures.ellipses, action.payload.figure as EllipseFigureType];
                    return state;
                }
                case Figures.TEXT: {
                    state.figures.text = [...state.figures.text, action.payload.figure as TextFigureType];
                    return state;
                }
            }
        },
        updateFigureRect: (state,action:PayloadAction<{rect: RectFigureType}>) => {
            state.figures.rect = state.figures.rect.map(f => {
                if (f.id === action.payload.rect.id) {
                    return action.payload.rect;
                }
                return f;
            })
            return state;
        },
        offAllSelected: (state) => {
            state.figures.rect = state.figures.rect.map(figure => {
                figure.isSelected = false;
                return figure;
            });
            state.figures.ellipses = state.figures.ellipses.map(figure => {
                figure.isSelected = false;
                return figure;
            })
            state.figures.text = state.figures.text.map(figure => {
                figure.isSelected = false;
                return figure;
            })
            return state;
        },
    },
    extraReducers: builder => {
        builder.addCase(removeAllCircles, (state) => {
            state.drawFigure = null;
            state.figures.rect = [];
            state.figures.ellipses = [];
            state.figures.text = [];
            return state;
        })
    }
})

export const {setFigureDraw, setFigure, updateFigureRect, offAllSelected} = slice.actions
export const otherFigureReducerForTest = slice.reducer;
export default undoable(slice.reducer, {filter: includeAction(setFigureDraw)})