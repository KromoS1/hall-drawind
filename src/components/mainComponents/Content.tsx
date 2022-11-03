import React, {memo, useEffect} from 'react';
import {Layer, Stage} from 'react-konva';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setMousePointDown, setMousePointUp, setMousePosition, setValueDown} from "../../store/reducers/mouseReducer";
import Konva from 'konva';
import {CirclesType} from "../../store/reducers/circlesReducer";
import {FCircle} from "../figures/FCircle";
import {SelectionAreaContainer} from "../selectionArea/SelectionAreaContainer";
import {observerMouse} from "../../observer/observerMouse";
import {ShowCoordinate} from "./ShowCoordinate";
import KonvaEventObject = Konva.KonvaEventObject;

export const Content = memo(() => {

    const circles = useSelector<RootState, CirclesType[]>(state => state.circles.circles);

    const dispatch = useDispatch();

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => observerMouse.move(e);
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => observerMouse.mouseDown(e);
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => observerMouse.mouseUp(e);

    useEffect(() => {
        observerMouse.subscribeEventMouse("move", (e: KonvaEventObject<MouseEvent>) => {
            dispatch(setMousePosition({x: e.evt.offsetX, y: e.evt.offsetY}));
        })

        observerMouse.subscribeEventMouse("mouseDown", (e: KonvaEventObject<MouseEvent>) => {
           dispatch(setValueDown({isDown: true}));
            dispatch(setMousePointDown({x: e.evt.offsetX, y: e.evt.offsetY}));
        })

        observerMouse.subscribeEventMouse("mouseUp", (e: KonvaEventObject<MouseEvent>) => {
            dispatch(setMousePointUp({x: e.evt.offsetX, y: e.evt.offsetY}));
            dispatch(setValueDown({isDown: false}));
        })
    }, [])

    const circlesDraw = circles.map((circle: CirclesType, i: number) => <FCircle key={circle.id} id={circle.id} index={i} x={circle.x} y={circle.y}/>);

    return (
        <section className={"section-container"}>
            <ShowCoordinate/>
            <Stage id={'stage_container'} width={window.innerWidth} height={window.innerHeight}
                   onMouseMove={handlerMouseMove} onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}>
                <Layer id={'layer'}>
                    <SelectionAreaContainer/>
                    {circlesDraw && circlesDraw}
                </Layer>
            </Stage>
        </section>
    )
})