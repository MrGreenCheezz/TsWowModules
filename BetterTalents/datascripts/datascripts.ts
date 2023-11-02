import { std } from "wow/wotlk";

export let TalentsSpellsArray : Array<number> = []

for(let i = 0; i < std.DBC.Talent.rowCount; i++){
    for(let j = 0; j < 5; j++){
        let spellrank = std.DBC.Talent.getRow(i).SpellRank.getIndex(j);
        if(spellrank !== 0){
            TalentsSpellsArray.push(spellrank);
        }
    } 
}

for(let i = 0; i< TalentsSpellsArray.length; i++){
    let spellrow = std.DBC.Spell.findById(TalentsSpellsArray[i]);
    for(let j = 0; j < 3; j++){
        if(spellrow.EffectBasePoints.getIndex(j) !== 0){
            spellrow.EffectBasePoints.setIndex(j, spellrow.EffectBasePoints.getIndex(j) * 3);
        }
    }
    if(spellrow.ProcChance.get() !== 101){
        spellrow.ProcChance.set(spellrow.ProcChance.get() * 3)
    }
}