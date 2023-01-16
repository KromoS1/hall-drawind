import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {EllipseFigureType, Figures} from "../../../../../../store/mainType";
import {FEllipse} from "../../../../../figures/ellipse/FEllipse";

export const ChangeEllipse = memo(() => {

    const changeEllipse = useSelector<RootState,EllipseFigureType | null>(state => state.ellipses.present.changeEllipse);

    return (
        <>
            {
                //@ts-ignore todo
                changeEllipse && changeEllipse.typeFigure === Figures.ELLIPSE && <FEllipse ellipse={changeEllipse} isChange={true}/>
            }
        </>
    )
})