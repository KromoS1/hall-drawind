import React from 'react';
import './App.css';

function App() {

    return (
        <div className={"show-scrollbar layout-fixed"}>
            <div className={"wrapper"}>
                <header className={"topnavbar-wrapper"}>
                    <nav className={"navbar topnavbar"}>
                        <ul className={"navbar-nav mr-auto flex-row"}>
                            <li className={"nav-item"}>
                                <a className={"nav-link d-none d-md-block d-lg-block d-xl-block"} href="#" data-trigger-resize="" data-toggle-state="aside-collapsed">
                                    <em className="fas fa-bars"/>
                                </a>
                                <a className={"nav-link sidebar-toggle d-md-none"} href="#" data-toggle-state="aside-toggled" data-no-persist="true">
                                    <em className={"fas fa-bars"}/>
                                </a>
                            </li>
                        </ul>
                        <ul className={"navbar-nav flex-row"}>
                            <li className={"nav-item"}>
                                <a className={"nav-link"} href="#" data-toggle-state="offsidebar-open" data-no-persist="true">
                                    <em className={"fas fa-bars"}/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <aside className={"aside-container"}>
                    <div className={"aside-inner"}>
                        <nav className={"sidebar"} data-sidebar-anyclick-close="">
                        </nav>
                    </div>
                </aside>
                <aside className={"offsidebar d-none"}>
                    <nav className={"border"} data-sidebar-anyclick-close=""/>
                </aside>
                <section className={"section-container"}>

                </section>
            </div>
        </div>
    )
}

export default App
