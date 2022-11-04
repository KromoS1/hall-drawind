import React, {memo, useEffect, useMemo} from 'react';
import {Layer, Stage} from 'react-konva';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {mouseDownThunk, mouseMoveThunk, mouseUpThunk,} from "../../store/reducers/mouseReducer";
import Konva from 'konva';
import {CirclesType} from "../../store/reducers/circlesReducer";
import {FCircle} from "../figures/FCircle";
import {SelectionAreaContainer} from "../selectionArea/SelectionAreaContainer";
import {observerStage} from "../../observer/observerStage";
import {ShowCoordinate} from "./ShowCoordinate";
import {zoomStage} from "../../store/calculateDateEvents/zoom";
import {setIsZoom, setScale, setZoomPosition} from "../../store/reducers/stageReducer";
import KonvaEventObject = Konva.KonvaEventObject;

export const Content = memo(() => {

    const circles = useSelector<RootState, CirclesType[]>(state => state.circles.circles);

    const dispatch = useAppDispatch();

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => observerStage.move(e);
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseDown(e);
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseUp(e);
    const handlerWheel = (e: KonvaEventObject<MouseEvent>) => observerStage.wheel(e);

    useEffect(() => {

        observerStage.subscribeEventStage('wheel', (e: KonvaEventObject<MouseEvent>) => {

            const zoomSetting = zoomStage(e);
            dispatch(setZoomPosition(zoomSetting.pos));
            dispatch(setIsZoom({isZoom: zoomSetting.isZoom}));
            dispatch(setScale({scale: zoomSetting.scale}))
        })

        observerStage.subscribeEventStage("move", (e: KonvaEventObject<MouseEvent>) => {
            dispatch(mouseMoveThunk(e));
        })

        observerStage.subscribeEventStage("mouseDown", (e: KonvaEventObject<MouseEvent>) => {
           dispatch(mouseDownThunk(e));
        })

        observerStage.subscribeEventStage("mouseUp", (e: KonvaEventObject<MouseEvent>) => {
            dispatch(mouseUpThunk(e));
        })
    }, [])

    const circlesDraw = useMemo(() => {
        return circles.map((circle: CirclesType) =>
            <FCircle key={circle.id} id={circle.id}  x={circle.x} y={circle.y} numberPos={circle.numberPos} isDraggable={circle.isDraggable}/>)
    },[circles]);

    return (
        <section className={"section-container"}>
            <ShowCoordinate/>
            <Stage id={'stage_container'} width={window.innerWidth} height={window.innerHeight} onWheel={handlerWheel}
                   onMouseMove={handlerMouseMove} onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}>
                <Layer id={'layer'}>
                    <SelectionAreaContainer/>
                    {circlesDraw && circlesDraw}
                </Layer>
            </Stage>
        </section>
    )
})