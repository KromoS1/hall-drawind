import {Figures, GeneralFigureType, TypesFigureType} from "../mainType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {setRectFigure} from "./rectsReducer";
import {removeAllCircles} from "./sectorsReducer";

export type DataFigureReducerType = {
    drawFigure: TypesFigureType | null,
    idSelectFigure: string,
    typeFigureSelected: TypesFigureType | null,
    changeFigure: GeneralFigureType | null
}

const initialState: DataFigureReducerType = {
    drawFigure: null,
    idSelectFigure: '',
    typeFigureSelected: null,
    changeFigure: null
}

const slice = createSlice({
    name: 'dataFigure',
    initialState,
    reducers: {
        changeDataFigure: (state,action: PayloadAction<{figure: GeneralFigureType}>) => {
            state.changeFigure = action.payload.figure;
            return state;
        },
        toggleSelectFigure: (state, action: PayloadAction<{figure: GeneralFigureType }>) => {
            state.changeFigure = {
                ...action.payload.figure,
                isSelected: true,
            };
            state.idSelectFigure = action.payload.figure.id;
            state.typeFigureSelected = action.payload.figure.typeFigure;
            return state;
        },
        setFigureDraw: (state, action: PayloadAction<{ typeFigure: TypesFigureType | null }>) => {
            state.drawFigure = action.payload.typeFigure;
            return state;
        },
        offSelectFigure: (state) => {
            state.idSelectFigure = '';
            state.typeFigureSelected = null;
            state.changeFigure = null;
            return state;
        }
    },
    extraReducers: builder => builder
        .addCase(removeAllCircles, state => {

            state.idSelectFigure = '';
            state.typeFigureSelected = null;
            state.changeFigure = null;
            return state;
        })
})

export const selectedFigure = createAsyncThunk('dataFigure/offSelected', async ( figure: GeneralFigureType,{
    dispatch,
    getState
}) => {

    const state = getState() as RootState;
    const currentFigure = state.dataFigure.idSelectFigure;

    if (currentFigure.length < 1){
        dispatch(toggleSelectFigure({figure}));
    }else{
        await dispatch(offSelectedFigureChange());
        dispatch(toggleSelectFigure({figure}));
    }
})

export const offSelectedFigureChange = createAsyncThunk('dataFigure/offSelected', async (_,{
    dispatch,
    getState
}) => {

    const state = getState() as RootState;
    const changeFigures = state.dataFigure.changeFigure;

    return new Promise<string>(res => {
        dispatch(offSelectFigure());

        if (changeFigures){

            switch (changeFigures.typeFigure){
                case Figures.RECT :{
                    //@ts-ignore todo
                    dispatch(setRectFigure({rect: {...changeFigures,isSelected:false}}));
                    res('success');
                }
            }
        }
    })
})

export const {changeDataFigure,setFigureDraw, toggleSelectFigure, offSelectFigure} = slice.actions
export default slice.reducer;