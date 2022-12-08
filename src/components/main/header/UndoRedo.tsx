import React, {FC, memo, useCallback, useEffect} from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {SectorsReducerType} from "../../../store/reducers/sectorsReducer";
import {observerDoc} from "../../../observer/observerDoc";
import {createStyles, IconButton, makeStyles, Theme, Tooltip} from "@material-ui/core";
import {IconsMui} from "../iconsMui/iconsMui";

type PropsType = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

const UndoRedo:FC<PropsType> = ({canUndo, canRedo, onUndo, onRedo}) => {
    const classes = useStyles();
    return (
        <>
            <Tooltip title={'Назад'}>
                <IconButton edge="start" disabled={!canUndo} color="inherit" aria-label="Назад" onClick={onUndo}>
                    <IconsMui.UndoIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={'Вперед'}>
                <IconButton className={classes.menuButton} edge="start" disabled={!canRedo} color="inherit" aria-label="Вперед" onClick={onRedo}>
                    <IconsMui.RedoIcon/>
                </IconButton>
            </Tooltip>
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

