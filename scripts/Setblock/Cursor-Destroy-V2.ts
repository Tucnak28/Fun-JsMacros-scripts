function main() {
    const center = Player.rayTraceBlock(1000, true);

    if (!center) return;

    const blockX = center.getX();
    const blockY = center.getY();
    const blockZ = center.getZ();
    const radius = 300;
    const radiusSquared = radius * radius;
    let count = 0;

    const chunk = World.getChunk(0, 0);

    // Define the boundaries for the sphere
    const xStart = blockX - radius;
    const yStart = Math.max(blockY - radius, chunk.getMinBuildHeight());
    const zStart = blockZ - radius;
    const xEnd = blockX + radius;
    const yEnd = Math.min(blockY + radius, chunk.getHeight());
    const zEnd = blockZ + radius;

    let timeRate = 250;

    let block;
    
    // Loop through the blocks within the defined boundaries
    for (let y = yEnd; y >= yStart; y--) {
        const dy = y - blockY;

        for (let x = xStart; x <= xEnd; x++) {
            const dx = x - blockX;

            for (let z = zStart; z <= zEnd; z++) {
                const dz = z - blockZ;

                // Check if the block is within the spherical radius
                if (dx * dx + dy * dy + dz * dz <= radiusSquared) {
                    do {
                        block = World.getBlock(x, y, z);

                        if(!block) {
                            const playerPos = Player.getPlayer().getPos();
                            const playerX = playerPos.getX();
                            const playerY = playerPos.getY();
                            const playerZ = playerPos.getZ();
                            
                            const targetX = x; // Your target X position
                            const targetY = y; // Your target Y position (+2 as per your example)
                            const targetZ = z; // Your target Z position
                            
                            // Calculate the midpoint between the player's current position and the target position
                            const midX = (playerX + targetX) / 2;
                            const midY = (playerY + targetY) / 2;
                            const midZ = (playerZ + targetZ) / 2;
                            
                            // Teleport the player to the midpoint
                            Chat.say(`/tp ${midX} ${midY} ${midZ}`);
                            Time.sleep(100);
                        }
                    } while (!block)

                    const blockType = block.getId();

                    //if (blockType === "minecraft:ai" || blockType === "minecraft:gold_block") continue;


                    // Torroid
                    /*const ringRadius = radius / 2;
                    const tubeRadius = radius / 4;
                    
                    const distXY = Math.sqrt(dx * dx + dy * dy) - ringRadius;
                    const isOnSurface2 = (
                        Math.abs(distXY * distXY + dz * dz - tubeRadius * tubeRadius) < tubeRadius / 2
                    );*/
                    
                    //Noise
                    /*const isOnSurface1 = (
                        (Math.abs(Math.sin(dx) * Math.cos(dy) * Math.tan(dz) * radius) % 10 < 2) &&
                        (Math.abs(dx * dx - dy * dy + dz * dz) % (radius / 3) < radius / 4) &&
                        (Math.random() > 0.5)
                    );*/
                    
                    //Spiral Galaxy
                    /*const theta = Math.atan2(dy, dx);
                    const radius2D = Math.sqrt(dx * dx + dy * dy);
                    const isOnSurface = (
                        (Math.sin(theta * 5 - radius2D / 5) + Math.random() * 0.5) > 0.5
                    );*/

                    
                    const isOnSurface = Math.abs(dx * dx + dy * dy + dz * dz - radiusSquared) < radius /5;
                    const isOnSurface2 = Math.abs(dx * dx + dy * dy + dz * dz - radiusSquared) < radius /2;

                    if (isOnSurface) {
                        Chat.say(`/setblock ${x} ${y} ${z} minecraft:netherite_block`);
                    } else if (isOnSurface2) {
                        Chat.say(`/setblock ${x} ${y} ${z} minecraft:sea_lantern`);

                    } else if (blockType !== "minecraft:air") {
                        Chat.say(`/setblock ${x} ${y} ${z} air`);
                    }

                    count++;

                    

                    //const fps = parseInt(Client.getFPS().split(" ")[0]);
                    const tps = World.getServerInstantTPS();

                    if (timeRate >= 0 && tps < 19) timeRate-=0.0005;
                    else if(timeRate < 2999)timeRate+=0.0005

                    if (count % Math.ceil(timeRate) === 0) Time.sleep(1);
                }
            }
        }
    }

    Time.sleep(100);
    Chat.log("Blocks destroyed: " + count);
}

const startTime = new Date().getTime() / 1000; // record start time in seconds
main();
const endTime = new Date().getTime() / 1000; // record end time in seconds
const totalTime = endTime - startTime; // calculate total time spent in seconds
Chat.log("Total time spent: " + totalTime + " seconds");

//if ((y - yStart) % 20 === 0) Player.takeScreenshot("./", null);