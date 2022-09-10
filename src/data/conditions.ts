import { conditionData } from "./globalTypes";

export const Conditions: {[condID: string]: conditionData } = {
    brn: {
        name: "Burn",
        type: "status"
    },
    flinch: {
        name: "Flinch",
        duration: 1
    },
    frz: {
        name: "Freeze",
        type: "status"
    },
    psn: {
        name: "Poison",
        type: "status"
    },
    tox: {
        name: "Toxic",
        type: "status"
    }
}