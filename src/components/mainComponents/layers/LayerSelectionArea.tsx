import React, {memo} from "react";
import {SelectionAreaContainer} from "../../selectionArea/SelectionAreaContainer";
import {Layer} from "react-konva";


export const LayerSelectionArea = memo(() => {
    console.log('LayerSelectionArea')
    return (
        <Layer id={'layer_selection_area'}>
            <SelectionAreaContainer/>
        </Layer>
    )
})