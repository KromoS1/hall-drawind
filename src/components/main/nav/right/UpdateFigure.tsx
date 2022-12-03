import {ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Figures, GeneralFigureType, RectFigureType} from "../../../../store/mainType";
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

    const [dataFigure, seDataFigure] = useState<RectFigureType>(rect)

    const dispatch = useDispatch();

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {

        let value: string | number = e.currentTarget.value;
        const name = e.currentTarget.dataset.name;

        if (name === 'w' || name === 'h' || name === 'borderWidth'){
            value = +value;
        }

        seDataFigure( dataFigure => ({...dataFigure,[`${name}`]: value}));
    }

    const onChangeFigure = () => {
        dispatch(changeDataRect({rect: dataFigure}))
    }

    const onEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeFigure();
        }
    }

    useEffect(() => {
        if(rect !== dataFigure) {
            seDataFigure(rect);
        }
    },[rect])

    return (
        <div className={'p-2'}>
            <div className={'d-flex'}>
                <div className={'col'}>
                    Ширина
                    <input className={'form-control'} value={dataFigure.w} onChange={onChange} type="number" onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'w'}/>
                </div>
                <div className={'col'}>
                    Высота
                    <input className={'form-control'} value={dataFigure.h} onChange={onChange} type="number" onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'h'}/>
                </div>
            </div>
            <div className={'mb-2'}>
                Цвет заливки:
                <input className={'form-control'} value={dataFigure.bgColor} onChange={onChange} type="text" onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'bgColor'}/>
            </div>
            <div className={'mb-2'}>
                Цвет границы:
                <input className={'form-control'} value={dataFigure.borderColor} onChange={onChange} type="text" onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'borderColor'}/>
            </div>
            <div className={'mb-2'}>
                Ширина границы:
                <input className={'form-control'} value={dataFigure.borderWidth} onChange={onChange} type="number" onKeyDown={onEnter} onBlur={onChangeFigure} data-name={'borderWidth'}/>
            </div>
        </div>
    )
})