import Pokemon from './pokemon'
//import { speciesData } from '../data/globalTypes'
import { Pokedex } from '../data/pokedex'
import { Moves } from '../data/moves';
import Trainer from './trainer'
import { Trainers } from '../data/trainers'
import { trainerData } from '../data/globalTypes'

class Side {
    trainers: Trainer[];

    constructor(trs: Trainer[]){
        this.trainers = trs;
    }

    // canContinue(): boolean {
    //     return this.trainers[0].aliveTeamSize > 0;
    // }

    getBattleChoice(){
        
    }

    demandNewMon(){

    }
};

export default Side;