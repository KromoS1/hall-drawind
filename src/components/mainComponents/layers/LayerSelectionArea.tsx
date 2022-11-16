import React, {memo} from "react";
import {SelectionAreaContainer} from "../../selectionArea/SelectionAreaContainer";
import {Layer} from "react-konva";
import {SelectionAreaGrid} from "../../selectionArea/SelectionAreaGrid";

export const LayerSelectionArea = memo(() => {
    console.log('LayerSelectionArea')
    return (
        <Layer id={'layer_selection_area'}>
            <SelectionAreaContainer/>
            <SelectionAreaGrid/>
        </Layer>
    )
})