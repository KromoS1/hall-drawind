import {RootState} from "../store";
import {createSelector} from "reselect";

const circles = (state: RootState) => state.circles;

export const getCircle = (id:string, state:RootState) => {

    return createSelector(circles, items => {
        return items[id];
    })(state)
}