import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {MouseReducerType} from "../../store/reducers/mouseReducer";
import {GridDraw} from "../figures/GridDraw";
import {SelectionAreaReducerType, setIsDrawGrid, setIsSelection} from "../../store/reducers/selectionAreaReducer";
import {calcCountCircleGrid, createCirclesForGrid} from "../../calculate/calculateGrid";
import {CountCirclesDrawType, setCirclePosition, setCountCirclesDraw} from "../../store/reducers/circlesReducer";
import {observerMouse} from "../../observer/observerMouse";

export const SelectionAreaContainer = memo(() => {

    const {move, mouseDown, isDown} = useSelector<RootState, MouseReducerType>(state => state.mouse);
    const {isSelection, isDrawGrid} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);
    const countCircles = useSelector<RootState, CountCirclesDrawType>(state => state.circles.countCirclesDraw);

    const dispatch = useDispatch();

    const resetSelection = () => {
        if (isSelection) {
            dispatch(setIsSelection({isSelection: false}));
        }
    }

    const drawGrid = () => {
        if (isDrawGrid && countCircles.countX > 0 && countCircles.countX > 0) {
            const gridCircles = createCirclesForGrid({xStart: mouseDown.x, yStart: mouseDown.y}, countCircles);
            dispatch(setCirclePosition(gridCircles));
            dispatch(setCountCirclesDraw({countX: 0, countY: 0}));
            dispatch(setIsDrawGrid({isDrawGrid: false}));
        }
    }

    const calculateGrid = () => {
        if (isDrawGrid && isDown) {
            const countCircles = calcCountCircleGrid({
                xStart: mouseDown.x,
                yStart: mouseDown.y,
                xEnd: move.x,
                yEnd: move.y
            });
            dispatch(setCountCirclesDraw({countX: countCircles.countX, countY: countCircles.countY}));
        }
    }

    useEffect(() => {
        calculateGrid();

        observerMouse.subscribeEventMouse('mouseUp',resetSelection);
        observerMouse.subscribeEventMouse('mouseUp',drawGrid);
        return () => {

            observerMouse.removeSubscriber('mouseUp', resetSelection);
            observerMouse.removeSubscriber('mouseUp', drawGrid);
        }
    },[move])

    return (
        <>
            {isDown && isSelection ?
                <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/> : <></>}
            {isDown && isDrawGrid ?
                <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}
                          isDrawGrid={isDrawGrid}/> : <></>}
        </>
    )
})