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

        const eventCtrlDown = (e:KeyboardEvent) => observerDoc.executorDoc(e,'ctrlKeyDown');
        const eventKeyDown = (e:KeyboardEvent) => observerDoc.executorDoc(e,'onkeydown');
        const eventCtrlUp = (e:KeyboardEvent) => observerDoc.executorDoc(e,'ctrlKeyUp');

        document.addEventListener('keydown', eventCtrlDown);
        document.addEventListener('keydown', eventKeyDown);
        document.addEventListener('keyup', eventCtrlUp);

        return () => {
            observerDoc.cleanSubscribersAll();
            document.removeEventListener('keydown', eventCtrlDown);
            document.removeEventListener('keydown', eventKeyDown);
            document.removeEventListener('keyup', eventCtrlUp);
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
