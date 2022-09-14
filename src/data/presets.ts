import { presetData } from './globalTypes'
import { Moves } from './moves'
import { Natures } from './natures'

export const Presets: {[presetid: string]: presetData} = {
    blank: {
        set: "blank",
        moves: [Moves.struggle],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs:{hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.bashful,
        level: 50
    },
    venusaur_off: {
        set: "Offensive",
        moves: [Moves.gigadrain, Moves.sludgebomb, Moves.leafstorm, Moves.toxic],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 0, def: 0, spa: 252, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
    },
    blastoise_off: {
        set: "Offensive",
        moves: [Moves.surf, Moves.icebeam, Moves.aurasphere, Moves.darkpulse],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 0, def: 0, spa: 252, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
        // item: specs
        // ability: swift swim?
    },
    charizard_off: {
        set: 'Offensive',
        moves: [Moves.overheat, Moves.airslash, Moves.darkpulse, Moves.dragonpulse],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 0, def: 0, spa: 252, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
    },
    meganium_sp_def: {
        set: 'Special Defensive',
        moves: [Moves.gigadrain, Moves.toxic, Moves.synthesis],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 252, atk: 0, def: 0, spa: 8, spd: 252, spe: 0},
        nature: Natures.calm,
        level: 50
        // item: Items.lightclay
    },
    meganium_off: {
        set: 'Offensive',
        moves: [Moves.swordsdance, Moves.earthquake, Moves.petaldance], // substitute
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50,
        // item: Items.salacberry
    },
    typhlosion_off: {
        set: 'Offensive',
        moves: [Moves.flamethrower, Moves.focusblast, Moves.overheat], // figure out lava plume
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 0, def: 0, spa: 252, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
    },
    feraligatr_off: {
        set: 'Offensive',
        moves: [Moves.waterfall, Moves.icepunch, Moves.crunch, Moves.dragondance],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50
    },
    sceptile_off: {
        set: "Offensive",
        moves: [Moves.leafstorm, Moves.gigadrain, Moves.airslash, Moves.focusblast],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 0, def: 0, spa: 252, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
    },
    blaziken_off: {
        set: "Offensive",
        moves: [Moves.closecombat, Moves.blazekick, Moves.thunderpunch, Moves.swordsdance],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50
    },
    swampert_def: {
        set: "Defensive",
        moves: [Moves.earthquake, Moves.scald, Moves.rocktomb, Moves.toxic],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 252, atk: 0, def: 252, spa: 0, spd: 8, spe: 0},
        nature: Natures.impish,
        level: 50
    },
    swampert_off: {
        set: "Offensive",
        moves: [Moves.earthquake, Moves.waterfall, Moves.icepunch, Moves.bulkup],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50
    },
    torterra_off: {
        set: "Offensive",
        moves: [Moves.earthquake, Moves.woodhammer, Moves.stoneedge, Moves.rockpolish],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 8},
        nature: Natures.adamant,
        level: 50
    },
    infernape_off: {
        set: "Offensive",
        moves: [Moves.flareblitz, Moves.closecombat, Moves.machpunch, Moves.swordsdance],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50
    },
    empoleon_off: {
        set: "Offensive",
        moves: [Moves.surf, Moves.icebeam, Moves.flashcannon, Moves.scald],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 0, def: 0, spa: 252, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
    },
    serperior_off: {
        set: "Offensive",
        moves: [Moves.leafstorm, Moves.gigadrain, Moves.dragonpulse],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.modest,
        level: 50
    },
    emboar_off: { 
        set: "Offensive",
        moves: [Moves.closecombat, Moves.flareblitz, Moves.stoneedge, Moves.bulkup],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50
    },
    samurott_off: {
        set: "Offensive",
        moves: [Moves.aquatail, Moves.aquajet, Moves.megahorn, Moves.swordsdance],
        ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
        evs: {hp: 8, atk: 252, def: 0, spa: 0, spd: 0, spe: 252},
        nature: Natures.adamant,
        level: 50
    }
}