import React, { useState } from 'react'
import Pokemon from '../sim/pokemon'
import Trainer from '../sim/trainer'
import './styles/field.css'

interface BarProps { occupant: Pokemon; }
export const StatusBar = ({occupant}: BarProps) => {

    let percent = Math.floor(occupant.getCurHealth() / occupant.getStat().hp * 100);
    if (percent >= 51){
        var healthColor = '#64c735';
    }
    else if (percent >= 20){
        healthColor = '#fad04e';
    }
    else{
        healthColor = 'red';
    }

    let statTags = []; // getStatMods()
    let statusCondition = ''; // getStatusCondition()

    // status tags / stat tags / condition tags
    return (
        <div className="status-bar">
            <b>{occupant.getName()}  L{occupant.getLevel()}</b>

            <div className='inner-bar'>
                <div style={{marginLeft: 5}}><b> {percent}% </b></div>
                <div className='health-bar'>
                    <div className='percent-bar'
                        style={{
                        backgroundColor: healthColor,
                        width: percent / 100 * 150,
                        height: 9,
                        borderRadius: 'inherit',
                        display:'block'
                        }}>
                            
                    </div>
                </div>
            </div>
        </div>
    )
    
}

interface SlotProps { sprite: string; occupant: Pokemon; }

interface SlotState {
    stealthRock: number;
    spikes: number;
    leechseed: boolean;
    auroraVeil: number;
    lightScreen: number;
    reflect: number;    
}

class Slot extends React.Component<SlotProps, SlotState> {
    constructor(props: SlotProps){
        super(props);
    }
    state: SlotState = {
        stealthRock: 0,
        spikes: 0,
        leechseed: false,
        auroraVeil: 0,
        lightScreen: 0,
        reflect: 0
    }

    render() {
        return (
            <div className={this.props.sprite + '-container'}>

                <StatusBar occupant={this.props.occupant}/>

                { this.props.sprite === "front" 
                ? <img className='front-sprite' src={ this.props.occupant.getSprite('front')} style={{width:200, height: 200}} alt="replace name"/>
                : <img className='back-sprite' src={ this.props.occupant.getSprite('back') } style={{width:300, height: 300}} alt="replace name"/>
                }
            </div>
        );
    }
};

export default Slot;