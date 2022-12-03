import React, {memo, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {Figures, GeneralFigureType, RectFigureType, TypesFigureType} from "../../../../store/mainType";
import {UpdateFigure} from "./UpdateFigure";

export const RightAside = memo(() => {

    const [figure, setFigure] = useState<GeneralFigureType>()

    const idChangeFigure = useSelector<RootState, string>(state => state.otherDataFigure.idSelectFigure);
    const typeFigure = useSelector<RootState, TypesFigureType | null>(state => state.otherDataFigure.typeFigureSelected);
    const rects = useSelector<RootState, RectFigureType[]>(state => state.rects.present);
    // const ellipses = useSelector<RootState,EllipseFigureType[]>(state => state.otherFigure.present.figures.ellipses);
    // const texts = useSelector<RootState,TextFigureType[]>(state => state.otherFigure.present.figures.text);

    useEffect(() => {
        if (idChangeFigure && typeFigure) {
            if (typeFigure === Figures.RECT) {
                const rect = rects.find(r => r.id === idChangeFigure)
                if (rect) {
                    setFigure(rect);
                }
            }
        }
    }, [idChangeFigure,rects])

    return (
        <aside className={"offsidebar"}>
            {idChangeFigure && figure ? <UpdateFigure figure={figure}/> : <></>}
        </aside>
    )
})