import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../components/figures/FCircle";
import {CirclesType} from "../store/reducers/circlesReducer";
import uuid from "react-uuid";

type CoordinateCalcType = {
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
}
const sizeCircleWithIdent = SIZE_CIRCLE + SIZE_IDENT_CIRCLE;

const createCircle = (x: number, y: number): CirclesType => {
    return {
        id: uuid(),
        x, y
    }
}

export const calcCountCircleGrid = (coordinate: CoordinateCalcType) => {

    const width = coordinate.xEnd - coordinate.xStart;
    const hegth = coordinate.yEnd - coordinate.yStart;

    let countElementX = 0;
    let countElementY = 0;

    if (width === sizeCircleWithIdent) countElementX = 1;
    if (hegth === sizeCircleWithIdent) countElementY = 1;

    countElementX = width % sizeCircleWithIdent === 0 ? width / sizeCircleWithIdent : (width - sizeCircleWithIdent) / sizeCircleWithIdent;
    countElementY = hegth % sizeCircleWithIdent === 0 ? hegth / sizeCircleWithIdent : (hegth - sizeCircleWithIdent) / sizeCircleWithIdent;

    countElementX = Math.round(countElementX);
    countElementY = Math.round(countElementY);

    countElementX = Math.sign(countElementX) === 1 ? countElementX : -countElementX;
    countElementY = Math.sign(countElementY) === 1 ? countElementY : -countElementY;

    return {countElementX, countElementY};
}

export const createCirclesForGrid = (coordinate: {xStart: number, yStart: number}, countCircleGrid: {countX: number, countY: number}): CirclesType[] => {

    let resultCircles = [];

    for ( let x = 0; x < countCircleGrid.countX; x++){

        for (let y = 0; y < countCircleGrid.countY; y++){

            const pointX = coordinate.xStart + (x * sizeCircleWithIdent) + (SIZE_CIRCLE / 2);
            const pointY = coordinate.yStart + (y * sizeCircleWithIdent) + (SIZE_CIRCLE / 2);
            resultCircles.push(createCircle(pointX,pointY));
        }
    }

    return resultCircles
}