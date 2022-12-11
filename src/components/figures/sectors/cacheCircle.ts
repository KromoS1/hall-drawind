import Konva from "konva";
import Stage = Konva.Stage;
import {PointType} from "../../../store/mainType";
import KonvaEventObject = Konva.KonvaEventObject;
import KonvaCircle= Konva.Circle;
import KonvaText= Konva.Text;

export type PlaceElementType = {
    positionPlace: PointType & { isDragging: boolean },
    isSelected: boolean,
    numCol: number,
    offset: PointType
    onDragStart: (e: KonvaEventObject<DragEvent>) => void,
    onDragEnd: (e: KonvaEventObject<DragEvent>) => void
}

export const SIZE_CIRCLE = 20;
export const SIZE_IDENT_CIRCLE = 5;

export let circleCache: KonvaCircle;
export let textCache: KonvaText;
const layerCache = new Konva.Layer();

export const cleanCircleCache = () => {
    circleCache.destroy();
    textCache.destroy();
}

export const addCacheElement = (stage: Stage) => {

    circleCache = new Konva.Circle({
        x: 10,
        y: 10,
        radius: SIZE_CIRCLE / 2,
        fill: '#fff',
        perfectDrawEnabled: false,
    })

    textCache = new Konva.Text({
        x: 10,
        y: 10,
        text: `1`,
        fontSize: 10,
        fill: '#fff',
    })

    layerCache.add(circleCache);
    layerCache.add(textCache);

    stage.add(layerCache);
    circleCache.cache();
    textCache.cache();

    cleanCircleCache();
}

export const cloningElement = (props: PlaceElementType) => {

    const cloneCircle = circleCache.clone({
        x: props.positionPlace.x,
        y: props.positionPlace.y,
        radius: SIZE_CIRCLE / 2,
        fill: props.isSelected ? '#ff4000' : '#dd4814',
        onDragStart: props.onDragStart,
        onDragEnd: props.onDragEnd,
    })

    const cloneText = textCache.clone({
        x: props.positionPlace.x,
        y: props.positionPlace.y,
        text: `${props.numCol}`,
        fontSize: 10,
        fill: '#fff',
        offset: props.offset,
    })
    cloneCircle.cache();
    cloneText.cache();

    return {cloneCircle, cloneText};
}