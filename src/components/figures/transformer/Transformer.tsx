import React, {FC, memo, useEffect, useRef} from "react";
import Konva from "konva";
import {Transformer} from "react-konva";

type PropsType = {
    refFigure: any,
    isShow: boolean,
    anchorSize: number
    padding?: number
}

export const FTransformer: FC<PropsType> = memo(({refFigure,isShow, anchorSize, padding}) => {

    const transformerRef = useRef<Konva.Transformer | null>(null);

    useEffect(() => {
        if (transformerRef.current && refFigure.current) {

            transformerRef.current.nodes([refFigure.current]);
            //@ts-ignore todo fix
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isShow])

    return (
        <Transformer ref={transformerRef}
                     keepRatio={false}
                     anchorSize={isShow ? anchorSize : 0}
                     anchorCornerRadius={10}
                     rotateEnabled={false}
                     padding={padding ? padding : 0}
                     centeredScaling/>
    )
})