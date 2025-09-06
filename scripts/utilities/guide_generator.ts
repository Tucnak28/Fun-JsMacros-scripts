const inv = Player.openInventory();
while(1) {
    Chat.say("/sf guide");

    const slots = inv.findItem("minecraft:enchanted_book");

    for (const slot in slots) {
        inv.dropSlot(slots[slot]);
    }

    Time.sleep(500);
}