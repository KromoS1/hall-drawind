import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SelectionAreaReducerType, setIsDrawGrid, setIsSelection} from "../../store/reducers/selectionAreaReducer";
import {removeAllCircles} from "../../store/reducers/circlesGroupReducer";
import {RootState} from "../../store/store";

export const RightAside = memo(() => {

    const dispatch = useDispatch();
    const {isSelection, isDrawGrid} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);

    const resetSelectAction = () => {
        dispatch(setIsSelection({isSelection: false}));
        dispatch(setIsDrawGrid({isDrawGrid: false}));
    }

    const selectionArea = () => {
        resetSelectAction();
        dispatch(setIsSelection({isSelection: true}));
    };

    const drawGrid = () => {
        resetSelectAction();
        dispatch(setIsDrawGrid({isDrawGrid: true}));
    };
    const removeGrid = () => dispatch(removeAllCircles());

    return (
        <aside className={"offsidebar"}>
           <div>
               <div style={{cursor:'pointer', color: isSelection ? 'green' : 'white'}} onClick={selectionArea}>Выделение</div>
               <div style={{cursor:'pointer', color: isDrawGrid ? 'green' : 'white'}} onClick={drawGrid}>Нарисовать сетку</div>
               <div style={{cursor:'pointer'}} onClick={removeGrid}>Очистить сетку</div>
           </div>
        </aside>
    )
})