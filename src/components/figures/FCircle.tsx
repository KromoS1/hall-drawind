import React, {FC, memo, useEffect, useState} from 'react';
import Konva from "konva";
import {Circle, Text} from 'react-konva';
import {PointType} from "../../store/mainType";
import KonvaEventObject = Konva.KonvaEventObject;
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CirclesType, toggleSelect} from "../../store/reducers/circlesReducer";
import {useAppDispatch} from "../../store/hooks";
import {MouseReducerType} from "../../store/reducers/mouseReducer";
import {SelectionAreaReducerType} from "../../store/reducers/selectionAreaReducer";

type PropsType = {
    idCircle: string
}

export const SIZE_CIRCLE = 20;
export const SIZE_IDENT_CIRCLE = 5;

export const FCircle: FC<PropsType> = memo(({idCircle}) => {

    const circle = useSelector<RootState,CirclesType>(state => state.circles[idCircle]);
    const {isDown, move, mouseDown} = useSelector<RootState,MouseReducerType>(state => state.mouse);
    const isSelection = useSelector<RootState,boolean>(state => state.selectionArea.isSelection);
    const dispatch = useAppDispatch();

    const {id, numRow, numCol, x, y, isDraggable, isSelected} = circle;

    const [positionCircle, setPositionCircle] = useState<PointType & { isDragging: boolean }>({x: x, y: y, isDragging: false});

    const onDragStart = () => {
        setPositionCircle(position => ({...position, isDragging: true}));
    }

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        setPositionCircle({x: e.target.x(), y: e.target.y(), isDragging: false});
    }

    const offset = {
        x: `${numCol}`.length > 2 ? 8.5 : `${numCol}`.length > 1 ? 6 : 3,
        y: 5
    }

    useEffect(() => {

        if(isDown && isSelection){
            if (circle.x + 10 < move.x && circle.x - 10 > mouseDown.x && circle.y + 10 < move.y && circle.y -10 > mouseDown.y){
                dispatch(toggleSelect({id: circle.id, value: true}));
            }

            if (isSelected) {
                if (circle.x + 10 > move.x && circle.x - 10 < mouseDown.x && circle.y + 10 > move.y && circle.y -10 < mouseDown.y){
                    dispatch(toggleSelect({id: circle.id, value: false}));
                }
            }
        }
    },[])

    return (
       <>
           <Circle
               x={positionCircle.x}
               y={positionCircle.y}
               radius={SIZE_CIRCLE / 2}
               draggable={isDraggable}
               fill={isSelected ? '#ff4000' : '#dd4814'}
               onDragStart={onDragStart}
               onDragEnd={onDragEnd}
               shadowBlur={isSelected ? 4 : 2}
           />
           <Text x={x} y={y} text={`${numCol}`} fontSize={10} fill={'#fff'} offset={offset}/>
       </>
    )
})