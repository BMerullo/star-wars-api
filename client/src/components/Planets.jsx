import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Planets = (props) => {

    const [planet, setPlanet] = useState({});
    const { planets, setPlanets, id } = props
    const [activePlanet, setActivePlanet] = useState(0)
    useEffect(() => {
        axios
            .get("https://swapi.dev/api/planets/")
            .then((res) => {
                console.log("these are the results")
                console.log(res.data.results)
                setPlanets(res.data.results)
            })
            .catch((err) => console.log(err))
        axios
            .get(`https://swapi.dev/api/planets/1`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setPlanet(res.data)
            })
            .catch((err) => console.log(err))

    }, [id])
    const displayOnePlanet = (url, index) => {
        axios
            .get(`${url}/`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setPlanet(res.data)
                setActivePlanet(index)
            })
            .catch((err) => console.log(err))
    }
    const styleBox = (index) => {
        if (index === activePlanet) {
            return "content-container-active"
        }
        else return "content-container"
    }
    

    return (
        <div className="display-flex">
            <div>
                {
                    planets.map((rock, index) => (
                        <div key={rock.name} className={styleBox(index)}>
                            <Link to={`/characters/${index + 1}`} className="link" onClick={() => displayOnePlanet(rock.url, index)}>
                                <p>
                                    {rock.name}
                                </p>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="display-one-container">
            <h2 className="name-style">{planet.name}</h2>
            <p className="display-one-text">Population: {planet.population}</p>
            <p className="display-one-text">Climate: {planet.climate}</p>
            <p className="display-one-text">Surface Water: {planet.surface_water}</p>
            <p className="display-one-text">Terrain {planet.terrain}</p>
            <p className="display-one-text">Diameter: {planet.diameter}</p>
            <p className="display-one-text">Gravity: {planet.gravity}</p>
            <p className="display-one-text">Orbit: {planet.orbital_period} days</p>
            <p className="display-one-text">Rotation: {planet.rotation_period}</p>

            </div>
        </div>
    )
}

export default Planets;