import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {Figures, GeneralFigureType, RectFigureType} from "../../../../../../store/mainType";
import {FRect} from "../../../../../figures/rect/FRect";


export const ChangeFigure = memo(() => {

    const changeRect = useSelector<RootState,RectFigureType | null>(state => state.rects.present.changeRect);

    return (
        <>
            {
                //@ts-ignore todo
                changeRect && changeRect.typeFigure === Figures.RECT && <FRect rect={changeRect}/>
            }
        </>
    )
})