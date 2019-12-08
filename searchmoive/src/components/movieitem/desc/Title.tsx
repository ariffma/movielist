import React from "react"

function Title(props:any) {
    return(
        <div className="MovieItem__desc__title">
            <p><a href="!#"> {props.value} </a></p>
        </div>
    )
}

export default Title