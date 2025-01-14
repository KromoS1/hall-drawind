import {SectorsReducerType, SectorsPlacesType} from "../reducers/sectorsReducer";
import uuid from "react-uuid";

const MAX_LAYER_SIZE = 1500;

const createNewLayer = (newGroup: SectorsPlacesType) => {
    return {
        [uuid()]: newGroup
    }
}

export const calculateLayers = (layers: SectorsReducerType, newGroup: SectorsPlacesType): SectorsReducerType => {

    const keysLayers = Object.keys(layers);
    let result = {};

    if (keysLayers.length === 0) {

        return createNewLayer(newGroup);
    }

    for (let i = 0; i < keysLayers.length; i++) {

        let countCircleInLayer = 0;
        const keysGroups = Object.keys(layers[keysLayers[i]]);

        keysGroups.forEach(idGroup => {
            countCircleInLayer += Object.keys(layers[keysLayers[i]][idGroup]).length;
        })

        result = {
            ...result,
            [keysLayers[i]]: {
                ...layers[keysLayers[i]],
            }
        }

        if (keysLayers.length === i + 1) {

            countCircleInLayer += Object.values(newGroup)[0].places.length;
            const newGroupKV = Object.entries(newGroup);

            if (countCircleInLayer < MAX_LAYER_SIZE) {
                result = {
                    ...result,
                    [keysLayers[i]]: {
                        ...layers[keysLayers[i]],
                        [newGroupKV[0][0]]: newGroupKV[0][1]
                    }
                }
            } else {

                result = {
                    ...result,
                    ...createNewLayer(newGroup),
                }
            }
        }
    }

    return result;
}

export const calculateLayerForAllGroups = (groups: SectorsPlacesType) => {

    const keysGroup = Object.keys(groups);
    let layerResult:SectorsReducerType = {}

    keysGroup.forEach(key => {
        layerResult = calculateLayers(layerResult,{[key]: groups[key]})
    })

    return layerResult;
}