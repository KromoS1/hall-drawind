import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {MouseReducerType} from "../../store/reducers/mouseReducer";
import {SelectionAreaReducerType} from "../../store/reducers/selectionAreaReducer";

export const ShowCoordinate = memo(() => {
    const {move, mouseDown, mouseUp} = useSelector<RootState, MouseReducerType>(state => state.mouse);
    const {isSelection, isDrawGrid} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);

    return (
        <div className={'d-flex'}>
            <div className={'mr-2'}>Mouse: {move.x}:{move.y}</div>
            <div className={'mr-2'}>Mouse Down: {mouseDown.x}:{mouseDown.y}</div>
            <div className={'mr-2'}>Mouse Up: {mouseUp.x}:{mouseUp.y}</div>
            <div className={'mr-2'} style={{color: isSelection ? 'green' : 'red'}}>Выделение</div>
            <div className={'mr-2'} style={{color: isDrawGrid ? 'green' : 'red'}}>Сетка</div>
        </div>
    )
})