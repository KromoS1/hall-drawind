import React, {memo} from 'react';
import {GroupInfo} from "./GroupInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {listInfoReducerType} from "../../../../store/reducers/listInfoReducer";

export const LeftAside = memo(() => {

    const listInfoGroup = useSelector<RootState,listInfoReducerType[]>(state => state.listInfo.present);

    return (
        <aside className={"aside-container"}>
            <div className={"aside-inner"}>
                <nav className={"sidebar p-1 pr-2"} data-sidebar-anyclick-close="">
                    {listInfoGroup.map(el => <GroupInfo key={el.idGroup} idGroup={el.idGroup} name={el.name} count={el.count}/>)}
                </nav>
            </div>
        </aside>
    )
})