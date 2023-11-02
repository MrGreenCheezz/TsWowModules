import { std } from "wow/wotlk";
import { SpellsArray } from "./datascripts";


    for(let i = 1 ; i < SpellsArray.length; i++){
        let a = SpellsArray[i]
         std.Enchantments.create('NewEnchantments', "ProcAura_" + i)
         .Name.ruRU.set("зачарование "+a.Name.ruRU.get())
         .Name.enGB.set("enchantment"+a.Name.enGB.get())
         .EnchantSpells.addMod('NewEnchantments', 'enchantment-spell-Aura-proc_'+ i, true, spell => {
             spell
             .SpellName.ruRU.set("зачарка прока " + a.Name.ruRU.get())
             .ItemName.ruRU.set("Свиток зачарования прока " + a.Name.ruRU.get())
             .SpellName.enGB.set("Proc enchant of " + a.Name.enGB.get())
             .ItemName.enGB.set("Scroll enchantment of " + a.Name.enGB.get())
             .SpellDescription.ruRU.set(
                 'Шанс использовать ' + a.Name.ruRU.get()
             )
             .SpellDescription.enGB.set(
                'Chance to use ' + a.Name.enGB.get()
            );
         })
         .Effects.addMod(eff => {
             eff
             .Type.BUFF_EQUIPPED.set()      
         })
         .row.EffectArg.set([a.ID.get(),0,0])
        
     }