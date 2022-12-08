type EventDocType = 'ctrlKeyDown' | 'ctrlKeyUp'

type SubscribersType = {
    ctrlKeyDown: Function[]
    ctrlKeyUp: Function[]
}

let subscribers: SubscribersType = {
    ctrlKeyDown: [],
    ctrlKeyUp: []
}

function ctrlKeyDown(e: KeyboardEvent) {
    subscribers.ctrlKeyDown.forEach(s => s(e));
}

function ctrlKeyUp(e: KeyboardEvent) {
    subscribers.ctrlKeyUp.forEach(s => s(e));
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
    ctrlKeyDown, ctrlKeyUp, subscribeEventDoc, cleanSubscribersAll, removeListener
}