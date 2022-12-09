import {GeneralFigureType, TypesFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAllCircles} from "./sectorsReducer";

export type DataFigureReducerType = {
    drawFigure: TypesFigureType | null,
    idSelectFigure: string,
    typeFigureSelected: TypesFigureType | null,
}

const initialState: DataFigureReducerType = {
    drawFigure: null,
    idSelectFigure: '',
    typeFigureSelected: null,
}

const slice = createSlice({
    name: 'dataFigure',
    initialState,
    reducers: {
        toggleSelectFigure: (state, action: PayloadAction<{ typeFigure: TypesFigureType, idSelected: string, figure: GeneralFigureType }>) => {
            state.idSelectFigure = action.payload.idSelected;
            state.typeFigureSelected = action.payload.typeFigure;
            return state;
        },
        setFigureDraw: (state, action: PayloadAction<{ typeFigure: TypesFigureType | null }>) => {
            state.drawFigure = action.payload.typeFigure;
            return state;
        },
        offSelectFigure: (state) => {
            state.idSelectFigure = '';
            state.typeFigureSelected = null;
            return state;
        },
        removeFigure: (state) => {
            state.idSelectFigure = '';
            state.typeFigureSelected = null;
            return state;
        }
    },
    extraReducers: builder => builder
        .addCase(removeAllCircles, state => {
            state.idSelectFigure = '';
            state.typeFigureSelected = null;
            return state;
        })
})

// export const selectedFigure = createAsyncThunk('dataFigure/offSelected', async (figure: GeneralFigureType, {
//     dispatch,
//     getState
// }) => {
//
//     const state = getState() as RootState;
//     const currentFigure = state.dataFigure.idSelectFigure;
//
//     if (currentFigure.length < 1) {
//         dispatch(toggleSelectFigure({figure}));
//     } else {
//         await dispatch(offSelectedFigureChange());
//         dispatch(toggleSelectFigure({figure}));
//     }
// })

// export const offSelectedFigureChange = createAsyncThunk('dataFigure/offSelected', async (_, {
//
//     getState
// }) => {
//
//     const state = getState() as RootState;
//     const changeFigures = state.dataFigure.changeFigure;
//
//     return new Promise<string>(res => {
//         dispatch(offSelectFigure());
//
//         if (changeFigures) {
//
//             switch (changeFigures.typeFigure) {
//                 case Figures.RECT : {
//                     //@ts-ignore todo
//                     dispatch(setRectFigure({rect: {...changeFigures, isSelected: false}}));
//                     res('success');
//                 }
//             }
//         }
//     })
// })

export const { setFigureDraw, toggleSelectFigure, offSelectFigure, removeFigure} = slice.actions
export default slice.reducer;