import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';


const Species = (props) => {

    const [oneSpecies, setOneSpecies] = useState({});
    const { species, setSpecies, id } = props;
    const [activeSpecies, setActiveSpecies] = useState(0);
    const [num, setNum] = useState(1)

    useEffect((id) => {
        axios
            .get(`https://swapi.dev/api/species/?page=${num}`)
            .then((res) => {
                console.log("these are the results")
                console.log(res.data.results)
                setSpecies(res.data.results)
            })
            .catch((err) => console.log(err))
        axios
            .get(`https://swapi.dev/api/species/1`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setOneSpecies(res.data)
            })
            .catch((err) => console.log(err))

    }, [num])

    const displayOneSpecies = (url, index) => {
        axios
            .get(`${url}/`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setOneSpecies(res.data)
                setActiveSpecies(index)
            })
            .catch((err) => console.log(err))
    }
    const styleBox = (index) => {
        if (index === activeSpecies) {
            return "content-container-active"
        }
        else return "content-container"
    }


    const next = () => {
        setNum(num + 1)
        console.log(num)
    }

    const prev = () => {
        setNum(num - 1)
        console.log(num)
    }

    return (
        <>
            <div className="display-flex">
                <div>
                    {num > 1 ?
                        <button className="nav-button" onClick={prev}>Prev</button>
                        : null
                    }
                    {num < 4 ?
                        <button className="nav-button" onClick={next}>Next</button>
                        : null
                    }
                    {
                        species.map((species, index) => (
                            <div key={species.name} className={styleBox(index)}>
                                <Link to={`/characters/${index + 1}`} className="link" onClick={() => displayOneSpecies(species.url, index)}>
                                    <p>
                                        {species.name}
                                    </p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="display-one-container">
                    <h2 className="name-style">{oneSpecies.name}</h2>
                    <p className="display-one-text">{oneSpecies.classification}</p>
                    <p className="display-one-text">{oneSpecies.designation}</p>
                    <p className="display-one-text">Average Life Span: {oneSpecies.average_lifespan}</p>
                    <p className="display-one-text">Language: {oneSpecies.language}</p>
                    <p className="display-one-text"></p>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Species;