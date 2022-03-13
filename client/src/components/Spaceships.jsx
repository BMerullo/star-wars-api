import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';


const Spaceships = (props) => {

    const [spaceship, setSpaceship] = useState({});
    const {spaceships, setSpaceships, id} = props;
    const [activeSpaceship, setActiveSpaceship] = useState(0)

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/starships/")
            .then((res) => {
                console.log("these are the results")
                console.log(res.data.results)
                setSpaceships(res.data.results)
            })
            .catch((err) => console.log(err))
            axios
            .get(`https://swapi.dev/api/starships/2/`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setSpaceship(res.data)
            })
            .catch((err) => console.log(err))
            
    },[id])

    const displayOneSpaceship = (url, index) => {
        
        axios
            .get(`${url}`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setSpaceship(res.data)
                setActiveSpaceship(index)
            })
            .catch((err) => console.log(err))
    }
    const styleBox = (index) => {
        if (index === activeSpaceship) {
            return "content-container-active"
        }
        else return "content-container"
    }

    return(
        <div className="display-flex">
        <div>
            {
                spaceships.map((ship, index) => (
                    <div key={ship.name} className={styleBox(index)}>
                        <Link to={`/spaceships/${index + 2}`} className="link" onClick={()=>displayOneSpaceship(ship.url, index)}>
                            <p>
                                {ship.name}
                            </p>
                        </Link>
                    </div>
                ))
            }
        </div>
        <div className="display-one-container">
            <h2 className="name-style">{spaceship.name}</h2>
            <p className="display-one-text">Manufactured By {spaceship.manufacturer}</p>
            <p className="display-one-text">Class: {spaceship.starship_class}</p>        
            <p className="display-one-text">Cost: {spaceship.cost_in_credits} Credits</p>
            <p className="display-one-text">Crew: {spaceship.crew}</p>
            <p className="display-one-text">Passenger Capacity: {spaceship.passengers}</p>   
            <p className="display-one-text">Cargo Capacity: {spaceship.cargo_capacity}</p>
            <p className="display-one-text">Hyperdrive Rating: {spaceship.hyperdrive_rating}</p>
            <p className="display-one-text">Max Atmosphere Speed: {spaceship.max_atmosphering_speed}</p>
        </div>

        </div>
    )
}

export default Spaceships;