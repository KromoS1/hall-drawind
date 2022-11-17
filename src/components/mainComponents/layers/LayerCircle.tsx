import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CircleReducerType} from "../../../store/reducers/circlesReducer";
import {FCircle} from "../../figures/FCircle";
import {Layer} from "react-konva";
import uuid from "react-uuid";

export const LayerCircle = memo(() => {

    const circles = useSelector<RootState, CircleReducerType>(state => state.circles);

    const circlesDraw = useMemo(() => {

        const keyCircle = Object.keys(circles);

        const fCircles = keyCircle.map((id: string) => <FCircle key={id} idCircle={id}/>);

        let circlesLayer: JSX.Element[] = [];
        let maxLayerCount = 1000;
        const sizeCircles = fCircles.length;

        if (sizeCircles < maxLayerCount) {
            return (
                <Layer>
                    {fCircles}
                </Layer>
            )
        }

        let countMaxInCircles = Math.floor(sizeCircles / maxLayerCount);
        if (sizeCircles % maxLayerCount !== 0) countMaxInCircles += 1;

        return fCircles.map((el, i) => {

            if (countMaxInCircles > 0) {

                if (i < maxLayerCount && i < sizeCircles - 1) {
                    circlesLayer.push(el);
                } else {
                    circlesLayer.push(el);
                    let array = circlesLayer;
                    countMaxInCircles--;
                    maxLayerCount += maxLayerCount;
                    circlesLayer = [];
                    return (
                        <Layer key={uuid()}>
                            {array}
                        </Layer>
                    )
                }
            }
        })
    }, [circles]);

    return (
        <>
            {circlesDraw && circlesDraw}
        </>
    )
})