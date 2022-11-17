import {PointType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Konva from "konva";


export type StageReducerType = {
    stagePositionZoom: PointType,
    stagePositionMove: PointType,
    draggable: boolean,
    isZoom: boolean,
    scale:number
    stage: any
}

const initialState: StageReducerType = {
    stage: null,
    stagePositionZoom: {x: 0, y: 0},
    stagePositionMove: {x: 0, y: 0},
    draggable:false,
    isZoom: false,
    scale: 1.00,
}

// пока не нужен, используется только в тестах

const sliceStage = createSlice({
    name: 'mouse',
    initialState,
    reducers: {
        setStage: (state, action: PayloadAction<{stage: any}>) => { //TODO need to fix
            state.stage = action.payload.stage;
            return state;
        },
        setStageMove: (state,action:PayloadAction<PointType>) => {
            state.stagePositionMove.x = action.payload.x;
            state.stagePositionMove.y = action.payload.y;
            return state;
        },
        setDraggable: (state,action:PayloadAction<{draggable: boolean}>) => {
            state.draggable = action.payload.draggable;
            return state;
        },
        setZoomPosition: (state,action:PayloadAction<PointType>) => {
            state.stagePositionZoom.x = action.payload.x;
            state.stagePositionZoom.y = action.payload.y;
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
export const {setZoomPosition, setIsZoom, setScale, setDraggable, setStageMove, setStage} = sliceStage.actions;