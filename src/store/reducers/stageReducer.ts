import {PointType} from "../mainType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setMousePosition} from "./mouseReducer";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

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
    scale: 1.05,
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
    const stage = e.currentTarget;
    //@ts-ignore
    const statePos = stage.getPointerPosition();
    //@ts-ignore
    const pointMouseDown = thunkApi.getState()?.mouse.mouseDown;
    console.log(pointMouseDown,'pointMouseDown')
    console.log(statePos,'statePos')
    const resPos = {
        x: pointMouseDown.x - statePos.x,
        y: pointMouseDown.y - statePos.y
    }
    thunkApi.dispatch(setStageMove(resPos));

})

export default sliceStage.reducer;
export const {setZoomPosition, setIsZoom, setScale, setDraggable, setStageMove} = sliceStage.actions;