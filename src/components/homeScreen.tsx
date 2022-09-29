import React, {useState, useEffect} from 'react'
import './styles/App.css'
import { Link } from 'react-router-dom';
import { themeData } from '../data/globalTypes'
import { Themes } from '../data/themes';
import { isMobile } from 'react-device-detect'

// consider making battle type a static option ALONG WITH theme: single, double, FFA

interface OGBProps { theme: themeData, onClick: any }
const OpenGameButton = ({theme, onClick}: OGBProps) => { 

  function handleClick(theme: themeData){
    onClick(theme);
  }

    return (
        <Link to="/battle">
            <button className='Open-Game-Button' onClick={() => { handleClick(theme) }} style={ isMobile ? {width: '15vw', height: '15vw'} : {width: '12vh', height: '12vh'} }>
                Start
            </button>
        </Link>
    )
  };   
  
  interface TBProps { theme: themeData; loaded: number; onClick: any; id: number}
  const ThemeButton = ({theme, onClick, id, loaded}: TBProps) => {

    function handleClick(theme: themeData, id: number){
      onClick(theme, id);
    }

    return (
      <button className='theme-button' onClick={() => handleClick(theme, id)} style={id === loaded ? {opacity:'100%'} : {opacity:'30%'}}>
        {theme.name}
      </button>
    )
  }

interface HSProps { onClick: any}
const HomeScreen = ({onClick}: HSProps) => {

  const [theme, setTheme] = useState(Themes.Blank);
  const [active, setActive] = useState(0);

  function handleThemeClick(th: themeData, id: number){
    setTheme(th);
    setActive(id);
  }

  function handleStartClick(theme: themeData){
    onClick(theme);
  }
  
    return (
      <div className="home-screen">

        <header className="App-header"> 
          <b>Poke Theme Battles</b> 
        </header>
        
        <div className='home-center'>
          
            <div className="pokeball" style={ isMobile ? {width: '80vw', height: '80vw'} : {width: '70vh', height: '70vh'} }>
              <div className='ball-upper-half'></div>
              <div className='ball-lower-half'></div>
            </div>

            <div className='ball-center-line' style={ isMobile ? {width: '82vw', height: '7vw'} : {width: '72vh', height: '7%'} }>
              <div className='ball-center-circle' style={ isMobile ? {width: '25vw', height: '25vw'} : {width: '22vh', height: '22vh'} }>
                {theme && <OpenGameButton theme={theme} onClick={handleStartClick}/>}
              </div>
            </div>
            <ThemeButton theme={Themes.StarterBrawl} loaded={active} onClick={handleThemeClick} id={1}/> 
          <ThemeButton theme={Themes.MonkeMashup} loaded={active} onClick={handleThemeClick} id={2}/>

        </div>

        <footer className="App-footer">
            
        </footer>

      </div>
    )

}

export default HomeScreen;