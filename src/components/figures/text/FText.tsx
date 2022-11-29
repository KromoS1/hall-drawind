import {FC, memo} from "react";
import {TextFigureType} from "../../../store/mainType";
import {Text} from "react-konva";

type PropsType = {
    textFigure: TextFigureType
}

export const FText: FC<PropsType> = memo(({textFigure}) => {
    return (
       <Text x={textFigure.x} y={textFigure.y} text={textFigure.text} fontSize={20} fontFamily={'Calibri'} fill={'#000'}/>
    )
})