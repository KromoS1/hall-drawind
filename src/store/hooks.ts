import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type AppDispatchType = ThunkDispatch<RootState, void, AnyAction>

export const useAppSelector = <T>() => useSelector<RootState,T>;
export const useAppDispatch = () => useDispatch<AppDispatchType>();