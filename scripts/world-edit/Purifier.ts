let savedBlocks = {};

// Initialize min and max coordinates

let startCoord, endCoord;

function main() {
    // Perform the scan to find structure blocks around the player
    const chunks = World.getWorldScanner()
        .withBlockFilter("getId").is("CONTAINS", "structure_block")
        .build().scanAroundPlayer(10);

    // Ensure at least two structure blocks are found
    if (chunks.length < 2) {
        Chat.log("Error: Less than two structure blocks found.");
        return;
    }

    let minCoord = { x: Infinity, y: Infinity, z: Infinity };
    let maxCoord = { x: -Infinity, y: -Infinity, z: -Infinity };


    // Determine the min and max coordinates from the structure blocks
    chunks.forEach(chunk => {
        const { x, y, z } = chunk;
        minCoord = { x: Math.min(minCoord.x, x), y: Math.min(minCoord.y, y), z: Math.min(minCoord.z, z) };
        maxCoord = { x: Math.max(maxCoord.x, x), y: Math.max(maxCoord.y, y), z: Math.max(maxCoord.z, z) };
    });

    // Adjust the min and max coordinates to exclude the structure blocks
    startCoord = { x: minCoord.x + 1, y: minCoord.y + 1, z: minCoord.z + 1 };
    endCoord = { x: maxCoord.x - 1, y: maxCoord.y - 1, z: maxCoord.z - 1 };

    // Ensure valid bounds
    if (startCoord.x > endCoord.x || startCoord.y > endCoord.y || startCoord.z > endCoord.z) {
        Chat.log("Error: The calculated region is invalid.");
        return;
    }

    // Create an object to store block data
    savedBlocks = {};

    // Iterate over each block in the defined cuboid region and save block data
    for (let x = startCoord.x; x <= endCoord.x; x++) {
        for (let y = startCoord.y; y <= endCoord.y; y++) {
            for (let z = startCoord.z; z <= endCoord.z; z++) {
                // Save the block type using the coordinate as the key in a nested format
                if (!savedBlocks[x]) savedBlocks[x] = {};
                if (!savedBlocks[x][y]) savedBlocks[x][y] = {};
                savedBlocks[x][y][z] = World.getBlock(x, y, z).getId();
            }
        }
    }

    Chat.log("Blocks saved for terrain repair.");
}

function checkAndRestoreBlocks() {

    if (startCoord.x > endCoord.x || startCoord.y > endCoord.y || startCoord.z > endCoord.z) {
        Chat.log("Error: The calculated region is invalid.");
        return;
    }

    // Iterate over each block in the defined cuboid region and check if it needs to be restored
    for (let x = startCoord.x; x <= endCoord.x; x++) {
        for (let y = startCoord.y; y <= endCoord.y; y++) {
            for (let z = startCoord.z; z <= endCoord.z; z++) {
                const currentBlockId = World.getBlock(x, y, z).getId();
                const savedBlockId = savedBlocks[x]?.[y]?.[z];

                if (savedBlockId && currentBlockId !== savedBlockId) {
                    // Restore the block if its ID has changed
                    Chat.say(`/setblock ${x} ${y} ${z} ${savedBlockId}`);
                }
            }
        }
    }
    
}


// Start the main function and the periodic check function
const startTime = new Date().getTime() / 1000; // Record start time in seconds
main();
const endTime = new Date().getTime() / 1000; // Record end time in seconds
Chat.log("Total time spent: " + (endTime - startTime) + " seconds");


while(true) {
    Time.sleep(5000);
    checkAndRestoreBlocks();
}