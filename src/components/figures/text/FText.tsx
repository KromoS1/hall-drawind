import React, {FC, memo, useEffect, useRef} from "react";
import {TextFigureType} from "../../../store/mainType";
import {Text} from "react-konva";
import {FTransformer} from "../transformer/Transformer";
import Konva from "konva";
import {useAppDispatch} from "../../../store/hooks";
import {observerDoc} from "../../../observer/observerDoc";
import {
    changeDataText,
    removeTexts,
    saveChangedText,
    setTextForChange,
    toggleSelectText
} from "../../../store/reducers/textsReducer";
import KonvaEventObject = Konva.KonvaEventObject;

type PropsType = {
    textFigure: TextFigureType
    isChange: boolean
    // bgColor?: string
}

export const FText: FC<PropsType> = memo(({textFigure, isChange}) => {

    const textRef = useRef<Konva.Ellipse | null>(null);
    const dispatch = useAppDispatch();

    const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        dispatch(changeDataText({text: {...textFigure, x: e.target.x(), y: e.target.y()}}))
    }

    const onClick = () => {
        if (!textFigure.isSelected) {
            dispatch(toggleSelectText({idText: textFigure.id, value: true}));
        }
    }

    const dbClick = () => {
        dispatch(setTextForChange({...textFigure,isSelected: true}));
    }

    const offSelect = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            dispatch(saveChangedText());
            dispatch(toggleSelectText({idText: textFigure.id, value: false}));
        }
    }

    const removeText = (e: KeyboardEvent) => {
        if (e.key === 'Delete') {
            dispatch(removeTexts());
        }
    }

    useEffect(() => {

        observerDoc.subscribeEventDoc('ctrlKeyDown', removeText);
        observerDoc.subscribeEventDoc('onkeydown', offSelect)

        return () => {
            observerDoc.removeListener('ctrlKeyDown', removeText);
            observerDoc.removeListener('onkeydown', offSelect);
        }
    }, [textFigure.isSelected])

    return (
        <>
            <Text x={textFigure.x}
                  y={textFigure.y}
                  text={textFigure.text}
                  fontSize={20}
                  fontFamily={'Calibri'}
                  fill={'#000'}
                  // fill={bgColor ? bgColor : COLORS.bgSelected}
                  draggable={isChange}
                  onDragEnd={onDragEnd}
                  onClick={onClick}
                  onDblClick={dbClick}
            />
            {textFigure.isSelected && <FTransformer refFigure={textRef} isShow={isChange} anchorSize={10}/>}
        </>
    )
})