import React, {FC, memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CircleGroupReducerType, GroupCircleType} from "../../../store/reducers/circlesGroupReducer";
import {FCircle} from "../../figures/circles/FCircle";
import {Group, Layer} from "react-konva";
import uuid from "react-uuid";

type ResultDraw = {
    [key: string]: string[]
}

const checkCountCirclesAll = (circlesGroup: CircleGroupReducerType) => {

    const keysGroup = Object.keys(circlesGroup);
    let sizeCircles = 0;

    keysGroup.forEach(idGroup => {
        const keysCirclesInGroup = Object.keys(circlesGroup[idGroup]);
        sizeCircles += keysCirclesInGroup.length;
    })

    return sizeCircles
}

export const LayerCircle = memo(() => {

    const circlesGroup = useSelector<RootState, CircleGroupReducerType>(state => state.circlesGroup);
    const keysGroup = Object.keys(circlesGroup);
    const sizeCircles = checkCountCirclesAll(circlesGroup);
    const MAX_LAYER_SIZE = 1500;
    const countLayer = Math.ceil(sizeCircles / MAX_LAYER_SIZE);

    let idLayerElement: ResultDraw = {};
    let countCircleInGroups = 0;

    const createLayerInResult = (id: string, callback: Function) => {

        if (idLayerElement[id]) {
            callback();
        } else {
            idLayerElement[id] = [];
            callback();
        }
    }

    let i = 0;

    for (let l = 1; l <= countLayer; l++) {

        let idLayer = uuid();

        for (i; i < keysGroup.length;) {

            countCircleInGroups += Object.keys(circlesGroup[keysGroup[i]]).length;

            let countCircleInGroupsNext = countCircleInGroups;

            if (keysGroup[i + 1]) {
                countCircleInGroupsNext += Object.keys(circlesGroup[keysGroup[i + 1]]).length;
            }

            if (countCircleInGroups < MAX_LAYER_SIZE) {
                createLayerInResult(idLayer, () => {
                    idLayerElement[idLayer].push(keysGroup[i]);
                })
            }

            i++;

            if (countCircleInGroupsNext > MAX_LAYER_SIZE) {
                countCircleInGroups = 0;
                break;
            }
        }
    }

    const keysLayer = Object.keys(idLayerElement);

    const resultLayer = keysLayer.map(layerId => <LayerDraw key={layerId} groupsId={idLayerElement[layerId]}/>)

    return (
        <>
            {resultLayer}
        </>
    )
})

type LayerDrawType = {
    groupsId: string[]
}

const LayerDraw: FC<LayerDrawType> = memo(function ({groupsId}) {

    const resultGroup = useMemo(() => groupsId.map(idGroup => <GroupDraw key={idGroup} idGroup={idGroup}/>),[groupsId.length]);

    return (
        <Layer listening={false}>
            {resultGroup}
        </Layer>
    )
})

const GroupDraw = memo(function (props: { idGroup: string }){

    const circlesInGroup = useSelector<RootState, GroupCircleType>(state => state.circlesGroup[props.idGroup]);
    const idCircles = Object.keys(circlesInGroup);

    const fCircles = useMemo(() => idCircles.map((id: string) => <FCircle key={id} idGroup={props.idGroup} idCircle={id}/>),[props.idGroup]);

    return (
        <>
            <Group key={props.idGroup} listening={false}>
                {fCircles}
            </Group>
        </>
    )
})