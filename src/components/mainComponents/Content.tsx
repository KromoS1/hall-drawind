import React, {memo, useEffect, useRef, useState} from 'react';
import {Stage} from 'react-konva';
import {mouseDownThunk, mouseMoveThunk, mouseUpThunk,} from "../../store/reducers/mouseReducer";
import Konva from 'konva';
import {observerStage} from "../../observer/observerStage";
import {ShowCoordinate} from "./ShowCoordinate";
import {observerDoc} from "../../observer/observerDoc";
import {LayerSelectionArea} from "./layers/LayerSelectionArea";
import {useAppDispatch} from "../../store/hooks";
import {LayerCircle} from "./layers/LayerCircle";
import {zoomStage} from "../../store/calculateDateEvents/zoom";
import KonvaEventObject = Konva.KonvaEventObject;
import {setStage} from "../../store/reducers/stageReducer";

export const Content = memo(() => {

    const [draggable,setDraggable] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const stageRef = useRef(null);

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => observerStage.move(e);
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseDown(e);
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseUp(e);
    const handlerWheel = (e: KonvaEventObject<WheelEvent>) => observerStage.wheel(e);

    useEffect(() => {

        if (stageRef.current){
            dispatch(setStage({stage:stageRef.current}));
        }

        observerDoc.subscribeEventDoc('ctrlKeyDown', (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                setDraggable(true);
            }
        })
        observerDoc.subscribeEventDoc('ctrlKeyUp', (e: KeyboardEvent) => {
            if (!e.ctrlKey) {
                setDraggable(false);
            }
        })

        document.addEventListener("keyup", (event) => {
            if (!event.ctrlKey) {
                setDraggable(false);
            }
        })

        observerStage.subscribeEventStage('wheel', (e: KonvaEventObject<WheelEvent>) => {
            zoomStage(e);
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

        return () => {
            observerStage.cleanSubscribersAll();
        }
    }, [])

    return (
        <section id={'section_container'} className={"section-container"} style={{height: '100%', width: '100%'}}>
            <ShowCoordinate/>
            <Stage id={'stage_container'} draggable={draggable} ref={stageRef}
                   width={window.innerWidth}
                   height={window.innerHeight - 77}
                   onWheel={handlerWheel} onMouseMove={handlerMouseMove}
                   onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}>
                <LayerCircle/>
                <LayerSelectionArea/>
            </Stage>
        </section>
    )
})