import React, {useEffect, useRef} from 'react'
import Trainer from '../sim/trainer'
import Pokemon from '../sim/pokemon'
import { moveData, battleChoice, battleEvent } from '../data/globalTypes'
import { TypeChart } from '../data/typeChart'
import './styles/battleStuff.css'
import { randInt } from '../sim/functions'

interface TrainerCircProps { tr: Trainer; onLeft: boolean; handleClick?: any, enabled: boolean }
interface SwitchButtonProps { mon: Pokemon; onLeft: boolean; active: boolean; value: battleChoice; fainted?: boolean }
export class TrainerCircle extends React.Component<TrainerCircProps> {

    handleClick = (choice: battleChoice) => { this.props.handleClick(choice); } 

    render() {
        const { tr } = this.props;
        let curMonIndex = this.props.tr.getCurMonIndex();
        
        return (// CHANGE THIS TO MAP INSTEAD OF 6 ITERATIONS OF SAME
            <fieldset className="trainer-outer-circle">
                <div className="circle-row">
                    {tr.team[0] 
                    ? <this.SwitchButton mon={tr.team[0]} onLeft={this.props.onLeft} active={curMonIndex === 0} value={{tr: this.props.tr, move: false, index: 0}}/> 
                    : <div className="empty-switch-button"/> 
                    }
                    
                    {tr.team[1] 
                    ? <this.SwitchButton mon={tr.team[1]} onLeft={this.props.onLeft} active={curMonIndex === 1} value={{tr: this.props.tr, move: false, index: 1}}/> 
                    : <div className="empty-switch-button"/> 
                    }
                </div>

                <div className="circle-row">
                    {tr.team[2] 
                    ? <this.SwitchButton mon={tr.team[2]} onLeft={this.props.onLeft} active={curMonIndex === 2} value={{tr: this.props.tr, move: false, index: 2}}/> 
                    : <div className="empty-switch-button"/> 
                    }

                    <div className="trainer-inner-circle"> 
                        <img src={this.props.tr.sprite} alt="tr" className={this.props.onLeft ? "trainer-sprite-left" : "trainer-sprite-right"}/> 
                    </div>

                    {tr.team[3] 
                    ? <this.SwitchButton mon={tr.team[3]} onLeft={this.props.onLeft} active={curMonIndex === 3} value={{tr: this.props.tr, move: false, index: 3}}/> 
                    : <div className="empty-switch-button"/> 
                    }
                </div>

                <div className="circle-row">
                    {tr.team[4] 
                    ? <this.SwitchButton mon={tr.team[4]} onLeft={this.props.onLeft} active={curMonIndex === 4} value={{tr: this.props.tr, move: false, index: 4}}/> 
                    : <div className="empty-switch-button"/> 
                    }
                    {tr.team[5] 
                    ? <this.SwitchButton mon={tr.team[5]} onLeft={this.props.onLeft} active={curMonIndex === 5} value={{tr: this.props.tr, move: false, index: 5}}/> 
                    : <div className="empty-switch-button"/> 
                    }
                </div>                
            </fieldset>
        )
    }

    SwitchButton = ({mon, onLeft, active, value, fainted}: SwitchButtonProps) => {        
        return (
            <div>
                <button 
                    className='switch-button' 
                    style={mon.fainted ? {backgroundColor:'#401212'} : !active ? {opacity: .5} : {opacity: 1}}
                    onClick={(e) => this.handleClick(value)}
                    disabled={!this.props.enabled}
                    id="choice-button"
                    >
                    <img src={mon && mon.getSprite('menu') } className={onLeft ? "switch-sprite-left" : "switch-sprite-right"} alt='icon'/>
                </button>
                <i className="switch-button-text"> {mon && mon.getName()} </i>
            </div>
            
        )
    }
}

interface MoveButtonProps { mon?: Pokemon; move: moveData; handleClick: any; value: battleChoice;}
export const MoveButton = ({mon, move, handleClick, value}: MoveButtonProps) => { 
        
        return (
            <button 
            className='move-button' 
            style={{backgroundColor: TypeChart[move.type].color1, borderColor: TypeChart[move.type].color2}}
            onClick={(e) => handleClick(value)}
            id="choice-button"
            >
                <div >{ move.name }</div>
            </button>
        )
}

interface MoveBarProps { enabled: boolean, tr: Trainer, handleClick: any }
export const MoveBar = ({enabled, tr, handleClick}: MoveBarProps) => {
    let mon = tr.getCurMon();
    return (
        <div className="move-bar">
            <div className="move-set">
                {(enabled && mon.getMove(0)) ? <MoveButton move={mon.getMove(0)} handleClick={handleClick} value={{tr: tr, move: true, index: 0}}/> : <div className="empty-move-button"/>}
                {(enabled && mon.getMove(1)) ? <MoveButton move={mon.getMove(1)} handleClick={handleClick} value={{tr: tr, move: true, index: 1}}/> : <div className="empty-move-button"/>}
                {(enabled && mon.getMove(2)) ? <MoveButton move={mon.getMove(2)} handleClick={handleClick} value={{tr: tr, move: true, index: 2}}/> : <div className="empty-move-button"/>}
                {(enabled && mon.getMove(3)) ? <MoveButton move={mon.getMove(3)} handleClick={handleClick} value={{tr: tr, move: true, index: 3}}/> : <div className="empty-move-button"/>}
            </div>
        </div>
    )
}

interface BoxProps { events: battleEvent[]; }
export const EventLogBox = ({events}: BoxProps) => {

    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current && bottomRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    let textList = events.map(({text, subtext}) => {
        return <ul key={randInt(0, 9999)} style={{fontSize:'small', textIndent:'-10%', backgroundColor:'black', borderRadius:'1mm'}}> 
                    { text } 
                    <br/>
                    <small style={{color:'gray'}}>{ subtext?.map((sub) => { return <ul key={randInt(0, 9999)}> {sub} <br/></ul>}) } </small>
                </ul>
    }); 

    useEffect(() => {
        scrollToBottom();
    })

    return (
        <div className='event-log-box'>
            {textList}
            <div ref={bottomRef}></div>
        </div>
    )
}