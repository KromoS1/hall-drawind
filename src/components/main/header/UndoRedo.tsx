import React, {FC, memo, useCallback, useEffect} from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {SectorsReducerType} from "../../../store/reducers/circlesGroupReducer";
import {observerDoc} from "../../../observer/observerDoc";
import {IconButton} from "@material-ui/core";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";

type PropsType = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

const UndoRedo:FC<PropsType> = ({canUndo, canRedo, onUndo, onRedo}) => {
    return (
        <>
            <IconButton edge="start" disabled={!canUndo} color="inherit" aria-label="Назад" onClick={onUndo}>
                <UndoIcon />
            </IconButton>
            <IconButton edge="start" disabled={!canRedo} color="inherit" aria-label="Вперед" onClick={onRedo}>
                <RedoIcon />
            </IconButton>
        </>
    )
}

export const UndoRedoContainer = memo(() => {

    const canUndo = useSelector<RootState,SectorsReducerType[]>(state => state.sectors.past).length > 0;
    const canRedo = useSelector<RootState,SectorsReducerType[]>(state => state.sectors.future).length > 0;
    const dispatch = useDispatch();

    const onUndo = useCallback(() => {
        if (!canUndo){
            dispatch(UndoActionCreators.undo());
        }
    },[]);

    const onRedo = useCallback(() => {
        if (!canRedo) {
            dispatch(UndoActionCreators.redo());
        }
    },[])

    useEffect(() => {
        observerDoc.subscribeEventDoc('ctrlKeyDown', (e: KeyboardEvent) => {
            if (e.code === 'KeyZ' && e.shiftKey){
                onRedo();
            } else if (e.code === 'KeyZ') {
                onUndo();
            }
        });
    },[])

    return <UndoRedo onUndo={onUndo} onRedo={onRedo} canUndo={canUndo} canRedo={canRedo}/>
})

