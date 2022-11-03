import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

type eventMouse = 'move' | 'mouseDown' | 'mouseUp'

type SubscribersType = {
    move: Function[],
    mouseDown: Function[],
    mouseUp: Function[],
}

let subscribers:SubscribersType = {
    'move': [],
    'mouseDown': [],
    'mouseUp': []
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

function subscribeEventMouse(eventName:eventMouse, callback: Function) {
    subscribers[eventName].push(callback)
}

function removeSubscriber(eventName: eventMouse,callback: Function){
    subscribers[eventName] = subscribers[eventName].filter(cb => cb !== callback);
}

function cleanSubscribers(eventName: eventMouse) {
    subscribers[eventName] = [];
}

export const observerMouse = {
    move, mouseDown, mouseUp, subscribeEventMouse, removeSubscriber, cleanSubscribers
}
