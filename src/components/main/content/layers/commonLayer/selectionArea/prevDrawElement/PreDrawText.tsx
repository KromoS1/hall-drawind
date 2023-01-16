import {PointType} from "../../../../../../../store/mainType";
import React, {FC} from "react";
import {Text} from "react-konva";

type PropsType = PointType & {
    text: string
    isDrawGrid?: boolean
}

export const PreDrawText: FC<PropsType> = ({x, y, text, isDrawGrid}) => {

    return (
        <>
        <Text x={x} y={y}/>
        {isDrawGrid && <Text x={x} y={y} text={text} fontSize={20}/>}
        </>
    )
}