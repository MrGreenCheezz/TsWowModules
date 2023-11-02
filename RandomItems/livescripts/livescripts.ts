

export function Main( events : TSEvents){
    events.Item.OnTakenAsLoot((item, lootItem,loot,player) => {
        if(item.GetClass() === 2.0 || item.GetClass() === 4.0){
        let a = false;
        let b = false;
        let c = false;
        let aCount = 0;
        let bCount = 0;
        let cCount = 0;
       let chance = getRandomInt(1, 10);
       console.log(chance);
        
        if(chance > 8){
            do {
                a = item.SetEnchantment(getRandomInt(4352, 54184),0);
                console.log("1rst tier");
                aCount++;
            } 
            while(!a && aCount < 3)    
            do {
                b = item.SetEnchantment(getRandomInt(1, 4351),1);
                console.log("2nd tier");
                bCount++;
            } 
            while(!b && bCount < 3)   
            do {
                c = item.SetEnchantment(getRandomInt(1, 4351),2);
                console.log("3rd tier");
                cCount++;
            } 
            while(!c && cCount < 3)   
        }

        if(chance >= 6 && chance <= 8){
            do {
                a = item.SetEnchantment(getRandomInt(4352, 54184),0);
                console.log("1rst tier");
                aCount++;
            } 
            while(!a && aCount < 3)    
            do {
                b = item.SetEnchantment(getRandomInt(1, 4351),1);
                console.log("2nd tier");
                bCount++;
            } 
            while(!b && bCount < 3)  
        }
        if(chance < 6){
            do {
                a = item.SetEnchantment(getRandomInt(1, 4351),0);
                console.log("1rst tier");
                aCount++;
            } 
            while(!a && aCount < 3) 
        }
        }
               
        function getRandomInt(min : number, max: number) : number{
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        };
    });

   
     
}