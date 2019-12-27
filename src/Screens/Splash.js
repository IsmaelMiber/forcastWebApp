import React from "react";


function Splash(props) {
    return(
        <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <p style={{fontSize: 30, fontWeight:"bold"}}>Forcast App</p>
        </div>
    )
}

export default React.memo(Splash);