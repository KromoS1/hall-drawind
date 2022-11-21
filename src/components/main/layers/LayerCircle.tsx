import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CircleGroupReducerType} from "../../../store/reducers/circlesGroupReducer";
import {FCircle} from "../../figures/circles/FCircle";
import {Group, Layer} from "react-konva";
import uuid from "react-uuid";

export const LayerCircle = memo(() => {

    const circlesGroup = useSelector<RootState, CircleGroupReducerType>(state => state.circlesGroup);

    const createGroup = (idGroup: string) => {

        const keysCirclesInGroup = Object.keys(circlesGroup[idGroup]);
        const fCircles = keysCirclesInGroup.map((id: string) => <FCircle key={id} idGroup={idGroup} idCircle={id}/>);

        return (
            <Group key={idGroup} listening={false}>
                {fCircles}
            </Group>
        )
    }

    const checkCountGroups = (keysGroup: string[]) => {

        let sizeCircles = 0;

        keysGroup.forEach(idGroup => {
            const keysCirclesInGroup = Object.keys(circlesGroup[idGroup]);
            sizeCircles += keysCirclesInGroup.length;
        })

        return sizeCircles
    }

    const renderOneLayer = (keysGroup: string[]) => {

        const resultGroup = keysGroup.map(idGroup => createGroup(idGroup));

        return (
            <Layer listening={false}>
                {resultGroup}
            </Layer>
        )
    }

    const circlesDraw = useMemo(() => {

        const keysGroup = Object.keys(circlesGroup);
        let groupsElement: JSX.Element[] = [];
        let resultGroups: JSX.Element[] = [];
        let maxLayerCount = 1500;
        let countCircleInGroups = 0;
        let sizeCircles = checkCountGroups(keysGroup);

        if (keysGroup.length === 0) return [];

        if (sizeCircles < maxLayerCount) {

            return renderOneLayer(keysGroup);
        }

        const cleanResultGroup = () => {

            countCircleInGroups = 0;
            groupsElement = [];
        }

        const createResultLayer = () => {

            resultGroups.push(
                <Layer key={uuid()} listening={false}>
                    {groupsElement}
                </Layer>
            )
            cleanResultGroup();
        }

        for(let i = 0; i < keysGroup.length; i++) {

            countCircleInGroups += Object.keys(circlesGroup[keysGroup[i]]).length;

            let countCircleInGroupsNext = countCircleInGroups;

            if (keysGroup[i + 1]) {
                countCircleInGroupsNext += Object.keys(circlesGroup[keysGroup[i + 1]]).length;
            }

            if (countCircleInGroups < maxLayerCount) {
                groupsElement.push(createGroup(keysGroup[i]));
            }

            if (countCircleInGroupsNext > maxLayerCount) {
                createResultLayer();
            }

            if (i + 1 === keysGroup.length) {
                createResultLayer();
            }
        }

        return resultGroups;
    }, [circlesGroup]);

    return (
        <>
            {circlesDraw && circlesDraw}
        </>
    )
})