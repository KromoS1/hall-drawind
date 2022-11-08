import {PointType} from "../mainType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Konva from "konva";
import {moveStage, zoomStage} from "../calculateDateEvents/zoom";
import KonvaEventObject = Konva.KonvaEventObject;
import {setIsDrawGrid, setIsSelection} from "./selectionAreaReducer";

export type StageReducerType = {
    stagePositionZoom: PointType,
    stagePositionMove: PointType,
    draggable: boolean,
    isZoom: boolean,
    scale:number
}

const initialState: StageReducerType = {
    stagePositionZoom: {x: 0, y: 0},
    stagePositionMove: {x: 0, y: 0},
    draggable:false,
    isZoom: false,
    scale: 1.00,
}

const sliceStage = createSlice({
    name: 'mouse',
    initialState,
    reducers: {
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

export const stageMoveThunk = createAsyncThunk('stage/stageMove',async (e:KonvaEventObject<MouseEvent>,thunkApi) => {
    // @ts-ignore
    // const scale = thunkApi.getState()?.stage.scale;

    const moveSetting = moveStage(e);

    //@ts-ignore
    // const stagePos = e.currentTarget.getPointerPosition();
    //@ts-ignore
    // const pointMouseDown = thunkApi.getState()?.mouse.mouseDown;

    // const resPos = {
    //     x: pointMouseDown.x - stagePos.x * scale,
    //     y: pointMouseDown.y - stagePos.y * scale
    // }

    thunkApi.dispatch(setStageMove({x: moveSetting.x, y: moveSetting.y}));
})


//попробовать сделть сейв координат мышки сразу здесь при зуме, а не при движении
export const stageZoomThunk = createAsyncThunk('stage/stageZoom', async (e: KonvaEventObject<MouseEvent>,thunkApi) => {
    //@ts-ignore
    const zoomSetting = zoomStage(e);
    thunkApi.dispatch(setZoomPosition(zoomSetting.pos));
    thunkApi.dispatch(setIsZoom({isZoom: zoomSetting.isZoom}));
    thunkApi.dispatch(setScale({scale: zoomSetting.scale}));
})

export const toggleMoteStageThunk = createAsyncThunk('stage/toggleMoteStage', async (valueToggle:boolean,thunkApi) => {
    thunkApi.dispatch(setDraggable({draggable: valueToggle}));
    thunkApi.dispatch(setIsSelection({isSelection: false}));
    thunkApi.dispatch(setIsDrawGrid({isDrawGrid: false}));
})

export default sliceStage.reducer;
export const {setZoomPosition, setIsZoom, setScale, setDraggable, setStageMove} = sliceStage.actions;