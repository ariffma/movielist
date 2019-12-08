import React from "react"

import Genre from "./Genre"

function Genres(props:any) {
    const genres_ids = props.genres.genres_ids
    const genres_full = props.genres.genres

    const genreList = genres_ids.map((genreId: any) => {
        let name = ".."
        genres_full.find((i: any) => {
            return i.id === genreId ? name = i.name : false
        })
        
        return(
            <Genre key={genreId} genre={name} />
        )
    })

    return(
        <div className="MovieItem__genres">
            {genreList}
        </div>
    )
}

export default Genres