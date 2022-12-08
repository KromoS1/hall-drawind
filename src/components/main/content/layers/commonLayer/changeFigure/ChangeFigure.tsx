import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {Figures, GeneralFigureType} from "../../../../../../store/mainType";
import {FRect} from "../../../../../figures/rect/FRect";


export const ChangeFigure = memo(() => {

    const figure = useSelector<RootState,GeneralFigureType | null>(state => state.dataFigure.changeFigure);

    return (
        <>
            {
                //@ts-ignore todo
                figure && figure.typeFigure === Figures.RECT && <FRect rect={figure}/>
            }
        </>
    )
})