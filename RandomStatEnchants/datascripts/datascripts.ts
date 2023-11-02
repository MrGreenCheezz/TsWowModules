import { std } from "wow/wotlk";
import { convertShiftedNumber } from "wow/wotlk/std/Misc/ShiftedNumberCell";
import { StatType } from "wow/wotlk/std/Misc/StatTypes";

let Power: number[] = [5, 12, 15, 20, 45, 60, 75, 90]

const TypeKeys = Object.keys(StatType);
const TypeValues = Object.values(StatType);

TypeKeys.forEach((key, keyindex) => {
    Power.forEach((power, index) => { 
        if (isNaN(Number(key))) {
            std.Enchantments.create('NewEnchantments', 'enchantment_' + key + '_' + power)
                .Name.ruRU.set(key + "_" + power + "_зачарование")
                .Effects.addMod(eff => {
                    eff
                        .Type.STAT.set()
                        .Stat.set(TypeValues[keyindex] as int)
                        .MinStat.set(power)
                })
        }

    })
});

