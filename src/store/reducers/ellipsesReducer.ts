import {EllipseFigureType} from "../mainType";
import {createSlice} from "@reduxjs/toolkit";

const initialState: EllipseFigureType[] = []

const slice = createSlice({
    name:'ellipses',
    initialState,
    reducers:{

    }
})

export default slice.reducer;