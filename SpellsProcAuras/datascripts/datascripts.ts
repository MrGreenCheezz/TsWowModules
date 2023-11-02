import { std } from "wow/wotlk";
import { SpellRow } from "wow/wotlk/dbc/Spell";


export let SpellsArray : Array<SpellRow>  = []

export const NewSkilline = std.SkillLines.create("NewEnchantments", "EnchantsSkilline")
.Name.ruRU.set("Проковые навыки")


for(let i = 79404; i > 5; i--){
    let a = std.DBC.Spell.findById(i);
    if(a !== undefined){
       let spell = std.Spells.create("NewEnchantments", "ProcAura_For_"+ i, 12358)
        .Name.ruRU.set("Шанс срабатывания " + a.Name.ruRU.get())
        .Tags.add("ProcAuras","Spells")
        .Description.ruRU.set("У вас есть шанс использовать " + a.Name.ruRU.get() + " при нанесении урона.")
        .SkillLines.add(NewSkilline.ID)
        .row.ProcChance.set(25)
        .EffectTriggerSpell.set([a.ID.get(),0,0])
        .SchoolMask.set(127)
        .ProcTypeMask.set(349524)

        SpellsArray.push(spell)
        
    }
}




