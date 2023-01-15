import {ChangeEvent, FC, memo} from "react";
import {useDispatch} from "react-redux";
import {Figures, GeneralFigureType, RectFigureType} from "../../../../store/mainType";
import {checkNameFigureForNumber, onChangeInput} from "../../../../store/utils";
import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import {Color, ColorPicker, ColorType, createColor} from 'material-ui-color';
import {IconsMui} from "../../iconsMui/iconsMui";
import {changeDataRect} from "../../../../store/reducers/rectsReducer";
import {InputUpdateGroup} from "./InputUpdateGroup";

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

        const callback = (value:number, name: string) => {
            dispatch(changeDataRect({
                rect: {
                    ...rect,
                    [`${name}`]: value
                }
            }))
        }
        //TODO изменить на все фигуры

        onChangeInput(e,callback);
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

const useStyles = makeStyles(() =>
    createStyles({
        flex: {
            display: 'flex'
        },
        flexAround: {
            alignItems: 'center',
            justifyContent: 'flex-start'
        }
    }),
);