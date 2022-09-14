import React, {useState, useEffect} from 'react'
import './styles/App.css'
import { Link } from 'react-router-dom';
import { themeData } from '../data/globalTypes'
import { Themes } from '../data/themes';

// consider making battle type a static option ALONG WITH theme: single, double, FFA

interface OGBProps { theme: themeData, onClick: any }
const OpenGameButton = ({theme, onClick}: OGBProps) => { 

  function handleClick(theme: themeData){
    console.log('test1')
    onClick(theme);
  }

    return (
        <Link to="/battle">
            <button className='Open-Game-Button' onClick={() => { handleClick(theme) }}>
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
    console.log('test2')
    onClick(theme);
  }
  
    return (
      <div className="home-screen">

        <header className="App-header"> 
          <b>Poke Theme Battles</b> 
        </header>
        
        <div className='home-center'>
          
          <div className="pokeball">
            <div className='ball-upper-half'></div>
            <div className='ball-lower-half'></div>
          </div>

          <div className='ball-center-line'>
            <div className='ball-center-circle'>
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