import React, {FC, memo, useState} from 'react';
import Konva from "konva";
import { Rect } from 'react-konva';

import KonvaEventObject = Konva.KonvaEventObject;
import {PointType} from "../../../store/mainType";

type PositionRectType = {
    isDragging:boolean,
    x: number
    y: number
}

type PropsType = PointType & {
    w: number,
    h: number
}

export const FRect: FC<PropsType> = memo(({x, y, w, h}) => {

    const [positionRect, setPositionRect] = useState<PositionRectType>({x, y , isDragging:false});

    const onDragStart = () => {
        setPositionRect(position => ({...position,isDragging: true}));
    }

    const onDragEnd = (e:KonvaEventObject<DragEvent>) => {
        setPositionRect({x: e.target.x(), y: e.target.y(), isDragging: false});
    }

    return (
        <Rect
            x={positionRect.x}
            y={positionRect.y}
            draggable
            width={w}
            height={h}
            fill={positionRect.isDragging ? "green" : "red"}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        />
    )
})