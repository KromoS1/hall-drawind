import React, {FC, memo, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {
    EllipseFigureType,
    Figures,
    PointType,
    RectFigureType,
    TextFigureType,
    TypesFigureType
} from "../../../store/mainType";
import {setFigureDraw} from "../../../store/reducers/otherDataFigureReducer";
import {Layer, Transformer} from "react-konva";
import {FRect} from "../../figures/rect/FRect";
import {RectDraw} from "../../selectionArea/prevDrawElement/RectDraw";
import {observerStage} from "../../../observer/observerStage";
import uuid from "react-uuid";
import {FEllipse} from "../../figures/ellipse/FEllipse";
import {FText} from "../../figures/text/FText";
import {EllipseDraw} from "../../selectionArea/prevDrawElement/EllipseDraw";
import {COLORS} from "../../../store/constantsColor";
import {setRectFigure} from "../../../store/reducers/rectsReducer";

export const LayerOtherFigure = memo(() => {

    const move = useSelector<RootState, PointType>(state => state.mouse.move);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const typeFigure = useSelector<RootState, TypesFigureType | null>(state => state.otherDataFigure.drawFigure);
    const rects = useSelector<RootState, RectFigureType[]>(state => state.rects.present);
    // const ellipses = useSelector<RootState,EllipseFigureType[]>(state => state.otherFigure.present.figures.ellipses);
    // const texts = useSelector<RootState,TextFigureType[]>(state => state.otherFigure.present.figures.text);
    const dispatch = useDispatch();

    const createRect = (): RectFigureType => {
        return {
            id: uuid(),
            typeFigure: Figures.RECT,
            isSelected: false,
            x: mouseDown.x,
            y: mouseDown.y,
            w: move.x - mouseDown.x,
            h: move.y - mouseDown.y,
            bgColor: COLORS.bgFigure,
            borderWidth: 0,
            borderColor: COLORS.transparent
        }
    }

    const createEllipse = (): EllipseFigureType => {
        return {
            id: uuid(),
            typeFigure: Figures.ELLIPSE,
            isSelected: false,
            x: mouseDown.x,
            y: mouseDown.y,
            radiusX: move.x - mouseDown.x,
            radiusY: move.y - mouseDown.y,
        }
    }

    const createText = (): TextFigureType => {
        return {
            id: uuid(),
            typeFigure: Figures.TEXT,
            isSelected: false,
            x: mouseDown.x,
            y: mouseDown.y,
            text: 'Hello'
        }
    }

    const drawFigure = () => {

        switch (typeFigure) {
            case 1: {
                dispatch(setRectFigure({rect: createRect()}));
                dispatch(setFigureDraw({typeFigure: null}));
                break;
            }
            case 2: {
                // dispatch(setFigure({figure: createEllipse()}));
                dispatch(setFigureDraw({typeFigure: null}));
                break;
            }
            case 3: {
                // dispatch(setFigure({figure: createText()}));
                dispatch(setFigureDraw({typeFigure: null}));
                break;
            }
        }
    }

    useEffect(() => {

        observerStage.subscribeEventStage('mouseUp', drawFigure);

        return () => {
            observerStage.removeSubscriber('mouseUp', drawFigure);
        }
    }, [move])

    return (
        <Layer>
            <DrawRects rects={rects}/>
            {/*<DrawEllipses ellipses={ellipses}/>*/}
            {/*<DrawTexts texts={texts}/>*/}
            {isDown && typeFigure === Figures.RECT ?
                <RectDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}
                          bgColor={COLORS.bgFigure}/> : <></>}
            {isDown && typeFigure === Figures.ELLIPSE ?
                <EllipseDraw x={mouseDown.x} y={mouseDown.y} radiusX={move.x - mouseDown.x}
                             radiusY={move.y - mouseDown.y}/> : <></>}
            {isDown && typeFigure === Figures.TEXT ?
                <RectDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/> : <></>}
        </Layer>
    )
})

type DrawRectsType = {
    rects: RectFigureType[]
}

type DrawEllipseType = {
    ellipses: EllipseFigureType[]
}

type DrawTextsType = {
    texts: TextFigureType[]
}

const DrawRects: FC<DrawRectsType> = function ({rects}) {

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

const DrawEllipses: FC<DrawEllipseType> = function ({ellipses}) {

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

const DrawTexts: FC<DrawTextsType> = function ({texts}) {

    const drawTexts = useMemo(() => {
        return texts.map(text => <FText key={text.id} textFigure={text}/>)
    }, [texts])

    return (
        <>
            {drawTexts}
        </>
    )
}