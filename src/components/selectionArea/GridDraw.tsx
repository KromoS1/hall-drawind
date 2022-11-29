import {FC, memo} from "react";
import {Shape, Text} from "react-konva";
import {CountCirclesDrawType} from "./SelectionAreaGrid";
import {PointType} from "../../store/mainType";

type PropsType = PointType & {
    w: number,
    h: number,
    isDrawGrid?: boolean
    countCircles?: CountCirclesDrawType
}

export const GridDraw: FC<PropsType> = memo(({x, y, w, h, isDrawGrid, countCircles}) => {

    let xText = 0;
    let yText = 0;

    if (isDrawGrid) {
        xText = w / 2 + x - 30;
        yText = h / 2 + y;
    }

    return (
        <>
            <Shape x={x} y={y} width={w} height={h} fill={'#c9e5f5'}
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