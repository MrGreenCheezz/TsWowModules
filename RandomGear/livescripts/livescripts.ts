
let chestChance = 1;
let ItemsInChest = 4;
let chestId = UTAG("RandomChest","RandomChest1");

export class Item {
    public entry: number;
    public itemLevel: number;
    public needLevel: number;
 
    constructor(entry: number, itemlevel: number, needlevel: number) {
       this.entry = entry;
       this.itemLevel = itemlevel;
       this.needLevel = needlevel;
    }
 
 }
 
 export let ItemsArray: Array<Item> = [];
 export let ClothSlotQuerys = new Map<int, Array<Item>>();
 export let LeatherSlotQuerys = new Map<int, Array<Item>>();
 export let MailSlotQuerys = new Map<int, Array<Item>>();
 export let PlateSlotQuerys = new Map<int, Array<Item>>();
 export let ClassQuerys = new Map<int, Map<int, Array<Item>>>();
 
 export function randomRange(min: int, max: int) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 export function FillArrays() {
    //cloth query
    for (let i = 1; i < 17; i++) {
       let Items: Array<Item> = [];
       let resultQuery = QueryWorld(`SELECT * FROM item_template WHERE class = 4 AND subclass <= 1 AND InventoryType = ${i}`)
       while (resultQuery.GetRow()) {
          let item = new Item(resultQuery.GetInt32(0), resultQuery.GetInt32(15), resultQuery.GetInt32(16));
          Items.push(item)
       }
       ClothSlotQuerys.set(i, Items);
    }
    //Leather query
    for (let i = 1; i < 11; i++) {
       let Items: Array<Item> = [];
       let resultQuery = QueryWorld(`SELECT * FROM item_template WHERE class = 4 AND subclass <= 2 AND InventoryType = ${i}`)
       while (resultQuery.GetRow()) {
          let item = new Item(resultQuery.GetInt32(0), resultQuery.GetInt32(15), resultQuery.GetInt32(16));
          Items.push(item)
       }
       LeatherSlotQuerys.set(i, Items);
    }
    //Mail query
    for (let i = 1; i < 11; i++) {
       let Items: Array<Item> = [];
       let resultQuery = QueryWorld(`SELECT * FROM item_template WHERE class = 4 AND subclass <= 3 AND InventoryType = ${i}`)
       while (resultQuery.GetRow()) {
          let item = new Item(resultQuery.GetInt32(0), resultQuery.GetInt32(15), resultQuery.GetInt32(16));
          Items.push(item)
       }
       MailSlotQuerys.set(i, Items);
    }
    //Plate query 
    for (let i = 1; i < 11; i++) {
       let Items: Array<Item> = [];
       let resultQuery = QueryWorld(`SELECT * FROM item_template WHERE class = 4 AND subclass <= 4 AND InventoryType = ${i}`)
       while (resultQuery.GetRow()) {
          let item = new Item(resultQuery.GetInt32(0), resultQuery.GetInt32(15), resultQuery.GetInt32(16));
          Items.push(item)
       }
       PlateSlotQuerys.set(i, Items);
    }
    ClassQuerys.set(1, ClothSlotQuerys);
    ClassQuerys.set(2, LeatherSlotQuerys);
    ClassQuerys.set(3, MailSlotQuerys);
    ClassQuerys.set(4, PlateSlotQuerys);
 }
 

export function GetRandomItemFromArray(classValue: number,slotToEquip:number,playerLevel:number){
   let randomArray: Array<number> = [];
             let classResult = ClassQuerys.get(classValue as number);
             if (classResult !== undefined) {
                let slotResult = classResult.get(slotToEquip);
                if (slotResult !== undefined) {
                   slotResult.forEach((item, index) => {
                      if (item.itemLevel >= playerLevel && item.needLevel <= playerLevel) {
                         randomArray.push(item.entry);
                      }
                   })
                }
             }
             let randomItemEntry = randomArray[randomRange(0, randomArray.length - 1)];
             return randomItemEntry;
}

export function Main(events: TSEvents) {
    FillArrays();

   events.Player.OnCreatureKill((player,creature)=>{
      let randomValue = randomRange(0,100);
      if(randomValue < chestChance){
         player.SummonGameObject(chestId,creature.GetX(),creature.GetY(),creature.GetZ(),creature.GetO(),0);
      }
   })
    
   events.GameObject.OnGenerateLoot(chestId,(gameobject, player)=>{
      let loot = gameobject.GetLoot();
      gameobject.GetLoot().Clear();
      let playerClass = player.GetClass();
          let playerLevel = player.GetLevel();
          let classValue;
          if (playerClass <= 2 || playerClass === 6 || playerClass === 12) {
             classValue = 4;
          } else if (playerClass === 3 || playerClass === 7) {
             classValue = 3;
          } else if (playerClass === 4 || playerClass === 11) {
             classValue = 2;
          } else if (playerClass === 9 || playerClass === 8 || playerClass === 5) {
             classValue = 1;
          }
          for(let  i = 0; i < ItemsInChest; i++){
            loot.AddItem(GetRandomItemFromArray(classValue as number,randomRange(0,15),playerLevel),1,1);
          } 
   })


   
   events.Player.OnCommand((player, command, found) => {
    let playerMoneyRate;
    let moneyCost = 200000;
    if (command.get().toLowerCase() === "items") {
       playerMoneyRate = player.GetLevel() / 10;
       if (player.TryReduceMoney(moneyCost * playerMoneyRate)) {
          for (let l = 0; l < 15; l++) {
             let item = player.GetEquippedItemBySlot(l);
             if (!item.IsNull()) {
                player.RemoveItem(item);
             }
          }
          let playerClass = player.GetClass();
          let playerLevel = player.GetLevel();
          let classValue;
          if (playerClass <= 2 || playerClass === 6 || playerClass === 12) {
             classValue = 4;
          } else if (playerClass === 3 || playerClass === 7) {
             classValue = 3;
          } else if (playerClass === 4 || playerClass === 11) {
             classValue = 2;
          } else if (playerClass === 9 || playerClass === 8 || playerClass === 5) {
             classValue = 1;
          }
          for (let i = 1; i < 16; i++) {
             let classNumber = classValue;
             let slotToEquip = i;
             if (i === 11 || i === 12) {
                classNumber = 1;
                slotToEquip = 11;
             }
             if (i === 13 || i === 14) {
                classNumber = 1;
                slotToEquip = 12;
             }
             if (i === 15) {
                classNumber = 1;
                slotToEquip = 16;
             }
             let randomArray: Array<number> = [];
             let classResult = ClassQuerys.get(classNumber as number);
             if (classResult !== undefined) {
                let slotResult = classResult.get(slotToEquip);
                if (slotResult !== undefined) {
                   slotResult.forEach((item, index) => {
                      if (item.itemLevel >= playerLevel && item.needLevel <= playerLevel) {
                         randomArray.push(item.entry);
                      }
                   })
                }
             }
             let randomItemEntry = randomArray[randomRange(0, randomArray.length - 1)];
             player.EquipItem(randomItemEntry, i - 1);
          }
          found.set(true);
       }
    }
 })
}