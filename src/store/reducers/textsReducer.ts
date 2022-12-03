import {TextFigureType} from "../mainType";
import {createSlice} from "@reduxjs/toolkit";

const initialState: TextFigureType[] = []

const slice = createSlice({
    name:'texts',
    initialState,
    reducers:{

    }
})

export default slice.reducer;