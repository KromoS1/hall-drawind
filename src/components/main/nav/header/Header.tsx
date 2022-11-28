import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {SelectionAreaReducerType, setIsDrawGrid, setIsSelection} from "../../../../store/reducers/selectionAreaReducer";
import {removeAllCircles} from "../../../../store/reducers/circlesGroupReducer";
import {UndoRedoContainer} from "./UndoRedo";

export const Header = memo(() => {

    const dispatch = useDispatch();
    const {isSelection, isDrawGrid} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);

    const resetSelectAction = () => {
        dispatch(setIsSelection({isSelection: false}));
        dispatch(setIsDrawGrid({isDrawGrid: false}));
    };

    const selectionArea = () => {
        resetSelectAction();
        dispatch(setIsSelection({isSelection: true}));
    };

    const drawGrid = () => {
        resetSelectAction();
        dispatch(setIsDrawGrid({isDrawGrid: true}));
    };

    const removeGrid = () => {
        resetSelectAction();
        dispatch(removeAllCircles());
    };

    return (
        <header className={"topnavbar-wrapper"}>
            <nav className={"navbar topnavbar pr-4 pl-4 justify-content-start"}>
                <UndoRedoContainer/>
                <div className={'btn btn-secondary mr-2'} onClick={selectionArea}>
                    <i className={"fa-2x far fa-hand-pointer"} style={{color: isSelection ? 'green' : '#000'}}/>
                </div>
                <div className={'btn btn-secondary mr-2'} onClick={drawGrid}>
                    <i className={"fa-2x fab fa-buromobelexperte"} style={{color: isDrawGrid ? 'green' : '#000'}}/>
                </div>
                <div className={'btn btn-secondary mr-2'} onClick={removeGrid}>
                    <i className={"fa-2x fas fa-broom"} style={{color: '#000'}}/>
                </div>
            </nav>
        </header>
    )
})