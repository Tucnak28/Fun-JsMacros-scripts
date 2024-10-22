const inv = Player.openInventory();

const slots = inv.findItem("minecraft:writable_book");

for (const slot in slots) {

    const nbt = inv.getSlot(slots[slot]).getNBT();

    try {
        nbt.asCompoundHelper().get("components").asCompoundHelper();
    } catch (error) {
        inv.swap(slots[slot], 36);

        Chat.say("/bookcopy import 20Pages");

        Time.sleep(600);
        inv.swap(slots[slot], 36);

        Time.sleep(600);
    }

}

Chat.log("!!Ready!!");

