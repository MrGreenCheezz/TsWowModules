export const ProcSpells = TAG("ProcAuras","Spells");

export function randomRange(min: int, max: int) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

export function Main(events: TSEvents) {
    events.Creature.OnJustEnteredCombat((creature)=>{
	let chance = randomRange(0,100)
	if(chance >= 50)
	{
		let ProcId = ProcSpells[randomRange(0,ProcSpells.length - 1)];
        	let test = creature.AddAura(ProcId, creature);
        	console.log(test.GetAuraID())
	}       
    })
}