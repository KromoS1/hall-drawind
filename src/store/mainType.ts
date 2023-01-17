import {PlaceType} from "./reducers/sectorsReducer";

export type PointType = {
    x: number,
    y: number,
}

export enum Figures {
    "RECT" = 1,
    "ELLIPSE",
    "TEXT",
    "SECTOR"
}

export const NamesForUpdate = {
    x: 'x',
    y: 'x',
    w: 'w',
    h: 'h',
    rotation: 'rotation',
    cornerRadius: 'cornerRadius',
}

export type TypesFigureType = typeof Figures.RECT | typeof Figures.ELLIPSE | typeof Figures.TEXT | Figures.SECTOR

export type MainParamFigureType = {
    id: string,
    typeFigure: TypesFigureType,
    isSelected: boolean
}

export type RectFigureType = PointType & MainParamFigureType & {
    w: number,
    h: number,
    bgColor: string
    borderWidth: number,
    borderColor: string,
    rotation: number,
    cornerRadius: number
}

export type EllipseFigureType = PointType & MainParamFigureType & {
    radiusX: number,
    radiusY: number,
    bgColor: string
    borderWidth: number,
    borderColor: string,
}

export type TextFigureType = PointType & MainParamFigureType & {
    text: string,
}

export type GeneralFigureType = RectFigureType | EllipseFigureType | TextFigureType | PlaceType[]