import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SelectionAreaReducerType = {
    isSelection: boolean,
    isDrawGrid: boolean,
}

const initialState: SelectionAreaReducerType = {
    isSelection: false,
    isDrawGrid: false,
}

const sliceSelectionArea = createSlice({
    name: 'selectionArea',
    initialState,
    reducers: {
        setIsSelection: (state,action:PayloadAction<{isSelection:boolean}>) => {
            state.isSelection = action.payload.isSelection;
            return state;
        },
        setIsDrawGrid: (state,action:PayloadAction<{isDrawGrid:boolean}>) => {
            state.isDrawGrid = action.payload.isDrawGrid;
            return state;
        },
        resetParamSelection: (state) => {
            state.isSelection = false;
            state.isDrawGrid = false;
            return state;
        }
    }
})

export const {setIsSelection, setIsDrawGrid, resetParamSelection} = sliceSelectionArea.actions;
export default sliceSelectionArea.reducer;
