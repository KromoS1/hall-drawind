import React, {FC, memo, useEffect, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {
    PlaceType, removeSector,
    SectorsPlacesType,
    SectorsReducerType,
    toggleSelectSector
} from "../../../../store/reducers/sectorsReducer";
import {Group, Layer, Rect, Transformer} from "react-konva";
import {FPlace} from "../../../figures/sectors/FPlace";
import {observerDoc} from "../../../../observer/observerDoc";
import {setSectorInChange} from "../../../../store/reducers/changeSectorReducer";
import {useAppDispatch} from "../../../../store/hooks";

type LayerDrawType = {
    idLayer: string
    groups: SectorsPlacesType
}

type GroupDrawType = {
    idLayer: string
    idGroup: string
}

export const LayerSectors = memo(() => {

    const circlesGroup = useSelector<RootState, SectorsReducerType>(state => state.sectors.present);
    const keysLayer = Object.keys(circlesGroup);
    const resultLayer = keysLayer.map(layerId => <LayerDraw key={layerId} idLayer={layerId}
                                                            groups={circlesGroup[layerId]}/>)

    return <>{resultLayer}</>
})

const LayerDraw: FC<LayerDrawType> = memo(function ({idLayer, groups}) {

    const keys = Object.keys(groups);
    const resultGroup = useMemo(() => keys.map(idGroup => <GroupDraw key={idGroup} idLayer={idLayer}
                                                                     idGroup={idGroup}/>), [keys.length])

    return (
        <Layer>
            {resultGroup}
        </Layer>
    )
})

const GroupDraw: FC<GroupDrawType> = memo(function ({idLayer, idGroup}) {

    const dispatch = useAppDispatch();
    const placeInGroup = useSelector<RootState, PlaceType[]>(state => state.sectors.present[idLayer][idGroup].places);
    const isSelectedSector = useSelector<RootState, boolean>(state => state.sectors.present[idLayer][idGroup].isSelected);
    const transformerRef = useRef(null);
    const groupRef = useRef(null);

    const onClick = () => {
        dispatch(toggleSelectSector({idLayer, idGroup, value: true}));
        // dispatch(setSectorForChange({idLayer, idGroup, sectorPlaces: placeInGroup}));
    }

    const dbClick = () => {
        dispatch(setSectorInChange({idLayer, idGroup}))
    }

    const remove = (e: KeyboardEvent) => {
        if (e.key === 'Delete') {
            dispatch(removeSector({idLayer, idGroup}))
        }
    }

    const offSelect = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            dispatch(toggleSelectSector({idLayer, idGroup, value: false}));
        }
    }

    const calcSizeRect = () => {
        if (placeInGroup && placeInGroup.length > 1) {
            return {
                x: placeInGroup[0].x,
                y: placeInGroup[0].y,
                width: placeInGroup[placeInGroup.length - 1].x - placeInGroup[0].x,
                height: placeInGroup[placeInGroup.length - 1].y - placeInGroup[0].y,
            }
        }
    }

    useEffect(() => {

        if (transformerRef.current && groupRef.current) {

            observerDoc.subscribeEventDoc('onkeydown', remove);
            observerDoc.subscribeEventDoc('onkeydown', offSelect);
            //@ts-ignore todo fix
            transformerRef.current.nodes([groupRef.current]);
            //@ts-ignore todo fix
            transformerRef.current.getLayer().batchDraw();
        }

        return () => {
            observerDoc.removeListener('onkeydown', remove);
            observerDoc.removeListener('onkeydown', offSelect);
        }
    }, [isSelectedSector]);

    const fPlace = useMemo(() => placeInGroup.map(place =>
        <FPlace key={place.id} place={place}/>), [idLayer, idGroup]);

    return (
        <>
            <Group key={idGroup} ref={groupRef}>
                {fPlace}
                <Rect {...calcSizeRect()} onMouseDown={onClick} onDblClick={dbClick}/>
            </Group>
            {isSelectedSector &&
            <Transformer ref={transformerRef}
                         keepRatio={false}
                         anchorSize={0}
                         padding={5}
                         borderStrokeWidth={2}
                         rotateEnabled={false}
                         centeredScaling/>}
        </>
    )
})