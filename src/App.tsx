import React, {useEffect} from 'react';
import {observerDoc} from "./observer/observerDoc";
import {Header} from './components/main/header/Header';
import {LeftAside} from "./components/main/nav/left/LeftAside";
import {Box, createStyles, CssBaseline, makeStyles} from "@material-ui/core";
import {Content} from "./components/main/content/Content";
import {RightAside} from "./components/main/nav/right/RightAside";

export const WIDTH_ASIDE = 200;
export const HEIGHT_APP_BAR = 65;

function App() {

    const styles = useStyles();

    useEffect(() => {

        document.addEventListener('keydown', (e) => observerDoc.ctrlKeyDown(e));
        document.addEventListener('keydown', (e) => observerDoc.onkeydown(e));
        document.addEventListener('keyup', (e) => observerDoc.ctrlKeyUp(e));

        return () => {
            observerDoc.cleanSubscribersAll();
        }
    }, [])

    return (
        <Box className={styles.root}>
            <CssBaseline/>
            <Header/>
            <Box className={styles.box}>
                <LeftAside/>
                <Content/>
                <RightAside/>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles(() => createStyles({
        root: {
            height: '100vh',
            width: '100vw'
        },
        box: {
            display: 'flex',
            height: `calc(100% - ${HEIGHT_APP_BAR}px)`
        }
    }),
);

export default App
