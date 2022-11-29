import {PointType} from "../../../store/mainType";
import React, {FC} from "react";
import {Ellipse} from "react-konva";

type PropsType = PointType & {
    radiusX: number
    radiusY: number
}

export const EllipseDraw: FC<PropsType> = ({x, y, radiusX, radiusY}) => {
    return (
        <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={'#c9e5f5'}/>
    )
}