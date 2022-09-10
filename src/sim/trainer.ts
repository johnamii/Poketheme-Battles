import Pokemon from './pokemon'
import { trainerData, battleChoice } from '../data/globalTypes'

interface TrainerProps{ data: trainerData; team: Pokemon[]; }

class Trainer { // might have to be component with state curMOn and madechoice
    //userdata
    sprite: string;
    name: string;
    team: Pokemon[];
    static maxTeamSize = 6;
    startTeamSize: number;
    isComputer() { return false; }
    curMon: number;
    opponent: Trainer | undefined;

    constructor(props: TrainerProps){

        this.name = props.data.name;
        this.team = props.team;
        this.startTeamSize = props.team.length;
        this.sprite = props.data.sprite;
        this.curMon = 0;
        this.opponent = undefined;
    }

    getTeamMember(index: number): Pokemon{
        return this.team[index];
    }

    getAvailableSwitchIndices(curMon: number): number[] {
        let indices = [];
        for (let i = 0; i < this.team.length; i++){
            if (this.team[i].checkAlive() && i !== curMon){
                indices.push(i);
            }
        }
        return indices;
    }

    getCurMon(){
        return this.team[this.curMon];
    }

    getCurMonIndex(){
        return this.curMon;
    }

    getAliveTeamSize(): number {
        var a = 0;
        for (let i = 0; i < this.team.length; i++){
            if (!this.team[i].fainted)
                a++;
        }
        return a;
    }

    switchCurMon(index: number){
        this.curMon = index;
    }

    // virtual computer functions
    randomStartChoice(): number { return 0;} // TODO: replace with virtual tag for inherited function?
    randomSwitchChoice(): number { return 0};
    randomBattleChoice(curMon: number): battleChoice { return {tr: this, index: 0, move: true}};
}

export default Trainer;