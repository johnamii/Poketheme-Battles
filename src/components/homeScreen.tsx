import './styles/App.css'
import { themeData } from '../data/globalTypes'
import { Themes } from '../data/themes';
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

// consider making battle type a static option ALONG WITH theme: single, double, FFA
   
interface ThemeButtonProps { theme?: themeData; onClick?: any; offsetY?: number;}
interface HomeScreenProps { themeClick: any; curTheme: string;}

const HomeScreen = (props: HomeScreenProps) => {
  const navigate = useNavigate();
  var curTheme = props.curTheme;

  const ThemeButton = (props: ThemeButtonProps) => {

    const style = {
      background: props.theme?.id === curTheme ? 'lightskyblue' : '#191b23',
      top: props.offsetY ?? 0
    }

    return (
      <button className='theme-button' onClick={() => props.onClick(props.theme)} style={style}>
        {props.theme?.name}
      </button>
    )
  }

  const OpenGameButton = (props: {active: boolean}) => { 

    const openStyle = { backgroundColor: props.active ? 'white' : 'transparent' }
    
    // initialize game with theme mapped to curTheme (string) without whitespace
    return (
        <button 
         className='Open-Game-Button' 
         onClick={() => {props.active && navigate('/battle')}}
         style={openStyle}
        >
          {props.active && "Start Game"}
        </button>
    )
  };

  return (
    <div className="home-screen">

      <header className="App-header"> 
        <b>Poke Theme Battles</b> 
      </header>
      
      <div className='home-center'>
        
          <div className="pokeball" style={isMobile ? {width:'95%'} : {height:'95%'}}>
            <div className='ball-half' style={{background: '#a21c1c'}}>
              <ThemeButton theme={Themes.StarterBrawl} onClick={props.themeClick} offsetY={40}/> 
              <ThemeButton theme={Themes.MonkeMoshpit} onClick={props.themeClick} offsetY={-30}/>
              <ThemeButton offsetY={40}/>
            </div>
              
              <div className='ball-center-line'>
                <div className='ball-center-circle'>
                  <OpenGameButton active={curTheme !== ''}/>
                </div>
              </div>
              
            <div className='ball-half' style={{background: 'whitesmoke'}}>
              <ThemeButton offsetY={-40}/> 
              <ThemeButton offsetY={30}/>
              <ThemeButton offsetY={-40}/>
            </div>
          </div>

      </div>

      <footer className="App-footer"/>
    </div>
  )

}

export default HomeScreen;