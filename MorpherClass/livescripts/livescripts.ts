
const newId = TAG("MorpherClass","MorpherClass")
export function Main(events: TSEvents) {
    events.Player.OnCreatureKill((player,creature)=>{
        if(player.GetClass() === newId[0]){
            
            player.SetDisplayID(creature.GetDisplayID())
            player.SetScale(creature.GetScale())
            let result = QueryWorld(`SELECT Spell FROM creature_template_spell WHERE CreatureID =${creature.GetEntry()}`)
            while(result.GetRow()){
                player.LearnSpell(result.GetInt32(0))
            }
        }
    })
    events.Creature.OnJustEnteredCombat((creature,target)=>{
        if(creature.IsPlayer() && creature.GetClass() === newId[0]){
            creature.SetMaxPower(1,400);
            creature.SetPower(1,400);
        }
    })
}