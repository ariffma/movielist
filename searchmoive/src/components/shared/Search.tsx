import React from "react"
import axios from 'axios'

import MovieItem from '../movieitem/MovieItem'
import Pagination from './Pagination'

const _url = 'https://api.themoviedb.org/3/search/movie'
const _genre = 'https://api.themoviedb.org/3/genre/movie/list'
const _key = '4c689ac497c39e61a5d581e40c1621d4'
const _lang = 'en-US'

class Search extends React.Component<any, any> {
    constructor(props:any){
        super(props)
        this.state = {
            query: '',
            results: {},
            genre: [],
            message: '',
            loading: false,
            totalRes: 0,
            totalPage: 0,
            currentPage: 0
        }
        this.fetchGenres()
    }

    fetchRes = (pageNum: number, query: string ) => {
        const page = pageNum ? `&page=${pageNum}` : `&page=1`
        const q = query ? `&query=${query}` : `&query= `
        const url = `${_url}?api_key=${_key}&language=${_lang}${q}${page}`

        let cancel = axios.CancelToken.source()

        axios.get(url, {
            cancelToken: cancel.token
        })
            .then((res: any) => {
                const total = res.data.total_results
                const pageCount = res.data.total_pages
                const resEmpty =! res.data.results.length ? 'No Results' : ''
                this.setState({
                    results: res.data.results,
                    loading: false,
                    message: resEmpty,
                    totalRes: total,
                    totalPage: pageCount,
                    currentPage: pageNum
                })
            })
            .catch((err: any) => {
                if(axios.isCancel(err) || err) {
                    this.setState({
                        loading: false,
                        message: 'Error'
                    })
                }
            })
    }

    fetchGenres = () => {
        const urlGenre = `${_genre}?api_key=${_key}&language=${_lang}`
        let cancel = axios.CancelToken.source()
        
        axios.get(urlGenre, {
            cancelToken: cancel.token
        })
            .then((res:any) => {
                this.setState({
                    genre: res.data.genres
                })
            })
    }

    onSearch = (e:any) => {
        const query = e.target.value
        if(!query) {
            this.setState({
                query,
                results: {},
                message: ''
            })
        } else {
            this.setState({
                query,
                loading: true,
                message: ''
            }, () => {
                this.fetchRes(1, query)
            })
        }
    }

    renderSearch = () => {
        const { results } = this.state
        if(Object.keys(results).length && results.length) {
            return (
                <div className="MovieList">
                    { results.map((res: any) => {
                        return(
                            <MovieItem key={res.id} value={res} genre={this.state.genre}  />
                        )
                    }) }
                 </div>
            )
        }
    }

    handlePageClick = (type: string) => {
        const newPageNum = 'prev' === type? this.state.currentPage - 1 : this.state.currentPage + 1
        if(!this.state.loading) {
            this.setState({
                loading: true,
                message: ''
            }, () => {
                this.fetchRes(newPageNum, this.state.query)
            })
        }
    }

    render(){
        const { query, loading, message, currentPage, totalPage, totalRes } = this.state
        const showPrev = 1 < currentPage
        const showNext = totalPage > currentPage
        return(
            <div>
                <header>
                    <div className='mltt_container'>
                        <div className="mltt_row vertical_align">
                            <div className="mltt_col-md-9">
                                <div className="search">
                                    <div className="search__field">
                                        <input 
                                            type='text'
                                            value={query}
                                            name='query'
                                            id='searchInput' 
                                            placeholder='Search Movies'
                                            onChange={this.onSearch}
                                        />
                                    </div>
                                    <div className="search__feedback">
                                        {message && <p className="msg">{ message }</p>}
                                        {loading && <p className="loading">Loading..</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="mltt_col-md-3">
                                <p className={`right ${totalRes > 1 ? 'show' : 'hide'}`}>{totalRes} results found</p>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <Pagination 
                        loading={loading}
                        showPrev={showPrev}
                        showNext={showNext}
                        handlePrevClick={() => this.handlePageClick('prev')}
                        handleNextClick={() => this.handlePageClick('next')}
                    />
                    {this.renderSearch()}
                    <Pagination 
                        loading={loading}
                        showPrev={showPrev}
                        showNext={showNext}
                        handlePrevClick={() => this.handlePageClick('prev')}
                        handleNextClick={() => this.handlePageClick('next')}
                    />
                </main>
            </div>
        )
    }
}

export default Search