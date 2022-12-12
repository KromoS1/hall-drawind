import {PlaceType} from "../reducers/sectorsReducer";
import uuid from "react-uuid";
import {CountCirclesDrawType} from "../../components/main/content/layers/commonLayer/selectionArea/SelectionAreaGrid";
import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../../components/figures/sectors/cacheCircle";

type CoordinateCalcType = {
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
}
const sizeCircleWithIdent = SIZE_CIRCLE + SIZE_IDENT_CIRCLE;

const createCircle = (x: number, y: number, numberRow: number, numberColumn: number): PlaceType => {
    return {
        id: uuid(),
        x, y,
        numCol: numberRow,
        numRow: numberColumn,
        isSelected: false,
    }
}

export const calcCountCircleGrid = (coordinate: CoordinateCalcType) => {

    const width = coordinate.xEnd - coordinate.xStart;
    const height = coordinate.yEnd - coordinate.yStart;

    let countX;
    let countY;

    if (width === sizeCircleWithIdent) countX = 1;
    if (height === sizeCircleWithIdent) countY = 1;

    countX = width % sizeCircleWithIdent === 0 ? width / sizeCircleWithIdent : (width - sizeCircleWithIdent) / sizeCircleWithIdent;
    countY = height % sizeCircleWithIdent === 0 ? height / sizeCircleWithIdent : (height - sizeCircleWithIdent) / sizeCircleWithIdent;

    countX = Math.round(countX);
    countY = Math.round(countY);

    countX = Math.sign(countX) === 1 ? countX : -countX;
    countY = Math.sign(countY) === 1 ? countY : -countY;

    return {countX, countY};
}

export const createCirclesForGrid = async (coordinate: {xStart: number, yStart: number}, countCircleGrid: CountCirclesDrawType): Promise<PlaceType[]> => {

    return new Promise((resolve) => {

        let resultCircles = [];

        for (let x = 0; x < countCircleGrid.countX; x++) {

            for (let y = 0; y < countCircleGrid.countY; y++) {

                const pointX = coordinate.xStart + (x * sizeCircleWithIdent) + (SIZE_CIRCLE / 2);
                const pointY = coordinate.yStart + (y * sizeCircleWithIdent) + (SIZE_CIRCLE / 2);
                resultCircles.push(createCircle(pointX, pointY, x + 1, y + 1));
            }
        }
        resolve(resultCircles);
    })
}