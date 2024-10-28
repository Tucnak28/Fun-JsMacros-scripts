function checkHeldItem(inv) {
    const held = inv.getHeld();

    if (held.getItemId() !== "minecraft:air") {
        inv.closeAndDrop();
        return Player.openInventory(); // Refresh the inventory after dropping item
    }
    return inv;
}

function processBook(inv, slot) {
    const nbt = inv.getSlot(slot).getNBT();

    try {
        // Check if the book has "components" NBT data
        if (nbt.asCompoundHelper().has("components")) {
            inv.dropSlot(slot);
            Time.sleep(100); // Small delay to avoid issues with dropping items too quickly
            return true; // Indicates book was processed (dropped)
        } else {
            if (slot !== 36) inv.swap(slot, 36); // Move the item to slot 36 for processing
            inv.setSelectedHotbarSlotIndex(0);

            Chat.say("/bookcopy import 20Pages");

            Time.sleep(600); // Wait for the import command to process
            inv.dropSlot(36); // Drop the processed book from slot 36

            Time.sleep(600); // Wait for the drop action to complete
            return true; // Indicates book was processed (imported and dropped)
        }
    } catch (error) {
        Chat.log("Error processing book: " + error);
    }
    return false; // Indicates no action was taken
}

function processBooks(inv) {
    let slots = inv.findItem("minecraft:writable_book");
    let processedBooks = false;

    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];

        if (processBook(inv, slot)) {
            processedBooks = true;
            // Refresh inventory and recheck slots after each import to handle new books
            slots = inv.findItem("minecraft:writable_book");
            i = -1; // Reset loop to start over with updated slots
        }
    }
    return processedBooks;
}

function main() {
    let inv = Player.openInventory();

    while (true) {
        inv = checkHeldItem(inv);

        if (processBooks(inv) === false) {
            Time.sleep(2000); // Only apply cooldown if no books were processed
        }
    }
}

main();
