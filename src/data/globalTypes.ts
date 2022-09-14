import Pokemon from '../sim/pokemon'
import Trainer from '../sim/trainer';

export type battleEvent = {
    text: string;
    dialog: boolean;
    damage?: number;
    subtext?: string[];
}

export type statsTable = {
    hp:  number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
};

export type speciesData = {
    num: number;
    name: string;
    types: string[];
    baseStats: statsTable;
    presets: presetData[];
    imgs: {
        menu: string;
        front: string;
        back: string;
    }
};

export type presetData = {
    set: string;
    moves: moveData[];
    ivs: statsTable;
    evs: statsTable;
    nature: natureData;
    level: number;
    //item: itemData;
    //ability: abilityData;
}

export type monData = {
    dex: speciesData,
    set: presetData
}

export type moveData = {
    name: string;
    type: string;
    basePower: number;
    percentage?: number;
    accuracy: number;
    category: string;
    pp: number;
    target: string;
    self?: string | {boosts?: {atk?: number, def?: number, spa?: number, spd?: number, spe?: number, acc?: number, eva?: number}};
    boosts?: {atk?: number, def?: number, spa?: number, spd?: number, spe?: number, acc?: number, eva?: number};
    status?: string;
    onHit?(mon: Pokemon): boolean;
    secondary: string | null | {chance: number, status?: string, boosts?: {atk?: number, def?: number, spa?: number, spd?: number, spe?: number, acc?: number, eva?: number}};
    recoil?: number[];
    contact?: boolean;
    priority: number;
    critRatio?: number;
};

export type conditionData = {
    name: string;
    type?: string;
    duration?: number;
}

export type itemData = {
    name: string;
}

export type abilityData = {
    name: string;
}

export interface typeData {
    weaknesses: {[moveType: string]: number};
    color1: string;
    color2: string; 
}

export type natureData = {
    name: string;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

export type themeData = {
    name: string;
    description: string;
    setSize: number;
    pokeSet: speciesData[];
    teamSize: number;
    generateTeam(): Pokemon[];
}

export type trainerData = {
    //userdata
    sprite: string;
    name: string;
    isComp: boolean;
}

export interface battleChoice {
    tr: Trainer;
    move: boolean;
    index: number;
    target?: Pokemon;
}
