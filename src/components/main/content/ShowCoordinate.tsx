import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {MouseReducerType} from "../../../store/reducers/mouseReducer";

export const ShowCoordinate = memo(() => {

    const {move, mouseDown, mouseUp} = useSelector<RootState, MouseReducerType>(state => state.mouse);

    return (
        <div className={'d-flex ml-4'}>
            <div className={'mr-2'}>Mouse: {move?.x.toFixed(2)}:{move?.y.toFixed(2)}</div>
            <div className={'mr-2'}>Mouse Down: {mouseDown.x.toFixed(2)}:{mouseDown.y.toFixed(2)}</div>
            <div className={'mr-2'}>Mouse Up: {mouseUp.x.toFixed(2)}:{mouseUp.y.toFixed(2)}</div>
        </div>
    )
})