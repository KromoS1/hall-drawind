import {
    EllipseFigureType,
    Figures,
    PointType,
    RectFigureType,
    NamesForUpdate,
    TextFigureType,
    TypesFigureType
} from "./mainType";
import uuid from "react-uuid";
import {COLORS} from "./constantsColor";
import {PlaceType} from "./reducers/sectorsReducer";
import {SIZE_CIRCLE, SIZE_IDENT_CIRCLE} from "../components/figures/sectors/cacheCircle";
import {ChangeEvent} from "react";
import {changeDataRect} from "./reducers/rectsReducer";

export const createRect = (move: PointType, mouseDown: PointType): RectFigureType => {
    return {
        id: uuid(),
        typeFigure: Figures.RECT,
        isSelected: false,
        x: mouseDown.x,
        y: mouseDown.y,
        w: move.x - mouseDown.x,
        h: move.y - mouseDown.y,
        bgColor: COLORS.bgFigure,
        borderWidth: 0,
        borderColor: COLORS.transparent,
        rotation: 0,
        cornerRadius: 0,
    }
}

export const createEllipse = (move: PointType, mouseDown: PointType): EllipseFigureType => {
    return {
        id: uuid(),
        typeFigure: Figures.ELLIPSE,
        isSelected: false,
        x: mouseDown.x,
        y: mouseDown.y,
        radiusX: move.x - mouseDown.x,
        radiusY: move.y - mouseDown.y,
        bgColor: COLORS.bgFigure,
        borderWidth: 0,
        borderColor: COLORS.transparent,
    }
}

export const createText = (mouseDown: PointType): TextFigureType => {
    return {
        id: uuid(),
        typeFigure: Figures.TEXT,
        isSelected: false,
        x: mouseDown.x,
        y: mouseDown.y,
        text: 'Hello'
    }
}


type checkTypeActionAction = {
    isSelection: boolean, isDrawGrid: boolean,
    figure: TypesFigureType | null
}
export const checkTypeActionForCursor = ({isSelection, isDrawGrid, figure}: checkTypeActionAction) => {

    const container = document.getElementById('section_container');

    if (container) {
        typeCursorSelectArea(container, isSelection);
        typeCursorDraw(container, isDrawGrid, figure !== null);
    }
}

export const typeCursorSelectArea = (container: HTMLElement, isSelection: boolean) => {

    isSelection
        ? container.classList.add('cursor-selection')
        : container.classList.remove('cursor-selection');
}

export const typeCursorDraw = (container: HTMLElement, isDrawGrid: boolean, isFigure: boolean) => {
    if (isDrawGrid || isFigure) {
        container.classList.add('cursor-draw-grid')
    } else {
        container.classList.remove('cursor-draw-grid');
    }
}

export const checkNameFigureForNumber = (name: string | undefined) => {

    const valueNames = Object.values(NamesForUpdate);

    return valueNames.some(el => el === name);
}

export const checkSizeInterval = (places: PlaceType[]) => {

    let placeOne: PlaceType | null = null;
    let placeVert: PlaceType | null = null;
    let placeHor: PlaceType | null = null;

    places.forEach(place => {
        if (place.numCol === 1 && place.numRow === 1) {
            placeOne = place
        }
        if (place.numCol === 1 && place.numRow === 2) {
            placeVert = place;
        }
        if (place.numCol === 2 && place.numRow === 1) {
            placeHor = place;
        }
    })
    if (placeOne && placeVert && placeHor) {
        //@ts-ignore todo
        return {horizontal: placeHor.x - placeOne.x - SIZE_CIRCLE, vertical: placeVert.y - placeOne.y - SIZE_CIRCLE}
    }
    return {horizontal: SIZE_IDENT_CIRCLE, vertical: SIZE_IDENT_CIRCLE}
}

export const createArraysPointRegion = (start: PointType, end: PointType) => {

    const pointsX: number[] = [];
    const pointsY: number[] = [];

    if (start.x < end.x) {

        for (let x = start.x; x <= end.x; x++) {
            pointsX.push(x);
        }
    } else {

        for (let x = end.x; x <= start.x; x++) {
            pointsX.push(x);
        }
    }

    if (start.y < end.y) {

        for (let y = start.y; y <= end.y; y++) {
            pointsY.push(y);
        }
    } else {

        for (let y = end.y; y <= start.y; y++) {
            pointsY.push(y);
        }
    }

    return {pointsX, pointsY}
}

