import React, {memo, useEffect, useRef, useState} from 'react';
import {Stage} from 'react-konva';
import {mouseDownThunk, mouseMoveThunk, mouseUpThunk,} from "../../../store/reducers/mouseReducer";
import Konva from 'konva';
import {observerStage} from "../../../observer/observerStage";
import {observerDoc} from "../../../observer/observerDoc";
import {LayerSelectionArea} from "../layers/LayerSelectionArea";
import {useAppDispatch} from "../../../store/hooks";
import {LayerCircle} from "../layers/LayerCircle";
import {setStage} from "../../../store/reducers/stageReducer";
import {addCacheElement, cleanCircleCache} from "../../figures/circles/cacheCircle";
import {zoomStage} from "../../../store/calculate/zoom";
import {LayerOtherFigure} from "../layers/LayerOtherFigure";
import {offSelectFigure} from "../../../store/reducers/otherDataFigureReducer";
import {Box, createStyles, makeStyles} from "@material-ui/core";
import KonvaEventObject = Konva.KonvaEventObject;
import {HEIGHT_APP_BAR, WIDTH_ASIDE} from "../../../App";

export const Content = memo(() => {

    const [draggable, setDraggable] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const styles = useStyles();

    const stageRef = useRef(null);

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => observerStage.move(e);
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseDown(e);
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => observerStage.mouseUp(e);
    const handlerWheel = (e: KonvaEventObject<WheelEvent>) => observerStage.wheel(e);
    const handlerClick = (e: KonvaEventObject<WheelEvent>) => observerStage.click(e);

    const setCursorDrag = () => {
        if (draggable) document.getElementById('section_container')?.classList.add('cursor-move');
    }

    const removeCursorDrag = () => {
        if (draggable) document.getElementById('section_container')?.classList.remove('cursor-move');
    }

    useEffect(() => {

        if (stageRef.current) {
            dispatch(setStage({stage: stageRef.current}));
            addCacheElement(stageRef.current);
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

        observerStage.subscribeEventStage("click", (e: KonvaEventObject<MouseEvent>) => {
            if (e.target.attrs.id === 'stage_container') {
                dispatch(offSelectFigure());
            }
        })

        return () => {
            observerStage.cleanSubscribersAll();
            cleanCircleCache();
        }
    }, [])

    useEffect(() => {
        observerStage.subscribeEventStage("mouseDown", setCursorDrag);
        observerStage.subscribeEventStage("mouseUp", removeCursorDrag);

        return () => {
            observerStage.removeSubscriber("mouseDown", setCursorDrag);
            observerStage.removeSubscriber("mouseUp", removeCursorDrag);
        }
    }, [draggable])

    return (
        <Box className={styles.content}>
            <Stage id={'stage_container'} draggable={draggable} ref={stageRef}
                   width={window.innerWidth - WIDTH_ASIDE}
                   height={window.innerHeight - HEIGHT_APP_BAR}
                   onWheel={handlerWheel} onMouseMove={handlerMouseMove}
                   onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}
                   onClick={handlerClick}>
                <LayerCircle/>
                <LayerSelectionArea/>
                <LayerOtherFigure/>
            </Stage>
        </Box>
    )
})

const useStyles = makeStyles(() => createStyles({
        content: {
            width: `calc(100vw - ${WIDTH_ASIDE*2}px)`
        },
    }),
);