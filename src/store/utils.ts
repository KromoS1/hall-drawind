
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