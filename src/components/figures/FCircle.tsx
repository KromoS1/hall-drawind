import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import Konva from "konva";
import {Circle, Group, Text} from 'react-konva';
import {PointType} from "../../store/mainType";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useAppDispatch} from "../../store/hooks";
import {CirclesType, toggleSelect} from "../../store/reducers/circlesGroupReducer";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    idGroup: string,
    idCircle: string,
}

type CircleElementType = {
    positionCircle: PointType & { isDragging: boolean },
    isSelected: boolean,
    numCol: number,
    offset: PointType
    onDragStart: (e: KonvaEventObject<DragEvent>) => void,
    onDragEnd: (e: KonvaEventObject<DragEvent>) => void
}

export const SIZE_CIRCLE = 20;
export const SIZE_IDENT_CIRCLE = 5;

export const FCircle: FC<PropsType> = memo(({idGroup, idCircle}) => {

    console.log('FCIRCLE')

    const circle = useSelector<RootState, CirclesType>(state => state.circlesGroup[idGroup][idCircle])

    const {numCol, x, y, isSelected} = circle;

    const [positionCircle, setPositionCircle] = useState<PointType & { isDragging: boolean }>({
        x: x,
        y: y,
        isDragging: false
    });

    const onDragStart = useCallback(() => {
        setPositionCircle(position => ({...position, isDragging: true}));
    }, [positionCircle.isDragging])

    const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
        setPositionCircle({x: e.target.x(), y: e.target.y(), isDragging: false});
    }, [positionCircle.isDragging])

    const offset = {
        x: `${numCol}`.length > 2 ? 8.5 : `${numCol}`.length > 1 ? 6 : 3,
        y: 5
    }

    return (
        <>
            {/*<CheckIsSelectCircle id={circle.id} x={circle.x} y={circle.y}/>*/}
            <CircleElement positionCircle={positionCircle} isSelected={isSelected} numCol={numCol}
                           offset={offset} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
        </>
    )
})

type CheckIsSelectCircleType = PointType & PropsType

const CheckIsSelectCircle: FC<CheckIsSelectCircleType> = memo(({idGroup, idCircle, x, y}) => {

    const move = useSelector<RootState, PointType>(state => state.mouse.move);
    const isSelection = useSelector<RootState, boolean>(state => state.selectionArea.isSelection);
    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);

    const dispatch = useAppDispatch();
    useEffect(() => {

        if (isDown && isSelection) {
            if (x + 10 < move.x && x - 10 > mouseDown.x && y + 10 < move.y && y - 10 > mouseDown.y) {
                dispatch(toggleSelect({idGroup, idCircle, value: true}));
            }

            // if (isSelected) {
            //     if (circle.x + 10 > move.x && circle.x - 10 < mouseDown.x && circle.y + 10 > move.y && circle.y - 10 < mouseDown.y) {
            //         dispatch(toggleSelect({id: circle.id, value: false}));
            //     }
            // }
        }
    }, [move])

    return <></>
})

const CircleElement: FC<CircleElementType> = memo((props) => {
    const {
        positionCircle,
        isSelected,
        onDragStart,
        onDragEnd,
        numCol,
        offset
    } = props
    return (
        <Group listening={false}>
            <Circle
                x={positionCircle.x}
                y={positionCircle.y}
                radius={SIZE_CIRCLE / 2}
                draggable={positionCircle.isDragging}
                fill={isSelected ? '#ff4000' : '#dd4814'}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                // shadowBlur={isSelected ? 4 : 2}
                perfectDrawEnabled={false}
            />
            <Text x={positionCircle.x} y={positionCircle.y} text={`${numCol}`} fontSize={10} fill={'#fff'} offset={offset} perfectDrawEnabled={false}/>
        </Group>
    )
})