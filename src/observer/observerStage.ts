import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

type eventMouse = 'click' | 'move' | 'mouseDown' | 'mouseUp' | 'wheel';

type SubscribersType = {
    click: Function[],
    move: Function[],
    mouseDown: Function[],
    mouseUp: Function[],
    wheel: Function[],
}

let subscribers: SubscribersType = {
    'click': [],
    'move': [],
    'mouseDown': [],
    'mouseUp': [],
    'wheel': [],
}

function executorStage(e: KonvaEventObject<MouseEvent>, eventName: eventMouse) {
    subscribers[eventName].forEach(s => s(e));
}

function subscribeEventStage(eventName: eventMouse, callback: Function) {
    subscribers[eventName].push(callback)
}

function removeSubscriber(eventName: eventMouse, callback: Function) {
    subscribers[eventName] = subscribers[eventName].filter(cb => cb !== callback);
}

function cleanSubscribersAll() {
    subscribers['move'] = [];
    subscribers['mouseDown'] = [];
    subscribers['mouseUp'] = [];
    subscribers['wheel'] = [];
}

export const observerStage = {
    executorStage,
    subscribeEventStage,
    removeSubscriber,
    cleanSubscribersAll
}
