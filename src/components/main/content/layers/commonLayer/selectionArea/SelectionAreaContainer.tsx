import React, {FC, memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {PreDrawRect} from "./prevDrawElement/PreDrawRect";
import {setIsSelection} from "../../../../../../store/reducers/selectionAreaReducer";
import {observerStage} from "../../../../../../observer/observerStage";
import {PointType} from "../../../../../../store/mainType";
import {selectedPlace, toggleSelectPlace} from "../../../../../../store/reducers/changeSectorReducer";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import {useAppDispatch} from "../../../../../../store/hooks";

type PropsType = {
    move: PointType,
    mouseDown: PointType,
    isDown: boolean,
    isSelection: boolean,
}

export const SelectionAreaContainer: FC<PropsType> = memo(({move, mouseDown, isSelection, isDown}) => {

    const dispatch = useAppDispatch();

    const resetSelection = () => {

        dispatch(selectedPlace());
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
                <PreDrawRect x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y} /> : <></>}
        </>
    )
})