import { Console } from "console";
import { pathToFileURL } from "url";

enum SpellType {
   HealSpell,
   DeffenceSpellLow,
   DeffenceSpellMedium,
   DeffenceSpellHard,
   AggroSpell,
   InteruptSpell
}

function GetSpellForMe(creature: TSCreature, spellToGet: SpellType): number {
   switch (spellToGet) {
      case SpellType.HealSpell: {
         if (creature.GetLevel() <= 30) {
            return 3627;
         } else if (creature.GetLevel() > 30 && creature.GetLevel() <= 60) {
            return 25299
         } else if (creature.GetLevel() > 60) {
            return 48441;
         }
      }
      case SpellType.DeffenceSpellLow: {
         if (creature.GetLevel() <= 30) {
            return 13032;
         } else if (creature.GetLevel() > 30 && creature.GetLevel() <= 60) {
            return 27134;
         } else if (creature.GetLevel() > 60) {
            return 43039;
         }
      }
      case SpellType.DeffenceSpellMedium: {
         if (creature.GetLevel() <= 30) {
            return 498;
         } else if (creature.GetLevel() > 30 && creature.GetLevel() <= 60) {
            return 498;
         } else if (creature.GetLevel() > 60) {
            return 498;
         }
      }
      case SpellType.DeffenceSpellHard: {
         if (creature.GetLevel() <= 30) {
            return 26669;
         } else if (creature.GetLevel() > 30 && creature.GetLevel() <= 60) {
            return 26669;
         } else if (creature.GetLevel() > 60) {
            return 26669;
         }
      }
      case SpellType.AggroSpell: {
         if (creature.GetLevel() <= 30) {
            return 62124;
         } else if (creature.GetLevel() > 30 && creature.GetLevel() <= 60) {
            return 62124;
         } else if (creature.GetLevel() > 60) {
            return 62124;
         }
      }
      case SpellType.InteruptSpell: {
         if (creature.GetLevel() <= 30) {
            return 57994;
         } else if (creature.GetLevel() > 30 && creature.GetLevel() <= 60) {
            return 57994
         } else if (creature.GetLevel() > 60) {
            return 57994;
         }
      }
      default: {
         return 0;
      }
   }

}

const DEFENDER_ID = TAG("Defenders", "TankDefender");
export function Main(events: TSEvents) {

   events.Player.OnCommand((player,command,found)=>{
      if(command.get().toLowerCase() === "test1"){
         let pet = player.GetPet();
         if(pet !== undefined){
            pet.AddAura(20375,pet);
         }
      }
   })
   events.Creature.OnUpdateAI(DEFENDER_ID, (creature, diff) => {
      let owner = creature.GetOwner();
      let target = creature.GetVictim();
      if (!owner.IsNull()) {
         let aura = creature.GetAura(20375);
         if(!aura){
            creature.AddAura(20375,creature);
            console.log("Added Aura")
         }
         if(creature.GetNumber("ThunderClapCD") < 1 && creature.IsInCombat() && !target.IsNull()){
            creature.CastSpell(target, 47502, true);
            creature.SetNumber("ThunderClapCD", 10);
         }
         if (creature.GetHealthPct() < 75 && creature.GetNumber("HealCD") < 1) {
            creature.CastSpell(creature, GetSpellForMe(creature, SpellType.HealSpell), true);
            creature.SetNumber("HealCD", 15);
         }
         if (creature.GetHealthPct() < 70 && creature.GetNumber("LowDefCD") < 1) {
            creature.CastSpell(creature, GetSpellForMe(creature, SpellType.DeffenceSpellLow), true);
            creature.SetNumber("LowDefCD", 30);
         }
         if (creature.GetHealthPct() < 50 && creature.GetNumber("MedDefCD") < 1) {
            creature.CastSpell(creature, GetSpellForMe(creature, SpellType.DeffenceSpellMedium), true);
            creature.SetNumber("MedDefCD", 120);
         }
         if (creature.GetHealthPct() < 25 && creature.GetNumber("HardDefCD") < 1) {
            creature.CastSpell(creature, GetSpellForMe(creature, SpellType.DeffenceSpellHard), true);
            creature.SetNumber("HardDefCD", 180);
         }
         if (!target.IsNull()) {
            if (target.IsCasting() && creature.GetNumber("InteruptCD") < 1) {
               creature.CastSpell(creature.GetVictim(), GetSpellForMe(creature, SpellType.InteruptSpell), true);
               creature.SetNumber("InteruptCD", 6);
            }
         }

      }

   })
   events.Creature.OnOwnerAttacked(DEFENDER_ID, (creature, attacker) => {
      let distance = creature.GetDistance(attacker);
      let TauntSpell = creature.GetNumber("TauntCD");
      if (distance <= 25 && TauntSpell < 1) {
         creature.CastSpell(attacker, GetSpellForMe(creature, SpellType.AggroSpell), true);
         creature.SetNumber("TauntCD", 10)
      } else {
         creature.AttackStop();
         creature.AttackStart(attacker);
      }
   })

   events.Creature.OnJustAppeared(DEFENDER_ID, (creature) => {
      let owner = creature.GetOwner();
      if (!owner.IsNull()) {
         creature.AddNamedTimer("SpellsCD", 1000, TimerLoops.INDEFINITE, obj => {
            let ThunderClapCD = creature.GetNumber("ThunderClapCD");
            let HealCD = creature.GetNumber("HealCD");
            let LowDefCD = creature.GetNumber("LowDefCD");
            let MedDefCD = creature.GetNumber("MedDefCD");
            let HardDefCD = creature.GetNumber("HardDefCD");
            let TauntSpell = creature.GetNumber("TauntCD");
            let InteruptSpell = creature.GetNumber("InteruptCD");
            if (ThunderClapCD !== undefined) {
               creature.SetNumber("ThunderClapCD", ThunderClapCD - 1);
            }
            if (HealCD !== undefined) {
               creature.SetNumber("HealCD", HealCD - 1);
            }
            if (LowDefCD !== undefined) {
               creature.SetNumber("LowDefCD", LowDefCD - 1);
            }
            if (MedDefCD !== undefined) {
               creature.SetNumber("MedDefCD", MedDefCD - 1);
            }
            if (HardDefCD !== undefined) {
               creature.SetNumber("HardDefCD", HardDefCD - 1);
            }
            if (TauntSpell !== undefined) {
               creature.SetNumber("TauntCD", TauntSpell - 1);
            }
            if (InteruptSpell !== undefined) {
               creature.SetNumber("InteruptCD", InteruptSpell - 1);
            }
         })
      }
   })
}