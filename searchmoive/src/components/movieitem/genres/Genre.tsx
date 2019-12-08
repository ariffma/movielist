import React from "react"

function Genre(props:any) {
    return(
        <div className="MovieItem__genres__genre">
            <span>{props.genre}</span>
        </div>
    )
}

export default Genre