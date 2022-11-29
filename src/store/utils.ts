import {TypesFigureType} from "./mainType";

type checkTypeActionAction = {
    isSelection: boolean, isDrawGrid: boolean,
    figure: TypesFigureType | null
}
export const checkTypeActionForCursor = ({isSelection, isDrawGrid, figure}: checkTypeActionAction) => {

    const container = document.getElementById('section_container');

    if (container) {
        typeCursorSelectArea(container, isSelection);
        typeCursorDraw(container, isDrawGrid, figure !== null);
    }
}

const typeCursorSelectArea = (container: HTMLElement, isSelection: boolean) => {

    isSelection
        ? container.classList.add('cursor-selection')
        : container.classList.remove('cursor-selection');
}

const typeCursorDraw = (container: HTMLElement, isDrawGrid: boolean, isFigure: boolean) => {
    if (isDrawGrid || isFigure) {
        container.classList.add('cursor-draw-grid')
    } else {
        container.classList.remove('cursor-draw-grid');
    }
}


export const addScript = function (url: string, callback: Function) {

    const u = url.split('/');
    const id = u[u.length - 1];
    const el = document.getElementById(id);

    if (!document.getElementById(id)) {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = url;
        el.id = id;
        document.getElementsByTagName('head')[0].appendChild(el);
        if (typeof callback == 'function') {
            //@ts-ignore
            el.onload = callback;
        }

    } else {
        if (typeof callback == 'function') {
            callback();
        }
    }

}

export const addCSS = function (url: string, callback: Function) {

    const u = url.split('/');
    const id = u[u.length - 1];
    const el = document.getElementById(id);

    if (!document.getElementById(id)) {
        const el = document.createElement("link");
        el.type = "text/css";
        el.rel = "stylesheet";
        el.href = url;
        el.id = id;
        document.getElementsByTagName("head")[0].appendChild(el);
        if (typeof callback == 'function') {
            //@ts-ignore
            el.onload = callback;
        }

    } else {
        if (typeof callback == 'function') {
            callback();
        }
    }
}