import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {GridDraw} from "./GridDraw";
import {setIsSelection} from "../../store/reducers/selectionAreaReducer";
import {observerStage} from "../../observer/observerStage";
import {PointType} from "../../store/mainType";

export const SelectionAreaContainer = memo(() => {

    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
    const isSelection = useSelector<RootState, boolean>(state => state.selectionArea.isSelection);
    const move = useSelector<RootState, PointType>(state => state.mouse.move);

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
                <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/> : <></>}
        </>
    )
})