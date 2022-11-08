import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PointType} from "../mainType";
import Konva from "konva";
import {RootState} from "../store";
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

export const mouseMoveThunk = createAsyncThunk('mouse/mouseMove', async (e: KonvaEventObject<MouseEvent>, {dispatch}) => {

    const mousePos = e.currentTarget.getRelativePointerPosition();
    dispatch(setMousePosition(mousePos));
})

export const mouseDownThunk = createAsyncThunk('mouse/mouseMove', async (e: KonvaEventObject<MouseEvent>, {dispatch,getState}) => {

    const state = getState() as RootState;
    const mouse = state.mouse.move;

    const mousePos = {x: mouse.x, y: mouse.y}

    dispatch(setValueDown({isDown: true}));
    dispatch(setMousePointDown(mousePos));
})

export const mouseUpThunk = createAsyncThunk('mouse/mouseMove', async (e: KonvaEventObject<MouseEvent>, {dispatch,getState}) => {

    const state = getState() as RootState;
    const mouse = state.mouse.move;


    const mousePos = {x: mouse.x, y: mouse.y}

    dispatch(setValueDown({isDown: false}));
    dispatch(setMousePointUp(mousePos));
})

export const {setMousePosition, setMousePointDown, setMousePointUp, setValueDown} = sliceMouse.actions;
export default sliceMouse.reducer
