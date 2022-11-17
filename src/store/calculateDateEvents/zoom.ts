import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

const SCALE = 1.05;

export const zoomStage = (e:KonvaEventObject<WheelEvent>) => {

    e.evt.preventDefault();

    const stage = e.currentTarget;
    const oldScale = stage.scaleX();

    const center =  {
        x: stage.width() / 2,
        y: stage.height() / 2
    }

    let mousePointTo = {
        x: (center.x - stage.x()) / oldScale,
        y: (center.y - stage.y()) / oldScale,
    };

    let direction = e.evt.deltaY > 0 ? -1 : 1;

    const newScale = direction > 0 ? oldScale * SCALE : oldScale / SCALE;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
        x: center.x - mousePointTo.x * newScale,
        y: center.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
}

export const moveStage = (e:KonvaEventObject<MouseEvent>) => {

    const stage = e.currentTarget;
    const oldScale = stage.scaleX();
    //@ts-ignore
    const pointer = stage.getPointerPosition();

    let mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    const newPos = {
        x: pointer.x - mousePointTo.x * oldScale,
        y: pointer.y - mousePointTo.y * oldScale,
    };

    stage.position(newPos);
    return newPos;
}