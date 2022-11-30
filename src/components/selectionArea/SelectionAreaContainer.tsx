import React, {FC, memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {RectDraw} from "./prevDrawElement/RectDraw";
import {setIsSelection} from "../../store/reducers/selectionAreaReducer";
import {observerStage} from "../../observer/observerStage";
import {PointType} from "../../store/mainType";

type PropsType = {
    move: PointType,
    mouseDown: PointType,
    isDown: boolean,
    isSelection: boolean,
}

export const SelectionAreaContainer: FC<PropsType> = memo(({move, mouseDown, isSelection, isDown}) => {

    const dispatch = useDispatch();

    const resetSelection = () => {
        dispatch(setIsSelection({isSelection: false}));
    }

    useEffect(() => {

        observerStage.subscribeEventStage('mouseUp', resetSelection);

        return () => {
            observerStage.removeSubscriber('mouseUp', resetSelection);
        }
    },[])

    return (
        <>
            {isDown && isSelection ?
                <RectDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y} /> : <></>}
        </>
    )
})