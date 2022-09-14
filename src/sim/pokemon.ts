import { statsTable, moveData, natureData, monData } from '../data/globalTypes'
import { calcMoveDamage, randInt } from './functions'

class Pokemon
{
    data: monData;
    //realStats: statsTable;
    
    curHealth: number;
    statMods;
    fainted: boolean;
    status: string | null;
    movePP: number[];
    toxicCounter: number;

    constructor(mondata: monData){
        
        this.data = mondata; 

        this.curHealth = this.getRealStat().hp;
        this.statMods = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
        this.fainted = false;
        this.status = null;
        this.movePP = [];
        this.toxicCounter = 0;
        for (let i = 0; i < this.getMovepoolSize(); i++){
            this.movePP[i] = this.getMove(i).pp;
        }
    }

    // MUTATORS

    useMove(index: number, target: Pokemon, subtext: string[]){
        this.movePP[index]--;

        let move = this.getMove(index);
        
        if (move.category === 'special' || move.category === 'physical'){

            let dice = randInt(0, 101);
            if (dice > move.accuracy){
                subtext[0] = "It missed!";
                return;
            }

            if (move.percentage){
                var damage = move.percentage;
                target.takeDamage(true, damage)
            }
            else{
                damage = calcMoveDamage(move, this, target, subtext);
                target.takeDamage(false, damage);
            }

            if (!target.checkAlive()){
                subtext[2] = target.getName() + ' fainted.';
            }

            subtext[1] = (target.getName() + ' took ' + damage + ' points of damage');
        }
        else if (move.category === 'status'){
            if (move.target === 'self'){
                if (move.boosts){
                    type val = {a: string, b: number};
                    let mods: val[] = [];
                    if (move.boosts?.atk){
                        this.modifyStats('atk', move.boosts?.atk);
                        mods.push({a: "Attack", b: move.boosts.atk});
                    }
                    if (move.boosts?.def){
                        this.modifyStats('def', move.boosts?.def);
                        mods.push({a: "Defense", b: move.boosts.def});
                    }
                    if (move.boosts?.spa){
                        this.modifyStats('spa', move.boosts?.spa);
                        mods.push({a: "Special Attack", b: move.boosts.spa});
                    }
                    if (move.boosts?.spd){
                        this.modifyStats('spd', move.boosts?.spd);
                        mods.push({a: "Special Defense", b: move.boosts.spd});
                    }
                    if (move.boosts?.spe){
                        this.modifyStats('spe', move.boosts?.spe);
                        mods.push({a: "Speed", b: move.boosts.spe});
                    }
                    // TODO: add accuracy and evasion
                    for (let i = 0; i < mods.length; i++){
    
                        if (mods[i].b > 0){
                            var RorL = " rose"
                        }
                        else {
                            RorL = " was lowered"
                        }
    
                        if (Math.abs(mods[i].b) > 1){
                            var deg = " sharply!"
                        }
                        else{
                            deg = "."
                        }
    
                        subtext[i] = this.getName() + "'s " + mods[i].a + RorL + deg;
                        // improve on this
                    }
                }
            
            }
            else if (move.target === 'normal'){
                if (move.status){
                    let roll = randInt(0, 101);
                    let types = target.getTypes();

                    if (roll > move.accuracy){
                        subtext[0] = "It missed!";
                        return;
                    }

                    if (((move.status === 'tox' && types[0] === 'Poison') || (types[1] && types[1] === "Poison")) || 
                       ((move.status === 'brn' && types[0] === 'Fire') || (types[1] && types[1] === 'Fire')) || 
                        target.getStatusCond() !== null) {

                        subtext[0] = "It failed";
                        return;
                    }

                    let cond = '';
                    switch (move.status){
                        case('tox'): 
                        case('psn'): cond = "poisoned."; break;
                        case('brn'): cond = "burned."; break;
                        case('prz'): cond = 'paralyzed'; break;
                        case('frz'): cond = 'frozen'; break;
                    }

                    target.giveStatusCondition(move.status);
                    subtext[0] = (target.getName() + " was " + cond);
                }   
            }
        }
        if (move.onHit){
            move.onHit(this);
        }
    }

    giveStatusCondition(cond: string){
        this.status = cond;
    }

    modifyStats(stat: string, degree: number){
        switch(stat){
            case('atk'): this.statMods.atk += degree; break;
            case('def'): this.statMods.def += degree; break;
            case('spa'): this.statMods.spa += degree; break;
            case('spd'): this.statMods.spd += degree; break;
            case('spe'): this.statMods.spe += degree; break;
        }
    }

    resetStats(){
        this.statMods = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
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

    residualConditions(weather: string){

        if (this.status === 'brn'){
            this.takeDamage(true, 1/16);
        }
        else if (this.status === 'psn'){
            this.takeDamage(true, 1/16);
        }
        else if (this.status === 'tox'){
            this.toxicCounter++;
            this.takeDamage(true, this.toxicCounter/16);
        }

        if (weather === 'sandstorm'){
            this.takeDamage(true, 1/16)
        }
    }

    switchOut(){
        this.resetStats();
        this.toxicCounter = 0;
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
    getRealStat(): statsTable {
       return {
        hp:  Math.trunc((( 2 * this.getBaseStat().hp  + this.getIvs().hp  + (this.getEvs().hp / 4))  * this.getLevel()) / 100 + this.getLevel() + 10),
        atk: Math.trunc((((2 * this.getBaseStat().atk + this.getIvs().atk + (this.getEvs().atk / 4)) * this.getLevel()) / 100 + 5) * this.getNature().atk),
        def: Math.trunc((((2 * this.getBaseStat().def + this.getIvs().def + (this.getEvs().def / 4)) * this.getLevel()) / 100 + 5) * this.getNature().def),
        spa: Math.trunc((((2 * this.getBaseStat().spa + this.getIvs().spa + (this.getEvs().spa / 4)) * this.getLevel()) / 100 + 5) * this.getNature().spa),
        spd: Math.trunc((((2 * this.getBaseStat().spd + this.getIvs().spd + (this.getEvs().spd / 4)) * this.getLevel()) / 100 + 5) * this.getNature().spd),
        spe: Math.trunc((((2 * this.getBaseStat().spe + this.getIvs().spe + (this.getEvs().spe / 4)) * this.getLevel()) / 100 + 5) * this.getNature().spe),
    }
    }
    getStat(): statsTable {
        let temp = this.getRealStat();
        this.statMods.atk > 0 ? (temp.atk *= ((this.statMods.atk + 2) / 2)) : (temp.atk *= (2 / (this.statMods.atk + 2)));
        temp.def *= Math.floor(this.statMods.def > 0 ? (this.statMods.def + 2) / 2 : 2 / (this.statMods.def + 2));
        temp.spa *= Math.floor(this.statMods.spa > 0 ? (this.statMods.spa + 2) / 2 : 2 / (this.statMods.spa + 2));
        temp.spd *= Math.floor(this.statMods.spd > 0 ? (this.statMods.spd + 2) / 2 : 2 / (this.statMods.spd + 2));
        temp.spe *= Math.floor(this.statMods.spe > 0 ? (this.statMods.spe + 2) / 2 : 2 / (this.statMods.spe + 2));

        if (this.status === 'brn'){
            temp.atk = Math.floor(temp.atk / 2);
        }

        return temp;
    }
    getStatMods() {
        return this.statMods;
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
    getStatusCond() {
        return this.status;
    }
}
export default Pokemon;