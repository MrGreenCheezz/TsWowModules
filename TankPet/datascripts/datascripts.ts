import { std } from "wow/wotlk";


export const DEFENDER_NPC = std.CreatureTemplates.create("Defenders","DefenderTank",478)
.AIName.NullAI()
.Tags.addUnique("Defenders","TankDefender")
.Name.ruRU.set("Танк")
.Name.enGB.set("Tank")
.Level.set(15)
.Weapons.add(10823,6725)

DEFENDER_NPC.Auras.set("71 29801 53592")


export const SUMMON_DEFENDER_SPELL = std.Spells.create("Defenders","SummonTank", 688)
.Name.ruRU.set("Призыв танка")
.Name.enGB.set("Summon tank")
.Description.enGB.set("Summons tank to help you in battle")
.Description.ruRU.set("Призывает танка для помощи в бою")
.Effects.get(0)
.Type.SUMMON_PET.set()
.SummonedCreature.set(DEFENDER_NPC.ID)



console.log(std.Spells.load(688).objectify())