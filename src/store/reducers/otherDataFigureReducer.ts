import {TypesFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type OtherFigureReducerType = {
    drawFigure: TypesFigureType | null,
    idSelectFigure: string,
    typeFigureSelected: TypesFigureType | null,
}

const initialState: OtherFigureReducerType = {
    drawFigure: null,
    idSelectFigure: '',
    typeFigureSelected: null
}

const slice = createSlice({
    name: 'otherDataFigure',
    initialState,
    reducers: {
        toggleSelectFigure: (state, action: PayloadAction<{ idFigure: string, isSelected: boolean, typeFigure: TypesFigureType }>) => {
            state.idSelectFigure = action.payload.idFigure;
            state.typeFigureSelected = action.payload.typeFigure;
            return state;
        },
        setFigureDraw: (state, action: PayloadAction<{ typeFigure: TypesFigureType | null }>) => {
            state.drawFigure = action.payload.typeFigure;
            return state;
        },
        offSelectFigure: (state) => {
            state.idSelectFigure = '';
            return state;
        }
    },
})

export const {setFigureDraw, toggleSelectFigure, offSelectFigure} = slice.actions
export default slice.reducer;