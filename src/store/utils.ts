
type checkTypeActionAction = {
    isSelection:boolean, isDrawGrid:boolean
}
export const checkTypeActionForCursor = ({ isSelection, isDrawGrid}:checkTypeActionAction) => {

    const container = document.getElementById('section_container');

    if (container){
        typeCursorSelectArea(container, isSelection)
        typeCursorGrid(container, isDrawGrid)
    }
}

const typeCursorSelectArea = (container: HTMLElement, isSelection:boolean) => {

    isSelection
        ? container.classList.add('cursor-selection')
        : container.classList.remove('cursor-selection');
}

const typeCursorGrid = (container: HTMLElement, isDrawGrid:boolean) => {

    isDrawGrid
        ? container.classList.add('cursor-draw-grid')
        : container.classList.remove('cursor-draw-grid');
}


export const addScript = function(url: string, callback: Function  ) {

    const u = url.split('/');
    const id = u[u.length-1];
    const el = document.getElementById(id);

    if(!document.getElementById(id)) {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = url;
        el.id = id;
        document.getElementsByTagName('head')[0].appendChild(el);
        //@ts-ignore
        if(typeof callback == 'function') { el.onload = callback; }

    } else {
        if(typeof callback == 'function') { callback(); }
    }

}

export const addCSS = function(url: string, callback: Function) {

    const u = url.split('/');
    const id = u[u.length-1];
    const el = document.getElementById(id);

    if(!document.getElementById(id)) {
        const el = document.createElement("link");
        el.type = "text/css";
        el.rel = "stylesheet";
        el.href = url;
        el.id = id;
        document.getElementsByTagName("head")[0].appendChild(el);
        //@ts-ignore
        if(typeof callback == 'function') { el.onload = callback; }

    } else {
        if(typeof callback == 'function') { callback(); }
    }
}