import React, {memo} from 'react';
import {GroupInfo} from "./GroupInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {listInfoReducerType} from "../../../../store/reducers/listInfoReducer";
import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import {WIDTH_ASIDE} from "../../../../App";

export const LeftAside = memo(() => {

    const listInfoGroup = useSelector<RootState, listInfoReducerType[]>(state => state.listInfo.present);
    const styles = useStyles();

    return (
        <Box className={styles.root}>
            {listInfoGroup.map(el => <GroupInfo key={el.idGroup} idGroup={el.idGroup} name={el.name}
                                                count={el.count}/>)}
        </Box>
    )
})

const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            borderRight: '2px solid #e6e6e6',
            width: WIDTH_ASIDE,
            padding: '5px'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);