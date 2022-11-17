import selectionAreaReducer, {
    SelectionAreaReducerType,
    setIsDrawGrid,
    setIsSelection
} from "../reducers/selectionAreaReducer";

let selectionState: SelectionAreaReducerType;

beforeEach(() => {
    selectionState = {
        isSelection: false,
        isDrawGrid: false,
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
