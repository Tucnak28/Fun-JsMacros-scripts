const globalVars = GlobalVars; // Access to GlobalVars

// Function to remove all global variables
function removeAllGlobalVars() {
    const rawVars = globalVars.getRaw(); // Get all global variables as an object
    for (const key in rawVars) {
        globalVars.remove(key); // Remove each global variable by its key
    }
    Chat.log("All global variables have been removed."); // Log the action
}

// Call the function to remove all global variables
removeAllGlobalVars();
