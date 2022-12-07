import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {MouseReducerType} from "../../../store/reducers/mouseReducer";
import {Box} from "@material-ui/core";

//todo потом удалить
export const ShowCoordinate = memo(() => {

    const {move, mouseDown, mouseUp} = useSelector<RootState, MouseReducerType>(state => state.mouse);

    return (
        <Box sx={{display:'flex'}}>
            <div style={{marginRight:'1rem'}}>Mouse: {move?.x.toFixed(2)}:{move?.y.toFixed(2)}</div>
            <div style={{marginRight:'1rem'}}>Mouse Down: {mouseDown.x.toFixed(2)}:{mouseDown.y.toFixed(2)}</div>
            <div style={{marginRight:'1rem'}}>Mouse Up: {mouseUp.x.toFixed(2)}:{mouseUp.y.toFixed(2)}</div>
        </Box>
    )
})