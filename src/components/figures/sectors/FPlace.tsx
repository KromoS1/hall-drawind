import React, {FC, memo, useCallback, useEffect, useRef} from 'react';
import Konva from "konva";
import {Circle, Group, Text} from 'react-konva';
import {PlaceType} from "../../../store/reducers/sectorsReducer";
import {cloningElement, PlaceElementType, SIZE_CIRCLE} from "./cacheCircle";
import KonvaEventObject = Konva.KonvaEventObject;
import KonvaGroup = Konva.Group;

type PropsType = {
    place: PlaceType,
    isChange: boolean
}

export const FPlace: FC<PropsType> = memo(({place, isChange}) => {

    const {numCol, x, y, isSelected} = place;

    const onDragStart = useCallback(() => {
        // setPositionPlace(position => ({...position, isDragging: true}));
    }, [])

    const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
        // setPositionPlace({x: e.target.x(), y: e.target.y(), isDragging: false});
    }, [])

    const offset = {
        x: `${numCol}`.length > 2 ? 8.5 : `${numCol}`.length > 1 ? 6 : 3,
        y: 5
    }

    return (
        <>
            {isChange
                ? <PlaceElementNoCash positionPlace={{x, y}} isSelected={isSelected} numCol={numCol}
                                      offset={offset} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                : <PlaceElement positionPlace={{x, y}} isSelected={isSelected} numCol={numCol}
                                offset={offset} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
            }
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


const PlaceElementNoCash: FC<PlaceElementType> = memo((props) => {
    return (
        <Group>
            <Circle x={props.positionPlace.x} y={props.positionPlace.y}
                    radius={SIZE_CIRCLE / 2}
                    fill={'#dd4814'}
                    perfectDrawEnabled={false}
            />
            <Text x={props.positionPlace.x} y={props.positionPlace.y}
                  text={`${props.numCol}`}
                  fontSize={10}
                  fill={'#fff'}
                  offset={props.offset}
            />
        </Group>
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