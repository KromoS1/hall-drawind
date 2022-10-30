import React, {memo} from 'react';
import {Layer, Stage} from 'react-konva';
import {FCircle} from "../figures/FCircle";


export const Content = memo(() => {
    return (
        <section className={"section-container"}>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {/*<Text text="Some text on canvas" fontSize={15} />*/}
                    {/*<FRect/>*/}
                    <FCircle x={25} y={25}/>
                    <FCircle x={50} y={25}/>
                    <FCircle x={75} y={25}/>
                </Layer>
            </Stage>
        </section>
    )
})