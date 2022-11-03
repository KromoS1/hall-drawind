import React, {memo} from 'react';
import {useDispatch} from "react-redux";
import {setIsDrawGrid, setIsSelection} from "../../store/reducers/selectionAreaReducer";
import {removeAllCircles} from "../../store/reducers/circlesReducer";

export const RightAside = memo(() => {

    const dispatch = useDispatch();

    const selectionArea = () => dispatch(setIsSelection({isSelection: true}));
    const drawGrid = () => dispatch(setIsDrawGrid({isDrawGrid: true}));
    const removeGrid = () => dispatch(removeAllCircles());

    return (
        <aside className={"offsidebar d-none"}>
           <div style={{marginTop:'55px'}}>
               <div style={{cursor:'pointer'}} onClick={selectionArea}>Выделение</div>
               <div style={{cursor:'pointer'}} onClick={drawGrid}>Нарисовать сетку</div>
               <div style={{cursor:'pointer'}} onClick={removeGrid}>Очистить сетку</div>
           </div>
        </aside>
    )
})