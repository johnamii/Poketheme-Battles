//import { useState } from 'react'
import Pokemon from '../sim/pokemon'
import './styles/field.css'
import { TypeChart } from '../data/typeChart'
import {isMobile} from 'react-device-detect'

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
    let percentString = percent.toString() + "%";

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
        <div className="status-bar" style={isMobile ? {width: '35vw', height: '4vw'} : {}}>
            <div style={isMobile ? {width:'70%', position:'relative', left: '15%', bottom:'25%', height: '100%'} : {width:'50%'}}><b>{occupant.getName()}</b> <small>L{occupant.getLevel()}</small></div>

            <div className='condition-tag' style={status ?  {visibility:'visible', backgroundColor: statusColor} : {visibility:'hidden'}}>
                {status}
            </div>

            <div className='inner-bar' style={isMobile ? {marginLeft:'8%'} : {marginTop:'0%', marginLeft:'8%'}}>
                <div><b style={isMobile ? {fontSize:'60%', paddingLeft: '5%'} : {fontSize:'80%', paddingLeft:'5%'}}> {percent}% </b></div>
                <div className='health-bar'>
                    <div className='percent-bar'style={isMobile ? {backgroundColor: healthColor, width:percentString} : { backgroundColor: healthColor, width: percent * 1.16}}></div>
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
        <div className={sprite + '-container'} style={isMobile ? sprite === 'front' ? {top:'10%', left:'50%'} : {bottom:'-47%', left:'-45%'} : {}}>

            <StatusBar occupant={occupant}/>

            { sprite === "front" 
            ? <img className='front-sprite' src={ occupant.getSprite('front')} style={isMobile ? {width: '15vh', height: '15vh'} :{width:'14vw', height: '14vw'}} alt="replace name"/>
            : <img className='back-sprite' src={ occupant.getSprite('back') } style={isMobile ? {width: '20vh', height: '20vh'} :{width:'19vw', height: '19vw'}} alt="replace name"/>
            }
        </div>
    );
};

export default Slot;