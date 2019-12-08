import React from "react"

import Deets from './deets/Deets'
import Desc from './desc/Desc'
import Poster from './others/Poster'
import Genres from './genres/Genres'

function MovieItem(props:any) {
    return(
        <div className="MovieItem">
            <Deets />
            <Poster />
            <Genres />
            <Desc />
        </div>
    )
}

export default MovieItem