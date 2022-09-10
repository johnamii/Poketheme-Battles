import { themeData } from './globalTypes'
import { Pokedex } from './pokedex'
import { randInt } from '../sim/functions'
import Pokemon from '../sim/pokemon';

export const Themes: {[theme: string]: themeData} = {
    StarterBrawl: {
        name: "Starter Brawl",
        description: '',
        setSize: 15,
        pokeSet: [
            Pokedex.venusaur,
            Pokedex.blastoise,
            Pokedex.charizard,
            Pokedex.meganium,
            Pokedex.typhlosion,
            Pokedex.feraligatr,
            Pokedex.sceptile,
            Pokedex.blaziken,
            Pokedex.swampert,
            Pokedex.torterra,
            Pokedex.infernape,
            Pokedex.empoleon,
            Pokedex.serperior,
            Pokedex.emboar,
            Pokedex.samurott
        ],
        teamSize: 3,
        generateTeam(){
            let arr = [];
            let water, grass, fire = false;

            while (arr.length < this.teamSize) 
            {
                let num = randInt(0, this.setSize);
                let presetNum = randInt(0, this.pokeSet[num].presets.length);

                let mon = new Pokemon({ dex: this.pokeSet[num], set: this.pokeSet[num].presets[presetNum] });
                let curType = mon.getTypes()[0];

                if (curType === "Grass" && !grass) {
                    arr.push(mon);
                    grass = true;
                }
                else if (curType === "Water" && !water){
                    arr.push(mon);
                    water = true;
                }
                else if (curType === "Fire" && !fire){
                    arr.push(mon);
                    fire = true;
                }
            }
            return arr; // ARRAY OF TEAM
        }
    }

//theme to add: 1 strong vs 6 weaker mons
}