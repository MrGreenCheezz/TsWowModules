import { std } from "wow/wotlk";

export const NewNpc = std.CreatureTemplates.create("EnchantNpc", "1", 2331)
.NPCFlags.GOSSIP.set(true)
.Name.enGB.set("Enchant master")
.Name.ruRU.set("Копирование зачарований")
.Tags.add("MyGossip","newGossip1")

export const NewNpc1 = std.CreatureTemplates.create("EnchantNpc", "2", 5610)
.NPCFlags.GOSSIP.set(true)
.Name.enGB.set("Enchant master")
.Name.ruRU.set("Копирование зачарований")
.Tags.add("MyGossip","newGossip1")

std.CreatureInstances.create("EnchantNpcInstance","StormwindSpawn")
.Position.set({map:0, x:-8846.737, y:628.899, z:94.812, o:0.45})
.Template.set(NewNpc.ID)

std.CreatureInstances.create("EnchantNpcInstance","OrgriSpawn")
.Position.set({map:1, x:1637.520, y:-4438.049, z:15.716, o:2})
.Template.set(NewNpc1.ID)
