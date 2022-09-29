import React from 'react'
import './styles/battleScreen.css'
import { themeData } from '../data/globalTypes'
import Trainer from '../sim/trainer'
import Side from '../sim/side'
import Battle from './battle'
import { isMobile } from 'react-device-detect'

type BoxProps = { tr: Trainer; handleClick?: any };

const StartSelectionBox = ({tr, handleClick}: BoxProps) => {
    
    var choiceClick = (index: number) => {
        handleClick(index);
    }

    return (
        <div className="start-team-box">
            <div style={{paddingTop: 75}}> <img src={tr.sprite} alt='tr'/> </div>
            <div style={{height: 200, width: 200}}>
                {tr.team[0] && <img src={tr.team[0].getSprite('menu')} className="start-box-icon" onClick={() => choiceClick(0)} alt='mon'/>}
                {tr.team[1] && <img src={tr.team[1].getSprite('menu')} className="start-box-icon" onClick={() => choiceClick(1)} alt='mon'/>}
                {tr.team[2] && <img src={tr.team[2].getSprite('menu')} className="start-box-icon" onClick={() => choiceClick(2)} alt='mon'/>}
                {tr.team[3] && <img src={tr.team[3].getSprite('menu')} className="start-box-icon" onClick={() => choiceClick(3)} alt='mon'/>}
                {tr.team[4] && <img src={tr.team[4].getSprite('menu')} className="start-box-icon" onClick={() => choiceClick(4)} alt='mon'/>}
                {tr.team[5] && <img src={tr.team[5].getSprite('menu')} className="start-box-icon" onClick={() => choiceClick(5)} alt='mon'/>}
            </div>
            
        </div>
    )
}

const EndBox = (() => {
    return (
        <div> BATTLE OVER </div>
    )
})

interface Props { theme: themeData; sides: Side[]; }
interface State { battleStarted: boolean; battleOver: boolean }

class BattleScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State){
        super(props);

        this.handleStartChoice = this.handleStartChoice.bind(this);
        this.endBattle = this.endBattle.bind(this);

    }

    state: State = {
        battleStarted: false,
        battleOver: false
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
                        : <div className='start-box'>
                            {s2Trs[1] ? <StartSelectionBox tr={s2Trs[1]}/> : <div style={{width: 300, height: 50}}/>}
                            <StartSelectionBox tr={s2Trs[0]}/>
                            
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