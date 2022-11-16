import selectionAreaReducer, {
    SelectionAreaReducerType,
    setCountCirclesDraw,
    setIsDrawGrid,
    setIsSelection
} from "../reducers/selectionAreaReducer";

let selectionState: SelectionAreaReducerType;

beforeEach(() => {
    selectionState = {
        isSelection: false,
        isDrawGrid: false,
        countCirclesDraw: {
            countX: 0,
            countY: 0
        }
    }
});

test('set selection isSelection',() => {

    const endState = selectionAreaReducer(selectionState, setIsSelection({isSelection: true}));

    expect(endState.isSelection).toBe(true);
});

test('set selection isDrawGrid',() => {

    const endState = selectionAreaReducer(selectionState, setIsDrawGrid({isDrawGrid: true}));

    expect(endState.isDrawGrid).toBe(true);
});

test('set selection countCirclesDraw',() => {

    const endState = selectionAreaReducer(selectionState, setCountCirclesDraw({countX: 100, countY: 100}));

    expect(endState.countCirclesDraw.countX).toBe(100);
    expect(endState.countCirclesDraw.countY).toBe(100);
});