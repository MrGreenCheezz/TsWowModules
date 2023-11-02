import { std } from "wow/wotlk";

for(let i = 79404; i > 1; i--){
    let a = std.Spells.load(i);
    if(a !== undefined){
        a.Tags.add("RandomSpells","NormalSpells")
        
    }
}

// for(let i = 56298; i <= 106130; i++){
//     let a = std.Enchantments.load(i)
//     if(a !== undefined){
//         a.Tags.add("RandomSpells","ProcAuras")
        
//     }
// }