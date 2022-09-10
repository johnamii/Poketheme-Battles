import React, { ReactEventHandler, useEffect, useState, } from 'react'
import '../components/styles/battleScreen.css'
import Field from  './field'
import Trainer from '../sim/trainer'
import { MoveButton, TrainerCircle } from './battleStuff'
import Side from '../sim/side'
import { battleChoice,} from '../data/globalTypes'
import { wait } from '@testing-library/user-event/dist/utils'

type BCProps = { time: number };
interface BattleProps{ sides: Side[]; activeTrainers: number; endFunc: any}
interface BattleStates{
    side1CanContinue: boolean;
    controlsEnabled: boolean;
    turnCount: number;
    battleTimer: number;
    battleChoice?: battleChoice;
    turnMayStart: boolean;
}

class Battle extends React.Component<BattleProps, BattleStates> {
    constructor(props: BattleProps){
        super(props);
        this.getChoiceClick = this.getChoiceClick.bind(this);

        this.User.opponent = this.Opp;
        this.Opp.opponent = this.User;
    }

    state: BattleStates = {
        side1CanContinue: true,
        controlsEnabled: false,
        turnCount: 0,
        battleTimer: 30,
        turnMayStart: true,
    }

    User = this.props.sides[0].trainers[0];
    Opp = this.props.sides[1].trainers[0];
    TMate?: Trainer;
    Opp2?: Trainer;

    flipControls(){ this.setState({controlsEnabled: !this.state.controlsEnabled}) }

    getChoiceClick = (choice: battleChoice) => { this.setState({battleChoice: choice}); }

    timerCountDown() { 
        if (this.state.battleTimer > 0)
            this.setState({battleTimer: this.state.battleTimer - 1}); 
    }

    requestChoice(tr: Trainer): Promise<battleChoice>{ // TODO: add param to disable move buttons if switch required
        let temp = this.state.battleChoice;

        this.flipControls();

        return new Promise((resolve, reject) => { 

            const waitForChoice = setInterval(() => { // check for button click
                this.timerCountDown();

                if (this.state.battleChoice != temp && this.state.battleChoice){
                    this.setState({battleTimer: 30})
                    clearInterval(waitForChoice);
                    this.flipControls();
                    resolve(this.state.battleChoice);
                }
                else if (this.state.battleTimer === 0){
                    reject(tr.name + ' ran out of time!');
                    clearInterval(waitForChoice);
                }
            }, 1000);
        })
    };
    
    async getChoices(){
        
        let choices: battleChoice[] = [];

        const choice1 = await this.requestChoice(this.User)
            .then((val) => {choices.push(val)})
            .catch((val) => { this.endBattle(this.User); console.log(val)})

        choices.push(this.Opp.randomBattleChoice(this.Opp.getCurMonIndex()));

        // TODO: modernize to handle multiple: trainer and client inputs in loop (length of activeTrainers)
        
        return choices;
    }

    setChoiceOrder(arr: battleChoice[]): battleChoice[]{ // optimizable
        let switches: battleChoice[] = [];
        let pri: battleChoice[] = [];
        let normals: battleChoice[] = [];

        for (let i = 0; i < arr.length; i++){
            if (!arr[i].move){
                switches.push(arr[i]);
            }
            else{
                let theMove = arr[i].tr.getCurMon().getMove(arr[i].index);
                if (theMove.priority > 0){
                    pri.push(arr[i]);
                }
                else{
                    normals.push(arr[i]);
                }
            }
        }

        switches.sort((a, b) => parseFloat(b.tr.getCurMon().getStat().spe.toString()) - parseFloat(a.tr.getCurMon().getStat().spe.toString()));
        normals.sort((a, b) => parseFloat(b.tr.getCurMon().getStat().spe.toString()) - parseFloat(a.tr.getCurMon().getStat().spe.toString()));

        return switches.concat(pri, normals);
    }

