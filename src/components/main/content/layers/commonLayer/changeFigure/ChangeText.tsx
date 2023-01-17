import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {Figures, TextFigureType} from "../../../../../../store/mainType";
import {FText} from "../../../../../figures/text/FText";

export const ChangeText = memo(() => {

    const createText = useSelector<RootState,TextFigureType | null>(state => state.texts.present.createText);

    return (
        <>
            {
                //@ts-ignore todo
                createText && createText.typeFigure === Figures.TEXT && <FText text={createText} isChange={true}/>
            }
        </>
    )
})