import React, { useState } from 'react';
import Axios from 'axios'
import './movies.css'

function Movies() {

    const [movie, setMovie] = useState('');
    const [review, setReview] = useState('');
    const [pokemon, setPokemon] = useState([]);

    const submitReview = () => {
        Axios.post("http://localhost:4001/api/insert", {
            movieName: movie,
            movieReview: review
        }
        ).then(() => {
            alert("Successful insert");
        })
    }

    const showPokemon = () => {
        Axios.get(`http://localhost:4001/api/get/${pokemon}`).then(() => {
            alert("se envio")
        })
    }

    return (
        <div className='form'>
            <label >Movie name</label>
            <input type="text"
                name='movieName'
                onChange={(e) => {
                    setMovie(e.target.value)
                }} />
            <label >Review</label>
            <input type="text"
                name='review'
                onChange={(e) => {
                    setReview(e.target.value)
                }} />

            <button onClick={submitReview}>Submit</button>

            <input type="text"
                    name="pokemon"
                    onChange={(e) => setPokemon(e.target.value)}/>
            <button onClick={showPokemon}>Pokemon</button>
        </div>
    )
}

export default Movies;