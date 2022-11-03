import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../components/figures/FCircle";
import {CirclesType, CountCirclesDrawType} from "../store/reducers/circlesReducer";
import uuid from "react-uuid";

type CoordinateCalcType = {
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
}
const sizeCircleWithIdent = SIZE_CIRCLE + SIZE_IDENT_CIRCLE;

const createCircle = (x: number, y: number, numberPos: number): CirclesType => {
    return {
        id: uuid(),
        x, y,
        numberPos,
        isDraggable: false,
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
            resultCircles.push(createCircle(pointX, pointY, x + 1));
        }
    }

    return resultCircles
}