import {ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Figures, GeneralFigureType, RectFigureType} from "../../../../store/mainType";
import {changeDataRect} from "../../../../store/reducers/rectsReducer";
import {checkNameFigureForNumber} from "../../../../store/utils";
import {RootState} from "../../../../store/store";
import Konva from "konva";

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

//TODO проверить как работает если диспатчить сразу при изменении
const UpdateRect: FC<PropsUpdateRectType> = memo(({rect}) => {

    const [dataFigure, seDataFigure] = useState<RectFigureType>(rect);
    const stage = useSelector<RootState, Konva.Stage>(state => state.stage.stage);

    const dispatch = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {

        let value: string | number = e.currentTarget.value;
        const name = e.currentTarget.dataset.name;

        if (checkNameFigureForNumber(name)) {
            value = +value;
        }

        seDataFigure(dataFigure => ({...dataFigure, [`${name}`]: value}));
    }

    const onChangeFigure = () => {
        dispatch(changeDataRect({rect: dataFigure}));
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeFigure();
        }
    }

    useEffect(() => {
        if (rect !== dataFigure) {
            seDataFigure(rect);
        }
    }, [rect])

    return (
        <>
            <h4 className={'p-2 mb-0'}>Rect</h4>
            <div className={'p-2'}>
                <div className={'d-flex'}>
                    <InputUpdateGroup value={dataFigure.x} name={'x'} onChange={onChange} onEnter={onEnter}
                                      onBlur={onChangeFigure}>
                        <>X</>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={dataFigure.y} name={'y'} onChange={onChange} onEnter={onEnter}
                                      onBlur={onChangeFigure}>
                        <>Y</>
                    </InputUpdateGroup>
                </div>
                <div className={'d-flex'}>
                    <InputUpdateGroup value={dataFigure.w} name={'w'} onChange={onChange} onEnter={onEnter}
                                      onBlur={onChangeFigure}>
                        <>W</>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={dataFigure.h} name={'h'} onChange={onChange} onEnter={onEnter}
                                      onBlur={onChangeFigure}>
                        <>H</>
                    </InputUpdateGroup>
                </div>
                <div className={'d-flex'}>
                    <InputUpdateGroup value={dataFigure.rotation} name={'rotation'} onChange={onChange}
                                      onEnter={onEnter} onBlur={onChangeFigure}>
                        <i className={'fas fa-redo'}/>
                    </InputUpdateGroup>
                    <InputUpdateGroup value={dataFigure.cornerRadius} name={'cornerRadius'} onChange={onChange}
                                      onEnter={onEnter} onBlur={onChangeFigure}>
                        <i className={'fas fa-expand'}/>
                    </InputUpdateGroup>
                </div>


            </div>
            <div className={'dropdown-divider'}/>
            <div className={'p-2'}>
                <div className={'mb-2'}>
                    Цвет заливки:
                    <input className={'form-control'} value={dataFigure.bgColor}
                           onChange={onChange} type="text"
                           onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'bgColor'}
                    />
                    <div className="demo-colorpicker" id="demo_cont" data-container="#demo_cont"
                         data-color="rgba(150,216,62,0.55)" data-inline="true"></div>
                </div>
            </div>
            <div className={'dropdown-divider'}/>
            <div className={'p-2'}>
                <div className={'mb-2'}>
                    Цвет границы:
                    <input className={'form-control'} value={dataFigure.borderColor} onChange={onChange} type="text"
                           onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'borderColor'}/>
                </div>
                <div className={'mb-2'}>
                    Ширина границы:
                    <input className={'form-control'} value={dataFigure.borderWidth} onChange={onChange} type="text"
                           onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'borderWidth'}/>
                </div>
            </div>
        </>
    )
})

type InputUpdateGroupProps = {
    name: string
    value: number | string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onEnter: (e: KeyboardEvent<HTMLInputElement>) => void
    onBlur: () => void
    children: JSX.Element
}


const InputUpdateGroup: FC<InputUpdateGroupProps> = memo((props) => {
    return (
        <div className={'input-group'} data-toggle={'tooltip'} data-placement={'top'} title={'dwdwd'}
             data-original-title={'Hello'}>
                    <span className={'input-group-prepend'} style={{width: '35px'}}>
                        <span className={'input-group-text'}>
                            {props.children}
                        </span>
                    </span>
            <input className={'form-control'} value={props.value} onChange={props.onChange} type="number"
                   onKeyDown={props.onEnter}
                   onBlur={props.onBlur} data-name={props.name}/>
        </div>
    )
})