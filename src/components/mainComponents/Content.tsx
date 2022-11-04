import React, {memo, useEffect, useMemo, useRef} from 'react';
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
import {
    setIsZoom,
    setScale,
    setStageMove,
    setZoomPosition,
    stageMoveThunk,
    StageReducerType
} from "../../store/reducers/stageReducer";
import KonvaEventObject = Konva.KonvaEventObject;

export const Content = memo(() => {

    const circles = useSelector<RootState, CirclesType[]>(state => state.circles.circles);
    const {draggable} = useSelector<RootState,StageReducerType>(state => state.stage);

    // const [scale, setScale] = React.useState(1);
    // const [scaleToFit, setScaleToFit] = React.useState(1);
    // const [size, setSize] = React.useState({
    //     width: 1000,
    //     height: 1000,
    //     virtualWidth: 1000
    // });
    // const [virtualWidth, setVirtualWidth] = React.useState(1000);

    const containerRef = useRef(null);
    const stageRef = useRef(null);

    // React.useEffect(() => {
    //     const newSize = {
    //         // @ts-ignore
    //         width: containerRef.current.offsetWidth,
    //         // @ts-ignore
    //         height: containerRef.current.offsetHeight
    //     };
    //     if (newSize.width !== size.width || newSize.height !== size.height) {
    //         // @ts-ignore
    //         setSize(newSize);
    //     }
    // });

    // React.useEffect(() => {
    //     if (!stageRef.current) {
    //         return;
    //     }
    //     const stage = stageRef.current;
    //     // @ts-ignore
    //     const clientRect = stage.getClientRect({ skipTransform: true });
    //
    //     const scaleToFit = size.width / clientRect.width;
    //     setScale(scaleToFit);
    //     setScaleToFit(scaleToFit);
    //     setVirtualWidth(clientRect.width);
    // }, [size]);

    const dispatch = useAppDispatch();

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => observerStage.move(e);
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseDown(e);
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseUp(e);
    const handlerWheel = (e: KonvaEventObject<MouseEvent>) => observerStage.wheel(e);
    const handlerMoveStage = (e: KonvaEventObject<MouseEvent>) => observerStage.moveStage(e);

    useEffect(() => {

        observerStage.subscribeEventStage('moveStage', (e: KonvaEventObject<MouseEvent>) => {
            dispatch(stageMoveThunk(e));
        });

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
        <section className={"section-container"} style={{height:'100vh',width:'100vw'}} ref={containerRef}>
            <ShowCoordinate/>
            <Stage id={'stage_container'} ref={stageRef} draggable={draggable} width={window.innerWidth} height={window.innerHeight} onWheel={handlerWheel}
                   onMouseMove={handlerMouseMove} onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp} onDragMove={handlerMoveStage}
                   // dragBoundFunc={(pos) => {
                   //     pos.x = Math.min(
                   //         size.width / 2,
                   //         Math.max(pos.x, -virtualWidth * 1 + size.width / 2)
                   //     );
                   //     pos.y = Math.min(size.height / 2, Math.max(pos.y, -size.height / 2));
                   //     return pos;
                   // }}
            >
                <Layer id={'layer'}>
                    <SelectionAreaContainer/>
                    {circlesDraw && circlesDraw}
                </Layer>
            </Stage>
        </section>
    )
})