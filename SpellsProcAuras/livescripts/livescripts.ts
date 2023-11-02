const auras = TAG("ProcAuras","Spells");

export function Main(events: TSEvents) {  
    events.Spell.OnEffectProc(auras,(effect,app,proc,cancel)=>{
     cancel.set(true);
     let spell = GetSpellInfo(effect.GetSpellInfo().GetEffect(0).GetTriggerSpell());
     let spellId = effect.GetSpellInfo().GetEffect(0).GetTriggerSpell();
     let caster = effect.GetCaster();
     let pointA = spell.GetEffect(0).GetBasePoints() * (caster.GetLevel() / 80);
     let pointB = spell.GetEffect(1).GetBasePoints() * (caster.GetLevel() / 80);
     let pointC = spell.GetEffect(2).GetBasePoints() * (caster.GetLevel() / 80);
     let maxPointValue = caster.GetLevel() * 4;
     if(pointA > maxPointValue){
        pointA = maxPointValue * 0.85;
     }
     if(pointB > maxPointValue){
        pointB = maxPointValue * 0.85;
     }
     if(pointC > maxPointValue){
        pointC = maxPointValue * 0.85;
     }
     effect.GetCaster().CastCustomSpell(proc.GetActionTarget(),spellId,true,pointA,pointB,pointC);
    })
   }