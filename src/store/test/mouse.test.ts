import mouseReducer, {
    MouseReducerType,
    setMousePointDown,
    setMousePointUp,
    setMousePosition, setValueDown
} from "../reducers/mouseReducer";

let mouseState: MouseReducerType;

beforeEach(() => {
    mouseState = {
       move: {x: 0,y: 0},
       mouseDown: {x: 0,y: 0},
       mouseUp: {x: 0,y: 0},
       isDown: false,
    }
});

test('set mouse move',() => {

    const endState = mouseReducer(mouseState, setMousePosition({x: 100, y: 100}));

    expect(endState.move.x).toBe(100);
    expect(endState.move.y).toBe(100);
});

test('set mouse down',() => {

    const endState = mouseReducer(mouseState, setMousePointDown({x: 100, y: 100}));

    expect(endState.mouseDown.x).toBe(100);
    expect(endState.mouseDown.y).toBe(100);
});

test('set mouse up',() => {

    const endState = mouseReducer(mouseState, setMousePointUp({x: 100, y: 100}));

    expect(endState.mouseUp.x).toBe(100);
    expect(endState.mouseUp.y).toBe(100);
});

test('set mouse isDown',() => {

    const endState = mouseReducer(mouseState, setValueDown({isDown: true}));

    expect(endState.isDown).toBe(true);
});