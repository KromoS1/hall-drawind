import {EllipseFigureType, Figures, RectFigureType, TextFigureType, TypesFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAllCircles} from "./circlesGroupReducer";
import undoable, {includeAction} from "redux-undo";

export type AllFiguresType = RectFigureType | EllipseFigureType | TextFigureType

type OtherFigureReducerType = {
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
        }
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

export const {setFigureDraw, setFigure} = slice.actions
export default undoable(slice.reducer, {filter: includeAction(setFigureDraw)})