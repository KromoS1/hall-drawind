import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SelectionAreaReducerType = {
    isSelection: boolean,
    isDrawGrid: boolean,
    // countCirclesDraw: CountCirclesDrawType
}

const initialState: SelectionAreaReducerType = {
    isSelection: false,
    isDrawGrid: false,
    // countCirclesDraw: {
    //     countX: 0,
    //     countY: 0
    // },
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
        // setCountCirclesDraw: (state, action: PayloadAction<CountCirclesDrawType>) => {
        //     state.countCirclesDraw = action.payload;
        //     return state;
        // },
        resetParamSelection: (state) => {
            state.isSelection = false;
            state.isDrawGrid = false;
            return state;
        }
    }
})

// export const selectedCircle = createAsyncThunk('mouse/mouseMove', async (id:string, {dispatch,getState}) => {
//
//     const state = getState() as RootState
//
//     const mouse = state.mouse;
//     const isSelected = state.selectionArea.isSelection;
//     const circles = state.circles;
//
//     if (mouse.isDown && isSelected){
//
//         calcSelectedCircle(mouse.mouseDown, mouse.move, circles, dispatch);
//
//     }
// })

export const {setIsSelection, setIsDrawGrid} = sliceSelectionArea.actions;
export default sliceSelectionArea.reducer;
