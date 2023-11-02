import { std } from "wow/wotlk";

export const newClass = std.Classes.create("MorpherClass","MorpherClass1","PALADIN")
.Name.enGB.set("Morpher")
.Name.ruRU.set("Морфер")
.Roles.Damage.set(1)
.Roles.Healer.set(1)
.Roles.Tank.set(1)
.Stats.MeleePowerType.WARRIOR.set()
.Stats.RangedPowerType.HUNTER.set()
.Races.add(["GNOME","HUMAN","BLOODELF","DRAENEI","DWARF","NIGHTELF","ORC","TAUREN","TROLL","UNDEAD"])
.Tags.add("MorpherClass","MorpherClass")
.UI.DisabledText.set("Выберите другую рассу для этого класса")
.UI.Description.set("Класс что черпает силу из убитых им противников, получая их особенности и облик")
.UI.setIcon(std.Image.readFromModule("MorpherClass","assets/test.png"))


 newClass.row.Name_Female.ruRU.set("Морфер")
 .Name_Male.ruRU.set("Морфер")

std.EquipSkills.Leather.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Mail.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Plate.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Maces1H.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Maces2H.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Swords1H.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Swords2H.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Axes1H.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Axes2H.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Bows.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Guns.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Crossbows.enableAutolearnClass(newClass.Mask)
std.EquipSkills.FistWeapons.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Polearms.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Daggers.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Shields.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Staves.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Thrown.enableAutolearnClass(newClass.Mask)
std.EquipSkills.Wands.enableAutolearnClass(newClass.Mask)

const HasteTalent = std.Spells.create("MorpherTalents","HasteTalent",16462)
.Name.enGB.set("Improved haste")
.Name.ruRU.set("Улучшенная скорость")
.Description.enGB.set("Increase spell haste by $s1")
.Description.ruRU.set("Увеличивает скорость чтения заклинаний на $s1")
.Icon.set(597)
HasteTalent.Effects.get(0).PointsBase.set(10)
.Aura.HASTE_SPELLS.set()
const HasteTalent2 = std.Spells.create("MorpherTalents","HasteTalent2",16462)
.Name.enGB.set("Improved haste")
.Name.ruRU.set("Улучшенная скорость")
.Description.enGB.set("Increase spell haste by $s1")
.Description.ruRU.set("Увеличивает скорость чтения заклинаний на $s1")
.Icon.set(597)
HasteTalent2.Effects.get(0).PointsBase.set(20)
.Aura.HASTE_SPELLS.set()
const HasteTalent3 = std.Spells.create("MorpherTalents","HasteTalent3",16462)
.Name.enGB.set("Improved haste")
.Name.ruRU.set("Улучшенная скорость")
.Description.enGB.set("Increase spell haste by $s1")
.Description.ruRU.set("Увеличивает скорость чтения заклинаний на $s1")
.Icon.set(597)
HasteTalent3.Effects.get(0).PointsBase.set(25)
.Aura.HASTE_SPELLS.set()
const HasteTalent4 = std.Spells.create("MorpherTalents","HasteTalent4",16462)
.Name.enGB.set("Improved haste")
.Name.ruRU.set("Улучшенная скорость")
.Description.enGB.set("Increase spell haste by $s1")
.Description.ruRU.set("Увеличивает скорость чтения заклинаний на $s1")
.Icon.set(597)
HasteTalent4.Effects.get(0).PointsBase.set(30)
.Aura.HASTE_SPELLS.set()
const HasteTalent5 = std.Spells.create("MorpherTalents","HasteTalent5",16462)
.Name.enGB.set("Improved haste")
.Name.ruRU.set("Улучшенная скорость")
.Description.enGB.set("Increase spell haste by $s1")
.Description.ruRU.set("Увеличивает скорость чтения заклинаний на $s1")
.Icon.set(597)
HasteTalent5.Effects.get(0).PointsBase.set(35)
.Aura.HASTE_SPELLS.set()

var AttackTalents = []

for(var i = 0; i <  5; i++){
    var attackTalent = std.Spells.create("MorpherTalents","MeleeAttack" + i, 16462)
    .Name.enGB.set("Improved melee attack")
    .Description.enGB.set("Increase melee attack power by $s1")
    .Description.ruRU.set("Увеличивает силу атаки на $s1")
    .Name.ruRU.set("Улучшенная сила атаки")
    .Icon.set(std.Spells.load(33111).Icon.get())
    attackTalent.Effects.get(0).PointsBase.set(20 + 15 * i)
    .Aura.MOD_ATTACK_POWER.set()
    AttackTalents.push(attackTalent.ID);
}





