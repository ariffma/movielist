import React from "react"
import Votes from './Votes'

function Deets(props:any) {
    return(
        <div className="MovieItem__deets">
            <Votes value={props.deets} />
        </div>
    )
}

export default Deets