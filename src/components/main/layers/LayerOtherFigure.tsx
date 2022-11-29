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
import {setFigure, setFigureDraw,} from "../../../store/reducers/otherFigureReducer";
import {Ellipse, Layer} from "react-konva";
import {FRect} from "../../figures/rect/FRect";
import {GridDraw} from "../../selectionArea/GridDraw";
import {observerStage} from "../../../observer/observerStage";
import uuid from "react-uuid";
import {FEllipse} from "../../figures/ellipse/FEllipse";
import {FText} from "../../figures/text/FText";

type PropsType = PointType & {
    radiusX: number
    radiusY: number
}

const DrawEllipse: FC<PropsType> = ({x, y, radiusX, radiusY}) => {
    return (
        <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={'#c9e5f5'}/>
    )
}

export const LayerOtherFigure = memo(() => {

    const move = useSelector<RootState, PointType>(state => state.mouse.move);
    const isDown = useSelector<RootState, boolean>(state => state.mouse.isDown);
    const mouseDown = useSelector<RootState, PointType>(state => state.mouse.mouseDown);
    const typeFigure = useSelector<RootState,TypesFigureType | null>(state => state.otherFigure.present.drawFigure);
    const rect = useSelector<RootState,RectFigureType[]>(state => state.otherFigure.present.figures.rect);
    const ellipses = useSelector<RootState,EllipseFigureType[]>(state => state.otherFigure.present.figures.ellipses);
    const texts = useSelector<RootState,TextFigureType[]>(state => state.otherFigure.present.figures.text);
    const dispatch = useDispatch();

    const createRect = (): RectFigureType => {
        return {
            id: uuid(),
            typeFigure: Figures.RECT,
            x: mouseDown.x,
            y: mouseDown.y,
            w: move.x - mouseDown.x,
            h: move.y - mouseDown.y
        }
    }

    const createEllipse = (): EllipseFigureType => {
        return {
            id: uuid(),
            typeFigure: Figures.ELLIPSE,
            x: mouseDown.x,
            y: mouseDown.y,
            radiusX: move.x - mouseDown.x,
            radiusY: move.y - mouseDown.y,
        }
    }

    const createText = ():TextFigureType => {
        return {
            id: uuid(),
            typeFigure: Figures.TEXT,
            x: mouseDown.x,
            y: mouseDown.y,
            text:'Hello'
        }
    }

    const drawFigure = () => {

        switch (typeFigure) {
            case 1: {
                dispatch(setFigure({figure: createRect()}));
                dispatch(setFigureDraw({typeFigure: null}));
                break;
            }
            case 2: {
                dispatch(setFigure({figure: createEllipse()}));
                dispatch(setFigureDraw({typeFigure: null}));
                break;
            }
            case 3:{
                dispatch(setFigure({figure: createText()}));
                dispatch(setFigureDraw({typeFigure: null}));
                break;
            }
        }
    }

    const drawRects = useMemo(() => {
        return rect.map(rect => {
            return <FRect key={rect.id} x={rect.x} y={rect.y} w={rect.w} h={rect.h}/>
        })
    },[rect.length])

    const drawEllipses = useMemo(() => {
        return ellipses.map(ellipse => {
            return <FEllipse key={ellipse.id} ellipse={ellipse}/>
        })
    },[ellipses.length])

    const drawTexts = useMemo(() => {
        return texts.map(text => <FText key={text.id} textFigure={text}/>)
    },[texts.length])

    useEffect(() => {

        observerStage.subscribeEventStage('mouseUp',drawFigure);

        return () => {
            observerStage.removeSubscriber('mouseUp', drawFigure);
        }
    },[move])

    return (
        <Layer>
            {drawRects}
            {drawEllipses}
            {drawTexts}
            {isDown && typeFigure === Figures.RECT ?
                <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/> : <></>}
            {isDown && typeFigure === Figures.ELLIPSE ?
            <DrawEllipse x={mouseDown.x} y={mouseDown.y}
                         radiusX={move.x - mouseDown.x}
                         radiusY={move.y - mouseDown.y}

            /> : <></>}
            {isDown && typeFigure === Figures.TEXT ?
                <GridDraw x={mouseDown.x} y={mouseDown.y} w={move.x - mouseDown.x} h={move.y - mouseDown.y}/> : <></>}
        </Layer>
    )
})