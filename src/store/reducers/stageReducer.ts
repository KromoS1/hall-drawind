import {PointType, TypesFigureType} from "../mainType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Konva from "konva";
import Stage = Konva.Stage;


export type StageReducerType = {
    stagePositionZoom: PointType,
    stagePositionMove: PointType,
    draggable: boolean,
    isZoom: boolean,
    scale: number
    stage: Stage | null,
    drawFigure: TypesFigureType | null,
}

const initialState: StageReducerType = {
    stage: null,
    stagePositionZoom: {x: 0, y: 0},
    stagePositionMove: {x: 0, y: 0},
    draggable: false,
    isZoom: false,
    scale: 1.00,
    drawFigure: null,
}

const sliceStage = createSlice({
    name: 'stage',
    initialState,
    reducers: {
        setStage: (state, action: PayloadAction<{ stage: any }>) => { //TODO need to fix
            state.stage = action.payload.stage;
            return state;
        },
        setStageMove: (state, action: PayloadAction<PointType>) => {
            state.stagePositionMove.x = action.payload.x;
            state.stagePositionMove.y = action.payload.y;
            return state;
        },
        setDraggable: (state, action: PayloadAction<{ draggable: boolean }>) => {
            state.draggable = action.payload.draggable;
            return state;
        },
        setZoomPosition: (state, action: PayloadAction<PointType>) => {
            state.stagePositionZoom.x = action.payload.x;
            state.stagePositionZoom.y = action.payload.y;
            return state;
        },
        setIsZoom: (state, action: PayloadAction<{ isZoom: boolean }>) => {
            state.isZoom = action.payload.isZoom;
            return state;
        },
        setScale: (state, action: PayloadAction<{ scale: number }>) => {
            state.scale = action.payload.scale;
            return state;
        },
        setFigureDraw: (state, action: PayloadAction<{ typeFigure: TypesFigureType | null }>) => {
            state.drawFigure = action.payload.typeFigure;
            return state;
        },
        cleanCanvas: (state) => {
            return state;
        },
    }
})

export default sliceStage.reducer;
export const {
    setZoomPosition,
    setIsZoom,
    setScale,
    setDraggable,
    setStageMove,
    setStage,
    setFigureDraw,
    cleanCanvas
} = sliceStage.actions;