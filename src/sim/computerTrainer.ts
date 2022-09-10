import Trainer from './trainer'
import { battleChoice } from '../data/globalTypes'
import Side from './side'
import { randInt } from './functions'

class ComputerTrainer extends Trainer {

    isComputer() { return true; }

    randomStartChoice(): number{
        return randInt(0, this.team.length)
    }

    randomSwitchChoice(): number{
        let coin = randInt(0, this.getAvailableSwitchIndices(this.curMon).length);
        return this.getAvailableSwitchIndices(this.curMon)[coin];
    }

    randomBattleChoice(curMon: number): battleChoice{ // NEEDS TESTING
        let mon = this.team[curMon];
        let coin = randInt(0, 2);

        // switch mon
        if (this.getAliveTeamSize() > 1 && coin === 0){
            coin = randInt(0, this.getAvailableSwitchIndices(curMon).length);
            return { tr: this, move: false, index: this.getAvailableSwitchIndices(curMon)[coin]};
        }
        
        // use a move
        return { tr: this, move: true, index: randInt(0, mon.getMovepoolSize())}
    }

    smartChoice(opps: Side, curMon: number){

    }
}

export default ComputerTrainer;