import React, {FC, memo, useEffect, useState} from 'react';
import Konva from "konva";
import {Circle} from 'react-konva';
import KonvaEventObject = Konva.KonvaEventObject;
import {useDispatch} from "react-redux";
import {setCirclePosition} from "../../store/reducers/circlesReducer";
import {PointType} from "../../store/mainType";

type PropsType = PointType & {
    id: string;
    index:number
}

type DragType = {
    isDragging: boolean,
}

export const SIZE_CIRCLE = 20;
export const SIZE_IDENT_CIRCLE = 5;

export const FCircle: FC<PropsType> = memo(({id, index, x, y}) => {

    // const [positionCircle, setPositionCircle] = useState<PointType & DragType>({x: x, y: y, isDragging: false});

    const dispatch = useDispatch();

    // const onDragStart = () => {
    //     setPositionCircle(position => ({...position, isDragging: true}));
    // }

    // const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    //     setPositionCircle({x: e.target.x(), y: e.target.y(), isDragging: false});
    // }


    return (
        <Circle
            x={x}
            y={y}
            radius={SIZE_CIRCLE / 2}
            // draggable
            fill={'#dd4814'}
            // onDragStart={onDragStart}
            // onDragEnd={onDragEnd}
            shadowBlur={2}
        />
    )
})