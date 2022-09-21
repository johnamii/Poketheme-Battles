import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import BattleScreen from './battleScreen'
import HomeScreen from './homeScreen';
import { Themes } from '../data/themes';
import Side from '../sim/side'
import { Trainers } from '../data/trainers'
import Trainer from '../sim/trainer';
import ComputerTrainer from '../sim/computerTrainer'
import { themeData } from '../data/globalTypes';

const App = () => { 

  const [curTheme, setCurTheme] = useState(Themes.Blank);

  function handleStartClick(theme: themeData){
    setCurTheme(theme);
  }

  // update to take multiple client users instead of computer
  function initSides(theme: themeData): Side[]{
    return [
      new Side( [new Trainer({data: Trainers.User, team: theme.generateTeam()} )]),
      new Side([new ComputerTrainer( { data: Trainers.Other, team: theme.generateTeam() } )])
    ];
  }

  // MAIN COMPONENT TREE
  return (
    <div style={{backgroundColor:'#191b23'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/poketheme-battles" element={ <HomeScreen onClick={handleStartClick}/> } />
          <Route 
            path="/battle" 
            element={ <BattleScreen theme={curTheme} sides={initSides(curTheme)} /> } 
          />
          <Route path="/themes" element = {<h1> themes go here </h1>} />
          <Route path="/about" element = {<h1>info about game and me</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;