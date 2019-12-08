import React from "react"

function Poster(props:any) {
    return(
        <div className="MovieItem__poster">
            <img src={"https://image.tmdb.org/t/p/w500/"+props.img.poster} alt={props.img.alt} /> 
        </div>
    )
}

export default Poster