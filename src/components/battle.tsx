import React, { useEffect } from 'react'
import '../components/styles/battleScreen.css'
import Field from  './field'
import Trainer from '../sim/trainer'
import { MoveBar, TrainerCircle, EventLogBox } from './battleStuff'
import Side from '../sim/side'
import { battleChoice, battleEvent} from '../data/globalTypes'
import { wait } from '@testing-library/user-event/dist/utils'
import { setChoiceOrder, writeEvent } from '../sim/functions'

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
        this.LogEvent({text: "The battle has started.", dialog: true})
    }

    state: BattleStates = {
        side1CanContinue: true,
        controlsEnabled: false,
        turnCount: 0,
        battleTimer: 30,
        turnMayStart: true,
    }

    eventLog: battleEvent[] = [];

    User = this.props.sides[0].trainers[0];
    Opp = this.props.sides[1].trainers[0];
    TMate?: Trainer;
    Opp2?: Trainer;

    async LogEvent(event: battleEvent){
        console.log(event.text);
        this.eventLog.push(event);
        await wait(750);
    }

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

            const waitForChoice = setInterval(() => {
                this.timerCountDown();

                if (this.state.battleChoice !== temp && this.state.battleChoice){
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

    async fieldAliveChecks(choices: battleChoice[]){
        for (let i = 0; i < choices.length; i++){
            let tr = choices[i].tr;

            if (tr.getCurMon().fainted && tr.getAliveTeamSize() !== 0){ 
                tr.getCurMon().switchOut();
                await this.demandSwitch(tr);
            }
            else if (tr.getAliveTeamSize() === 0){
                tr.opponent && await this.endBattle(tr.opponent)    
            }
        }
    }

    async demandSwitch(tr: Trainer){
        // demand switch: enable trainer circle, not moves
        if (!tr.isComputer()){
            await this.requestChoice(tr).then((val) => {
                tr.switchCurMon(val.index);
            });
        }
        else {
            tr.switchCurMon(tr.randomSwitchChoice());
        }

        let message = (tr.name + ' sent out ' + tr.getCurMon().getName());
        await this.LogEvent({text: message, dialog: true});
    }
    
    async getChoices(){
        
        let choices: battleChoice[] = [];

        await this.requestChoice(this.User)
            .then((val) => {choices.push(val)})
            .catch((val) => { this.endBattle(this.User); console.log(val)})

        choices.push(this.Opp.randomBattleChoice(this.Opp.getCurMonIndex()));

        // TODO: modernize to handle multiple: trainer and client inputs in loop (length of activeTrainers)

        // do speed check, map each decision to priority bracket... 
        choices = setChoiceOrder(choices);
        
        return choices;
    }

    async enactTurn(choices: battleChoice[]) 
    {
        // enact trainer decisions sequentially by priority
        for (let i = 0; i < choices.length; i++) 
        { 
            let opponent = choices[i].tr.opponent;
            let tr = choices[i].tr;
            let mon = tr.getCurMon();

            // enact choice
            if (choices[i].tr.getCurMon().checkAlive()) {
                let subtext: string[] = [];

                if (!choices[i].move) {
                    tr.getCurMon().switchOut();
                    choices[i].tr.switchCurMon(choices[i].index);
                }
                else {
                    opponent && mon.useMove(choices[i].index, opponent.getCurMon(), subtext);
                    
                    opponent?.getCurMon().checkAlive();
                }

                await this.LogEvent(writeEvent(choices[i], subtext));

            }
            else{
                // Demand switch if tr has remaining mons
                if (tr.getAliveTeamSize() !== 0) 
                {
                    tr.getCurMon().switchOut();
                    await this.demandSwitch(tr);
                }
                else {
                    opponent && await this.endBattle(opponent);
                }
            }
            await wait (100);
        }        

        // check for fainted mons post-moves
        await this.fieldAliveChecks(choices);

        // check for updates to status and residuals
        for (let i = 0; i < choices.length; i++){
            choices[i].tr.getCurMon().residualConditions('clear');
        }

        await this.fieldAliveChecks(choices);

        // update turn
        this.setState({turnMayStart: true, turnCount: this.state.turnCount++});
    }
    
    BattleController = () => {
        useEffect(() => {
            if (this.state.turnMayStart){
                this.setState({turnMayStart: false});

                this.getChoices()
                .then((choices) => this.enactTurn(choices));  
            }
        });

        return (
            <div className="battle-timer"> 
                Timer: {this.state.battleTimer}
            </div>
        )
    }

    async endBattle(tr: Trainer) {
        let message = tr.opponent && tr.opponent.name + 'won the battle!';
        message && await this.LogEvent({text: message, dialog: true});
        this.props.endFunc(tr);
    }

    render(){
        let enabled = this.state.controlsEnabled;

        return( // update to display map instead of 4 of same thing
            <div className='battle-div'>

                <div className="upper">
                    <div className="trainer-box"> 
                        <div className='inner-trainer-box'> { this.TMate && <TrainerCircle tr={this.TMate} onLeft={true} enabled={enabled && !this.TMate.isComputer()}/>} </div>
                        <div className="inner-trainer-box"> <TrainerCircle tr={this.User} onLeft={true} handleClick={this.getChoiceClick} enabled={enabled && !this.User.isComputer()}/> </div>
                    </div>

                    <Field curMon1={this.User.getCurMon()} curMon2={this.Opp.getCurMon()} events={this.eventLog}/>

                    <div className="trainer-box">
                        <div className='inner-trainer-box'> <TrainerCircle tr={ this.Opp } onLeft={false} enabled={enabled && !this.Opp.isComputer()}/>
                        <div className='inner-trainer-box'> </div>{ this.Opp2  && <TrainerCircle tr={this.Opp2} onLeft={false} enabled={enabled && !this.Opp2.isComputer()}/> } </div>
                    </div> 

                </div>

                <div className='lower'>
                    <this.BattleController />
                    <MoveBar enabled={enabled} tr={this.User} handleClick={this.getChoiceClick}/>
                    <EventLogBox events={this.eventLog}/>
                </div> 
            </div>
        )
    }
}

export default Battle;