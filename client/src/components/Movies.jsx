import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Movies = (props) => {

    const [movie, setMovie] = useState({})
    const { movies, setMovies, id } = props
    const [activeMovie, setActiveMovie] = useState(0)
    useEffect(() => {
        axios
            .get("https://swapi.dev/api/films/")
            .then((res) => {
                console.log("these are the results")
                console.log(res.data.results)
                setMovies(res.data.results)
            })
            .catch((err) => console.log(err))
        axios
            .get(`https://swapi.dev/api/films/1`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setMovie(res.data)
            })
            .catch((err) => console.log(err))


    }, [id])

    const displayOneMovie = (url, index) => {
        axios
            .get(`${url}/`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setMovie(res.data)
                setActiveMovie(index)
            })
            .catch((err) => console.log(err))

    }

    const styleBox = (index) => {
        if (index === activeMovie) {
            return "content-container-active"
        }
        else return "content-container"
    }
    return (
        <>
            <div className="display-flex">
                <div>
                    {
                        movies.map((film, index) => (
                            <div key={film.name} className={styleBox(index)}>
                                <Link to={`/characters/${index + 1}`} className="link" onClick={() => displayOneMovie(film.url, index)}>
                                    <p>
                                        {film.title}
                                    </p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="movie-display-one-container">
                    <p>Episode: {movie.episode_id}</p>
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="display-one-text"></p>
                    <p >{movie.opening_crawl}</p>
                    <p className="display-one-text">Director: {movie.director}</p>
                    <p className="display-one-text">Release Date: {movie.release_date}</p>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default Movies;