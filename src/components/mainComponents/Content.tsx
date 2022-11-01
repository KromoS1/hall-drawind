import React, {memo} from 'react';
import {Layer, Stage} from 'react-konva';
import {FCircle} from "../figures/FCircle";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {
    MouseReducerType,
    setMousePointDown,
    setMousePointUp,
    setMousePosition
} from "../../store/reducers/mouseReducer";
import Konva from 'konva';
import {CirclesReducerType} from "../../store/reducers/circlesReducer";
import {GridDraw} from "../figures/GridDraw";
import {useBoolean} from "../../store/hooks";
import KonvaEventObject = Konva.KonvaEventObject;

export const Content = memo(() => {

    const {move, mouseDown, mouseUp} = useSelector<RootState,MouseReducerType>(state => state.mouse);
    const pointsCircle = useSelector<RootState,CirclesReducerType>((state) => state.circles)[1];
    const isGrid = useBoolean(false);

    const dispatch = useDispatch();

    const handlerMouseMove = (e:KonvaEventObject<MouseEvent>) => {
        dispatch(setMousePosition({x: e.evt.offsetX, y: e.evt.offsetY}))
    }

    const handlerMouseDown = (e:KonvaEventObject<MouseEvent>) => {
        isGrid.setTrue();
        dispatch(setMousePointDown({x: e.evt.offsetX, y: e.evt.offsetY}))
    }

    const handlerMouseUp = (e:KonvaEventObject<MouseEvent>) => {
        isGrid.setFalse();
        dispatch(setMousePointUp({x: e.evt.offsetX, y: e.evt.offsetY}))
    }

    return (
        <section className={"section-container"}>
            <div className={'d-flex'}>
                <div className={'mr-2'}>Mouse: {move.x}:{move.y}</div>
                <div className={'mr-2'}>Mouse Down: {mouseDown.x}:{mouseDown.y}</div>
                <div className={'mr-2'}>Mouse Up: {mouseUp.x}:{mouseUp.y}</div>
                <div>Circle: {pointsCircle.x}:{pointsCircle.y}</div>
            </div>

            <Stage id={'stage_container'} width={window.innerWidth} height={window.innerHeight} onMouseMove={handlerMouseMove} onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}>
                <Layer id={'layer'}>
                    <FCircle id={pointsCircle.id} x={pointsCircle.x} y={pointsCircle.y}/>
                    {isGrid.value && <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/>}
                </Layer>
            </Stage>
        </section>
    )
})