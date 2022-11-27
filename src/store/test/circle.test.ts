import circlesReducer, {
    CircleGroupReducerType,
    CirclesType,
    removeAllCircles,
    setCircle,
    setCircleGroup
} from "../reducers/circlesGroupReducer";
import uuid from "react-uuid";

let circleState: CircleGroupReducerType;

const createCircleArr = (count: number) => {

    let result = [];

    for (let i = 0; i < count; i++) {
        const id = uuid();

        const circle: CirclesType = {
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

test('set all groups', () => {

    const groups = createGroups();

    const endState = circlesReducer(circleState, setCircle({groups}));

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

test('set new group circle', () => {

    const circles = createCircleArr(10);
    const idGroup = uuid();

    const endState = circlesReducer(circleState, setCircleGroup({idGroup,circles}));

    const keysLayer = Object.keys(endState);
    const keysGroup = Object.keys(endState[keysLayer[0]]);
    const keysCircle = Object.keys(endState[keysLayer[0]][keysGroup[0]]);

    expect(keysLayer.length).toBe(1);
    expect(keysGroup.length).toBe(1);
    expect(keysCircle.length).toBe(10);
});

test('set toggleSelect', () => {

    // const circles = createCircleArr();
    // const idGroup = uuid();
    //
    // const middleState = circlesReducer(circleState, setCircleGroup({idGroup,circles}));
    //
    // const keysGroup = Object.keys(middleState);
    // const keysCircle = Object.keys(middleState[keysGroup[0]]);
    //
    // keysCircle.forEach(key => {
    //
    //     const endState = circlesReducer(middleState, toggleSelect({idGroup,idCircle: key, value: true}));
    //
    //     expect(endState[idGroup][key].isSelected).toBe(true);
    // })
});

test('set remove all circles', () => {

    const circles = createCircleArr(10);
    const idGroup = uuid();

    const middleState = circlesReducer(circleState, setCircleGroup({idGroup,circles}));

    const endState = circlesReducer(middleState, removeAllCircles())

    const keys = Object.keys(endState);

    expect(keys.length).toBe(0);
});