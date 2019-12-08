import React from "react"

import Deets from './deets/Deets'
import Desc from './desc/Desc'
import Poster from './others/Poster'
import Genres from './genres/Genres'

function MovieItem(props:any) {
    const deets = props.value.vote_average
    const img = {
        poster: props.value.poster_path,
        alt: props.value.overview
    }
    const genres = {
        genres_ids: props.value.genre_ids,
        genres: props.genre
    }
    const desc = {
        title: props.value.original_title,
        release: props.value.release_date,
        id: props.value.id
    }

    return(
        <div className="MovieItem">
            <Deets deets={deets} />
            <Poster img={img} />
            <Genres genres={genres} />
            <Desc desc={desc} />
        </div>
    )
}

export default MovieItem