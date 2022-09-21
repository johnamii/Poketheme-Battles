//import { useState } from 'react'
import Pokemon from '../sim/pokemon'
import './styles/field.css'
import { TypeChart } from '../data/typeChart'

interface StatTagProps { stat: string, modVal: number }
const StatTag = ({stat, modVal}: StatTagProps) => {

    return(
        <div 
        className='stat-mod-tag' 
        style={modVal !== 0 ? modVal > 0 ? {backgroundColor:'#d9ead3'} : {backgroundColor:'#ea9999'} : {visibility:'hidden'}}
        > 
            <small>{stat }: {modVal}</small>
        </div>
    )
}

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

    const status = occupant.getStatusCond();
    var statusColor = 'white';
    switch (status){
        case('brn'): statusColor = TypeChart.Fire.color1; break;
        case('psn'):
        case('tox'): statusColor = TypeChart.Poison.color1; break;
        case('prz'): statusColor = TypeChart.Electric.color1; break;
        case('frz'): statusColor = TypeChart.Ice.color1; break;
    }

    // status tags / stat tags / condition tags
    return (
        <div className="status-bar">
            <b>{occupant.getName()}</b> <small>L{occupant.getLevel()}</small>

            <div className='condition-tag' style={status ?  {visibility:'visible', backgroundColor: statusColor} : {visibility:'hidden'}}>
                {status}
            </div>

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
            <div className='tags-bar'>
                <StatTag stat="Atk" modVal={occupant.getStatMods().atk}/>
                <StatTag stat="Def" modVal={occupant.getStatMods().def}/>
                <StatTag stat="SpA" modVal={occupant.getStatMods().spa}/>
                <StatTag stat="SpD" modVal={occupant.getStatMods().spd}/>
                <StatTag stat="Spe" modVal={occupant.getStatMods().spe}/>
            </div>

        </div>
    )
    
}

// call effect of losing health or something happenning in the battle sequence moments

interface SlotProps { sprite: string; occupant: Pokemon; }
const Slot = ({sprite, occupant}: SlotProps) => {
    
    // let [stealthRock, setStealthRock] = useState(false);
    // let [spikes, setSpikes] = useState(0);
    // let [leechSeed, setLeechSeed] = useState(false);
    // let [auroraVeil, setAuroraVeil] = useState(0);
    // let [lightScreen, setLightScreen] = useState(0);
    // let [reflect, setReflect] = useState(0);

        return (
        <div className={sprite + '-container'}>

            <StatusBar occupant={occupant}/>

            { sprite === "front" 
            ? <img className='front-sprite' src={ occupant.getSprite('front')} style={{width:'14vw', height: '14vw'}} alt="replace name"/>
            : <img className='back-sprite' src={ occupant.getSprite('back') } style={{width:'19vw', height: '19vw'}} alt="replace name"/>
            }
        </div>
    );
};

export default Slot;