import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

export type MouseReducerType = {
    move: PointType,
    mouseDown: PointType,
    mouseUp: PointType,
    isDown: boolean,
}

const initialState: MouseReducerType = {
    move: {x: 0, y: 0},
    mouseDown: {x: 0, y: 0},
    mouseUp: {x: 0, y: 0},
    isDown: false,
}

const sliceMouse = createSlice({
    name: 'mouse',
    initialState,
    reducers: {
        setMousePosition: (state, action: PayloadAction<PointType>) => {
            state.move = action.payload;
            return state;
        },
        setMousePointDown: (state, action: PayloadAction<PointType>) => {
            state.mouseDown = action.payload;
            return state;
        },
        setMousePointUp: (state, action: PayloadAction<PointType>) => {
            state.mouseUp = action.payload;
            return state;
        },
        setValueDown: (state, action: PayloadAction<{ isDown: boolean }>) => {
            state.isDown = action.payload.isDown;
            return state;
        },
    }
})

const checkZoom = (isZoom: boolean, mousePos: PointType, stageZoomPos: PointType, scale: number) => {

    if (isZoom) {
        return {x: +((mousePos.x - stageZoomPos.x) / scale).toFixed(2), y: +((mousePos.y - stageZoomPos.y) / scale).toFixed(2)}
    }else{
        return {x: mousePos.x, y: mousePos.y }
    }
}

export const mouseMoveThunk = createAsyncThunk('mouse/mouseMove',async (e:KonvaEventObject<MouseEvent>,thunkApi) => {
    // @ts-ignore
    const stage = thunkApi.getState()?.stage;

    const mousePos = {
        x: e.evt.offsetX + stage.stagePositionMove.x,
        y: e.evt.offsetY + stage.stagePositionMove.y
    }

    thunkApi.dispatch(setMousePosition(checkZoom(stage.isZoom, mousePos, stage.stagePositionZoom, stage.scale)));
})

export const mouseDownThunk = createAsyncThunk('mouse/mouseMove',async (e:KonvaEventObject<MouseEvent>,thunkApi) => {
    // @ts-ignore
    const stage = thunkApi.getState()?.stage;
    thunkApi.dispatch(setValueDown({isDown: true}));

    const mousePos = {
        x: e.evt.offsetX + stage.stagePositionMove.x,
        y: e.evt.offsetY + stage.stagePositionMove.y
    }

    thunkApi.dispatch(setMousePointDown(checkZoom(stage.isZoom, mousePos, stage.stagePositionZoom, stage.scale)));
})

export const mouseUpThunk = createAsyncThunk('mouse/mouseMove',async (e:KonvaEventObject<MouseEvent>,thunkApi) => {
    // @ts-ignore
    const stage = thunkApi.getState()?.stage;

    thunkApi.dispatch(setValueDown({isDown: false}));

    const mousePos = {
        x: e.evt.offsetX + stage.stagePositionMove.x,
        y: e.evt.offsetY + stage.stagePositionMove.y
    }

    thunkApi.dispatch(setMousePointUp(checkZoom(stage.isZoom, mousePos, stage.stagePositionZoom, stage.scale)));
})

export const {setMousePosition, setMousePointDown, setMousePointUp, setValueDown} = sliceMouse.actions;
export default sliceMouse.reducer
