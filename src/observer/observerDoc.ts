
type EventDocType = 'ctrlKeyDown' | 'ctrlKeyUp'

type SubscribersType = {
    ctrlKeyDown: Function[]
    ctrlKeyUp:Function[]
}

let subscribers:SubscribersType = {
    ctrlKeyDown: [],
    ctrlKeyUp: []
}

function ctrlKeyDown (e:KeyboardEvent) {
    subscribers.ctrlKeyDown.forEach(s => s(e));
}

function ctrlKeyUp (e: KeyboardEvent) {
    subscribers.ctrlKeyUp.forEach(s => s(e));
}


function subscribeEventDoc(eventName:EventDocType, callback: Function) {
    subscribers[eventName].push(callback)
}

export const observerDoc = {
    ctrlKeyDown, ctrlKeyUp, subscribeEventDoc
}