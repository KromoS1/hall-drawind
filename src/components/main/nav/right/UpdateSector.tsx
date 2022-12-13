import {Box, createStyles, makeStyles, Slider, Theme} from "@material-ui/core";
import {ChangeEvent, FC, memo, useState} from "react";
import {calcSizeInterval, ChangeSectorType} from "../../../../store/reducers/changeSectorReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    sector: ChangeSectorType
}

export const UpdateSector: FC<PropsType> = memo(({sector}) => {

    const [sizeHorizontal, setSizeHorizontal] = useState<number>(sector.sizeHorizontal);
    const [sizeVertical, setSizeVertical] = useState<number>(sector.sizeVertical);
    const dispatch = useDispatch();
    const style = useStyles();

    const changeHorizontal = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setSizeHorizontal(newValue as number);
        dispatch(calcSizeInterval({size: newValue as number, col_row: "numCol", x_y: 'x'}));
    }

    const changeVertical = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setSizeVertical(newValue as number);
        dispatch(calcSizeInterval({size: newValue as number, col_row: "numRow", x_y: 'y'}));
    }

    return (
        <>
            <h4 className={''}>Сектор</h4>
            <Box className={`${style.padding} ${style.flex}`}>
                <div>По горизонтали</div>
                <Slider value={sizeHorizontal} onChange={changeHorizontal} valueLabelDisplay={'auto'}/>
            </Box>
            <Box className={`${style.padding} ${style.flex}`}>
                <div>По вертикали</div>
                <Slider value={sizeVertical} onChange={changeVertical} valueLabelDisplay={'auto'}/>
            </Box>
        </>
    )
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        padding: {
            padding: '5px',
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