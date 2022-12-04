import React, {useEffect} from 'react';
import './App.css';
import {observerDoc} from "./observer/observerDoc";
import {Content} from "./components/main/content/Content";
import {Header} from './components/main/header/Header';
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
        <div>
            <Header/>
            <LeftAside/>
            <Content/>
            <RightAside/>
        </div>
    )
}

export default App
