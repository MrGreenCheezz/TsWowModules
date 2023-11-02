const MyGossip = TAG("MyGossip", "newGossip1");

export const SlotsNames :Array<string> = [
"[Голова]",//0
"[Шея]",//1
"[Плечи]",//2
"[Рубашка]",//3
"[Грудь]",//4
"[Пояс]",//5
"[Ножки]",//6
"[Ступни]",//7
"[Запястья]",//8
"[Руки]",//9
"[Палец нумеро 1]",//10
"[Палец нумеро 2]",//11
"[Трынкет 1]",//12
"[Трынкет 2]",//13
"[Плащь]",//14
"[Права коронная]",//15
"[Левая похоронная]"//16
];

export const PlayersStoredEnchants = new Map<number, Array<number>>();

export function Main(events: TSEvents) {
    events.Creature.OnGossipSelect(MyGossip, (creature, player, menuId, selectId, cancel) => {
        cancel.set(true)
        if(selectId === 254){
            player.LearnSpell(232868);
            player.GossipComplete();
            return;
        }
        let playerEnchants = PlayersStoredEnchants.get(player.GetGUID().GetEntry());
        let item = player.GetEquippedItemBySlot(selectId);
        if (!item.IsNull()) {
            if (playerEnchants !== undefined && playerEnchants.length > 0) {
                for (let j = 0; j < playerEnchants.length; j++) {
                    if (!item.IsNull()) {
                        item.SetEnchantment(playerEnchants[j], j);
                    }
                }
                PlayersStoredEnchants.delete(player.GetGUID().GetEntry());
            }
            else {
                let array: Array<number> = [];
                for (let j = 0; j < 3; j++) {
                    if (!item.IsNull()) {
                        let enchant = item.GetEnchantmentID(j);
                        if (enchant !== 0) {
                            array.push(enchant);
                        }
                    }
                }
                PlayersStoredEnchants.set(player.GetGUID().GetEntry(), array);
                player.RemoveItem(item);
            }
        }
        player.GossipComplete();

    })

    events.Creature.OnGossipHello(MyGossip,(creature, player, cancel) => {

        cancel.set(true)
        player.GossipClearMenu();
        player.GossipMenuAddItem(GossipOptionIcon.CHAT,"__________",0,255)
        for (let i = 0; i < 17; i++) {
            let item = player.GetEquippedItemBySlot(i);
            if (!item.IsNull()) {
                player.GossipMenuAddItem(GossipOptionIcon.MONEY_BAG, SlotsNames[i], 0, i);
            }
        }
        player.GossipMenuAddItem(GossipOptionIcon.BATTLE,"Дай мне друга",0,254)
        let playerEnchants = PlayersStoredEnchants.get(player.GetGUID().GetEntry());
        if(playerEnchants !== undefined && playerEnchants.length > 0){
            player.GossipSendTextMenu(creature, 'Теперь выберите предмет на который хотите копировать зачарования.')
        }else{
            player.GossipSendTextMenu(creature, 'Выберите предмет с которого будут сняти зачарования. ВНИМАНИЕ предмет будет удалён.')
        }
        
    })

}