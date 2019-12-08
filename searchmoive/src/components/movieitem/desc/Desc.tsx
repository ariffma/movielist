import React from "react"

import Title from './Title'
import Release from './Release'

function Desc(props:any) {
    return(
        <div className="MovieItem__desc">
            <Release value={props.desc.release} />
            <Title value={props.desc.title} />
        </div>
    )
}

export default Desc