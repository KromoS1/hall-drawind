import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

type eventMouse = 'click' | 'move' | 'mouseDown' | 'mouseUp' | 'wheel' | 'moveStage'

type SubscribersType = {
    click: Function[],
    move: Function[],
    mouseDown: Function[],
    mouseUp: Function[],
    wheel: Function[]
    moveStage: Function[]
}

let subscribers: SubscribersType = {
    'click': [],
    'move': [],
    'mouseDown': [],
    'mouseUp': [],
    'wheel': [],
    'moveStage': []
}

function click(e: KonvaEventObject<MouseEvent>) {
    subscribers.click.forEach(s => s(e))
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
    click,
    move,
    mouseDown,
    mouseUp,
    wheel,
    subscribeEventStage,
    removeSubscriber,
    moveStage,
    cleanSubscribersAll
}
