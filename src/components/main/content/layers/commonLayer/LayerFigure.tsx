import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {Figures, PointType, RectFigureType, TypesFigureType} from "../../../../../store/mainType";
import {setFigureDraw} from "../../../../../store/reducers/dataFigureReducer";
import {PreDrawRect} from "./selectionArea/prevDrawElement/PreDrawRect";
import {observerStage} from "../../../../../observer/observerStage";
import {PreDrawEllipse} from "./selectionArea/prevDrawElement/PreDrawEllipse";
import {COLORS} from "../../../../../store/constantsColor";
import {setRectFigure} from "../../../../../store/reducers/rectsReducer";
import {createRect} from "../../../../../store/utils";
import {DrawRects} from "./drawFigure/DrawsFigure";

export const LayerFigure = memo(() => {

    const move = useSelector<RootState, PointType>(state => state.mouse.move);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const typeFigure = useSelector<RootState, TypesFigureType | null>(state => state.dataFigure.drawFigure);
    const rects = useSelector<RootState, RectFigureType[]>(state => state.rects.present);
    // const ellipses = useSelector<RootState,EllipseFigureType[]>(state => state.otherFigure.present.figures.ellipses);
    // const texts = useSelector<RootState,TextFigureType[]>(state => state.otherFigure.present.figures.text);
    const dispatch = useDispatch();

    const drawFigure = () => {

        switch (typeFigure) {
            case 1: {
                dispatch(setRectFigure({rect: createRect(move, mouseDown)}));
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
        <>
            <DrawRects rects={rects}/>
            {/*<DrawEllipses ellipses={ellipses}/>*/}
            {/*<DrawTexts texts={texts}/>*/}
            {isDown && typeFigure === Figures.RECT ?
                <PreDrawRect x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}
                             bgColor={COLORS.bgFigure}/> : <></>}
            {isDown && typeFigure === Figures.ELLIPSE ?
                <PreDrawEllipse x={mouseDown.x} y={mouseDown.y} radiusX={move.x - mouseDown.x}
                                radiusY={move.y - mouseDown.y}/> : <></>}
            {isDown && typeFigure === Figures.TEXT ?
                <PreDrawRect x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/> : <></>}
        </>
    )
})