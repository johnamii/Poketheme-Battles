import Pokemon from './pokemon'
import { moveData } from '../data/globalTypes'
import { TypeChart } from '../data/typeChart'

//returns random integer from [min, max)
export function randInt(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

export function calcMoveDamage(move: moveData, attacker: Pokemon, target: Pokemon): number 
{
    if (move.category === "physical")
        var ratio = attacker.realStats.atk / target.realStats.def;
    else
        ratio = attacker.realStats.spa / target.realStats.spd;        

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
            case 0: console.log('It had no effect.'); return 0;
            case 1: finalDamage *= 0.5; effectiveness -= 1; break;
            case 2: break;
            case 3: finalDamage *= 2; effectiveness += 1; break; 
        }
    }

    // say effectiveness
    switch(effectiveness) {
        case(0):
        case(1): console.log('It was not very effective...'); break;
        case(3):
        case(4): console.log('It was super effective!'); break;
    }

    //burn
    // if (attacker.state.status === "Burn" && move.category === "Physical"){
    //     finalDamage = Math.floor(finalDamage / 2);
    // }

    return Math.floor(finalDamage);
}
