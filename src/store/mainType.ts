
export type PointType = {
    x: number,
    y: number,
}

export enum Figures {
    "RECT"= 1,
    "ELLIPSE",
    "TEXT"
}

export type TypesFigureType = typeof Figures.RECT | typeof Figures.ELLIPSE | typeof Figures.TEXT
export type MainParamFigureType = {
    id: string,
    typeFigure: TypesFigureType,
    isSelected: boolean
}

export type RectFigureType = PointType & MainParamFigureType & {
    w: number,
    h: number,
    bgColor:string
    borderWidth:number,
    borderColor: string
}

export type EllipseFigureType = PointType & MainParamFigureType & {
    radiusX: number,
    radiusY: number,
}

export type TextFigureType = PointType & MainParamFigureType &{
    text: string,
}

export type GeneralFigureType = RectFigureType | EllipseFigureType | TextFigureType