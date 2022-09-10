import React, { FC } from 'react';
import './styles/field.css'
import Trainer from '../sim/trainer'
import Slot from './slot'
import Pokemon from '../sim/pokemon'

interface FieldProps {
    s0Trs?: Trainer[];
    s1Trs?: Trainer[];
    curMon1: Pokemon;
    curMon2: Pokemon;
}
interface FieldState { weather: string; terrain: string; }

class Field extends React.Component<FieldProps, FieldState> {
    constructor(props: FieldProps){
        super(props);
    }

    state: FieldState = {
        weather:'',
        terrain: ''
    }
    
    render() {
        return (
            <fieldset className="field-window">
                <img className="field-background" src="/assets/field/techno-battle-background.png" />

                <Slot sprite="front" occupant={ this.props.curMon2 }/>
                <Slot sprite="back" occupant={ this.props.curMon1 }/>
            </fieldset>
        )
    }
};

export default Field;