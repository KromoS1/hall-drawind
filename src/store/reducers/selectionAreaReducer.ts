import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {calcSelectedCircle} from "../calculateDateEvents/calculateGrid";
import {toggleSelect} from "./circlesReducer";

export type CountCirclesDrawType = {
    countX: number,
    countY: number
}

export type SelectionAreaReducerType = {
    selectCircle: boolean
    isSelection: boolean,
    isDrawGrid: boolean,
    countCirclesDraw: CountCirclesDrawType
}

const initialState: SelectionAreaReducerType = {
    selectCircle: false,
    isSelection: false,
    isDrawGrid: false,
    countCirclesDraw: {
        countX: 0,
        countY: 0
    },
}

const sliceSelectionArea = createSlice({
    name: 'selectionArea',
    initialState,
    reducers: {
        toggleSelectCircle:(state,action:PayloadAction<{selectCircle: boolean}>) => {
            state.selectCircle = action.payload.selectCircle;
            return state;
        },
        setIsSelection: (state,action:PayloadAction<{isSelection:boolean}>) => {
            state.isSelection = action.payload.isSelection;
            return state;
        },
        setIsDrawGrid: (state,action:PayloadAction<{isDrawGrid:boolean}>) => {
            state.isDrawGrid = action.payload.isDrawGrid;
            return state;
        },
        setCountCirclesDraw: (state, action: PayloadAction<CountCirclesDrawType>) => {
            state.countCirclesDraw = action.payload;
            return state;
        },
        resetParamSelection: (state) => {
            state.isSelection = false;
            state.isDrawGrid = false;
            return state;
        }
    }
})

export const selectedCircle = createAsyncThunk('mouse/mouseMove', async (id:string, {dispatch,getState}) => {

    const state = getState() as RootState

    const mouse = state.mouse;
    const isSelected = state.selectionArea.isSelection;
    const circles = state.circles;

    if (mouse.isDown && isSelected){

        calcSelectedCircle(mouse.mouseDown, mouse.move, circles, dispatch);

        // if (idSelectCircle.length > 0){
        //     dispatch(toggleSelectCircle({selectCircle:true}));
        //     dispatch(toggleSelect(idSelectCircle));
        // }

    }
})

export const {setIsSelection, setIsDrawGrid, setCountCirclesDraw, toggleSelectCircle, resetParamSelection} = sliceSelectionArea.actions;
export default sliceSelectionArea.reducer;
