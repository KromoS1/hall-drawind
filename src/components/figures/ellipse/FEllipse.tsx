import React, {FC, memo, useEffect, useRef} from "react";
import {Ellipse} from "react-konva";
import {EllipseFigureType} from "../../../store/mainType";
import Konva from "konva";
import {useAppDispatch} from "../../../store/hooks";
import {FTransformer} from "../transformer/Transformer";
import {observerDoc} from "../../../observer/observerDoc";
import {removeRects} from "../../../store/reducers/rectsReducer";
import {changeDataEllipse, saveChangedEllipse,
    setEllipseForChange, toggleSelectEllipse} from "../../../store/reducers/ellipsesReducer";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    ellipse: EllipseFigureType
    isChange: boolean
}

export const FEllipse: FC<PropsType> = memo(({ellipse, isChange}) => {

    const ellipseRef = useRef<Konva.Ellipse | null>(null);
    const dispatch = useAppDispatch();

    const transformEnd = () => {

        const node = ellipseRef.current;

        if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            dispatch(changeDataEllipse({
                ellipse: {
                    ...ellipse,
                    x: Math.round(node.x()),
                    y: Math.round(node.y()),
                }
            }))
        }
    }

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        dispatch(changeDataEllipse({ellipse: {...ellipse, x: e.target.x(), y: e.target.y()}}))
    }

    const onClick = () => {
        if (!ellipse.isSelected) {
            dispatch(toggleSelectEllipse({idEllipse: ellipse.id, value: true}));
        }
    }

    const dbClick = () => {
        dispatch(setEllipseForChange({...ellipse,isSelected: true}));
    }

    const offSelect = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            dispatch(saveChangedEllipse());
            dispatch(toggleSelectEllipse({idEllipse: ellipse.id, value: false}));
        }
    }

    const removeEllipse = (e: KeyboardEvent) => {
        if (e.key === 'Delete') {
            dispatch(removeRects());
        }
    }

    useEffect(() => {

        observerDoc.subscribeEventDoc('ctrlKeyDown', removeEllipse);
        observerDoc.subscribeEventDoc('onkeydown', offSelect)

        return () => {
            observerDoc.removeListener('ctrlKeyDown', removeEllipse);
            observerDoc.removeListener('onkeydown', offSelect);
        }
    }, [ellipse.isSelected])

    return (
        <>
            <Ellipse
                ref={ellipseRef}
                id={ellipse.id}
                x={ellipse.x}
                y={ellipse.y}
                radiusX={ellipse.radiusX}
                radiusY={ellipse.radiusY}
                fill={'red'}
                stroke={'black'}
                strokeWidth={4}
                draggable={isChange}
                onDragEnd={onDragEnd}
                onTransformEnd={transformEnd}
                onClick={onClick}
                onDblClick={dbClick}
            />
            {ellipse.isSelected && <FTransformer refFigure={ellipseRef} isShow={isChange} anchorSize={10}/>}
        </>
    )
});