import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {CircleReducerType} from "../../../store/reducers/circlesReducer";
import {FCircle} from "../../figures/FCircle";
import {Layer} from "react-konva";


export const LayerCircle = memo(() => {

    const circles = useSelector<RootState, CircleReducerType>(state => state.circles);

    const circlesDraw = useMemo(() => {

        const keyCircle = Object.keys(circles);

        return keyCircle.map((id:string) => <FCircle key={id} idCircle={id}/>)
    }, [circles]);

    return (
        <Layer id={'layer_circle'}>
            {circlesDraw && circlesDraw}
        </Layer>
    )
})