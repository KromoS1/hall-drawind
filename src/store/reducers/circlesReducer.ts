import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";

export type CirclesType = PointType & {
    id: string,
    numRow: number
    numCol: number
    isDraggable: boolean
    isSelected: boolean
}

const initialState: CirclesType[] = []

const sliceCircles = createSlice({
    name: 'mouse',
    initialState,
    reducers: {
        setCirclePosition: (state, action: PayloadAction<CirclesType[]>) => {
            state = [...state, ...action.payload];
            return state;
        },
        toggleSelect: (state, action:PayloadAction<{id:string, value: boolean}>) => {
            const circle = state.find(c => c.id === action.payload.id);

            if (circle) {
                circle.isSelected = action.payload.value;
            }
            return state;
        },
        resetSelected:(state) => {
            state = state.map(circle => {
                circle.isSelected = false;
                return circle;
            })
            return state;
        },
        removeAllCircles: (state) => {
            state = [];
            return state;
        }
    }
})

export const {setCirclePosition, removeAllCircles, toggleSelect, resetSelected} = sliceCircles.actions;
export default sliceCircles.reducer

