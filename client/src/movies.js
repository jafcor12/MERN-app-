import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './movies.css'


function Movies() {

    const [movie, setMovie] = useState('');
    const [review, setReview] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [pokInfo, setPokInfo] = useState({})
    const [list, setList] = useState()
    const [src, setSrc] = useState('http://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png');

    useEffect(() => {
        Axios.get('http://localhost:4001/api/list').then((response) => {
             setList(response.data);
        });
    }, [list]);

    const showPokemon = () => {
        Axios.get(`http://localhost:4001/api/get/${pokemon}`).then((response) => {
            setPokInfo(response.data)
            return response.data
        }).then((data) => {
            console.log(data)
            setSrc(data.sprites.normal)
        })

        console.log(list ? true : false)
    }

    const submitReview = () => {
        Axios.post("http://localhost:4001/api/insert", {
            movieName: movie,
            movieReview: review
        }
        ).then(() => {
            alert("Successful insert");
        })
    }


    // const showPokemon = () => {
    //     Axios.get(`http://localhost:4001/api/get/${pokemon}`).then((response) => {
    //         setPokInfo(response.data)
    //     }).then(() => {
    //         console.log(pokInfo)
    //     })
    // }

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
                onChange={(e) => setPokemon(e.target.value)} />
            <button onClick={showPokemon}>Pokemon</button>
            <h1>{pokInfo.base_experience}</h1>
            <img alt='hola' src={src} />
            {list?.map((val) =>
                <img key={val.id} src={val.sprites.normal} alt={`Pokemons ${val.name}`} />)}

        </div>
    )
}

export default Movies;