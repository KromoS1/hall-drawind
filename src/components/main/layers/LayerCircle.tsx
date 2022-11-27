import React, {FC, memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CircleGroupReducerType, CirclesType, GroupCirclesType} from "../../../store/reducers/circlesGroupReducer";
import {FCircle} from "../../figures/circles/FCircle";
import {Group, Layer} from "react-konva";

type LayerDrawType = {
    layerId: string
    groups: GroupCirclesType
}

type GroupDrawType = {
    layerId: string
    idGroup: string
}

export const LayerCircle = memo(() => {

    const circlesGroup = useSelector<RootState, CircleGroupReducerType>(state => state.circlesGroup);
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

    const circlesInGroup = useSelector<RootState, CirclesType[]>(state => state.circlesGroup[layerId][idGroup]);

    const fCircles = useMemo(() => circlesInGroup.map(circle => <FCircle key={circle.id} circle={circle} />),[layerId, idGroup]);

    return (
        <>
            <Group key={idGroup} listening={false}>
                {fCircles}
            </Group>
        </>
    )
})