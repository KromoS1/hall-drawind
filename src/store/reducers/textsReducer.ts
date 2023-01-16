import {EllipseFigureType, TextFigureType} from "../mainType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import undoable from "redux-undo";
import {cleanCanvas} from "./stageReducer";
import {RootState} from "../store";
import {saveChangedSector} from "./changeSectorReducer";
import {offAllSelectedSector} from "./sectorsReducer";

export type TextReducerType = {
    texts: TextFigureType[],
    createText: TextFigureType | null
}

const initialState: TextReducerType = {
    texts: [],
    createText: null
}

const slice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        setTextFigure: (state, action: PayloadAction<{ text: TextFigureType }>) => {
            state.texts = [...state.texts, action.payload.text];
            return state;
        },
        changeDataText: (state, action: PayloadAction<{ text: TextFigureType }>) => {
            state.createText = action.payload.text;
            return state;
        },
        toggleSelectText: (state, action: PayloadAction<{ idText: string, value: boolean }>) => {
            state.texts = state.texts.map(text => {
                if (text.id === action.payload.idText) {
                    text.isSelected = action.payload.value;
                }
                return text;
            });
            return state;
        },
        setTextInChange: (state, action: PayloadAction<{ text: TextFigureType }>) => {
            state.createText = action.payload.text;
            state.createText.isSelected = true;
            state.texts = state.texts.filter(text => text.id !== action.payload.text.id);
            return state;
        },
        saveChangedText: (state) => {
            if (state.createText) {
                state.createText.isSelected = false;
                state.texts.push(state.createText);
            }
            state.createText = null;
            return state;
        },
        offSelectTextsAll: (state) => {
            state.texts = state.texts.map(text => {
                text.isSelected = false;
                return text;
            })
            return state;
        },
        removeTexts: (state) => {
            state.texts = state.texts.filter(text => !text.isSelected);
            state.createText = null;
            return state;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(cleanCanvas, state => {
                state.texts = [];
                state.createText = null;
                return state;
            })
    }
})

export const setTextForChange = createAsyncThunk('texts/setTextForChange',
    (text: TextFigureType, {dispatch, getState}) => {

        const state = getState() as RootState;

        if (state.changeSector.idGroup) {
            dispatch(saveChangedSector());
        }
        if (state.texts.present.createText) {
            dispatch(saveChangedText());
        }

        dispatch(offAllSelectedSector());
        dispatch(offSelectTextsAll());
        dispatch(setTextInChange({text}));
    })

export const {
    setTextFigure,
    changeDataText,
    toggleSelectText,
    setTextInChange,
    saveChangedText,
    offSelectTextsAll,
    removeTexts
} = slice.actions;

export const TextReducerForTest = slice.reducer;
export default undoable(slice.reducer);