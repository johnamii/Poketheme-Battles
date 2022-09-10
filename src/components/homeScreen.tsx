import React from 'react'
import './styles/App.css'
import { Link } from 'react-router-dom';

const OpenGameButton = () => { 
    return (
        <Link to="/battle">
            <button className='Open-Game-Button' onClick={() => { }}>
                Start
            </button>
        </Link>
    )
  };   
  
  const ThemeButton = () => {
    return (
      <button>

      </button>
    )
  }

// home screen: cool pokeball design where center is the play battle button
// floating seleciton circles around pokeball to choose the specific theme battle, alters play button
  // show link from theme bubble to ball, flowing data inward
  // perhaps bubbles could be orbiting around on circles around ball
    // static while selecting, once play is hit, do animation to spin them all around ball and start

// TODO: upload to repository, switch this list to project manager on github

// TODO: get logo to put on homescreen

// LATE TODO: ADD ANIMATIONS:
  // SWITCH: CURRENT MOVES BACKWARDS, NEW BALL GETS THROWN OUT AND NEW MON GROWS UPWARDS
  // ATTACK: PHYSICAL: MON MOVES FURTHER FORWARD IN CIRCULAR MOTION... SPECIAL: MON DRAGS BACK THEN PUSHES FORWARD
      // EFFECT THE COLOR OF MOVE APPEARS ON SUBJECT OF MOVE

// consider making battle type a static option ALONG WITH theme: single, double, FFA
interface HomeProps{}
class HomeScreen extends React.Component<HomeProps> {
  constructor(props: HomeProps){
      super(props);
  }

  render() {
    return (
      <div className="home-screen">

        <header className="App-header"> <b>Poke Theme Battles</b> </header>
        
        <div className='home-center'>
          
          <div className="pokeball">
            <div className='ball-upper-half'></div>
            <div className='ball-lower-half'></div>
          </div>

          <div className='ball-center-line'>
            <div className='ball-center-circle'>
              <OpenGameButton/>
            </div>
          </div>

        </div>

        <footer className="App-footer">
            test
        </footer>

      </div>
    )
  }

}

export default HomeScreen;