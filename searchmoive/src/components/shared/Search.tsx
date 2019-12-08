import React from "react"
import axios from 'axios'

import MovieItem from '../movieitem/MovieItem'
// import Pagination from './Pagination'

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
                const resEmpty =! res.data.results.length ? 'No Results' : ''
                this.setState({
                    results: res.data.results,
                    loading: false,
                    message: resEmpty
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

    render(){
        const { query } = this.state
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
                                </div>
                            </div>
                            <div className="mltt_col-md-3">
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                {this.renderSearch()}
                </main>
            </div>
        )
    }
}

export default Search