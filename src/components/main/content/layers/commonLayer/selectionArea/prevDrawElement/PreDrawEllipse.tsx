import {PointType} from "../../../../../../../store/mainType";
import React, {FC} from "react";
import {Ellipse, Text} from "react-konva";
import {COLORS} from "../../../../../../../store/constantsColor";
import {CountCirclesDrawType} from "../SelectionAreaGrid";

type PropsType = PointType & {
    radiusX: number
    radiusY: number
    isDrawGrid?: boolean
    countCircles?: CountCirclesDrawType
    bgColor?: string
    borderWidth?: number
    borderColor?: string
}

export const PreDrawEllipse: FC<PropsType> = ({x, y, radiusX, radiusY, isDrawGrid, countCircles, bgColor, borderWidth, borderColor}) => {

    let xText = 0;
    let yText = 0;

    return (
        <>
        <Ellipse x={x} y={y}
                 radiusX={radiusX}
                 radiusY={radiusY}
                 fill={bgColor ? bgColor : COLORS.bgSelected}
                 stroke={borderColor ? borderColor : COLORS.borderSelected}
                 strokeWidth={borderWidth ? borderWidth : 2}
        />
        {isDrawGrid && <Text x={xText} y={yText} text={`${countCircles?.countX}x${countCircles?.countY}`} fontSize={20}/>}
        </>
    )
}