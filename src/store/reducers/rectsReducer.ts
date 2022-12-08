import {RectFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAllCircles} from "./circlesGroupReducer";
import {toggleSelectFigure} from "./dataFigureReducer";
import undoable from "redux-undo";

const initialState: RectFigureType[] = []

const slice = createSlice({
    name: 'rects',
    initialState,
    reducers: {
        setRectFigure: (state, action: PayloadAction<{ rect: RectFigureType }>) => {
            state = [...state, action.payload.rect];
            return state;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(toggleSelectFigure,(state,action) => {

                state = state.filter(rect => rect.id !== action.payload.figure.id);
                return state;
            })
            .addCase(removeAllCircles, state => {

                state = [];
                return state;
            })
    }
})

export const {setRectFigure} = slice.actions;
export default undoable(slice.reducer);