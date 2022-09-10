import { statsTable, moveData, natureData, monData } from '../data/globalTypes'
import { calcMoveDamage } from './functions'
import { TypeChart } from '../data/typeChart'

interface PokState {
    curHealth: number;
    statChanges: number[];
    fainted: boolean;
    status: string;
    movePP: number[];
}

class Pokemon
{
    data: monData;
    realStats: statsTable;
    curHealth: number;
    statChanges: number[];
    fainted: boolean;
    status: string | null;
    movePP: number[];

    constructor(mondata: monData){
        
         // put into presets
         
        this.data = mondata;
        let a = 0;

        this.realStats = {
            hp:  Math.trunc((( 2 * mondata.dex.baseStats.hp  + mondata.set.ivs.hp  + (mondata.set.evs.hp / 4))  * this.getLevel()) / 100 + this.getLevel() + 10),
            atk: Math.trunc((((2 * mondata.dex.baseStats.atk + mondata.set.ivs.atk + (mondata.set.evs.atk / 4)) * this.getLevel()) / 100 + 5) * mondata.set.nature.atk),
            def: Math.trunc((((2 * mondata.dex.baseStats.def + mondata.set.ivs.def + (mondata.set.evs.def / 4)) * this.getLevel()) / 100 + 5) * mondata.set.nature.def),
            spa: Math.trunc((((2 * mondata.dex.baseStats.spa + mondata.set.ivs.spa + (mondata.set.evs.spa / 4)) * this.getLevel()) / 100 + 5) * mondata.set.nature.spa),
            spd: Math.trunc((((2 * mondata.dex.baseStats.spd + mondata.set.ivs.spd + (mondata.set.evs.spd / 4)) * this.getLevel()) / 100 + 5) * mondata.set.nature.spd),
            spe: Math.trunc((((2 * mondata.dex.baseStats.spe + mondata.set.ivs.spe + (mondata.set.evs.spe / 4)) * this.getLevel()) / 100 + 5) * mondata.set.nature.spe),
        }

        this.curHealth = this.realStats.hp;
        this.statChanges = [0, 0, 0, 0, 0];
        this.fainted = false;
        this.status = null;
        this.movePP = [];
        for (let i = 0; i < this.getMovepoolSize(); i++){
            this.movePP[i] = this.getMove(i).pp;
        }
    }

    // MUTATORS

    useMove(index: number, target: Pokemon){
        this.movePP[index]--;

        let move = this.getMove(index);

        if (move.category === 'special' || move.category === 'physical'){

            if (move.percentage){
                var damage = move.percentage;
                target.takeDamage(true, damage)
            }
            else{
                damage = calcMoveDamage(move, this, target);
                target.takeDamage(false, damage);
            }

            console.log(target.getName() + ' took ' + damage + ' points of damage');
        }
    }

    giveStatusCondition(cond: string){

    }

    alterStats(stat: string, degree: number){

    }

    heal(percent?: number, amount?: number, ){ // set to boolean and return false if failed?
        let health = percent && Math.floor(this.getStat().hp * percent);
        if (health){
            if (this.curHealth + health > this.getStat().hp)
                this.curHealth = this.getStat().hp;
            else
                this.curHealth = this.curHealth + health;
        }
        if (amount){
            if (this.curHealth + amount > this.getStat().hp)
                this.curHealth = this.getStat().hp;
            else
                this.curHealth = this.curHealth + amount;
        }
    }

    takeDamage(percentBased: boolean, value: number){
        if (percentBased){
            let percentAmount = Math.floor(this.getStat().hp * value);
            if (this.curHealth - percentAmount < 0){
                this.curHealth = 0;
            }
            else{
                this.curHealth = this.curHealth - percentAmount;
            }
        }
        else {
            if (this.curHealth - value < 0){
                this.curHealth = 0;
            }
            else{
                this.curHealth = this.curHealth - value;
            }
        }
    }

    checkAlive(): boolean{
        if (this.fainted){
            return false;
        }
        else if (this.curHealth <= 0){
            this.faint();
            return false;
        }

        return true;
    }

    faint(){
        console.log(this.getName() + ' fainted');
        this.fainted = true;
    }

    // ACCESSORS

    getName(): string{
        return this.data.dex.name;
    }
    getCurHealth(): number {
        return this.curHealth;
    }
    getBaseStat(): statsTable{
        return this.data.dex.baseStats;
    }
    getStat(): statsTable {
       return this.realStats;
    }
    getIvs(): statsTable {
        return this.data.set.ivs;
    }
    getEvs(): statsTable {
        return this.data.set.evs;
    }
    getNature(): natureData {
        return this.data.set.nature;
    }
    getMove(index: number): moveData {
        return this.data.set.moves[index];
    }
    getMovepoolSize(): number {
        return this.data.set.moves.length;
    }
    getTypes(): string[] {
        return this.data.dex.types;
    }
    getLevel(): number{
        return this.data.set.level;
    }
    getSprite(version: string): string {
        if (version === 'front') {
            return this.data.dex.imgs.front;
        }
        else if (version === 'back') {
            return this.data.dex.imgs.back;
        }
        else {
            return this.data.dex.imgs.menu;
        }
    }
}
export default Pokemon;