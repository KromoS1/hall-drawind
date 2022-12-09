import React, {FC, memo, useEffect, useRef} from 'react';
import Konva from "konva";
import {Rect, Transformer} from 'react-konva';
import {RectFigureType} from "../../../store/mainType";
import {COLORS} from "../../../store/constantsColor";
import {removeFigure, toggleSelectFigure} from "../../../store/reducers/dataFigureReducer";
import {useAppDispatch} from "../../../store/hooks";
import {observerDoc} from "../../../observer/observerDoc";
import {changeDataRect} from "../../../store/reducers/rectsReducer";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    rect: RectFigureType
}

export const FRect: FC<PropsType> = memo(({rect}) => {

    const transformerRef = useRef<Konva.Transformer | null>(null);
    const rectRef = useRef<Konva.Rect | null>(null);
    const dispatch = useAppDispatch();

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        dispatch(changeDataRect({rect: {...rect, x: e.target.x(), y: e.target.y()}}))
    }

    const toggleSelectRect = () => {
        if (!rect.isSelected) {
            dispatch(toggleSelectFigure({idSelected:rect.id,typeFigure: rect.typeFigure,figure:{...rect,isSelected: true}}));
        }
    }

    const transformEnd = () => {

        const node = rectRef.current;

        if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            dispatch(changeDataRect({
                rect: {
                    ...rect,
                    x: Math.round(node.x()),
                    y: Math.round(node.y()),
                    w: Math.round(Math.max(5, node.width() * scaleX)),
                    h: Math.round(Math.max(node.height() * scaleY)),
                }
            }))
        }
    }

    const removeRect = (e: KeyboardEvent) => {
        if (e.key === 'Delete'){
            dispatch(removeFigure());
        }
    }

    useEffect(() => {
        if (rect.isSelected && transformerRef.current && rectRef.current) {

            observerDoc.subscribeEventDoc('ctrlKeyDown', removeRect);

            transformerRef.current.nodes([rectRef.current]);
            //@ts-ignore todo fix
            transformerRef.current.getLayer().batchDraw();
        }

        return () => {
            observerDoc.removeListener('ctrlKeyDown',removeRect);
        }
    }, [rect.isSelected])

    const strokeRect = rect.borderColor !== 'transparent' ? rect.borderColor : COLORS.transparent;
    const strokeWidth = rect.borderWidth !== 0 ? +rect.borderWidth : 0;

    return (
        <>
            <Rect
                ref={rectRef}
                id={rect.id}
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
                rotation={rect.rotation}
                fill={rect.bgColor}
                stroke={strokeRect}
                strokeWidth={strokeWidth}
                cornerRadius={rect.cornerRadius}
                draggable={rect.isSelected}
                onDragEnd={onDragEnd}
                onTransformEnd={transformEnd}
                onClick={toggleSelectRect}
            />
            {rect.isSelected &&
            <Transformer ref={transformerRef}
                         keepRatio={false}
                         anchorCornerRadius={10}
                         rotateEnabled={false}
                         centeredScaling
                         boundBoxFunc={(oldBox, newBox) => { //TODO проверить что делает, может и не надо эта функция
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