import {ChangeEvent, FC, memo} from "react";
import {useDispatch} from "react-redux";
import {Figures, GeneralFigureType, RectFigureType} from "../../../../store/mainType";
import {checkNameFigureForNumber} from "../../../../store/utils";
import {Box, createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {Color, ColorPicker, ColorType, createColor} from 'material-ui-color';
import InputAdornment from '@material-ui/core/InputAdornment';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import BorderOuterIcon from '@material-ui/icons/BorderOuter';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import {changeDataFigure} from "../../../../store/reducers/dataFigureReducer";

type PropsType = {
    figure: GeneralFigureType
}

export const UpdateFigure: FC<PropsType> = memo(({figure}) => {

    return (
        <>
            {/*@ts-ignore*/}
            {figure.typeFigure === Figures.RECT && <UpdateRect rect={figure}/>}
        </>
    )
})

type PropsUpdateRectType = {
    rect: RectFigureType
}

const UpdateRect: FC<PropsUpdateRectType> = memo(({rect}) => {

    const dispatch = useDispatch();
    const style = useStyles();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {

        let value: string | number = e.target.value;
        const name = e.target.name;

        if (checkNameFigureForNumber(name)) {
            value = +value;
            if (name === 'cornerRadius' && value < 0) {
                value = 0;
            }
        }

        dispatch(changeDataFigure({
            figure: {
                ...rect,
                [`${name}`]: value
            }
        }))
    }

    const onChangeColorBG = (color: Color | ColorType) => {
        dispatch(changeDataFigure({figure: {...rect, bgColor: `#${color.hex}`}}));
    }

    const onChangeColorBorder = (color: Color | ColorType) => {
        dispatch(changeDataFigure({figure: {...rect, borderColor: `#${color.hex}`}}));
    }

    return (
        <>
            <h4 className={''}>Rect</h4>
            <Box>
                <div className={style.flex}>
                    <InputUpdateGroup value={rect.x} name={'x'} onChange={onChange}>
                        <>X</>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={rect.y} name={'y'} onChange={onChange}>
                        <>Y</>
                    </InputUpdateGroup>
                </div>
                <div className={style.flex}>
                    <InputUpdateGroup value={rect.w} name={'w'} onChange={onChange}>
                        <>W</>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={rect.h} name={'h'} onChange={onChange}>
                        <>H</>
                    </InputUpdateGroup>
                </div>
                <div className={style.flex}>
                    <InputUpdateGroup value={rect.rotation} name={'rotation'} onChange={onChange}>
                        <Rotate90DegreesCcwIcon/>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={rect.cornerRadius} name={'cornerRadius'} onChange={onChange}>
                        <BorderOuterIcon/>
                    </InputUpdateGroup>
                </div>
            </Box>

            <div className={style.flex}>
                <InputUpdateGroup value={rect.borderWidth} name={'borderWidth'} onChange={onChange}>
                    <LineWeightIcon/>
                </InputUpdateGroup>
            </div>

            <div className={`${style.flex} ${style.flexAround}`}>
                <ColorPicker onChange={onChangeColorBG} value={createColor(rect.bgColor)} hideTextfield/>
                <span>Цвет заливки</span>
            </div>

            <div className={`${style.flex} ${style.flexAround}`}>
                <ColorPicker onChange={onChangeColorBorder} value={createColor(rect.borderColor)} hideTextfield/>
                <span>Цвет границ</span>
            </div>
        </>
    )
})

type InputUpdateGroupProps = {
    name: string
    value: number | string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    children: JSX.Element
}

const InputUpdateGroup: FC<InputUpdateGroupProps> = memo((props) => {

    const style = useStyles();

    return (
        <TextField
            type={'number'}
            name={props.name}
            onChange={props.onChange}
            className={style.margin}
            value={props.value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {props.children}
                    </InputAdornment>
                ),
            }}
        />
    )
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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