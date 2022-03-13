import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';



const Characters = (props) => {
    const [person, setPerson] = useState({})
    const { people, setPeople, id } = props
    const [activeCharacter, setActiveCharacter] = useState(0)

    useEffect((id) => {
        axios
            .get("https://swapi.dev/api/people/")
            .then((res) => {
                console.log("these are the results")
                console.log(res.data.results)
                setPeople(res.data.results)
            })
            .catch((err) => console.log(err))
        axios
            .get(`https://swapi.dev/api/people/1`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setPerson(res.data)
            })
            .catch((err) => console.log(err))

    }, [id])

    const displayOne = (url, index) => {
        // e.preventDefault()
        const newId = id
        axios
            .get(`${url}/`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setPerson(res.data)
                setActiveCharacter(index)
            })
            .catch((err) => console.log(err))
    }
    const styleBox = (index) => {
        if (index === activeCharacter) {
            return "content-container-active"
        }
        else return "content-container"
    }


    return (
        <div>
            <div className="display-flex">
                <div>
                    {
                        people.map((people, index) => (
                            <div key={people.name} className={styleBox(index)}>
                                <Link to={`/characters/${index + 1}`} className="link" onClick={() => displayOne(people.url, index)}>
                                    <p>
                                        {people.name}
                                    </p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="display-one-container">
                    <h2 className="name-style">{person.name}</h2>
                    <p className="display-one-text">Hair Color: {person.hair_color}</p>
                    <p className="display-one-text">Eye Color: {person.eye_color}</p>
                    <p className="display-one-text">Skin Color: {person.skin_color}</p>
                    <p className="display-one-text">Height: {person.height}</p>
                    <p className="display-one-text">Mass: {person.mass}</p>
                    <p className="display-one-text">Gender: {person.gender}</p>
                    <p className="display-one-text">Birth Year: {person.birth_year}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Characters;