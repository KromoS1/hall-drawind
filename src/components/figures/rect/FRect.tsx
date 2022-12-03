import React, {FC, memo, useEffect, useRef, useState} from 'react';
import Konva from "konva";
import {Rect, Transformer} from 'react-konva';
import {RectFigureType} from "../../../store/mainType";
import {COLORS} from "../../../store/constantsColor";
import {toggleSelectFigure} from "../../../store/reducers/otherDataFigureReducer";
import {useAppDispatch} from "../../../store/hooks";
import {changeDataRect} from "../../../store/reducers/rectsReducer";
import KonvaEventObject = Konva.KonvaEventObject;

type PositionRectType = {
    x: number
    y: number
    w: number
    h: number
}

type PropsType = {
    rect: RectFigureType
}

export const FRect: FC<PropsType> = memo(({rect}) => {

    const [rectUpdate, setRectUpdate] = useState<PositionRectType>({x: rect.x, y: rect.y, w: rect.w, h: rect.h});

    const transformerRef = useRef<Konva.Transformer | null>(null);
    const rectRef = useRef<Konva.Rect | null>(null);
    const dispatch = useAppDispatch();

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        setRectUpdate(value => ({...value, x: e.target.x(), y: e.target.y()}));
    }

    const toggleSelectRect = () => {
        if (!rect.isSelected) {
            dispatch(toggleSelectFigure({idFigure: rect.id, isSelected: !rect.isSelected, typeFigure: rect.typeFigure}))
        }
    }

    const transformEnd = (e: KonvaEventObject<Event>) => {

        const node = rectRef.current;
        if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            setRectUpdate(value => ({
                ...value,
                x: node.x(),
                y: node.y(),
                w: Math.round(Math.max(5, node.width() * scaleX)),
                h: Math.round(Math.max(node.height() * scaleY))
            }))

        }
    }

    useEffect(() => {

        dispatch(changeDataRect({rect: {...rect, ...rectUpdate}}));

    }, [rectUpdate])

    useEffect(() => {
        if (rect.isSelected && transformerRef.current && rectRef.current) {

            transformerRef.current.nodes([rectRef.current]);
            //@ts-ignore todo fix
            transformerRef.current.getLayer().batchDraw();
        }
    }, [rect.isSelected])

    const strokeRect = rect.borderColor !== 'transparent' ? rect.borderColor : COLORS.transparent;
    const strokeWidth = rect.borderWidth !== 0 ? rect.borderWidth : 0;

    return (
        <>
            <Rect
                ref={rectRef}
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
                fill={rect.bgColor}
                stroke={strokeRect}
                strokeWidth={strokeWidth}
                draggable={rect.isSelected}
                onDragEnd={onDragEnd}
                onTransformEnd={transformEnd}
                onClick={toggleSelectRect}
            />
            {rect.isSelected &&
            <Transformer ref={transformerRef}
                         keepRatio={false}
                         anchorCornerRadius={10}
                         rotateAnchorOffset={30}
                         centeredScaling
                         boundBoxFunc={(oldBox, newBox) => {
                             // limit resize
                             if (newBox.width < 5 || newBox.height < 5) {
                                 return oldBox;
                             }
                             return newBox;
                         }}
            />}
        </>
    )
})