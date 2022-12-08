import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {SelectionAreaReducerType, setIsDrawGrid, setIsSelection} from "../../../store/reducers/selectionAreaReducer";
import {removeAllCircles} from "../../../store/reducers/circlesGroupReducer";
import {UndoRedoContainer} from "./UndoRedo";
import {TypesFigureType} from "../../../store/mainType";
import {setFigureDraw} from "../../../store/reducers/dataFigureReducer";
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
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import GridOnIcon from '@material-ui/icons/GridOn';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import {FigureButton} from "./FigureButton";

export const Header = memo(() => {

    const {isSelection, isDrawGrid} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);
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

    const drawGrid = () => {
        resetSelectAction();
        dispatch(setIsDrawGrid({isDrawGrid: true}));
    };

    const drawFigure = useCallback((typeFigure: TypesFigureType) => {
        resetSelectAction();
        dispatch(setFigureDraw({typeFigure}));
    }, [])

    const clearCanvas = () => {
        resetSelectAction();
        dispatch(removeAllCircles());
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
                                <AspectRatioIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Нарисовать сектор'}>
                            <IconButton edge="start" className={styles.menuButton} color="inherit" onClick={drawGrid}
                                        style={{color: isDrawGrid ? 'green' : ''}}>
                                <GridOnIcon/>
                            </IconButton>
                        </Tooltip>
                        <FigureButton drawFigure={drawFigure}/>
                        <Tooltip title={'Очистить весь холст'}>
                            <IconButton edge="start" className={styles.menuButton} color="inherit" onClick={clearCanvas}>
                                <ClearAllIcon/>
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