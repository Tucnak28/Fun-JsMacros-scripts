const inv = Player.openInventory();

while (1) {
    let slots = inv.findItem("minecraft:writable_book");

    let i = 0;
    while (i < slots.length) {

        const slot = slots[i];
        const nbt = inv.getSlot(slot).getNBT();

        try {
            nbt.asCompoundHelper().get("components").asCompoundHelper();
        } catch (error) {
            if (slot != 36) inv.swap(slot, 36);
        
            Chat.say("/bookcopy import 20Pages");

            Time.sleep(600);
            inv.dropSlot(36);

            Time.sleep(600);

            // Recheck slots after actions
            slots = inv.findItem("minecraft:writable_book"); 
            i = -1; // Reset loop to ensure updated slots are checked
        }

        i++;
    }

    Time.sleep(2000);
}

Chat.log("!!Ready!!");
