import React, {memo} from 'react';
import {Layer, Stage} from 'react-konva';
import {FCircle} from "../figures/FCircle";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {MouseReducerType, setMousePosition} from "../../store/reducers/mouseReducer";


export const Content = memo(() => {

    const points = useSelector<RootState,MouseReducerType>((state) => state.mouse)

    const dispatch = useDispatch();

    const handlerMouse = (e:any) => {

        const mousePos = e.target._pointerPositions[0];

        if (mousePos) {
            dispatch(setMousePosition({x: mousePos.x, y: mousePos.y}))
        }
    }

    return (
        <section className={"section-container"}>
            <div>{points.x}:{points.y}</div>
            <Stage id={'stage_container'} width={window.innerWidth} height={window.innerHeight} onMouseMove={handlerMouse}>
                <Layer>
                    <FCircle x={25} y={25}/>
                </Layer>
            </Stage>
        </section>
    )
})