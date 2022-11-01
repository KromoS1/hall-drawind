import {FC, memo} from "react";
import {Shape} from "react-konva";
import {RectType} from "../../store/mainType";

export const GridDraw:FC<RectType> = memo(({x, y, w, h}) => {

    return (
        <Shape x={x} y={y} width={w} height={h} fill={'rgba(213,141,141,0.53)'} stroke={'#dd4814'} strokeWidth={1} sceneFunc={function (context, shape) {

            context.beginPath();

            context.rect(0, 0, w, h);
            context.closePath();

            context.fillStrokeShape(shape);
        }}/>
    )
})