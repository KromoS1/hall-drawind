import {Box, createStyles, makeStyles, Slider, Theme} from "@material-ui/core";
import {ChangeEvent, FC, memo, useState} from "react";
import {
    calcCurve,
    calcSizeInterval,
    ChangeSectorType,
    setRotation
} from "../../../../store/reducers/changeSectorReducer";
import {useDispatch} from "react-redux";
import {IconsMui} from "../../iconsMui/iconsMui";
import {InputUpdateGroup} from "./InputUpdateGroup";
import {onChangeInput} from "../../../../store/utils";

type PropsType = {
    sector: ChangeSectorType
}

export const UpdateSector: FC<PropsType> = memo(({sector}) => {

    const [curveSector, setCurveSector] = useState<number>(0)
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

    const changeCurve = (event: ChangeEvent<{}>, newValue: number | number[]) => {

        setCurveSector(newValue as number);

        if (curveSector !== newValue) {

           setTimeout(() => {
               dispatch(calcCurve({cornerCurve: newValue as number}));
           },100)
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {

        const callback = (value: number) => dispatch(setRotation({corner: value}));

        onChangeInput(e,callback);
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
            <Box className={`${style.padding} ${style.flex}`}>
                <div>Изгиб</div>
                <Slider min={-30} step={1} max={30} value={curveSector} onChange={changeCurve}
                        valueLabelDisplay={'auto'}/>
            </Box>
            <Box>
                <InputUpdateGroup value={sector.rotation} name={'rotation'} onChange={onChange}>
                    <IconsMui.Rotate90DegreesCcwIcon/>
                </InputUpdateGroup>
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
