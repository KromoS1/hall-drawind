import React, {memo} from 'react';

export const LeftAside = memo(() => {
    return (
        <aside className={"aside-container"}>
            <div className={"aside-inner"}>
                <nav className={"sidebar"} data-sidebar-anyclick-close="">
                </nav>
            </div>
        </aside>
    )
})