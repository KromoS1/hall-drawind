import {FC, memo} from "react";
import {listInfoReducerType} from "../../../../store/reducers/listInfoReducer";



export const GroupInfo: FC<listInfoReducerType> = memo(({idGroup ,name, count}) => {

    return (
        <div className={'d-flex'}>
            <span>{name} ({count})</span>
        </div>
    )
})