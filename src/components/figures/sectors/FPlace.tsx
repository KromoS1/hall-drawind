import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import Konva from "konva";
import {Group} from 'react-konva';
import {PointType} from "../../../store/mainType";
import {PlaceType} from "../../../store/reducers/sectorsReducer";
import {cloningElement, PlaceElementType} from "./cacheCircle";
import KonvaEventObject = Konva.KonvaEventObject;
import KonvaGroup = Konva.Group;

type PropsType = {
    place: PlaceType
}

export const FPlace: FC<PropsType> = memo(({place}) => {

    const {numCol, x, y, isSelected } = place;
    const [positionPlace, setPositionPlace] = useState<PointType & { isDragging: boolean }>({
        x: x,
        y: y,
        isDragging: false
    });

    const onDragStart = useCallback(() => {
        setPositionPlace(position => ({...position, isDragging: true}));
    }, [positionPlace.isDragging])

    const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
        setPositionPlace({x: e.target.x(), y: e.target.y(), isDragging: false});
    }, [positionPlace.isDragging])

    const offset = {
        x: `${numCol}`.length > 2 ? 8.5 : `${numCol}`.length > 1 ? 6 : 3,
        y: 5
    }

    return (
        <>
            <PlaceElement positionPlace={positionPlace} isSelected={isSelected} numCol={numCol}
                           offset={offset} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
        </>
    )
})

const PlaceElement: FC<PlaceElementType> = memo((props) => {

    const groupRef = useRef<KonvaGroup | null>(null);

    useEffect(() => {

        const clone = cloningElement(props);

        if (groupRef.current) {
            groupRef.current.add(clone.cloneCircle);
            groupRef.current.add(clone.cloneText);
        }
    }, [])

    return (
        <Group ref={groupRef}/>
    )
})



// type CheckIsSelectCircleType = PointType & PropsType

// const CheckIsSelectCircle: FC<CheckIsSelectCircleType> = memo(({idGroup, idCircle, x, y}) => {
//
//     const move = useSelector<RootState, PointType>(state => state.mouse.move);
//     const isSelection = useSelector<RootState, boolean>(state => state.selectionArea.isSelection);
//     const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
//     const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
//
//     const dispatch = useAppDispatch();
//     useEffect(() => {
//
//         if (isDown && isSelection) {
//             if (x + 10 < move.x && x - 10 > mouseDown.x && y + 10 < move.y && y - 10 > mouseDown.y) {
//                 dispatch(toggleSelect({idGroup, idCircle, value: true}));
//             }
//
//             if (isSelected) {
//                 if (circle.x + 10 > move.x && circle.x - 10 < mouseDown.x && circle.y + 10 > move.y && circle.y - 10 < mouseDown.y) {
//                     dispatch(toggleSelect({id: circle.id, value: false}));
//                 }
//             }
//         }
//     }, [move])
//
//     return <></>
// })