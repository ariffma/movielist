import React from "react"

import Title from './Title'
import Release from './Release'

function Desc(props:any) {
    return(
        <div className="MovieItem__desc">
            <Release />
            <Title />
        </div>
    )
}

export default Desc