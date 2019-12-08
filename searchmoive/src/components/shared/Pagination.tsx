import React from "react"

function Pagination(props:any) {
    const { loading, showPrev, showNext, handlePrevClick, handleNextClick} = props
    return(
        <div className="pagination">
            <p>
                <a 
                    className={`${showPrev ? 'show': 'hide'}${loading ? 'hide' : ''}`}
                    href='!#' onClick={ handlePrevClick }>
                    Prev
                </a>
                <a 
                    className={`${showNext ? 'show': 'hide'}${loading ? 'hide' : ''}`}
                    href='!#' onClick={ handleNextClick }>
                    Next
                </a>
            </p>
        </div>
    )
}

export default Pagination