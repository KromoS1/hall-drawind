type EventDocType = 'ctrlKeyDown' | 'ctrlKeyUp' | 'onkeydown'

type SubscribersType = {
    ctrlKeyDown: Function[]
    ctrlKeyUp: Function[]
    onkeydown: Function[]
}

let subscribers: SubscribersType = {
    ctrlKeyDown: [],
    ctrlKeyUp: [],
    onkeydown: []
}

function ctrlKeyDown(e: KeyboardEvent) {
    subscribers.ctrlKeyDown.forEach(s => s(e));
}

function ctrlKeyUp(e: KeyboardEvent) {
    subscribers.ctrlKeyUp.forEach(s => s(e));
}

function onkeydown(e:KeyboardEvent) {
    subscribers.onkeydown.forEach(s => s(e));
}

function subscribeEventDoc(eventName: EventDocType, callback: Function) {
    subscribers[eventName].push(callback)
}

function removeListener(eventName: EventDocType, callback: Function) {
    subscribers[eventName] = subscribers[eventName].filter(c => c !== callback)
}

function cleanSubscribersAll() {
    subscribers.ctrlKeyDown = [];
    subscribers.ctrlKeyUp = [];
}

export const observerDoc = {
    ctrlKeyDown, ctrlKeyUp, onkeydown, subscribeEventDoc, cleanSubscribersAll, removeListener
}