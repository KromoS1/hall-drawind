import React, {FC, memo, useCallback, useEffect, useState} from "react";
import {PreDrawRect} from "./prevDrawElement/PreDrawRect";
import {useDispatch} from "react-redux";
import {setPlaceSector} from "../../../../../../store/reducers/sectorsReducer";
import {observerStage} from "../../../../../../observer/observerStage";
import {PointType} from "../../../../../../store/mainType";
import {setIsDrawGrid} from "../../../../../../store/reducers/selectionAreaReducer";
import uuid from "react-uuid";
import {calcCountCircleGrid, createCirclesForGrid} from "../../../../../../store/calculate/calculateGrid";

export type CountCirclesDrawType = {
    countX: number,
    countY: number
}

type PropsType = {
    move: PointType,
    mouseDown: PointType,
    isDown: boolean,
    isDrawGrid: boolean,
}

export const SelectionAreaGrid: FC<PropsType> = memo(({move, mouseDown, isDown, isDrawGrid}) => {

    const [countCircles, setCountCircles] = useState<CountCirclesDrawType>({countX: 0, countY: 0})
    const dispatch = useDispatch();

    const drawGrid = useCallback( async () => {

        if (isDrawGrid && countCircles.countX > 0 && countCircles.countX > 0) {

            const gridCircles = await createCirclesForGrid({xStart: mouseDown.x, yStart: mouseDown.y}, countCircles);

            dispatch(setPlaceSector({idGroup: uuid(), places: gridCircles}));
            dispatch(setIsDrawGrid({isDrawGrid: false}));
            setCountCircles({countX: 0, countY: 0})
        }
    },[countCircles.countX, countCircles.countY])

    const calculateGrid = () => {

        if (isDrawGrid && isDown) {

            const countCircles = calcCountCircleGrid({
                xStart: mouseDown.x,
                yStart: mouseDown.y,
                xEnd: move.x,
                yEnd: move.y
            });
            setCountCircles({countX: countCircles.countX, countY: countCircles.countY});
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
                <PreDrawRect x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}
                             isDrawGrid={isDrawGrid} countCircles={countCircles}/> : <></>}
        </>
    )
})