import {FC, memo, useEffect} from "react";
import {Shape, Text} from "react-konva";
import {RectType} from "../../store/mainType";
import {createCirclesForGrid} from "../../calculate/calculateGrid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CountCirclesDrawType, setCirclePosition, setCountCirclesDraw} from "../../store/reducers/circlesReducer";
import {MouseReducerType} from "../../store/reducers/mouseReducer";

type PropsType = RectType & {
    isDrawGrid?: boolean
}

export const GridDraw: FC<PropsType> = memo(({x, y, w, h, isDrawGrid}) => {

    const countCircles = useSelector<RootState, CountCirclesDrawType>(state => state.circles.countCirclesDraw);
    const {isDown} = useSelector<RootState, MouseReducerType>(state => state.mouse);

    const dispatch = useDispatch();

    // useEffect(() => {
    //
    //     if (isDrawGrid && countCircles.countX > 0 && countCircles.countX > 0) {
    //         const gridCircles = createCirclesForGrid({xStart: x, yStart: y}, countCircles);
    //         dispatch(setCirclePosition(gridCircles));
    //         dispatch(setCountCirclesDraw({countX: 0, countY: 0}));
    //     }
    // }, [isDown, countCircles])

    let xText = w / 2 + x - 30;
    let yText = h / 2 + y;

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