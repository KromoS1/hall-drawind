import React, {FC, memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {SectorsReducerType, CirclesType, SectorsCirclesType} from "../../../store/reducers/circlesGroupReducer";
import {FCircle} from "../../figures/circles/FCircle";
import {Group, Layer} from "react-konva";

type LayerDrawType = {
    layerId: string
    groups: SectorsCirclesType
}

type GroupDrawType = {
    layerId: string
    idGroup: string
}

export const LayerCircle = memo(() => {

    const circlesGroup = useSelector<RootState, SectorsReducerType>(state => state.sectors.present);
    const keysLayer = Object.keys(circlesGroup);

    const resultLayer = keysLayer.map(layerId => <LayerDraw key={layerId} layerId={layerId} groups={circlesGroup[layerId]}/>)

    return <>{resultLayer}</>
})

const LayerDraw: FC<LayerDrawType> = memo(function ({layerId, groups}) {

    const keys = Object.keys(groups);

    const resultGroup = useMemo(() => keys.map(idGroup => <GroupDraw key={idGroup} layerId={layerId} idGroup={idGroup}/>),[keys.length])

    return (
        <Layer listening={false}>
            {resultGroup}
        </Layer>
    )
})

const GroupDraw:FC<GroupDrawType> = memo(function ({layerId, idGroup}){

    const circlesInGroup = useSelector<RootState, CirclesType[]>(state => state.sectors.present[layerId][idGroup]);

    const fCircles = useMemo(() => circlesInGroup.map(circle => <FCircle key={circle.id} circle={circle} />),[layerId, idGroup]);

    return (
        <>
            <Group key={idGroup} listening={false}>
                {fCircles}
            </Group>
        </>
    )
})