import React, {memo, useEffect, useRef, useState} from 'react';
import {Layer, Stage} from 'react-konva';
import {mouseDownThunk, mouseMoveThunk, mouseUpThunk,} from "../../../store/reducers/mouseReducer";
import Konva from 'konva';
import {observerStage} from "../../../observer/observerStage";
import {observerDoc} from "../../../observer/observerDoc";
import {SelectionArea} from "./layers/commonLayer/SelectionArea";
import {useAppDispatch} from "../../../store/hooks";
import {LayerSectors} from "./layers/LayerSectors";
import {setStage} from "../../../store/reducers/stageReducer";
import {zoomStage} from "../../../store/calculate/zoom";
import {LayerFigure} from "./layers/commonLayer/LayerFigure";
import {Box, createStyles, makeStyles} from "@material-ui/core";
import {HEIGHT_APP_BAR, WIDTH_ASIDE} from "../../../App";
import {ChangeFigure} from "./layers/commonLayer/changeFigure/ChangeFigure";
import {addCacheElement, cleanCircleCache} from "../../figures/sectors/cacheCircle";
import {ChangeSectors} from "./layers/commonLayer/changeFigure/ChangeSectors";
import KonvaEventObject = Konva.KonvaEventObject;
import {ShowCoordinate} from "./ShowCoordinate";

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
            {/*<ShowCoordinate/>*/}
            <Stage id={'stage_container'} draggable={draggable} ref={stageRef}
                   width={window.innerWidth - WIDTH_ASIDE}
                   height={window.innerHeight - HEIGHT_APP_BAR}
                   onWheel={handlerWheel} onMouseMove={handlerMouseMove}
                   onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}
                   onClick={handlerClick}>
                <Layer>
                    <SelectionArea/>
                    <LayerFigure/>
                    <ChangeFigure/>
                    <ChangeSectors/>
                </Layer>
                <LayerSectors/>
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