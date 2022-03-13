import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Vehicles = (props) => {

    const [vehicle, setVehicle] = useState({});
    const {vehicles, setVehicles, id} = props
    const [activeVehicle, setActiveVehicle] = useState(0)
    useEffect(() => {
        axios
            .get("https://swapi.dev/api/vehicles/")
            .then((res) => {
                console.log("these are the results")
                console.log(res.data.results)
                setVehicles(res.data.results)
            })
            .catch((err) => console.log(err))
        axios
            .get(`https://swapi.dev/api/vehicles/4`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setVehicle(res.data)
            })
            .catch((err) => console.log(err))

    }, [id])
    const displayOneVehicle = (url, index) => {
        const newId = id
        axios
            .get(`${url}`)
            .then((res) => {
                console.log("Display One")
                console.log(res.data)
                setVehicle(res.data)
                setActiveVehicle(index)
            })
            .catch((err) => console.log(err))
    }
    const styleBox = (index) => {
        if (index === activeVehicle) {
            return "content-container-active"
        }
        else return "content-container"
    }

    return (
        <div className="display-flex">
            <div>
                {
                    vehicles.map((ride, index) => (
                        <div key={ride.name} className={styleBox(index)}>
                            <Link to={`/characters/${index + 4}`} className="link" onClick={() => displayOneVehicle(ride.url, index)}>
                                <p>
                                    {ride.name}
                                </p>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="display-one-container">
            <h2 className="name-style">{vehicle.name}</h2>
            <p className="display-one-text">Manufactured By {vehicle.manufacturer}</p>
            <p className="display-one-text">{vehicle.model}</p>
            <p className="display-one-text">Class: {vehicle.vehicle_class}</p>
            <p className="display-one-text">Cost {vehicle.cost_in_credits}</p>
            <p className="display-one-text">Crew: {vehicle.crew}</p>
            <p className="display-one-text">Passengers: {vehicle.passengers}</p>
            <p className="display-one-text">Cargo Capacity: {vehicle.cargo_capacity}</p>
            <p className="display-one-text">Speed: {vehicle.max_atmosphering_speed}</p>
            
            </div>
        </div>
    )
}

export default Vehicles;