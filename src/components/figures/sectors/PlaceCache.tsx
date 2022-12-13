import React, {FC, memo, useEffect, useRef} from "react";
import {cloningElement, PlaceElementType} from "./cacheCircle";
import {Group} from "react-konva";
import Konva from "konva";
import KonvaGroup = Konva.Group;

export const PlaceCache: FC<PlaceElementType> = memo((props) => {

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