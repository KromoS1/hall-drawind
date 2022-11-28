import React, {useEffect} from 'react';
import './App.css';
import {observerDoc} from "./observer/observerDoc";
import {Content} from "./components/main/content/Content";
import {Header} from './components/main/nav/header/Header';
import {LeftAside} from "./components/main/nav/left/LeftAside";
import {RightAside} from "./components/main/nav/right/RightAside";

function App() {

    useEffect(() => {

        document.addEventListener('keydown', (e) => observerDoc.ctrlKeyDown(e));
        document.addEventListener('keyup', (e) => observerDoc.ctrlKeyUp(e));

        return () => {
            observerDoc.cleanSubscribersAll();
        }
    }, [])

    return (
        <div className={"show-scrollbar layout-fixed"}>
            <div className={"wrapper"}>
                <Header/>
                <LeftAside/>
                <Content/>
                <RightAside/>
            </div>
        </div>
    )
}

export default App
