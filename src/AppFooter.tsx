import React from 'react';
import BelcanLogo from "./assets/demo/flags/belcanLogo.JPG";

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? BelcanLogo:BelcanLogo} alt="Logo" height="20" className="mr-2" />
            
            <span className="font-medium ml-2">Belcan HR Portal</span>
        </div>
    );
}
