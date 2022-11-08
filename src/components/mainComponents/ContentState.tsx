import React, {memo, useEffect, useRef, useState} from "react";
import {Circle, Layer, Stage} from "react-konva";
import {SelectionAreaContainer} from "../selectionArea/SelectionAreaContainer";
import {useAppDispatch} from "../../store/store";
import {PointType} from "../../store/mainType";
import {observerStage} from "../../observer/observerStage";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import {SelectionAreaContainerTo} from "../selectionArea/SelectionAreaContainerTo";


export const ContentState = () => {

    const stageRef = useRef(null);
    const [mouse, setMouse] = useState<PointType>({x: 0, y: 0})
    const [mouseDown, setMouseDown] = useState<PointType>({x: 0, y: 0})
    const [mouseUp, setMouseUp] = useState<PointType>({x: 0, y: 0})
    const [left,setLeft] = useState<boolean>(false);
    const [middle,setMiddle] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(1.05);

    const setDownBtn = (btn:string,value:boolean) => {
        switch(btn){
            case "0":
                setLeft(value);
                break;
            case '1':
                setMiddle(value);
                break;
        }
    }

    const handlerMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        const mouse = e.currentTarget.getRelativePointerPosition();
        setMouse(mouse);
    };
    const handlerMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const mouse = e.currentTarget.getRelativePointerPosition();
        setDownBtn(`${e.evt.button}`,true);
        setMouseDown(mouse);
    };
    const handlerMouseUp = (e: KonvaEventObject<MouseEvent>) => {
        const mouse = e.currentTarget.getRelativePointerPosition();
        setDownBtn(`${e.evt.button}`,false);
        setMouseUp(mouse);
    };
    console.log(middle)
    const handlerWheel = (e: KonvaEventObject<MouseEvent>) => {

        e.evt.preventDefault();

        const stage = stageRef?.current

        //@ts-ignore
        var oldScale = stage.scaleX();
        //@ts-ignore
        var pointer = stage.getPointerPosition();

        var mousePointTo = {
            //@ts-ignore
            x: (pointer.x - stage.x()) / oldScale,
            //@ts-ignore
            y: (pointer.y - stage.y()) / oldScale,
        };
debugger
        // how to scale? Zoom in? Or zoom out?
        //@ts-ignore
        let direction = e.evt.deltaY > 0 ? 1 : -1;

        // when we zoom on trackpad, e.evt.ctrlKey is true
        // in that case lets revert direction
        if (e.evt.ctrlKey) {
            direction = -direction;
        }
        //@ts-ignore
        var newScale = direction > 0 ? oldScale * scale : oldScale / scale;
        setScale(newScale);
        //@ts-ignore
        stage.scale({ x: newScale, y: newScale });

        var newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        //@ts-ignore
        stage.position(newPos);
    };
    const handlerMoveStage = (e: KonvaEventObject<MouseEvent>) => {
    };

    return (
        <section className={"section-container"} style={{width:'100%', height:'100vh'}}>
            <div>move: {mouse.x} : {mouse.y}</div>
            <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef} draggable={true} onWheel={handlerWheel}
                   onMouseMove={handlerMouseMove} onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp}>
                <Layer>
                    <Circle x={200} y={200} fill={"#efe122"} radius={20} shadowBlur={2} />
                    <SelectionAreaContainerTo move={mouse} mouseDown={mouseDown} isSelection={true}
                                              isDownLeft={middle}/>
                </Layer>
            </Stage>
        </section>
    )
}