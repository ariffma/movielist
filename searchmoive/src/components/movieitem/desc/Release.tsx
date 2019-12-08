import React from "react"

function Release(props:any) {
    const release = props.value.slice(0, -6);
    return(
        <div className="MovieItem__desc__release">
            <p>{release}</p>
        </div>
    )
}

export default Release