    async enactTurn(choices: battleChoice[]) {
        console.log('Enacting turn');

        // do speed check, map each decision to priority bracket... 
        choices = this.setChoiceOrder(choices);

        // enact trainer decisions sequentially by priority
        for (let i = 0; i < choices.length; i++) 
        { 
            let opponent = choices[i].tr.opponent;
            let tr = choices[i].tr;
            let mon = tr.getCurMon();

            // set up string for either event
            if (choices[i].move) {
                var subject = tr.getCurMon().getName();
                var action = " used "
                var predicate = choices[i].tr.getCurMon().getMove(choices[i].index).name;
            }
            else {
                subject = tr.name;
                action = " sent out "
                predicate = choices[i].tr.getTeamMember(choices[i].index).getName();
            }
            var battleMessage = subject + action + predicate;

            // enact choice
            if (choices[i].tr.getCurMon().checkAlive()) {
                console.log(battleMessage);
                if (!choices[i].move) {
                    choices[i].tr.switchCurMon(choices[i].index);
                }
                else {
                    opponent && mon.useMove(choices[i].index, opponent.getCurMon());
                    opponent?.getCurMon().checkAlive();
                }

                // create pop up dialog
            }
            else{
                if (tr.getAliveTeamSize() > 0) 
                {
                    // demand switch: enable trainer circle, not moves
                    if (!tr.isComputer()){
                        // enable control
                        await this.requestChoice(tr).then((val) => {
                            tr.switchCurMon(val.index);
                        })
                    }
                    else {
                        tr.switchCurMon(tr.randomSwitchChoice());
                        console.log(tr.name + ' sent out ' + tr.getCurMon().getName())
                    }
                }
                else {
                    opponent && this.endBattle(opponent);
                }
            }
            await wait(750);
        }        

        for (let i = 0; i < choices.length; i++){
            let tr = choices[i].tr;
            if (tr.getCurMon().fainted && tr.getAliveTeamSize() > 0){ // consolidate into one function with above
                if (!tr.isComputer()){
                    await this.requestChoice(tr).then((val) => {
                        tr.switchCurMon(val.index);
                    })
                }
                else {
                    tr.switchCurMon(tr.randomSwitchChoice());
                    console.log(tr.name + ' sent out ' + tr.getCurMon().getName())
                }
            }
            else if (tr.getAliveTeamSize() === 0){
                tr.opponent && this.endBattle(tr.opponent)    
            }
        }
        // check for updates to status and residuals

        // update turn
        this.setState({turnMayStart: true, turnCount: this.state.turnCount++});
    }
    
    BattleController = ({time}: BCProps) => {
        useEffect(() => {
            if (this.state.turnMayStart){
                this.setState({turnMayStart: false});

                let turn = this.getChoices()
                .then((choices) => this.enactTurn(choices));  
            }

        });

        return (
            <div className="battle-timer"> 
                Timer: {this.state.battleTimer}
            </div>
        )
    }

    endBattle(tr: Trainer) {
        console.log('test')
        this.props.endFunc(tr);
    }

    render(){
        let curmon1 = this.User.getCurMon();
        let enabled = this.state.controlsEnabled;

        return( // update to display map instead of 4 of same thing
            <div className='battle-div'>

                <div className="upper">
                    <div className="trainer-box"> 
                        <div className='inner-trainer-box'> { this.TMate && <TrainerCircle tr={this.TMate} onLeft={true} enabled={enabled && !this.TMate.isComputer()}/>} </div>
                        <div className="inner-trainer-box"> <TrainerCircle tr={this.User} onLeft={true} handleClick={this.getChoiceClick} enabled={enabled && !this.User.isComputer()}/> </div>
                    </div>

                    <Field curMon1={this.User.getCurMon()} curMon2={this.Opp.getCurMon()}/>

                    <div className="trainer-box">
                        <div className='inner-trainer-box'> <TrainerCircle tr={ this.Opp } onLeft={false} enabled={enabled && !this.Opp.isComputer()}/>
                        <div className='inner-trainer-box'> </div>{ this.Opp2  && <TrainerCircle tr={this.Opp2} onLeft={false} enabled={enabled && !this.Opp2.isComputer()}/> } </div>
                    </div> 

                </div>

                <div className='lower'>
                    <div className="move-bar">
                        {<div className="move-set">
                            {(enabled && curmon1.getMove(0)) ? <MoveButton move={curmon1.getMove(0)} handleClick={this.getChoiceClick} value={{tr: this.User, move: true, index: 0}}/> : <div className="empty-move-button"/>}
                            {(enabled && curmon1.getMove(1)) ? <MoveButton move={curmon1.getMove(1)} handleClick={this.getChoiceClick} value={{tr: this.User, move: true, index: 1}}/> : <div className="empty-move-button"/>}
                            {(enabled && curmon1.getMove(2)) ? <MoveButton move={curmon1.getMove(2)} handleClick={this.getChoiceClick} value={{tr: this.User, move: true, index: 2}}/> : <div className="empty-move-button"/>}
                            {(enabled && curmon1.getMove(3)) ? <MoveButton move={curmon1.getMove(3)} handleClick={this.getChoiceClick} value={{tr: this.User, move: true, index: 3}}/> : <div className="empty-move-button"/>}
                        </div>}
                    </div>

                    <this.BattleController time={this.state.battleTimer} />
                </div> 
            </div>
        )
    }
}

export default Battle;