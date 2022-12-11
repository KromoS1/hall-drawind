import React, {memo, useEffect, useRef} from "react";
import {Group, Transformer} from "react-konva";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {PlaceType} from "../../../../../../store/reducers/sectorsReducer";
import {FPlace} from "../../../../../figures/sectors/FPlace";

export const ChangeSectors = memo(() => {

    const idGroup = useSelector<RootState, string>(state => state.changeSector.idGroup);
    const sectorPlaces = useSelector<RootState, PlaceType[]>(state => state.changeSector.sectorPlaces);
    const transformerRef = useRef(null);
    const groupRef = useRef(null);

    const fPlace = sectorPlaces.map(place => <FPlace key={place.id} place={place}/>)

    useEffect(() => {
        if (transformerRef.current && groupRef.current) {
            //@ts-ignore todo fix
            transformerRef.current.nodes([groupRef.current]);
            //@ts-ignore todo fix
            transformerRef.current.getLayer().batchDraw();
        }
    }, [idGroup])

    return (
        <>
            <Group key={idGroup} ref={groupRef}>
                {fPlace}
            </Group>
            {idGroup &&
            <Transformer ref={transformerRef}
                         keepRatio={false}
                         rotateEnabled={false}
                         centeredScaling
                         borderStrokeWidth={2}
                         anchorSize={0}
                         padding={5}
            />}
        </>
    )
})


// пример кода для изгиба сетки
// lineCap={"round"}
// sceneFunc={function (context, shape) {
//
//         context.beginPath();
//
//         // context.rect(0, 0, rect.w, rect.h);
//         context.moveTo(0,0)
//         context.quadraticCurveTo(rect.w/2,200,rect.w, 0);
//         // context.lineTo(rect.w, 0);
//         context.lineTo(rect.w, rect.h);
//         context.quadraticCurveTo(rect.w/2,200+ 200, 0, rect.h);
//
//         // context.lineTo(0, rect.h);
//         context.lineTo(0, 0);
//
//         // context.closePath();
//
//         context.fillStrokeShape(shape);
//     }}