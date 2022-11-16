import {FC, memo} from "react";
import {Shape, Text} from "react-konva";
import {RectType} from "../../store/mainType";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CountCirclesDrawType} from "../../store/reducers/selectionAreaReducer";

type PropsType = RectType & {
    isDrawGrid?: boolean
}

export const GridDraw: FC<PropsType> = memo(({x, y, w, h, isDrawGrid}) => {

    const countCircles = useSelector<RootState, CountCirclesDrawType>(state => state.selectionArea.countCirclesDraw);
    let xText = 0;
    let yText = 0;

    if (isDrawGrid) {
        xText = w / 2 + x - 30;
        yText = h / 2 + y;
    }

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
            {isDrawGrid &&
            <Text x={xText} y={yText} text={`${countCircles.countX}x${countCircles.countY}`} fontSize={20}/>}
        </>

    )
})