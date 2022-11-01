import React, {memo, useCallback, useState} from 'react';
import {Layer, Stage} from 'react-konva';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {
    MouseReducerType,
    setMousePointDown,
    setMousePointUp,
    setMousePosition
} from "../../store/reducers/mouseReducer";
import Konva from 'konva';
import {GridDraw} from "../figures/GridDraw";
import {useBoolean} from "../../store/hooks";
import KonvaEventObject = Konva.KonvaEventObject;
import {CirclesReducerType, CirclesType, setCirclePosition} from "../../store/reducers/circlesReducer";
import {FCircle} from "../figures/FCircle";
import {createCirclesForGrid} from "../../calculate/calculateGrid";

export const Content = memo(() => {

    const {move, mouseDown, mouseUp} = useSelector<RootState,MouseReducerType>(state => state.mouse);
    const circles = useSelector<RootState,CirclesReducerType>(state => state.circles);
    const isGrid = useBoolean(false);
    const [countCircleGrid,setCountCircleGrid] = useState<{countX: number, countY: number}>({countX: 0, countY: 0});
    const dispatch = useDispatch();

    const saveCountCircles = useCallback((countX: number, countY: number) => {
        setCountCircleGrid({countX, countY});
    },[]);

    const handlerMouseMove = (e:KonvaEventObject<MouseEvent>) => {
        dispatch(setMousePosition({x: e.evt.offsetX, y: e.evt.offsetY}))
    }

    const handlerMouseDown = (e:KonvaEventObject<MouseEvent>) => {
        isGrid.setTrue();
        dispatch(setMousePointDown({x: e.evt.offsetX, y: e.evt.offsetY}))
    }

    const handlerMouseUp = (e:KonvaEventObject<MouseEvent>) => {
        isGrid.setFalse();
        dispatch(setMousePointUp({x: e.evt.offsetX, y: e.evt.offsetY}));
        const gridCircles = createCirclesForGrid({xStart: mouseDown.x, yStart: mouseDown.y},countCircleGrid);
        dispatch(setCirclePosition(gridCircles));
    }

    const circlesDraw = circles.map((circle:CirclesType) => <FCircle id={circle.id} x={circle.x} y={circle.y}/>);

    return (
        <section className={"section-container"}>
            <div className={'d-flex'}>
                <div className={'mr-2'}>Mouse: {move.x}:{move.y}</div>
                <div className={'mr-2'}>Mouse Down: {mouseDown.x}:{mouseDown.y}</div>
                <div className={'mr-2'}>Mouse Up: {mouseUp.x}:{mouseUp.y}</div>
            </div>

            <Stage id={'stage_container'} width={window.innerWidth} height={window.innerHeight} onMouseMove={handlerMouseMove} onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}>
                <Layer id={'layer'}>
                    {circlesDraw && circlesDraw}
                    {isGrid.value && <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y} move={move} setCountCircles={saveCountCircles}/>}
                </Layer>
            </Stage>
        </section>
    )
})