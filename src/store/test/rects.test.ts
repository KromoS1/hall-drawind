import {RectFigureType} from "../mainType";
import {createRect} from "../utils";
import {RectsReducerForTest, setRectFigure} from "../reducers/rectsReducer";


let state: RectFigureType[];

beforeEach(() => {
    state = []
})

test('set rect',() => {
    const rect = createRect({x: 0, y: 0},{x: 100, y: 100});

    const endState = RectsReducerForTest(state,setRectFigure({rect}));
    expect(endState.length).toBe(1);
})