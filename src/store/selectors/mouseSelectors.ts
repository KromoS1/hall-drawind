import {RootState} from "../store";
import {createSelector} from "reselect";

const mouse = (state: RootState) => state.mouse.move;
const mouseDown = (state: RootState) => state.mouse.mouseDown;
const mouseUp = (state: RootState) => state.mouse.mouseUp;

export const getPointMouse = createSelector(mouse, items => items);
export const getPointMouseDown = createSelector(mouseDown, items => items);
export const getPointMouseUp = createSelector(mouseUp, items => items);


