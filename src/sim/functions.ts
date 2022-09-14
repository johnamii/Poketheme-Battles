import Pokemon from './pokemon'
import { moveData , battleChoice, battleEvent} from '../data/globalTypes'
import { TypeChart } from '../data/typeChart'

//returns random integer from [min, max)
export function randInt(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

export function calcMoveDamage(move: moveData, attacker: Pokemon, target: Pokemon, subtext: string[]): number 
{
    if (move.category === "physical")
        var ratio = attacker.getStat().atk / target.getStat().def;
    else
        ratio = attacker.getStat().spa / target.getStat().spd;        

    let finalDamage = Math.floor((2 * attacker.getLevel() / 5 + 2) * move.basePower * ratio / 50 + 2);

    //multiple targets

    //weather

    //critical

    //random multiplier
    finalDamage = Math.floor(finalDamage * randInt(85, 101) / 100)
    
    // STAB
    if (move.type === attacker.data.dex.types[0] || (attacker.data.dex.types.length > 1 && move.type === attacker.data.dex.types[1])){
        finalDamage = Math.floor(finalDamage * 1.5); 
    }

    //type calcs   
    let effectiveness = 2;
    for (let i = 0; i < target.data.dex.types.length; i++){
        switch (TypeChart[target.data.dex.types[i]].weaknesses[move.type]){
            case 0: subtext[0] = ('It had no effect.'); return 0;
            case 1: finalDamage *= 0.5; effectiveness -= 1; break;
            case 2: break;
            case 3: finalDamage *= 2; effectiveness += 1; break; 
        }
    }

    // say effectiveness
    switch(effectiveness) {
        case(0):
        case(1): subtext[0] = ('It was not very effective...'); break;
        case(3):
        case(4): subtext[0] = ('It was super effective!'); break;
    }

    //burn
    // if (attacker.state.status === "Burn" && move.category === "Physical"){
    //     finalDamage = Math.floor(finalDamage / 2);
    // }

    return Math.floor(finalDamage);
}

export function setChoiceOrder(arr: battleChoice[]): battleChoice[]{ // optimizable
    let switches: battleChoice[] = [];
    let pri: battleChoice[] = [];
    let normals: battleChoice[] = [];

    for (let i = 0; i < arr.length; i++){
        if (!arr[i].move){
            switches.push(arr[i]);
        }
        else{
            let theMove = arr[i].tr.getCurMon().getMove(arr[i].index);
            if (theMove.priority > 0){
                pri.push(arr[i]);
            }
            else{
                normals.push(arr[i]);
            }
        }
    }

    switches.sort((a, b) => parseFloat(b.tr.getCurMon().getStat().spe.toString()) - parseFloat(a.tr.getCurMon().getStat().spe.toString()));
    normals.sort((a, b) => parseFloat(b.tr.getCurMon().getStat().spe.toString()) - parseFloat(a.tr.getCurMon().getStat().spe.toString()));

    return switches.concat(pri, normals);
}

export function writeEvent(choice?: battleChoice, subtexts?: string[], eventType?: string, amount?: number): battleEvent{
    // set up string for either event
    let message = '';
    let event: battleEvent = {text: '', dialog: true};
    if (choice){
        if (choice.move) {
            let mon = choice.tr.getCurMon();
            var subject = mon.getName();
            var action = " used "
            var predicate = mon.getMove(choice.index).name;
        }
        else {
            subject = choice.tr.name;
            action = " sent out "
            predicate = choice.tr.getTeamMember(choice.index).getName();
        }
        message = subject + action + predicate;
    }
    else if (eventType && eventType === 'attack'){
        

    }
    
    
    event.text = message;
    event.subtext = subtexts;
    return event;
}