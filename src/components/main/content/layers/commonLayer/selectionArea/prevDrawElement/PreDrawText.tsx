import {PointType} from "../../../../../../../store/mainType";
import React, {FC} from "react";
import {Text} from "react-konva";

type PropsType = PointType & {
    text: string
}

export const PreDrawText: FC<PropsType> = ({x, y, text}) => {

    return (
        <>
        <Text x={x} y={y} text={text}/>
        {/*{text && <Text x={x} y={y} text={text} fontSize={20}/>}*/}
        </>
    )
}