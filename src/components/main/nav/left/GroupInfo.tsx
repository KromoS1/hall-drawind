import {FC, memo} from "react";
import {listInfoReducerType} from "../../../../store/reducers/listInfoReducer";

export const GroupInfo: FC<listInfoReducerType> = memo(({idGroup, name, count}) => {

    return (
        <div style={{display: 'flex',marginBottom:'1rem'}}>
            <span>{name} ({count})</span>
        </div>
    )
})