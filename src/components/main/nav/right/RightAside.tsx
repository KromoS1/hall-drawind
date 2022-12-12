import React, {memo, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {Figures, GeneralFigureType, RectFigureType, TypesFigureType} from "../../../../store/mainType";
import {UpdateFigure} from "./UpdateFigure";
import {Box, createStyles, makeStyles} from "@material-ui/core";
import {WIDTH_ASIDE} from "../../../../App";
import {UpdateSector} from "./UpdateSector";
import {ChangeSectorType} from "../../../../store/reducers/changeSectorReducer";

export const RightAside = memo(() => {

    // const [figure, setFigure] = useState<GeneralFigureType>();
    const styles = useStyles();

    // const idChangeFigure = useSelector<RootState, string>(state => state.dataFigure.idSelectFigure);
    // const typeFigure = useSelector<RootState, TypesFigureType | null>(state => state.dataFigure.typeFigureSelected);

    //TODO изменить для использования всех фигур
    const rect = useSelector<RootState, GeneralFigureType | null>(state => state.rects.present.changeRect);
    const sector = useSelector<RootState,ChangeSectorType>(state => state.changeSector);

    // const rects = useSelector<RootState, RectFigureType[]>(state => state.rects.present);
    // const ellipses = useSelector<RootState,EllipseFigureType[]>(state => state.otherFigure.present.figures.ellipses);
    // const texts = useSelector<RootState,TextFigureType[]>(state => state.otherFigure.present.figures.text);

    // useEffect(() => {
    //     if (idChangeFigure && typeFigure) {
    //         if (typeFigure === Figures.RECT) {
    //             const rect = rects.find(r => r.id === idChangeFigure)
    //             if (rect) {
    //                 setFigure(rect);
    //             }
    //         }
    //     }
    // }, [idChangeFigure, rects])

    return (
        <Box className={styles.box}>
            {sector.idGroup && <UpdateSector sector={sector}/>}
            {rect && <UpdateFigure figure={rect}/>}
        </Box>
    )
})

const useStyles = makeStyles(() => createStyles({
        box: {
            borderLeft: '2px solid #e6e6e6',
            width: WIDTH_ASIDE,
            padding: '5px'
        },
    }),
);