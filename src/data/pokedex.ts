import { speciesData } from './globalTypes'
import { Presets } from './presets'

// change images to strings such that file can be .ts
// acknowledge existence of pokeapi.co and possibly replace all this

export const Pokedex: {[speciesID: string]: speciesData} = {
    venusaur: {
        num: 3,
        name: "Venusaur",
        types: ["Grass", "Poison"],
        baseStats: {hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
        presets: [Presets.venusaur_off],
        imgs: {
            menu: "assets/spriteMenus/venusaur.png",
            front: "assets/spriteFronts/Spr_5b_003.png",
            back: "assets/spriteBacks/Spr_b_5b_003.png"
        }
    },
    charizard: {
        num: 6,
        name: "Charizard",
        types: ["Fire", "Flying"],
        baseStats: {hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100},
        presets: [Presets.charizard_off],
        imgs: {
            menu: "assets/spriteMenus/charizard.png" ,
            front: "assets/spriteFronts/Spr_5b_006.png",
            back: "assets/spriteBacks/Spr_b_5b_006.png"
        }
    },
    blastoise: {
        num: 9,
        name: "Blastoise",
        types: ["Water"],
        baseStats: {hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78},
        presets: [Presets.blastoise_off],
        imgs: {
            menu: "assets/spriteMenus/blastoise.png",
            front: "assets/spriteFronts/Spr_5b_009.png",
            back: "assets/spriteBacks/Spr_b_5b_009.png"
        }
    },
    meganium: {
        num: 154,
        name: "Meganium",
        types: ["Grass"],
        baseStats: {hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80},
        presets: [Presets.meganium_off, Presets.meganium_sp_def],
        imgs: {
            menu: "assets/spriteMenus/meganium.png",
            front: "assets/spriteFronts/Spr_5b_154.png",
            back: "assets/spriteBacks/Spr_b_5b_154.png"
        }
    },
    typhlosion: {
        num: 157,
        name: "Typhlosion",
        types: ["Fire"],
        baseStats: {hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100},
        presets: [Presets.typhlosion_off],
        imgs: {
            menu: "assets/spriteMenus/typhlosion.png",
            front: "assets/spriteFronts/Spr_5b_157.png",
            back: "assets/spriteBacks/Spr_b_5b_157.png"
        }
    },
    feraligatr: {
        num: 160,
        name: "Feraligatr",
        types: ["Water"],
        baseStats: {hp: 85, atk: 105, def: 100, spa: 79, spd: 83, spe: 78},
        presets: [Presets.feraligatr_off],
        imgs: {
            menu: "assets/spriteMenus/feraligatr.png" ,
            front: "assets/spriteFronts/Spr_5b_160.png",
            back: "assets/spriteBacks/Spr_b_5b_160.png"
        }
    },
    sceptile: {
        num: 254,
        name: "Sceptile",
        types: ["Grass"],
        baseStats: {hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120},
        presets: [Presets.sceptile_off],
        imgs: {
            menu: "assets/spriteMenus/sceptile.png",
            front: "assets/spriteFronts/Spr_5b_254.png",
            back: "assets/spriteBacks/Spr_b_5b_254.png"
        }
    },
    blaziken: {
        num: 257,
        name: "Blaziken",
        types: ["Fire", "Fighting"],
        baseStats: {hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80},
        presets: [Presets.blaziken_off],
        imgs: {
            menu: "assets/spriteMenus/blaziken.png",
            front: "assets/spriteFronts/Spr_5b_257.png",
            back: "assets/spriteBacks/Spr_b_5b_257.png"
        }
    },
    swampert: {
        num: 260,
        name: "Swampert",
        types: ["Water", "Ground"],
        baseStats: {hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60},
        presets: [Presets.swampert_def, Presets.swampert_off],
        imgs: {
            menu: "assets/spriteMenus/swampert.png",
            front: "assets/spriteFronts/Spr_5b_260.png",
            back: "assets/spriteBacks/Spr_b_5b_260.png"
        }
    },
    torterra: {
        num: 389,
        name: "Torterra",
        types: ["Grass", "Ground"],
        baseStats: {hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 56},
        presets: [Presets.torterra_off],
        imgs: {
            menu: "assets/spriteMenus/torterra.png",
            front: "assets/spriteFronts/Spr_5b_389.png",
            back: "assets/spriteBacks/Spr_b_5b_389.png"
        }
    },
    infernape: {
        num: 392,
        name: "Infernape",
        types: ["Fire", "Fighting"],
        baseStats: {hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108},
        presets: [Presets.infernape_off],
        imgs: {
            menu: "assets/spriteMenus/infernape.png",
            front: "assets/spriteFronts/Spr_5b_392.png",
            back: "assets/spriteBacks/Spr_b_5b_392.png"
        }
    },
    empoleon: {
        num: 395,
        name: "Empoleon",
        types: ["Water", "Steel"],
        baseStats: {hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60},
        presets: [Presets.empoleon_off],
        imgs: {
            menu: "assets/spriteMenus/empoleon.png",
            front: "assets/spriteFronts/Spr_5b_395.png",
            back: "assets/spriteBacks/Spr_b_5b_395.png"
        }
    },
    serperior: {
        num: 497,
        name: "Serperior",
        types: ["Grass"],
        baseStats: {hp: 75, atk: 75, def: 95, spa: 75, spd: 95, spe: 113},
        presets: [Presets.serperior_off],
        imgs: {
            menu: "assets/spriteMenus/serperior.png",
            front: "assets/spriteFronts/Spr_5b_497.png",
            back: "assets/spriteBacks/Spr_b_5b_497.png"
        }
    },
    emboar: {
        num: 500,
        name: "Emboar",
        types: ["Fire", "Fighting"],
        baseStats: {hp: 110, atk: 123, def: 65, spa: 100, spd: 65, spe: 65},
        presets: [Presets.emboar_off],
        imgs: {
            menu: "assets/spriteMenus/emboar.png",
            front: "assets/spriteFronts/Spr_5b_500.png",
            back: "assets/spriteBacks/Spr_b_5b_500.png"
        },
    },
    samurott: {
        num: 503,
        name: "Samurott",
        types: ["Water"],
        baseStats: {hp: 95, atk: 100, def: 85, spa: 108, spd: 70, spe: 70},
        presets: [Presets.samurott_off],
        imgs: {
            menu: "assets/spriteMenus/samurott.png",
            front: "assets/spriteFronts/Spr_5b_503.png",
            back: "assets/spriteBacks/Spr_b_5b_503.png"
        }
    }
    
};