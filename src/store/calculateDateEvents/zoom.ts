import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import {PointType} from "../mainType";
import {StageReducerType} from "../reducers/stageReducer";

const SCALE = 1.05;

export const zoomStage = (e:KonvaEventObject<MouseEvent>) => {

    e.evt.preventDefault();

    let isZoom = true;
    const stage = e.currentTarget;

    const oldScale = stage.scaleX();
    //@ts-ignore
    const pointer =  stage.getPointerPosition();

    let mousePointTo = {
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

export const moveStage = (e:KonvaEventObject<MouseEvent>) => {

    const stage = e.currentTarget;
    const oldScale = stage.scaleX();
    //@ts-ignore
    const pointer =  stage.getPointerPosition();

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

export const checkStage = (isZoom: boolean, isMove:boolean, mousePos: PointType, stagePosZoom:PointType, stagePosMove:PointType,  scale: number)  => {

    if (isZoom && isMove) {
        console.log(mousePos,'mouse');
        console.log(stagePosZoom,'stagePosZoom');
        console.log(stagePosMove,'stagePosMove');
        console.log(scale,'scale')
        const x = +((((mousePos.x - stagePosZoom.x) / scale) + ((mousePos.x - stagePosMove.x) / scale)) * scale).toFixed(2);
        const y = +((((mousePos.y - stagePosZoom.y) / scale) + ((mousePos.y - stagePosMove.y) / scale)) * scale).toFixed(2);

        return {
            x,y
        }
    }else if (isZoom) {
        return {
            x: +((mousePos.x - stagePosZoom.x) / scale).toFixed(2),
            y: +((mousePos.y - stagePosZoom.y) / scale).toFixed(2)
        }
    }else if (isMove){
        return {
            x: mousePos.x - stagePosMove.x,
            y: mousePos.y - stagePosMove.y
        }
    }else{
        return {
            x: mousePos.x,
            y: mousePos.y
        }
    }
}