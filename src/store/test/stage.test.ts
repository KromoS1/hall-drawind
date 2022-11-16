import stageReducer, {
    setDraggable,
    setIsZoom, setScale,
    setStageMove,
    setZoomPosition,
    StageReducerType
} from "../reducers/stageReducer";

let stageState: StageReducerType;

beforeEach(() => {
    stageState = {
        stagePositionZoom: {x: 0, y: 0},
        stagePositionMove: {x: 0, y: 0},
        draggable: false,
        isZoom: false,
        scale: 1,
    }
});

test('set stage move',() => {

    const endState = stageReducer(stageState, setStageMove({x: 100, y: 100}));

    expect(endState.stagePositionMove.x).toBe(100);
    expect(endState.stagePositionMove.y).toBe(100);
});

test('set stage zoom',() => {

    const endState = stageReducer(stageState, setZoomPosition({x: 100, y: 100}));

    expect(endState.stagePositionZoom.x).toBe(100);
    expect(endState.stagePositionZoom.y).toBe(100);
});

test('set stage draggable',() => {

    const endState = stageReducer(stageState, setDraggable({draggable: true}));

    expect(endState.draggable).toBe(true);
});

test('set stage isZoom',() => {

    const endState = stageReducer(stageState, setIsZoom({isZoom: true}));

    expect(endState.isZoom).toBe(true);
});

test('set stage scale',() => {

    const endStateOne = stageReducer(stageState, setScale({scale: 1.05}));
    const endStateTwo = stageReducer(stageState, setScale({scale: 0.95}));

    expect(endStateOne.scale).toBe(1.05);
    expect(endStateTwo.scale).toBe(0.95);
});


