import { useState } from 'react';
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
  
  const [curThemeId, setCurThemeId] = useState('');

  function themeClick(theme: themeData){
    setCurThemeId(theme.id);
  }

  // update to take multiple client users instead of computer
  function initSides(theme: themeData): Side[]{
    console.log('curtheme is: ' + curThemeId)
    return [
      new Side( [ new Trainer({data: Trainers.User, team: theme.generateTeam()} )]),
      new Side( [ new ComputerTrainer( { data: Trainers.Other, team: theme.generateTeam()} )])
    ];
  }

  // MAIN COMPONENT TREE
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen themeClick={themeClick} curTheme={curThemeId}/>} />
        <Route 
         path="/battle"
         element={ 
          Themes[curThemeId] !== undefined ? 
           <BattleScreen theme={Themes[curThemeId]} sides={initSides(Themes[curThemeId])} /> 
           :
           <HomeScreen themeClick={themeClick} curTheme={curThemeId}/>
          } 
        />
        <Route path="/themes" element = {<h1> themes go here </h1>} />
        <Route path="/about" element = {<h1>info about game and me</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;