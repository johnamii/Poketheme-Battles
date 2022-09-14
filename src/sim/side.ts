import Trainer from './trainer'

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