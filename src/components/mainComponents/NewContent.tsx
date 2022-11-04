import React, {memo} from "react";
import {Layer, Rect, Stage} from "react-konva";


export const NewContent = memo(() => {

    const containerRef = React.useRef(null);
    const stageRef = React.useRef(null);

    const [scale, setScale] = React.useState(1);
    const [scaleToFit, setScaleToFit] = React.useState(1);
    const [size, setSize] = React.useState({
        width: 1000,
        height: 1000,
        virtualWidth: 1000
    });
    const [virtualWidth, setVirtualWidth] = React.useState(1000);

    // calculate available space for drawing
    React.useEffect(() => {
        const newSize = {
            // @ts-ignore
            width: containerRef.current.offsetWidth,
            // @ts-ignore
            height: containerRef.current.offsetHeight
        };
        if (newSize.width !== size.width || newSize.height !== size.height) {
            // @ts-ignore
            setSize(newSize);
        }
    });

    // calculate initial scale
    React.useEffect(() => {
        if (!stageRef.current) {
            return;
        }
        const stage = stageRef.current;
        // @ts-ignore
        const clientRect = stage.getClientRect({ skipTransform: true });

        const scaleToFit = size.width / clientRect.width;
        setScale(scaleToFit);
        setScaleToFit(scaleToFit);
        setVirtualWidth(clientRect.width);
    }, [size]);

    // togle scale on double clicks or taps
    const toggleScale = React.useCallback(() => {
        if (scale === 1) {
            setScale(scaleToFit);
        } else {
            setScale(1);
        }
    }, [scale, scaleToFit]);

    return (
        <>
            <div
                style={{
                    position: "relative",
                    backgroundColor: "lightgrey",
                    width: "100vw",
                    height: "100vh"
                }}
                ref={containerRef}
            >
                <Stage
                    ref={stageRef}
                    width={size.width}
                    height={size.height}
                    draggable
                    dragBoundFunc={pos => {
                        pos.x = Math.min(
                            size.width / 2,
                            Math.max(pos.x, -virtualWidth * scale + size.width / 2)
                        );
                        pos.y = Math.min(size.height / 2, Math.max(pos.y, -size.height / 2));
                        return pos;
                    }}
                    onDblTap={toggleScale}
                    onDblClick={toggleScale}
                    scaleX={scale}
                    scaleY={scale}
                >
                    <Layer>
                        <Rect
                            x={20}
                            y={50}
                            width={10}
                            height={10}
                            fill="red"
                            shadowBlur={10}
                        />
                    </Layer>
                </Stage>
            </div>
        </>
    )
})