const MorpherTalents = newClass.TalentTrees.addGet("MorpherClass","TalentTree1",0)
.BackgroundImage.set("DeathKnightUnholy")
.Name.enGB.set("Adaptation")
.Name.ruRU.set("Адаптация")
MorpherTalents.Talents.addGet("MorpherClass","AdaptationTalents")
.Spells.add([HasteTalent.ID,HasteTalent2.ID,HasteTalent3.ID,HasteTalent4.ID,HasteTalent5.ID])
.Position.set(0,0)
MorpherTalents.Talents.addGet("MorherClass","AdaptationTalentsAttack").Spells.add(AttackTalents)
.Position.set(0,1)


var AttackTalents = []

for(var i = 0; i <  5; i++){
    var attackTalent = std.Spells.create("MorpherTalents","MeleeAttackSpeed" + i, 16462)
    .Name.enGB.set("Improved melee attack speed")
    .Description.enGB.set("Increase melee attack speed by $s1")
    .Description.ruRU.set("Увеличивает скорость атаки на $s1")
    .Name.ruRU.set("Улучшенная скорость атаки")
    .Icon.set(std.Spells.load(48849).Icon.get())
    attackTalent.Effects.get(0).PointsBase.set(20 + 15 * i)
    .Aura.MOD_ATTACKSPEED.set()
    AttackTalents.push(attackTalent.ID);
}

MorpherTalents.Talents.addGet("MorherClass","AdaptationTalentsAttackSpeed").Spells.add(AttackTalents)
.Position.set(0,2)

var AttackTalents = []

for(var i = 0; i <  5; i++){
    var attackTalent = std.Spells.create("MorpherTalents","SpellPowerFromInt" + i, 16462)
    .Name.enGB.set("Big brain ")
    .Description.enGB.set("Increase spell power by $s1% of intelect")
    .Description.ruRU.set("Увеличивает силу заклинаний на величину $s1% от интелекта")
    .Name.ruRU.set("Большой мозг")
    .Icon.set(std.Spells.load(59774).Icon.get())
    attackTalent.Effects.get(0).PointsBase.set(3 + i)
    .MiscValueA.set(126)
    .MiscValueB.set(3)
    .Aura.MOD_SPELL_DAMAGE_OF_STAT_PERCENT.set()
    AttackTalents.push(attackTalent.ID);
}

MorpherTalents.Talents.addGet("MorherClass","AdaptationTalentsSpellPower").Spells.add(AttackTalents)
.Position.set(0,3)

var AttackTalents = []

for(var i = 0; i <  5; i++){
    var attackTalent = std.Spells.create("MorpherTalents","HealPowerFromInt" + i, 16462)
    .Name.enGB.set("Big heal")
    .Description.enGB.set("Increase heal power by $s1% of intelect")
    .Description.ruRU.set("Увеличивает силу лечения на величину $s1% от интелекта")
    .Name.ruRU.set("Большой хил")
    .Icon.set(std.Spells.load(63956).Icon.get())
    attackTalent.Effects.get(0).PointsBase.set(3 + i)
    .MiscValueA.set(3)
    .MiscValueB.set(0)
    .Aura.MOD_SPELL_HEALING_OF_STAT_PERCENT.set()
    AttackTalents.push(attackTalent.ID);
}

MorpherTalents.Talents.addGet("MorherClass","AdaptationTalentsHealingPower").Spells.add(AttackTalents)
.Position.set(1,0)

var AttackTalents = []

for(var i = 0; i <  5; i++){
    var attackTalent = std.Spells.create("MorpherTalents","RangeAttackPower" + i, 16462)
    .Name.enGB.set("Improved range combat")
    .Description.enGB.set("Increase range attack power by $s1 ")
    .Description.ruRU.set("Увеличивает силу атаки дальнего боя на величину $s1")
    .Name.ruRU.set("Улучшенный дальний бой")
    .Icon.set(std.Spells.load(32244).Icon.get())
    attackTalent.Effects.get(0).PointsBase.set(20 + 15 * i)
    .Aura.MOD_RANGED_ATTACK_POWER.set()
    AttackTalents.push(attackTalent.ID);
}

MorpherTalents.Talents.addGet("MorherClass","AdaptationTalentsRangePower").Spells.add(AttackTalents)
.Position.set(1,1)