import React, {FC, memo} from "react";
import {PlaceElementType, SIZE_CIRCLE} from "./cacheCircle";
import {Circle, Group, Text} from "react-konva";
import {COLORS} from "../../../store/constantsColor";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

export const PlaceNoCache: FC<PlaceElementType> = memo((props) => {

    return (
        <Group>
            <Circle x={props.place.x} y={props.place.y}
                    radius={SIZE_CIRCLE / 2}
                    fill={props.place.isSelected ? COLORS.bgPlaceSelect : COLORS.bgPlace}
                    perfectDrawEnabled={false}
                    shadowBlur={props.place.isSelected ? 3 : 0}

            />
            <Text x={props.place.x} y={props.place.y}
                  text={`${props.place.numCol}`}
                  fontSize={10}
                  fill={'#fff'}
                  offset={props.offset}
            />
        </Group>
    )
})