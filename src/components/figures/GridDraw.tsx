import {FC, memo} from "react";
import {Shape, Text} from "react-konva";
import {PointType, RectType} from "../../store/mainType";
import {calcCountCircleGrid} from "../../calculate/calculateGrid";

type PropsType = RectType & {
    move: PointType,
    setCountCircles: (countX: number, countY: number) => void
}

export const GridDraw: FC<PropsType> = memo(({x, y, w, h, move, setCountCircles}) => {

    let xText = w / 2 + x - 30;
    let yText = h / 2 + y;

    const coordinateForCalc = {xStart: x, yStart: y, xEnd: move.x, yEnd: move.y}
    const countCircles = calcCountCircleGrid(coordinateForCalc);
    setCountCircles(countCircles.countElementX, countCircles.countElementY);

    return (
        <>
            <Shape x={x} y={y} width={w} height={h} fill={'rgba(213,141,141,0.53)'} stroke={'#dd4814'} strokeWidth={1}
                   sceneFunc={function (context, shape) {

                       context.beginPath();

                       context.rect(0, 0, w, h);
                       context.closePath();

                       context.fillStrokeShape(shape);
                   }}>
            </Shape>
            <Text x={xText} y={yText} text={`${countCircles.countElementX}x${countCircles.countElementY}`} fontSize={20}/>
        </>

    )
})