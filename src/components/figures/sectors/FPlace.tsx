import React, {FC, memo, useCallback} from 'react';
import Konva from "konva";
import {PlaceType} from "../../../store/reducers/sectorsReducer";
import {PlaceCache} from "./PlaceCache";
import {PlaceNoCache} from "./PlaceNoCashe";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    place: PlaceType,
    isChange: boolean
}

export const FPlace: FC<PropsType> = memo(({place, isChange}) => {

    const onDragStart = useCallback(() => {
        // setPositionPlace(position => ({...position, isDragging: true}));
    }, [])

    const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
        // setPositionPlace({x: e.target.x(), y: e.target.y(), isDragging: false});
    }, [])

    const offset = {
        x: `${place.numCol}`.length > 2 ? 8.5 : `${place.numCol}`.length > 1 ? 6 : 3,
        y: 5
    }

    return (
        <>
            {isChange
                ? <PlaceNoCache place={place} offset={offset} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                : <PlaceCache place={place} offset={offset} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
            }
        </>
    )
})