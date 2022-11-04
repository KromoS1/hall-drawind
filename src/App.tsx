import React from 'react';
import './App.css';
import {Header} from "./components/mainComponents/Header";
import {LeftAside} from "./components/mainComponents/LeftAside";
import {RightAside} from "./components/mainComponents/RightAside";
import {Content} from "./components/mainComponents/Content";
import {NewContent} from "./components/mainComponents/NewContent";

function App() {

    return (
        <div className={"show-scrollbar layout-fixed"}>
            <div className={"wrapper"}>
                <Header/>
                <LeftAside/>
                <RightAside/>
                <Content/>
                {/*<NewContent/>*/}
            </div>
        </div>
    )
}

export default App
