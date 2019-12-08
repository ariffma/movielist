import React from "react"
import axios from 'axios'
import Pagination from './Pagination'

const _url = 'https://api.themoviedb.org/3/search/movie'
const _key = '4c689ac497c39e61a5d581e40c1621d4'

class Search extends React.Component<any, any> {
    constructor(props:any){
        super(props)
    }

    onSearch = (e:any) => {
        const query = e.target.value
        console.log(query)
    }

    render(){
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
                </main>
            </div>
        )
    }
}

export default Search