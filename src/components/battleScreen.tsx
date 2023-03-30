import React from 'react'
import './styles/battleScreen.css'
import { themeData } from '../data/globalTypes'
import Trainer from '../sim/trainer'
import Side from '../sim/side'
import Battle from './battle'
import { isMobile } from 'react-device-detect'

type BoxProps = { tr: Trainer; handleClick?: any };

const StartSelectionBox = (props: BoxProps) => {

    const selectionBoxStyles = {
        width: isMobile ? '85%' : '50%',
        height: isMobile ? '40%' : '40%',
        marginLeft: !isMobile 
            ? props.tr.isComputer() ? '40%' : '-40%'
            : props.tr.isComputer() ? '10%' : '-10%',
        borderColor: props.tr.isComputer() ? 'pink' : '#C2FFB6', // make these more mild

    }

    return (
        <div className="start-selection-box" style={selectionBoxStyles}>
            <div className='start-box-trainer'> 
              <img src={props.tr.sprite} className="start-box-trainer-icon" alt='tr'/> 
            </div>
            <div className='start-box-team'>
                {
                    props.tr.team.map((mon, i) => {
                        return (
                            <div className='start-box-pokemon'>
                                <img 
                                  key={mon.data.dex.name}
                                  src={mon.getSprite('menu')} 
                                  className="start-box-mon-icon" 
                                  onClick={() => props.handleClick(i)} 
                                  alt="mon"
                                />
                            </div>
                        )                       
                    })
                }
            </div>
        </div>
    )
}

const EndBox = () => <h1> BATTLE OVER </h1>

interface Props { theme: themeData; sides: Side[]; }

// TODO: does state have to be like this in a class?
interface State { battleStarted: boolean; battleOver: boolean, battleStatus: string }

const startBoxStyles = {
    width: isMobile ? '98%' : '75%',
}

class BattleScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State){
        super(props);

        this.handleStartChoice = this.handleStartChoice.bind(this);
        this.endBattle = this.endBattle.bind(this);
    }

    state: State = {
        battleStarted: false,
        battleOver: false,
        //TODO: remove these states, switch to battlestatus
        battleStatus: "Selection"
    }

    handleStartChoice = (value: number) => {
        this.props.sides[1].trainers[0].switchCurMon(this.props.sides[1].trainers[0].randomStartChoice());
        this.props.sides[0].trainers[0].switchCurMon(value);
        this.setState({ battleStarted: true });
        // TEMPORARY SOLUTION: switch to promises, awaiting all intputs. then fill in for any computer
    }

    endBattle(tr: Trainer){
        console.log(tr.name + ' won the battle!');
        this.setState({battleOver: true});
    }

    render() {
        let s1Trs = this.props.sides[0].trainers;
        let s2Trs = this.props.sides[1].trainers;

        return(
            <div className="game-screen">
                <header className="App-header"> <b> {this.props.theme.name} </b></header>

                {!this.state.battleOver
                    ? this.state.battleStarted
                        ? <Battle sides={this.props.sides} activeTrainers={2} endFunc={this.endBattle} />
                        : <div className='start-box' style={startBoxStyles}>
                            {s2Trs[1] ? <StartSelectionBox tr={s2Trs[1]}/> : <div style={{width: 300, height: 50}}/>}
                            <StartSelectionBox tr={s2Trs[0]}/>
                            <div><h2>VS.</h2></div>
                            <StartSelectionBox tr={s1Trs[0]} handleClick={this.handleStartChoice}/>
                            {s1Trs[1] ? <StartSelectionBox tr={s1Trs[1]}/> : <div style={{width: 300, height: 50}}/>}
                          </div>
                    : <EndBox/>
                }
                
            </div>
        )
    }
}   

export default BattleScreen;