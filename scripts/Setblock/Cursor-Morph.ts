function moveBlockTowardsCenter(x, y, z, centerX, centerY, centerZ, occupied) {
    if (World.getBlock(x, y, z).getId() === 'minecraft:air') return;

    // Calculate movement direction towards center
    let newX = x;
    let newY = y;
    let newZ = z;
    
    if (x < centerX) newX++;
    if (x > centerX) newX--;
    
    if (y < centerY) newY+=2;
    if (y > centerY) newY+=2;
    
    if (z < centerZ) newZ++;
    if (z > centerZ) newZ--;

    // Check new position for validity
    const newPosKey = `${newX},${newY},${newZ}`;
    if (World.getBlock(newX, newY, newZ).getId() !== 'minecraft:air' || occupied.has(newPosKey)) {
        return;
    }

    // Move the block
    Chat.say(`/clone ${x} ${y} ${z} ${x} ${y} ${z} ${newX} ${newY} ${newZ} replace move`);

    // Mark the new position as occupied
    occupied.add(newPosKey);
}

function implode(centerX, centerY, centerZ, radius) {
    const occupied = new Set();

    // Process blocks from the outside in, layer by layer
    for (let layer = radius; layer > 0; layer--) {
        for (let x = -layer; x <= layer; x++) {
            for (let y = -layer; y <= layer; y++) {
                for (let z = -layer; z <= layer; z++) {
                    if (Math.abs(x) === layer || Math.abs(y) === layer || Math.abs(z) === layer) {
                        moveBlockTowardsCenter(centerX + x, centerY + y, centerZ + z, centerX, centerY, centerZ, occupied);
                    }
                }
            }
        }
        // Add a delay to visually show the implosion step by step
        //Time.sleep(1);
    }
}

function main() {
    const radius = 50;  // The radius of the implosion
    const repeatCount = 10;  // Number of times the implosion effect repeats
    const delayBetweenImplosions = 0;  // Delay in milliseconds between each implosion

    const center = Player.rayTraceBlock(1000, false);

    const centerX = center.getX();
    const centerY = center.getY();
    const centerZ = center.getZ();

    for (let i = 0; i < repeatCount; i++) {
        implode(centerX, centerY, centerZ, radius);

        // Delay between each implosion to allow for reset or visualization
        Time.sleep(delayBetweenImplosions);
    }
}


const startTime = new Date().getTime() / 1000; // record start time in seconds
main();
const endTime = new Date().getTime() / 1000; // record end time in seconds
const totalTime = endTime - startTime; // calculate total time spent in seconds
Chat.log("Total time spent: " + totalTime + " seconds");
