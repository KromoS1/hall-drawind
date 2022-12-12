import React, {FC, memo, useEffect, useRef} from 'react';
import Konva from "konva";
import {Rect} from 'react-konva';
import {RectFigureType} from "../../../store/mainType";
import {COLORS} from "../../../store/constantsColor";
import {useAppDispatch} from "../../../store/hooks";
import {observerDoc} from "../../../observer/observerDoc";
import {
    changeDataRect,
    removeRects,
    saveChangedRect,
    setRectForChange,
    toggleSelectRect
} from "../../../store/reducers/rectsReducer";
import {FTransformer} from "../transformer/Transformer";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    rect: RectFigureType,
    isChange: boolean
}

export const FRect: FC<PropsType> = memo(({rect, isChange}) => {

    const rectRef = useRef<Konva.Rect | null>(null);
    const dispatch = useAppDispatch();

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

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        dispatch(changeDataRect({rect: {...rect, x: e.target.x(), y: e.target.y()}}))
    }

    const onClick = () => {
        if (!rect.isSelected) {
            dispatch(toggleSelectRect({idRect: rect.id, value: true}));
        }
    }

    const dbClick = () => {
        dispatch(setRectForChange({...rect,isSelected: true}));
    }

    const offSelect = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            dispatch(saveChangedRect());
            dispatch(toggleSelectRect({idRect: rect.id, value: false}));
        }
    }

    const removeRect = (e: KeyboardEvent) => {
        if (e.key === 'Delete') {
            dispatch(removeRects());
        }
    }

    useEffect(() => {

        observerDoc.subscribeEventDoc('ctrlKeyDown', removeRect);
        observerDoc.subscribeEventDoc('onkeydown', offSelect)

        return () => {
            observerDoc.removeListener('ctrlKeyDown', removeRect);
            observerDoc.removeListener('onkeydown', offSelect);
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
                draggable={isChange}
                onDragEnd={onDragEnd}
                onTransformEnd={transformEnd}
                onClick={onClick}
                onDblClick={dbClick}
            />
            {rect.isSelected && <FTransformer refFigure={rectRef} isShow={isChange} anchorSize={10}/>}
        </>
    )
})