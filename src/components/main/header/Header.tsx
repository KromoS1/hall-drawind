import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {SelectionAreaReducerType, setIsDrawGrid, setIsSelection} from "../../../store/reducers/selectionAreaReducer";
import {removeAllCircles} from "../../../store/reducers/circlesGroupReducer";
import {UndoRedoContainer} from "./UndoRedo";
import {TypesFigureType} from "../../../store/mainType";
import {setFigureDraw} from "../../../store/reducers/otherDataFigureReducer";
import {AppBar, Box, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import GridOnIcon from '@material-ui/icons/GridOn';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SplitButton from "./SplitButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {

    },
}));

export const Header = memo(() => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {isSelection, isDrawGrid} = useSelector<RootState, SelectionAreaReducerType>(state => state.selectionArea);
    const figure = useSelector<RootState, TypesFigureType | null>(state => state.otherDataFigure.drawFigure);

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

    const drawFigure = (typeFigure: TypesFigureType) => {
        resetSelectAction();
        dispatch(setFigureDraw({typeFigure}));
    }

    const clearCanvas = () => {
        resetSelectAction();
        dispatch(removeAllCircles());
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Box flexGrow={1}>
                        <UndoRedoContainer/>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={selectionArea} style={{color: isSelection ? 'green' : ''}}>
                            <AspectRatioIcon />
                        </IconButton>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={drawGrid} style={{color: isDrawGrid ? 'green' : ''}}>
                            <GridOnIcon />
                        </IconButton>
                        <SplitButton/>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={clearCanvas}>
                            <ClearAllIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" className={classes.title}>
                        Hall Drawing
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

        // <header className={"topnavbar-wrapper"}>
        //     <nav className={"navbar topnavbar pr-4 pl-4 justify-content-start"}>
        //
        //         <div className={'btn-group mr-2'}>
        //             <div className="btn btn-secondary" data-toggle="dropdown" style={{color: figure ? 'green' : '#000'}}>
        //                 <i className={'fa-2x fa fa-object-group'}/>
        //             </div>
        //             <div className="dropdown-menu" role="menu">
        //                 <a className="dropdown-item" href="#" onClick={() => drawFigure(Figures.RECT)}>Прямоугольник</a>
        //                 <a className="dropdown-item" href="#" onClick={() => drawFigure(Figures.ELLIPSE)}>Круг</a>
        //                 <a className="dropdown-item" href="#" onClick={() => drawFigure(Figures.TEXT)}>Текст</a>
        //             </div>
        //         </div>
        //         <div className={'btn btn-secondary mr-2'} onClick={removeGrid}>
        //             <i className={"fa-2x fas fa-broom"} style={{color: '#000'}}/>
        //         </div>
        //     </nav>
        // </header>
    )
})