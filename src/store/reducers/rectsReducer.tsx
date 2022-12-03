import {RectFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAllCircles} from "./circlesGroupReducer";
import {offSelectFigure, toggleSelectFigure} from "./otherDataFigureReducer";
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
        changeDataRect: (state, action:PayloadAction<{rect: RectFigureType}>) => {

            return state.map(rect => {

                if (rect.id === action.payload.rect.id){
                    return action.payload.rect
                }
                return rect;
            })

        }
    },
    extraReducers: builder => {
        builder
            .addCase(toggleSelectFigure,(state,action) => {
                state.forEach(r => {
                    r.isSelected = false;
                })

                const selectedRect = state.find(r => r.id === action.payload.idFigure);

                if(selectedRect) {
                    selectedRect.isSelected = action.payload.isSelected;
                }

                return state;
            })
            .addCase(offSelectFigure,state => {
                state.forEach(r => {
                    r.isSelected = false;
                })
            })
            .addCase(removeAllCircles, state => {
                state = [];
                return state;
            })
    }
})

export const {setRectFigure, changeDataRect} = slice.actions;
export default undoable(slice.reducer);