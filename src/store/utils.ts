
type checkTypeActionAction = {
    draggable:boolean, isDown: boolean, isSelection:boolean, isDrawGrid:boolean
}
export const checkTypeActionForCursor = ({draggable, isDown, isSelection, isDrawGrid}:checkTypeActionAction) => {

    const container = document.getElementById('section_container');

    if (container){
        typeCursorMove(container, draggable, isDown);
        typeCursorSelectArea(container, isSelection)
        typeCursorGrid(container, isDrawGrid)
    }
}

const typeCursorMove  = (container: HTMLElement, draggable:boolean, isDown: boolean) => {

    draggable && isDown
        ? container.classList.add('cursor-move')
        : container.classList.remove('cursor-move');
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