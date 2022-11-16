import React, {memo, useEffect} from "react";
import {GridDraw} from "./GridDraw";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CountCirclesDrawType, setCountCirclesDraw, setIsDrawGrid} from "../../store/reducers/selectionAreaReducer";
import {calcCountCircleGrid, createCirclesForGrid} from "../../store/calculateDateEvents/calculateGrid";
import {setCirclePosition} from "../../store/reducers/circlesReducer";
import {observerStage} from "../../observer/observerStage";
import {PointType} from "../../store/mainType";

export const SelectionAreaGrid = memo(() => {

    const move = useSelector<RootState, PointType>(state => state.mouse.move);
    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
    const isDrawGrid = useSelector<RootState, boolean>(state => state.selectionArea.isDrawGrid);
    const countCircles = useSelector<RootState, CountCirclesDrawType>(state => state.selectionArea.countCirclesDraw);

    const dispatch = useDispatch();

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

        observerStage.subscribeEventStage('mouseUp', drawGrid);

        return () => {
            observerStage.removeSubscriber('mouseUp', drawGrid);
        }
    }, [move])

    return (
        <>
            {isDown && isDrawGrid ?
                <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}
                          isDrawGrid={isDrawGrid}/> : <></>}
        </>
    )
})