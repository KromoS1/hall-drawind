import React, {memo} from "react";
import {SelectionAreaContainer} from "./selectionArea/SelectionAreaContainer";
import {SelectionAreaGrid} from "./selectionArea/SelectionAreaGrid";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {PointType} from "../../../../../store/mainType";

export const SelectionArea = memo(() => {

    const move = useSelector<RootState, PointType>(state => state.mouse.move);
    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
    const isDrawGrid = useSelector<RootState, boolean>(state => state.selectionArea.isDrawGrid);
    const isSelection = useSelector<RootState, boolean>(state => state.selectionArea.isSelection);

    return (
        <>
            <SelectionAreaContainer move={move} mouseDown={mouseDown} isDown={isDown} isSelection={isSelection}/>
            <SelectionAreaGrid move={move} mouseDown={mouseDown} isDown={isDown} isDrawGrid={isDrawGrid} />
        </>
    )
})