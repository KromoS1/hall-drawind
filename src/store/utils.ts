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

const typeCursorSelectArea = (container: HTMLElement, isSelection: boolean) => {

    isSelection
        ? container.classList.add('cursor-selection')
        : container.classList.remove('cursor-selection');
}

const typeCursorDraw = (container: HTMLElement, isDrawGrid: boolean, isFigure: boolean) => {
    if (isDrawGrid || isFigure) {
        container.classList.add('cursor-draw-grid')
    } else {
        container.classList.remove('cursor-draw-grid');
    }
}


export const addScript = function (url: string, callback: Function) {

    const u = url.split('/');
    const id = u[u.length - 1];
    const el = document.getElementById(id);

    if (!document.getElementById(id)) {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = url;
        el.id = id;
        document.getElementsByTagName('head')[0].appendChild(el);
        if (typeof callback == 'function') {
            //@ts-ignore
            el.onload = callback;
        }

    } else {
        if (typeof callback == 'function') {
            callback();
        }
    }

}

export const addCSS = function (url: string, callback: Function) {

    const u = url.split('/');
    const id = u[u.length - 1];
    const el = document.getElementById(id);

    if (!document.getElementById(id)) {
        const el = document.createElement("link");
        el.type = "text/css";
        el.rel = "stylesheet";
        el.href = url;
        el.id = id;
        document.getElementsByTagName("head")[0].appendChild(el);
        if (typeof callback == 'function') {
            //@ts-ignore
            el.onload = callback;
        }

    } else {
        if (typeof callback == 'function') {
            callback();
        }
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
