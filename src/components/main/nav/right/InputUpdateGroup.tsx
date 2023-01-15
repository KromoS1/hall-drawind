import {ChangeEvent, FC, memo} from "react";
import {createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {IconsMui} from "../../iconsMui/iconsMui";

type InputUpdateGroupProps = {
    name: string
    value: number | string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    children: JSX.Element
}

export const InputUpdateGroup: FC<InputUpdateGroupProps> = memo((props) => {

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