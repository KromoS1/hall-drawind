import React, {FC, memo, useEffect, useState} from 'react';
import Konva from "konva";
import {Circle} from 'react-konva';
import KonvaEventObject = Konva.KonvaEventObject;
import {useDispatch} from "react-redux";
import {setCirclePosition} from "../../store/reducers/circlesReducer";
import {PointType} from "../../store/mainType";

type PropsType = PointType & {
    id: number
}

type DragType = {
    isDragging: boolean,
}

export const FCircle:FC<PropsType> = memo(({id, x, y}) => {

    const [positionCircle, setPositionCircle] = useState<PointType & DragType>({x: x, y: y, isDragging: false});

    const dispatch = useDispatch();

    const onDragStart = () => {
        setPositionCircle(position => ({...position, isDragging: true}));
    }

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        setPositionCircle({x: e.target.x(), y: e.target.y(), isDragging: false});
    }

    useEffect(() => {
        dispatch(setCirclePosition({id, x:positionCircle.x, y: positionCircle.y}))
    },[positionCircle])

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