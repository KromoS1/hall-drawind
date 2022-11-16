import circlesReducer, {
    CircleReducerType,
    CirclesType, removeAllCircles,
    setCirclePosition,
    toggleSelect
} from "../reducers/circlesReducer";
import uuid from "react-uuid";

let circleState: CircleReducerType;

const createCirclesObj = () => {

    let result: CircleReducerType = {};

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

        result[id] = circle;
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

    const endState = circlesReducer(circleState, setCirclePosition(circles));

    const keys = Object.keys(circles);

    keys.forEach(key => {
        expect(endState[key]).toBe(circleState[key]);
    })
});

test('set toggleSelect', () => {

    const circles = createCircleArr();

    const middleState = circlesReducer(circleState, setCirclePosition(circles));

    const keys = Object.keys(middleState);

    keys.forEach(key => {
        const endState = circlesReducer(middleState, toggleSelect({id: key, value: true}));


        expect(endState[key].isSelected).toBe(true);
    })
});

test('set remove all circles', () => {

    const circles = createCircleArr();

    const middleState = circlesReducer(circleState, setCirclePosition(circles));

    const endState = circlesReducer(middleState, removeAllCircles())

    const keys = Object.keys(endState);

    expect(keys.length).toBe(0);
});