import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CircleGroupReducerType} from "../../../store/reducers/circlesGroupReducer";
import {FCircle} from "../../figures/FCircle";
import {Group, Layer} from "react-konva";
import uuid from "react-uuid";

export const LayerCircle = memo(() => {

    const circlesGroup = useSelector<RootState, CircleGroupReducerType>(state => state.circlesGroup);

    const circlesDraw = useMemo(() => {

        const keysGroup = Object.keys(circlesGroup);
        let groupsElement: JSX.Element[] = [];
        let sizeCircles = 0;
        let maxLayerCount = 1000;
        let countCircleInGroups = 0;
        let result: any = [];

        if (keysGroup.length === 0) return [];

        keysGroup.forEach(idGroup => {
            const keysCirclesInGroup = Object.keys(circlesGroup[idGroup]);
            sizeCircles += keysCirclesInGroup.length;
        })

        const createGroup = (idGroup: string) => {

            const keysCirclesInGroup = Object.keys(circlesGroup[idGroup]);
            const fCircles = keysCirclesInGroup.map((id: string) => <FCircle key={id} idGroup={idGroup} idCircle={id}/>);

            return (
                <Group key={idGroup} listening={false}>
                    {fCircles}
                </Group>
            )
        }

        if (sizeCircles < maxLayerCount) {

            const resultGroup = keysGroup.map(idGroup => createGroup(idGroup));

            return (
                <Layer listening={false}>
                    {resultGroup}
                </Layer>
            )
        }

        const createResultLayer = () => {

            result.push(
                <Layer key={uuid()} listening={false}>
                    {groupsElement}
                </Layer>
            )

            countCircleInGroups = 0;
            groupsElement = [];
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

        return result;
    }, [circlesGroup]);

    return (
        <>
            {circlesDraw && circlesDraw}
        </>
    )
})