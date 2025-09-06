function processBook(inv) {
    const nbt = inv.getSlot(44).getNBT();

    try {
        // Check if the book has "components" NBT data
        if (nbt.asCompoundHelper().has("components")) {
            inv.dropSlot(44);
            Time.sleep(100); // Small delay to avoid issues with dropping items too quickly
            return true; // Indicates book was processed (dropped)
        } else {
            inv.setSelectedHotbarSlotIndex(8);
            Chat.say("/bookcopy import 20Pages");
            Time.sleep(600); // Wait for the import command to process
            inv.dropSlot(44); // Drop the processed book from slot 44
            Time.sleep(600); // Wait for the drop action to complete
            return true; // Indicates book was processed (imported and dropped)
        }
    } catch (error) {
        Chat.log("Error processing book: " + error);
    }
    return false; // Indicates no action was taken 
}

function dropFullBook(inv) {
    const slots = inv.findItem("minecraft:writable_book"); // Find all writable books

    for (const slot of slots) {
        const nbt = inv.getSlot(slot).getNBT();
        try {
            // Check if the book has "components" NBT data
            if (nbt.asCompoundHelper().has("components")) {
                inv.dropSlot(slot); // Drop the book
                Time.sleep(100); // Small delay to avoid issues with dropping items too quickly
            }
        } catch (error) {
            Chat.log("Thrown away full book");
        }
    }
}

function craftRecipe(inv, id) {
    const recipes = inv.getCraftableRecipes();
    let recipe = null;

    for (const r of recipes) {
        if (r.getOutput().getItemId() === id) {
            recipe = r;
            break;
        }
    }

    if (recipe?.canCraft()) {
        recipe.craft(false);
        inv.quick(0);
        Client.waitTick();
    }
}

function ensureSlotFree(inv, slot) {
    const freeSlot = inv.findFreeSlot("container");
    if (freeSlot !== slot) {
        inv.dropSlot(slot); // Drop item in the specified slot
        Time.sleep(100); // Allow the drop to complete
    }
}

function craftAndProcessBook() {
    const inv = Player.openInventory();

    ensureSlotFree(inv, 44); // Step 1: Ensure slot 44 is free

    dropFullBook(inv);

    // Step 2: Craft the book and place it in slot 44
    craftRecipe(inv, "minecraft:writable_book");

    Client.waitTick(1);

    // Step 3: Write in the book
    if (inv.getSlot(44).getItemId() === "minecraft:writable_book") {
        processBook(inv); // Process and drop the book
    } else {
        Chat.log("Error: Book not found in slot 44");
    }
}

function mainLoop() {
    while (true) {
        craftAndProcessBook(); // Call the main function to craft and process the book
    }
}

// Run the main loop
mainLoop();
