import {
    otherFigureReducerForTest,
    OtherFigureReducerType,
    setFigure,
    setFigureDraw
} from "../reducers/otherFigureReducer";
import {EllipseFigureType, Figures, RectFigureType, TextFigureType} from "../mainType";
import uuid from "react-uuid";


let initState: OtherFigureReducerType;

beforeEach(() => {
    initState = {
        drawFigure: null,
        figures: {
            rect: [],
            ellipses: [],
            text: []
        }
    }
})

test('set rect', () => {

    const rect: RectFigureType = {
        id: uuid(),
        typeFigure: Figures.RECT,
        isSelected: false,
        x: 10,
        y: 10,
        w: 100,
        h: 100,
        bgColor:'gray',
        borderWidth: 0,
        borderColor:'transparent'
    }

    const endState = otherFigureReducerForTest(initState, setFigure({figure: rect}));
    expect(endState.figures.rect[0].x).toBe(10);
    expect(endState.figures.rect[0].y).toBe(10);
    expect(endState.figures.rect[0].typeFigure).toBe(Figures.RECT);
})

test('set ellipse', () => {

    const ellipse: EllipseFigureType = {
        id: uuid(),
        typeFigure: Figures.ELLIPSE,
        isSelected: false,
        x: 10,
        y: 10,
        radiusX: 20,
        radiusY: 30,
    }

    const endState = otherFigureReducerForTest(initState, setFigure({figure: ellipse}));
    expect(endState.figures.ellipses[0].x).toBe(10);
    expect(endState.figures.ellipses[0].radiusY).toBe(30);
    expect(endState.figures.ellipses[0].radiusX).toBe(20);
    expect(endState.figures.ellipses[0].typeFigure).toBe(Figures.ELLIPSE);
})

test('set text', () => {

    const text: TextFigureType = {
        id: uuid(),
        typeFigure: Figures.TEXT,
        isSelected: false,
        x: 20,
        y: 25,
        text: 'Hello'
    }

    const endState = otherFigureReducerForTest(initState, setFigure({figure: text}));
    expect(endState.figures.text[0].x).toBe(20);
    expect(endState.figures.text[0].y).toBe(25);
    expect(endState.figures.text[0].text).toBe('Hello');
    expect(endState.figures.text[0].typeFigure).toBe(Figures.TEXT);
})

test('set type rect select', () => {
    const stateRect = otherFigureReducerForTest(initState, setFigureDraw({typeFigure: Figures.RECT }));
    expect(stateRect.drawFigure).toBe(Figures.RECT);
})
test('set type ellipse select', () => {
    const stateEllipse = otherFigureReducerForTest(initState, setFigureDraw({typeFigure: Figures.ELLIPSE }));
    expect(stateEllipse.drawFigure).toBe(Figures.ELLIPSE);
})
test('set type text select', () => {
    const stateText = otherFigureReducerForTest(initState, setFigureDraw({typeFigure: Figures.TEXT }));
    expect(stateText.drawFigure).toBe(Figures.TEXT);
})
test('set type null select', () => {
    const stateNull = otherFigureReducerForTest(initState, setFigureDraw({typeFigure: null }));
    expect(stateNull.drawFigure).toBe(null);
})
