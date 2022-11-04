import React, {memo} from 'react';
import {useDispatch} from "react-redux";
import {setIsDrawGrid, setIsSelection} from "../../store/reducers/selectionAreaReducer";
import {removeAllCircles} from "../../store/reducers/circlesReducer";
import {setDraggable} from "../../store/reducers/stageReducer";

export const RightAside = memo(() => {

    const dispatch = useDispatch();

    const resetSelectAction = () => {
        dispatch(setIsSelection({isSelection: false}));
        dispatch(setIsDrawGrid({isDrawGrid: false}));
        dispatch(setDraggable({draggable: false}));
    }

    const selectionArea = () => {
        resetSelectAction();
        dispatch(setIsSelection({isSelection: true}));
    };

    const drawGrid = () => {
        resetSelectAction();
        dispatch(setIsDrawGrid({isDrawGrid: true}));
    };
    const draggableStage = () => {
        resetSelectAction();
        dispatch(setDraggable({draggable:true}))
    };
    const removeGrid = () => dispatch(removeAllCircles());


    return (
        <aside className={"offsidebar d-none"}>
           <div style={{marginTop:'55px'}}>
               <div style={{cursor:'pointer'}} onClick={draggableStage}>Перемещение</div>
               <div style={{cursor:'pointer'}} onClick={selectionArea}>Выделение</div>
               <div style={{cursor:'pointer'}} onClick={drawGrid}>Нарисовать сетку</div>
               <div style={{cursor:'pointer'}} onClick={removeGrid}>Очистить сетку</div>
           </div>
        </aside>
    )
})