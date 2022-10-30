import React, {FC, memo, useState} from 'react';
import Konva from "konva";
import {Circle} from 'react-konva';
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    x: number
    y: number
}

type DragType = {
    isDragging: boolean,
}

export const FCircle:FC<PropsType> = memo(({x, y}) => {

    const [positionCircle, setPositionCircle] = useState<PropsType & DragType>({x: x, y: y, isDragging: false});

    const onDragStart = () => {
        setPositionCircle(position => ({...position, isDragging: true}));
    }

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        setPositionCircle({x: e.target.x(), y: e.target.y(), isDragging: false});
    }

    return (
        <Circle
            x={positionCircle.x}
            y={positionCircle.y}
            radius={10}
            draggable
            fill={positionCircle.isDragging ? "#a63914" : '#dd4814'}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            shadowBlur={2}
        />
    )
})