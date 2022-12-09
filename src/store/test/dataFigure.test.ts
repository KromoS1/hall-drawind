import dataFigureReducer, {DataFigureReducerType, setFigureDraw} from "../reducers/dataFigureReducer";
import {createRect} from "../utils";
import {Figures} from "../mainType";

let initState: DataFigureReducerType;

beforeEach(() => {
    initState = {
        drawFigure: null,
        idSelectFigure: '',
        typeFigureSelected: null,
    }
})

test('toggle figure for change',() => {

    const rect = createRect({x:0,y:0},{x:100,y:100});

    // const endState = dataFigureReducer(initState,toggleSelectFigure({figure:rect}));
    //
    // expect(endState.idSelectFigure).toBe(rect.id);
    // expect(endState.typeFigureSelected).toBe(rect.typeFigure);
    // expect(endState.changeFigure?.id).toBe(rect.id);
})

test('change data selected figure', () => {

    const rect = createRect({x:0,y:0},{x:100,y:100});
    // const middleState = dataFigureReducer(initState,toggleSelectFigure({figure:rect}));
    //
    // rect.x = 200;
    // rect.y = 200;
    //
    // const endState = dataFigureReducer(middleState,changeDataFigure({figure:rect}));
    //
    // expect(endState.changeFigure?.x).toBe(200);
    // expect(endState.changeFigure?.y).toBe(200);
})

test('set how figure draw', () => {

    const endState = dataFigureReducer(initState,setFigureDraw({typeFigure:Figures.RECT}));

    expect(endState.drawFigure).toBe(Figures.RECT);

})

test('remove data state', () => {

    const rect = createRect({x:0,y:0},{x:100,y:100});
    // const middleState = dataFigureReducer(initState,toggleSelectFigure({figure:rect}));
    //
    // const endState = dataFigureReducer(middleState,offSelectFigure());
    //
    // expect(endState.changeFigure).toBe(null);
    // expect(endState.typeFigureSelected).toBe(null);
    // expect(endState.idSelectFigure).toBe('');
})
