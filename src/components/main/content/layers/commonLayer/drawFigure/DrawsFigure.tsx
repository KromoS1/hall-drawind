import {EllipseFigureType, RectFigureType, TextFigureType} from "../../../../../../store/mainType";
import React, {FC, useMemo} from "react";
import {FRect} from "../../../../../figures/rect/FRect";
import {FEllipse} from "../../../../../figures/ellipse/FEllipse";
import {FText} from "../../../../../figures/text/FText";

type DrawRectsType = {
    rects: RectFigureType[]
}

type DrawEllipseType = {
    ellipses: EllipseFigureType[]
}

type DrawTextsType = {
    texts: TextFigureType[]
}

export const DrawRects: FC<DrawRectsType> = function ({rects}) {

    const drawRects = useMemo(() => {
        return rects.map(rect => {
            return (<FRect key={rect.id} rect={rect}/>)
        })
    }, [rects])

    return (
        <>
            {drawRects}
        </>
    )
}

export const DrawEllipses: FC<DrawEllipseType> = function ({ellipses}) {

    const drawEllipses = useMemo(() => {
        return ellipses.map(ellipse => {
            return <FEllipse key={ellipse.id} ellipse={ellipse}/>
        })
    }, [ellipses])

    return (
        <>
            {drawEllipses}
        </>
    )
}

export const DrawTexts: FC<DrawTextsType> = function ({texts}) {

    const drawTexts = useMemo(() => {
        return texts.map(text => <FText key={text.id} textFigure={text}/>)
    }, [texts])

    return (
        <>
            {drawTexts}
        </>
    )
}