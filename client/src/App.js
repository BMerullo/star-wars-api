import './App.css';
import logo from './images/logo_img.png'
import { Router } from '@reach/router'
import React, {useState} from 'react'
import NavBarMap from './components/NavBarMap';
import Characters from './components/Characters';
import Movies from './components/Movies';
import Planets from './components/Planets';
import Species from './components/Species';
import Spaceships from './components/Spaceships';
import Vehicles from './components/Vehicles';
function App() {

  const [people, setPeople] = useState([]);
  const [movies, setMovies] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [spaceships, setSpaceships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [activeTab, setActiveTab] = useState("0");
  

  return (
    <div className="App">
      <img src={logo} alt="LOGO" className="logo"/>
      <div className="main-page-cont">
      <NavBarMap/>
      <Router>
        <Characters path="/characters/:id" people={people} setPeople={setPeople} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Movies path="/movies/:id" default movies={movies} setMovies={setMovies} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Planets path="/planets/:id" planets={planets} setPlanets={setPlanets} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Species path="/species/:id" species={species} setSpecies={setSpecies} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Spaceships path="/spaceships/:id" spaceships={spaceships} setSpaceships={setSpaceships} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Vehicles path="/vehicles/:id" vehicles={vehicles} setVehicles={setVehicles} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </Router>
      </div>
    </div>
  );
}

export default App;
