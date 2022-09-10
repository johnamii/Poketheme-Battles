import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import BattleScreen from './battleScreen'
import HomeScreen from './homeScreen';
import { Themes } from '../data/themes';
import Side from '../sim/side'
import { Trainers } from '../data/trainers'
import Trainer from '../sim/trainer';
import ComputerTrainer from '../sim/computerTrainer'

interface Props {}
class App extends React.Component<Props> { 
  constructor(props: Props){
    super(props);
  }

  starterBrawl=[
    new Side( [new Trainer({data: Trainers.User, team: Themes.StarterBrawl.generateTeam()} )]),
    new Side([new ComputerTrainer( { data: Trainers.Other, team: Themes.StarterBrawl.generateTeam() } )])
  ];

  // MAIN COMPONENT TREE
  render() {
    return (
      <div style={{backgroundColor:'#191b23'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <HomeScreen /> } />
            <Route 
              path="/battle" 
              element={ <BattleScreen theme={Themes.StarterBrawl} sides={this.starterBrawl} /> } 
            />
            <Route path="/themes" element = {<h1> themes go here </h1>} />
            <Route path="/about" element = {<h1>info about game and me</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;