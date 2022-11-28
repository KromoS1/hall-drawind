import React, {FC, memo, useCallback, useEffect} from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {SectorsReducerType} from "../../../../store/reducers/circlesGroupReducer";
import {observerDoc} from "../../../../observer/observerDoc";

type PropsType = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

const UndoRedo:FC<PropsType> = ({canUndo, canRedo, onUndo, onRedo}) => {
    return (
        <>
            <div className={`btn btn-secondary mr-2 ${!canUndo ? 'disabled' : ''}`} onClick={onUndo}>
                <i className={'fa-2x far fa-arrow-alt-circle-left'} style={{color: '#000'}}/>
            </div>
            <div className={`btn btn-secondary mr-2 ${!canRedo ? 'disabled' : ''}`} onClick={onRedo}>
                <i className={'fa-2x far fa-arrow-alt-circle-right'} style={{color: '#000'}}/>
            </div>
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

