import React from 'react';
import './movies.css'

function Movies() {

    return (
        <div className='form'>
            <label >Movie name</label>
            <input type="text" name='movieName'/>
            <label >Review</label>
            <input type="text" name='review'/>

            <button>Submit</button>
        </div>
    )
}

export default Movies;