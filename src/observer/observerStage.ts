import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

type eventMouse = 'move' | 'mouseDown' | 'mouseUp' | 'wheel' | 'moveStage'

type SubscribersType = {
    move: Function[],
    mouseDown: Function[],
    mouseUp: Function[],
    wheel: Function[]
    moveStage: Function[]
}

let subscribers: SubscribersType = {
    'move': [],
    'mouseDown': [],
    'mouseUp': [],
    'wheel': [],
    'moveStage': []
}

function move(e: KonvaEventObject<MouseEvent>) {
    subscribers.move.forEach(s => s(e))
}

function mouseDown(e: KonvaEventObject<MouseEvent>) {
    subscribers.mouseDown.forEach(s => s(e))
}

function mouseUp(e: KonvaEventObject<MouseEvent>) {
    subscribers.mouseUp.forEach(s => s(e))
}

function wheel(e: KonvaEventObject<WheelEvent>) {
    subscribers.wheel.forEach(s => s(e))
}

function moveStage(e: KonvaEventObject<MouseEvent>) {
    subscribers.moveStage.forEach(s => s(e))
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
    subscribers['moveStage'] = [];
}

export const observerStage = {
    move,
    mouseDown,
    mouseUp,
    wheel,
    subscribeEventStage,
    removeSubscriber,
    moveStage,
    cleanSubscribersAll
}
