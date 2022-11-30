import React, {FC, memo, useState} from 'react';
import Konva from "konva";
import {Rect} from 'react-konva';
import {RectFigureType} from "../../../store/mainType";
import {useDispatch} from "react-redux";
import {COLORS} from "../../../store/constantsColor";
import {updateFigureRect} from "../../../store/reducers/otherFigureReducer";
import KonvaEventObject = Konva.KonvaEventObject;

type PositionRectType = {
    isDragging: boolean,
    x: number
    y: number
}

type PropsType = {
    rect: RectFigureType
}

export const FRect: FC<PropsType> = memo(({rect}) => {

    const [positionRect, setPositionRect] = useState<PositionRectType>({x: rect.x, y: rect.y, isDragging: false});
    const dispatch = useDispatch();

    const onDragStart = () => {
        setPositionRect(position => ({...position, isDragging: true}));
    }

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        setPositionRect({x: e.target.x(), y: e.target.y(), isDragging: false});
    }

    const toggleSelectRect = () => {
        dispatch(updateFigureRect({rect:{...rect,isSelected: true}}))
    }

    return (
        <Rect
            x={positionRect.x}
            y={positionRect.y}
            width={rect.w}
            height={rect.h}
            fill={rect.bgColor}
            stroke={rect.isSelected ? COLORS.borderSelected : ''}
            strokeWidth={rect.isSelected ? 3 : 0}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={toggleSelectRect}
        />
    )
})