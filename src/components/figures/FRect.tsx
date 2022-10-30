import React, {memo, useState} from 'react';
import Konva from "konva";
import { Rect } from 'react-konva';

import KonvaEventObject = Konva.KonvaEventObject;

type PositionRectType = {
    isDragging:boolean,
    x: number
    y: number
}

export const FRect = memo(() => {

    const [positionRect, setPositionRect] = useState<PositionRectType>({x:20, y:20, isDragging:false});

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
            width={100}
            height={100}
            fill={positionRect.isDragging ? "green" : "red"}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            shadowBlur={10}
        />
    )
})