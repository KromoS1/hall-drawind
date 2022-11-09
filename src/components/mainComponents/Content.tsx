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
import {
    setDraggable,
    stageMoveThunk,
    StageReducerType,
    stageZoomThunk,
    toggleMoteStageThunk
} from "../../store/reducers/stageReducer";
import {observerDoc} from "../../observer/observerDoc";
import KonvaEventObject = Konva.KonvaEventObject;

export const Content = memo(() => {

    const circles = useSelector<RootState, CirclesType[]>(state => state.circles);
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

    const circlesDraw = useMemo(() => {
        return circles.map((circle: CirclesType) =>
            <FCircle key={circle.id} circle={circle}/>)
    }, [circles]);

    return (
        <section id={'section_container'} className={"section-container"} style={{height: '100%', width: '100%'}}>
            <ShowCoordinate/>
            <Stage id={'stage_container'} draggable={draggable}
                   width={window.innerWidth}
                   height={window.innerHeight - 77}
                   onWheel={handlerWheel} onMouseMove={handlerMouseMove}
                   onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}
                   onDragMove={handlerMoveStage}>
                <Layer id={'layer'}>
                    <SelectionAreaContainer/>
                    {circlesDraw && circlesDraw}
                </Layer>
            </Stage>
        </section>
    )
})