import {
    SectorsReducerType,
    PlaceType,
    removeAllCircles,
    setCircle,
    setCircleSector, sectorsReducerForTest, toggleSelectPlace
} from "../reducers/sectorsReducer";
import uuid from "react-uuid";

let circleState: SectorsReducerType;

const createCircleArr = (count: number) => {

    let result = [];

    for (let i = 0; i < count; i++) {
        const id = uuid();

        const circle: PlaceType = {
            id,
            x: i,
            y: i,
            numCol: i,
            numRow: i,
            isSelected: false,
            isDraggable: false
        }

        result.push(circle)
    }

    return result
}

const createGroups = () => {

    let result = {};

    for (let i = 0; i < 100; i++){
        const idGroup = uuid();

        result = {
            ...result,
            [idGroup]: createCircleArr(i)
        }
    }

    return result
}

beforeEach(() => {
    circleState = {};
});

test('set all sectors', () => {

    const groups = createGroups();

    const endState = sectorsReducerForTest(circleState, setCircle({groups}));

    const keysLayer = Object.keys(endState);
    const keysGroupFirst = Object.keys(endState[keysLayer[0]]);
    const keysGroupLast = Object.keys(endState[keysLayer[keysLayer.length - 1]]);
    const keysCircleFirst = Object.keys(endState[keysLayer[0]][keysGroupFirst[0]]);
    const keysCircleLast = Object.keys(endState[keysLayer[keysLayer.length - 1]][keysGroupLast[keysGroupLast.length - 1]]);

    expect(keysLayer.length).toBe(4);
    expect(keysGroupFirst.length).toBe(55);
    expect(keysGroupLast.length).toBe(6);
    expect(keysCircleFirst.length).toBe(0);
    expect(keysCircleLast.length).toBe(99);
})

test('set new sector', () => {

    const circles = createCircleArr(10);
    const idGroup = uuid();

    const endState = sectorsReducerForTest(circleState, setCircleSector({idGroup,circles}));

    const keysLayer = Object.keys(endState);
    const keysGroup = Object.keys(endState[keysLayer[0]]);
    const keysCircle = Object.keys(endState[keysLayer[0]][keysGroup[0]]);

    expect(keysLayer.length).toBe(1);
    expect(keysGroup.length).toBe(1);
    expect(keysCircle.length).toBe(10);
});

test('set toggleSelect', () => {

    const circles = createCircleArr(10);
    const idGroup = uuid();

    const middleState = sectorsReducerForTest(circleState, setCircleSector({idGroup,circles}));

    const keysLayer = Object.keys(middleState);

    const idPlace = middleState[keysLayer[0]][idGroup][0].id;

    const endState = sectorsReducerForTest(middleState, toggleSelectPlace({idLayer:keysLayer[0], idGroup, idPlace, value: true}));
    expect(endState[keysLayer[0]][idGroup][0].isSelected).toBe(true);
});

test('set remove all sectors', () => {

    const circles = createCircleArr(10);
    const idGroup = uuid();

    const middleState = sectorsReducerForTest(circleState, setCircleSector({idGroup,circles}));

    const endState = sectorsReducerForTest(middleState, removeAllCircles())

    const keys = Object.keys(endState);

    expect(keys.length).toBe(0);
});