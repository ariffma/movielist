import React from "react"

function Votes(props:any) {
    return(
        <div className="MovieItem__deets__votes">
            <p> {props.value} </p>
        </div>
    )
}

export default Votes