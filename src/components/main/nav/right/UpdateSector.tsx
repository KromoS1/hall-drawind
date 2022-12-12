import {Box, createStyles, makeStyles, Slider, Theme} from "@material-ui/core";
import {ChangeEvent, FC, memo, useState} from "react";
import {calcSizeHorizontal, ChangeSectorType} from "../../../../store/reducers/changeSectorReducer";
import {SIZE_IDENT_CIRCLE} from "../../../figures/sectors/cacheCircle";
import {useDispatch} from "react-redux";

type PropsType = {
    sector: ChangeSectorType
}

export const UpdateSector: FC<PropsType> = memo(({sector}) => {

    // const [sizeVertical, setSizeVertical] = useState<number>(SIZE_IDENT_CIRCLE);
    const [sizeHorizontal, setSizeHorizontal] = useState<number>(sector.sizeHorizontal);
    const dispatch = useDispatch();
    const style = useStyles();

    const change = (event: ChangeEvent<{}>, newValue: number | number[]) => {

        setSizeHorizontal(newValue as number);
        dispatch(calcSizeHorizontal({size: newValue as number}));
    }

    return (
        <>
            <h4 className={''}>Сектор</h4>
            <Box className={`${style.padding} ${style.flex}`}>
                <div>По горизонтали</div>
                <Slider aria-label="Volume" value={sizeHorizontal} onChange={change} valueLabelDisplay={'auto'}/>
            </Box>
        </>
    )
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        padding: {
            paddingRight: '5px',
            paddingLeft: '5px',
        },
        margin: {
            margin: theme.spacing(1),
        },
        flex: {
            display: 'flex'
        },
        flexAround: {
            alignItems: 'center',
            justifyContent: 'flex-start'
        }
    }),
);
