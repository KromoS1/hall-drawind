import React, {memo, useEffect, useRef} from "react";
import {Group, Transformer} from "react-konva";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {PlaceType} from "../../../../../../store/reducers/sectorsReducer";
import {FPlace} from "../../../../../figures/sectors/FPlace";
import {useAppDispatch} from "../../../../../../store/hooks";
import {cleanChangeSector, saveChangedSector} from "../../../../../../store/reducers/changeSectorReducer";
import {observerDoc} from "../../../../../../observer/observerDoc";
import Konva from "konva";

export const ChangeSectors = memo(() => {

    const idGroup = useSelector<RootState, string>(state => state.changeSector.idGroup);
    const sectorPlaces = useSelector<RootState, PlaceType[]>(state => state.changeSector.sectorPlaces);
    const rotate = useSelector<RootState,number>(state => state.changeSector.rotation);

    const transformerRef = useRef<Konva.Transformer | null>(null);
    const groupRef = useRef<Konva.Group | null>(null);
    const dispatch = useAppDispatch();

    const remove = (e: KeyboardEvent) => {
        if (e.key === 'Delete') {
            dispatch(cleanChangeSector())
        }
    }

    const saveSector = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            dispatch(saveChangedSector());
        }
    }

    useEffect(() => {
        if (transformerRef.current && groupRef.current) {

            observerDoc.subscribeEventDoc('onkeydown', remove);
            observerDoc.subscribeEventDoc('onkeydown', saveSector);

            //@ts-ignore todo fix
            transformerRef.current.nodes([groupRef.current]);
            //@ts-ignore todo fix
            transformerRef.current.getLayer().batchDraw();
        }

        return () => {
            observerDoc.removeListener('onkeydown', remove);
            observerDoc.removeListener('onkeydown', saveSector);
        }
    }, [idGroup,sectorPlaces])

    const fPlace = sectorPlaces.map(place => <FPlace key={place.id} place={place} isChange={true}/>)

    if (transformerRef.current && groupRef.current) {

        const width = transformerRef.current.getAttr('width')
        const height = transformerRef.current.getAttr('height')

        const offsetForCenter = {
            x: width / 2,
            y: height / 2,
        }

        // groupRef.current?.offsetX(offsetForCenter.x)
        // groupRef.current?.offsetY(offsetForCenter.y)

        groupRef.current.rotation(rotate)
    }
    // get absolute rotation
    //var rotation = node.getAbsoluteRotation(); использовать для получения значение поворота

    return (
        <>
            <Group key={idGroup} ref={groupRef} offset={{x: 100, y: 100}}>
                {fPlace}
            </Group>
            {idGroup &&
            <Transformer ref={transformerRef}
                         keepRatio={false}
                         rotateEnabled={false}
                         centeredScaling
                         borderStrokeWidth={3}
                         anchorSize={0}
                         padding={5}
            />}
        </>
    )
})