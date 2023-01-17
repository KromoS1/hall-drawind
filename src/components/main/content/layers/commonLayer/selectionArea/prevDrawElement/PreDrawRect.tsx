import {FC, memo} from "react";
import {Shape, Text} from "react-konva";
import {CountCirclesDrawType} from "../SelectionAreaGrid";
import {PointType} from "../../../../../../../store/mainType";
import {COLORS} from "../../../../../../../store/constantsColor";

type PropsType = PointType & {
    w: number
    h: number
    isDrawGrid?: boolean
    countCircles?: CountCirclesDrawType
    bgColor?: string
    borderWidth?: number
    borderColor?: string
}

export const PreDrawRect: FC<PropsType> = memo(({x, y, w, h, isDrawGrid, countCircles, bgColor, borderWidth, borderColor}) => {

    let xText = 0;
    let yText = 0;

    if (isDrawGrid) {
        xText = w / 2 + x - 30;
        yText = h / 2 + y;
    }

    return (
        <>
            <Shape x={x} y={y} width={w} height={h} fill={bgColor ? bgColor : COLORS.bgSelected} stroke={borderColor ? borderColor : COLORS.borderSelected}
                   strokeWidth={borderWidth ? borderWidth : 2}
                   sceneFunc={function (context, shape) {

                       context.beginPath();

                       context.rect(0, 0, w, h);
                       context.closePath();

                       context.fillStrokeShape(shape);
                   }}>
            </Shape>
            {isDrawGrid && <Text x={xText} y={yText} text={`${countCircles?.countX}x${countCircles?.countY}`} fontSize={20}/>}
        </>
    )
})