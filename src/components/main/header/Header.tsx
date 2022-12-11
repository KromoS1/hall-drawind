import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {SelectionAreaReducerType, setIsDrawGrid, setIsSelection} from "../../../store/reducers/selectionAreaReducer";
import {UndoRedoContainer} from "./UndoRedo";
import {Figures, TypesFigureType} from "../../../store/mainType";
import {
    AppBar,
    Box,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import {FigureButton} from "./FigureButton";
import {IconsMui} from "../iconsMui/iconsMui";
import {cleanCanvas, setFigureDraw} from "../../../store/reducers/stageReducer";

export const Header = memo(() => {

    const {isSelection} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);
    const dispatch = useDispatch();
    const styles = useStyles();

    const resetSelectAction = () => {
        dispatch(setIsSelection({isSelection: false}));
        dispatch(setIsDrawGrid({isDrawGrid: false}));
        dispatch(setFigureDraw({typeFigure: null}));
    };

    const selectionArea = () => {
        resetSelectAction();
        dispatch(setIsSelection({isSelection: true}));
    };

    const drawFigure = useCallback((typeFigure: TypesFigureType) => {
        resetSelectAction();
        dispatch(setFigureDraw({typeFigure}));

        if (typeFigure === Figures.SECTOR) {
            dispatch(setIsDrawGrid({isDrawGrid: true}));
        }
    }, [])

    const clearCanvas = () => {
        resetSelectAction();
        dispatch(cleanCanvas());
    };

    return (
        <div className={styles.box}>
            <AppBar position="static">
                <Toolbar>
                    <Box flexGrow={1}>
                        <UndoRedoContainer/>
                        <Tooltip title={'Выделение'}>
                            <IconButton edge="start" className={styles.menuButton} color="inherit" onClick={selectionArea}
                                        style={{color: isSelection ? 'green' : ''}}>
                                <IconsMui.AspectRatioIcon/>
                            </IconButton>
                        </Tooltip>
                        <FigureButton drawFigure={drawFigure}/>
                        <Tooltip title={'Очистить весь холст'}>
                            <IconButton edge="start" className={styles.menuButton} color="inherit" onClick={clearCanvas}>
                                <IconsMui.ClearAllIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Typography variant="h6">
                        Hall Drawing
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
})

const useStyles = makeStyles((theme: Theme) => createStyles({
        box: {
            flexGrow: 1,
            height: '65px'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);