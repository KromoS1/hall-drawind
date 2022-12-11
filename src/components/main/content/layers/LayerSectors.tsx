import React, {FC, memo, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {PlaceType, SectorsPlacesType, SectorsReducerType} from "../../../../store/reducers/sectorsReducer";
import {Group, Layer, Rect, Shape} from "react-konva";
import {FPlace} from "../../../figures/sectors/FPlace";
import {setSectorForChange} from "../../../../store/reducers/changeSectorReducer";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

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

    const dispatch = useDispatch();
    const placeInGroup = useSelector<RootState, PlaceType[]>(state => state.sectors.present[idLayer][idGroup]);

    const fPlace = useMemo(() => placeInGroup.map(place =>
        <FPlace key={place.id} place={place}/>), [idLayer, idGroup]);

    const selectGroup = () => {
        dispatch(setSectorForChange({idLayer, idGroup, sectorPlaces: placeInGroup}));
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

    return (
        <>
            <Group key={idGroup}>
                {fPlace}
                <Rect {...calcSizeRect()} onMouseDown={selectGroup}/>
            </Group>
        </>
    )
})