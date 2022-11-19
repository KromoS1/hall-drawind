import circlesReducer, {
    CircleGroupReducerType,
    CirclesType,
    removeAllCircles,
    setCirclePosition,
    toggleSelect
} from "../reducers/circlesGroupReducer";
import uuid from "react-uuid";

let circleState: CircleGroupReducerType;

const createCirclesObj = () => {

    let result: CircleGroupReducerType = {};

    const idGroup = uuid();

    for (let i = 0; i < 100; i++) {
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

        result[idGroup][id] = circle;
    }
    return result;
}

const createCircleArr = () => {

    let result = [];

    for (let i = 0; i < 10; i++) {
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

beforeEach(() => {
    circleState = {};
});

test('set circles', () => {

    const circles = createCircleArr();
    const idGroup = uuid();

    const endState = circlesReducer(circleState, setCirclePosition({idGroup,circles}));

    const keys = Object.keys(endState);
    const keysCircle = Object.keys(endState[keys[0]]);

    expect(keys.length).toBe(1);
    expect(keysCircle.length).toBe(10);
});

test('set toggleSelect', () => {

    const circles = createCircleArr();
    const idGroup = uuid();

    const middleState = circlesReducer(circleState, setCirclePosition({idGroup,circles}));

    const keysGroup = Object.keys(middleState);
    const keysCircle = Object.keys(middleState[keysGroup[0]]);

    keysCircle.forEach(key => {
        const endState = circlesReducer(middleState, toggleSelect({idGroup,idCircle: key, value: true}));


        expect(endState[idGroup][key].isSelected).toBe(true);
    })
});

test('set remove all circles', () => {

    const circles = createCircleArr();
    const idGroup = uuid();

    const middleState = circlesReducer(circleState, setCirclePosition({idGroup,circles}));

    const endState = circlesReducer(middleState, removeAllCircles())

    const keys = Object.keys(endState);

    expect(keys.length).toBe(0);
});