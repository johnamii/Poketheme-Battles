import React, {  } from 'react';
import './styles/field.css'
import Trainer from '../sim/trainer'
import Slot from './slot'
import Pokemon from '../sim/pokemon'
import { battleEvent } from '../data/globalTypes'
import {isMobile} from 'react-device-detect'

interface FieldProps {
    s0Trs?: Trainer[];
    s1Trs?: Trainer[];
    curMon1: Pokemon;
    curMon2: Pokemon; // CHANGE TO JUST TRAINER and their CURMON
    events: battleEvent[];
    dims: string[];
}
interface FieldState { weather: string; terrain: string; eventLength: number }

class Field extends React.Component<FieldProps, FieldState> {
    popup: boolean;

    constructor(props: FieldProps){
        super(props);
        this.popup = false;
    }

    state: FieldState = {
        weather:'',
        terrain: '',
        eventLength: this.props.events.length
    }

    componentDidUpdate() {
        if (this.state.eventLength !== this.props.events.length){
            this.popup = true;
            this.setState({eventLength: this.props.events.length});

            setTimeout(() => {
                this.popup = false;
            }, 750)
        }
    }
    
    render() {
        return (
            <fieldset className="field-window" style={{width:this.props.dims[0], height:this.props.dims[1]}}>
                <img className="field-background" src="/assets/field/techno-battle-background.png" alt='backgroundImage'/>

                {this.popup && <div className='event-popup' style={isMobile?{width: '70%'}: {}}> {this.props.events[this.props.events.length-1].text} </div>}

                <Slot sprite="front" occupant={ this.props.curMon2 }/>
                <Slot sprite="back" occupant={ this.props.curMon1 }/>
            </fieldset>
        )
    }
};

export default Field;