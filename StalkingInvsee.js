function createInventory() {
    Inventory = ""
    for(let i = 0; i < 54; i++) {
        Map = Player.openInventory().getSlot(i)
        Inventory = Inventory + Map.getItemId() + Map.getCount() 
    }
    return Inventory
}
//player = "./" + Player.openInventory().getContainerTitle() + "/"
//player = player.replace(/[0-9]/g, '');
//player = player.toLowerCase();
inventoryNow = createInventory()
while(true) {
    if( createInventory() != inventoryNow ) {
        //Chat.log("a")
        Player.takeScreenshot("./", null)
        inventoryNow = createInventory()
    }
    Time.sleep(100)
}
