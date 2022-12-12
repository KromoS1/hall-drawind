import {ChangeEvent, FC, memo} from "react";
import {useDispatch} from "react-redux";
import {Figures, GeneralFigureType, RectFigureType} from "../../../../store/mainType";
import {checkNameFigureForNumber} from "../../../../store/utils";
import {Box, createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {Color, ColorPicker, ColorType, createColor} from 'material-ui-color';
import {IconsMui} from "../../iconsMui/iconsMui";
import {changeDataRect} from "../../../../store/reducers/rectsReducer";

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
//TODO изменить на все фигуры
        dispatch(changeDataRect({
            rect: {
                ...rect,
                [`${name}`]: value
            }
        }))
    }

    const onChangeColorBG = (color: Color | ColorType) => {
        dispatch(changeDataRect({rect: {...rect, bgColor: `#${color.hex}`}}));
    }

    const onChangeColorBorder = (color: Color | ColorType) => {
        dispatch(changeDataRect({rect: {...rect, borderColor: `#${color.hex}`}}));
    }

    return (
        <>
            <h4 className={''}>Прямоугольник</h4>
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
                        <IconsMui.Rotate90DegreesCcwIcon/>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={rect.cornerRadius} name={'cornerRadius'} onChange={onChange}>
                        <IconsMui.BorderOuterIcon/>
                    </InputUpdateGroup>
                </div>
            </Box>

            <div className={style.flex}>
                <InputUpdateGroup value={rect.borderWidth} name={'borderWidth'} onChange={onChange}>
                    <IconsMui.LineWeightIcon/>
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
                    <IconsMui.InputAdornment position="start">
                        {props.children}
                    </IconsMui.InputAdornment>
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