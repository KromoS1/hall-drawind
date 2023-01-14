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

function executorDoc(e: KeyboardEvent, eventName: EventDocType) {
    subscribers[eventName].forEach(s => s(e));
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
    executorDoc, subscribeEventDoc, cleanSubscribersAll, removeListener
}