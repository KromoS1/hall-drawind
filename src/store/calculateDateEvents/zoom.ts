import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

const SCALE = 1.05;

export const zoomStage = (e:KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();

    let isZoom = true;
    const stage = e.currentTarget;

    const oldScale = stage.scaleX();
    //@ts-ignore
    const pointer =  stage.getPointerPosition();

    const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    // @ts-ignore
    let direction = e.evt.deltaY > 0 ? -1 : 1;

    const newScale = direction > 0 ? oldScale * SCALE : oldScale / SCALE;

    if (newScale === 1){
        isZoom = false;
    }

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    return {pos:newPos, isZoom, scale: newScale};
}