export const checkMaxColumnOrRowInSector = (sector: PlaceType[], type: 'numRow' | 'numCol'): number => {

    let maxValue = 0;

    sector.forEach(place => {

        if (place[type] > maxValue) {
            maxValue = place.numCol;
        }
    })

    return maxValue;
}

export const cacheMiddleColumnPlace = (sector: PlaceType[], numCol: number) => {

    const columns: { [key: string]: PlaceType } = {}

    sector.forEach(place => {

        if (place.numCol === numCol) {

            columns[place.numRow] = place;
        }
    })

    return columns;
}

export const searchCenterCircle = (sectorPlaces: PlaceType[], maxCol: number): { [key: string]: PointType } => {

    let centerCircle: { [key: string]: PointType } = {};
    let startPlaceRows: { [key: string]: PlaceType } = {};

    sectorPlaces.forEach(place => {

        if (place.numCol === 1) {
            startPlaceRows[place.numRow] = place;
        }
        if (place.numCol === maxCol) {
            centerCircle[place.numRow] = {x: (place.x + startPlaceRows[place.numRow].x) / 2, y: place.y}
        }
    })

    return centerCircle;
}


type SideTriangleType = { hypotenuse: number, katetA: number, katetB: number }
export const calcSidesTriangle = (centerCircle: PointType, place: PlaceType, corner: number): SideTriangleType => {

    const RADIAN = 0.0174533;

    const hypotenuse = Math.abs(centerCircle.x - place.x);//radius
    const katetB = hypotenuse * Math.abs(Math.sin(corner * RADIAN));
    const katetA = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(katetB, 2));

    return {hypotenuse, katetA: +katetA.toFixed(2), katetB: +katetB.toFixed(2)}
}

export const changeCurveForPlace = (placeOld: PlaceType, curve: number, middle: number[], triangle: SideTriangleType, centerPlaces: { [key: string]: PointType }): PlaceType => {

    let place = {...placeOld};

    if (curve >= 0) {

        if (place.numCol < middle[0]) {

            place.x = centerPlaces[place.numRow].x - triangle.katetA;
            place.y = centerPlaces[place.numRow].y - triangle.katetB;

        } else if (middle[1] && place.numCol > middle[1]) {

            place.x = centerPlaces[place.numRow].x + triangle.katetA;
            place.y = centerPlaces[place.numRow].y - triangle.katetB;

        } else if (!middle[1] && place.numCol > middle[0]) {

            place.x = centerPlaces[place.numRow].x + triangle.katetA;
            place.y = centerPlaces[place.numRow].y - triangle.katetB;
        }
    } else {

        if (place.numCol < middle[0]) {

            place.x = centerPlaces[place.numRow].x - triangle.katetA;
            place.y = centerPlaces[place.numRow].y + triangle.katetB;

        } else if (middle[1] && place.numCol > middle[1]) {

            place.x = centerPlaces[place.numRow].x + triangle.katetA;
            place.y = centerPlaces[place.numRow].y + triangle.katetB;

        } else if (!middle[1] && place.numCol > middle[0]) {

            place.x = centerPlaces[place.numRow].x + triangle.katetA;
            place.y = centerPlaces[place.numRow].y + triangle.katetB;
        }
    }

    return place;
}

export const changeSizeIntervalPlaces = (places: PlaceType[], sizeInterval: number, radius: number, col_row: 'numCol' | 'numRow', x_y: 'x' | 'y') => {

    let start = 0;

    return places.map(place => {

        if (place[col_row] === 1) {
            start = place[x_y] - radius;
        } else {
            place[x_y] = start + ((place[col_row] - 1) * sizeInterval) + radius;
        }

        return place;
    })
}

export const onChangeInput = (e: ChangeEvent<HTMLInputElement>, callback: (value: number, name: string,) => void) => {

    let value: string | number = e.target.value;
    const name = e.target.name;

    if (checkNameFigureForNumber(name)) {
        value = +value;
        if (name === 'cornerRadius' && value < 0) {
            value = 0;
        }
    }

   callback(value as number, name);
}

export const changeRotationSector = (place: PlaceType, corner: number, middle: number[], triangle: SideTriangleType, centerPlaces: { [key: string]: PointType }): PlaceType => {

    if (corner > 0) {

    }

    return place
}