import React, {FC, memo} from "react";
import {PlaceElementType, SIZE_CIRCLE} from "./cacheCircle";
import {Circle, Group, Text} from "react-konva";
import {COLORS} from "../../../store/constantsColor";

export const PlaceNoCache: FC<PlaceElementType> = memo((props) => {

    return (
        <Group>
            <Circle x={props.positionPlace.x} y={props.positionPlace.y}
                    radius={SIZE_CIRCLE / 2}
                    fill={props.isSelected ? COLORS.bgPlaceSelect : COLORS.bgPlace}
                    perfectDrawEnabled={false}
                    shadowBlur={props.isSelected ? 3 : 0}

            />
            <Text x={props.positionPlace.x} y={props.positionPlace.y}
                  text={`${props.numCol}`}
                  fontSize={10}
                  fill={'#fff'}
                  offset={props.offset}
            />
        </Group>
    )
})