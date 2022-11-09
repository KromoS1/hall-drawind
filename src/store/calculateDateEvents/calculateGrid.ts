import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../../components/figures/FCircle";
import {CircleReducerType, CirclesType, toggleSelect} from "../reducers/circlesReducer";
import uuid from "react-uuid";
import {CountCirclesDrawType} from "../reducers/selectionAreaReducer";
import {PointType} from "../mainType";
import {Dispatch} from "redux";

type CoordinateCalcType = {
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
}
const sizeCircleWithIdent = SIZE_CIRCLE + SIZE_IDENT_CIRCLE;

const createCircle = (x: number, y: number, numberRow: number, numberColumn: number): CirclesType => {
    return {
        id: uuid(),
        x, y,
        numCol: numberRow,
        numRow: numberColumn,
        isDraggable: false,
        isSelected: false,
    }
}

export const calcCountCircleGrid = (coordinate: CoordinateCalcType) => {

    const width = coordinate.xEnd - coordinate.xStart;
    const hegth = coordinate.yEnd - coordinate.yStart;

    let countX = 0;
    let countY = 0;

    if (width === sizeCircleWithIdent) countX = 1;
    if (hegth === sizeCircleWithIdent) countY = 1;

    countX = width % sizeCircleWithIdent === 0 ? width / sizeCircleWithIdent : (width - sizeCircleWithIdent) / sizeCircleWithIdent;
    countY = hegth % sizeCircleWithIdent === 0 ? hegth / sizeCircleWithIdent : (hegth - sizeCircleWithIdent) / sizeCircleWithIdent;

    countX = Math.round(countX);
    countY = Math.round(countY);

    countX = Math.sign(countX) === 1 ? countX : -countX;
    countY = Math.sign(countY) === 1 ? countY : -countY;

    return {countX, countY};
}

export const createCirclesForGrid = (coordinate: {xStart: number, yStart: number}, countCircleGrid: CountCirclesDrawType): CirclesType[] => {

    let resultCircles = [];

    for ( let x = 0; x < countCircleGrid.countX; x++){

        for (let y = 0; y < countCircleGrid.countY; y++){

            const pointX = coordinate.xStart + (x * sizeCircleWithIdent) + (SIZE_CIRCLE / 2);
            const pointY = coordinate.yStart + (y * sizeCircleWithIdent) + (SIZE_CIRCLE / 2);
            resultCircles.push(createCircle(pointX, pointY, x + 1, y + 1));
        }
    }

    return resultCircles
}

export const calcSelectedCircle = (startPoint: PointType, endPoint: PointType, circles: CircleReducerType, dispatch: Dispatch) => {

    const keys = Object.keys(circles)

    keys.forEach(id => {
        const circle = circles[id];

        if (circle.x + 10 < endPoint.x && circle.x - 10 > startPoint.x && circle.y + 10 < endPoint.y && circle.y -10 > startPoint.y){
            dispatch(toggleSelect({id: circle.id, value: true}));
        }else{
            dispatch(toggleSelect({id: circle.id, value: false}));
        }
    })

}