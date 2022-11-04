import {PointType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StageReducerType = {
    stagePosition: PointType,
    isZoom: boolean,
    scale:number
}

const initialState: StageReducerType = {
    stagePosition:{x: 0, y: 0},
    isZoom: false,
    scale: 1.05,
}

const sliceStage = createSlice({
    name: 'mouse',
    initialState,
    reducers: {
        setZoomPosition: (state,action:PayloadAction<PointType>) => {
            state.stagePosition.x = action.payload.x;
            state.stagePosition.y = action.payload.y;
            return state;
        },
        setIsZoom: (state, action:PayloadAction<{isZoom:boolean}>) => {
            state.isZoom = action.payload.isZoom;
            return state;
        },
        setScale: (state, action: PayloadAction<{scale:number}>) => {
            state.scale = action.payload.scale;
            return state;
        }
    }
})

export default sliceStage.reducer;
export const {setZoomPosition, setIsZoom, setScale} = sliceStage.actions;