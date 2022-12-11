import React, {FC, memo} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, IconButton, makeStyles, Menu, Theme, Tooltip} from "@material-ui/core";
import DialpadIcon from '@material-ui/icons/Dialpad';
import {Figures, TypesFigureType} from "../../../store/mainType";
import {IconsMui} from "../iconsMui/iconsMui";

type PropsType = {
    drawFigure: (typeFigure: TypesFigureType) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

export const FigureButton: FC<PropsType> = memo(({drawFigure}) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (typeFigure: TypesFigureType) => {
        drawFigure(typeFigure)
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={'Выбрать фигуру'}>
                <IconButton className={classes.menuButton}
                            color="inherit"
                            edge={"start"}
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="menu"
                            onClick={handleMenu}>
                    <DialpadIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={() => handleClose(Figures.SECTOR)}>Сектор</MenuItem>
                <MenuItem onClick={() => handleClose(Figures.RECT)}>Прямоугольник</MenuItem>
                <MenuItem onClick={() => handleClose(Figures.ELLIPSE)}>Эллипс</MenuItem>
                <MenuItem onClick={() => handleClose(Figures.TEXT)}>Текст</MenuItem>
            </Menu>
        </>
    );
})