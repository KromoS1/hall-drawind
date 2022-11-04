import React, {FC, memo, useState} from 'react';
import Konva from "konva";
import {Circle, Text} from 'react-konva';
import {CirclesType} from "../../store/reducers/circlesReducer";
import {PointType} from "../../store/mainType";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = CirclesType

export const SIZE_CIRCLE = 20;
export const SIZE_IDENT_CIRCLE = 5;

export const FCircle: FC<PropsType> = memo(({id, numberPos, x, y, isDraggable}) => {

    const [positionCircle, setPositionCircle] = useState<PointType & { isDragging: boolean }>({x: x, y: y, isDragging: false});

    const onDragStart = () => {
        setPositionCircle(position => ({...position, isDragging: true}));
    }

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        setPositionCircle({x: e.target.x(), y: e.target.y(), isDragging: false});
    }

    const offset = {
        x: `${numberPos}`.length > 2 ? 8.5 : `${numberPos}`.length > 1 ? 6 : 3,
        y: 5
    }

    return (
       <>
           <Circle
               x={positionCircle.x}
               y={positionCircle.y}
               radius={SIZE_CIRCLE / 2}
               draggable={isDraggable}
               fill={'#dd4814'}
               onDragStart={onDragStart}
               onDragEnd={onDragEnd}
               shadowBlur={2}
           />
           <Text x={x} y={y} text={`${numberPos}`} fontSize={10} fill={'#fff'} offset={offset}/>
       </>
    )
})