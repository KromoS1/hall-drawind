import React, {memo, useEffect} from 'react';
import {Stage} from 'react-konva';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {mouseDownThunk, mouseMoveThunk, mouseUpThunk,} from "../../store/reducers/mouseReducer";
import Konva from 'konva';
import {observerStage} from "../../observer/observerStage";
import {ShowCoordinate} from "./ShowCoordinate";
import {
    setDraggable,
    stageMoveThunk,
    StageReducerType,
    stageZoomThunk,
    toggleMoteStageThunk
} from "../../store/reducers/stageReducer";
import {observerDoc} from "../../observer/observerDoc";
import {LayerSelectionArea} from "./layers/LayerSelectionArea";
import {useAppDispatch} from "../../store/hooks";
import KonvaEventObject = Konva.KonvaEventObject;
import {LayerCircle} from "./layers/LayerCircle";

export const Content = memo(() => {

    const {draggable} = useSelector<RootState, StageReducerType>(state => state.stage);
    const dispatch = useAppDispatch();

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => observerStage.move(e);
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseDown(e);
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseUp(e);
    const handlerWheel = (e: KonvaEventObject<WheelEvent>) => observerStage.wheel(e);
    const handlerMoveStage = (e: KonvaEventObject<MouseEvent>) => observerStage.moveStage(e);

    useEffect(() => {

        observerDoc.subscribeEventDoc('ctrlKeyDown', (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                dispatch(toggleMoteStageThunk(true));
            }
        })
        observerDoc.subscribeEventDoc('ctrlKeyUp', (e: KeyboardEvent) => {
            if (!e.ctrlKey) {
                dispatch(toggleMoteStageThunk(false));
            }
        })

        document.addEventListener("keyup", (event) => {
            if (!event.ctrlKey) {
                dispatch(setDraggable({draggable: false}));
            }
        })

        observerStage.subscribeEventStage('moveStage', (e: KonvaEventObject<MouseEvent>) => {
            dispatch(stageMoveThunk(e));
        });

        observerStage.subscribeEventStage('wheel', (e: KonvaEventObject<WheelEvent>) => {
            dispatch(stageZoomThunk(e));
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
            <Stage id={'stage_container'} draggable={draggable}
                   width={window.innerWidth}
                   height={window.innerHeight - 77}
                   onWheel={handlerWheel} onMouseMove={handlerMouseMove}
                   onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}
                   onDragMove={handlerMoveStage}>
                <LayerCircle/>
                <LayerSelectionArea/>
            </Stage>
        </section>
    )
})