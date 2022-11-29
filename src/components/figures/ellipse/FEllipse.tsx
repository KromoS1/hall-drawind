import {FC, memo} from "react";
import {Ellipse} from "react-konva";
import {EllipseFigureType} from "../../../store/mainType";

type PropsType = {
    ellipse : EllipseFigureType
}

export const FEllipse: FC<PropsType> = memo(({ellipse}) => {
    return (
        <Ellipse x={ellipse.x} y={ellipse.y} radiusX={ellipse.radiusX} radiusY={ellipse.radiusY}  fill={'red'} stroke={'black'}
        strokeWidth={4}/>
    )
});