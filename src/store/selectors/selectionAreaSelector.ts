import {createSelector} from 'reselect';
import {RootState} from "../store";

const selectionArea = (state: RootState) => state.selectionArea;

export const selectorIsSelectCircle = createSelector(selectionArea, items => {
    return items.isSelection;
})

export const selectorIsDrawGrid = createSelector(selectionArea, items => {
    return items.isDrawGrid;
})

export const selectorCountCirclesDraw = createSelector(selectionArea, items => {
    return items.countCirclesDraw;
})


