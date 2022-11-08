import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/mainComponents/Header";
import {observerDoc} from "./observer/observerDoc";
import {Content} from "./components/mainComponents/Content";

function App() {

    useEffect(() => {
        document.addEventListener('keydown', (e) => observerDoc.ctrlKeyDown(e));
        document.addEventListener('keyup', (e) => observerDoc.ctrlKeyUp(e));

        return () => {
            observerDoc.cleanSubscribersAll();
        }
    },[])

    return (
        <div className={"show-scrollbar layout-fixed"}>
            <div className={"wrapper"}>
                <Header/>
                <div>
                    <Content/>
                </div>
            </div>
        </div>
    )
}

export default App
