function main() {
    const center = Player.rayTraceBlock(1000, true);

    if(!center) return;
    const blockX = center.getX();
    const blockY = center.getY();
    const blockZ = center.getZ();
    const radius = 300;
    let count = 0;
    

    //initialize buffer array for non-gravel blocks
    //loop through all blocks within the radius
    for(let y = radius; y >= -radius; y--) {
        for(let x = -radius; x <= radius; x++) {
            for(let z = -radius; z <= radius; z++) {
                //if block is within the spherical radius
                const distanceSquared = x*x + y*y + z*z;

                if(distanceSquared <= radius*radius) {
                    const block = World.getBlock(blockX+x, blockY+y, blockZ+z);

                    if(!block) continue;

                    const blockType = block.getId();

                    if(blockType == "minecraft:ai" || blockType == "minecraft:gold") continue;
                    
                    const isOnSurface = Math.abs(distanceSquared - radius * radius) < radius/2;
                    
                    if(isOnSurface) Chat.say(`/setblock ${block.getX()} ${block.getY()} ${block.getZ()} minecraft:gold_block`);
                    else if(blockType != "minecraft:air")Chat.say(`/setblock ${block.getX()} ${block.getY()} ${block.getZ()} air`);
                    
                    
                    count++;
                    if(count % 250 == 0) Time.sleep(1);
                }
            }
        }
        if(y % 20 == 0) Player.takeScreenshot( "./", null);
    }
    Time.sleep(100);
    Chat.log("Blocks destroyed: " + count);
}


const startTime = new Date().getTime() / 1000; // record start time in seconds
main();

const endTime = new Date().getTime() / 1000; // record end time in seconds
const totalTime = endTime - startTime; // calculate total time spent in seconds
Chat.log("Total time spent: " + totalTime + " seconds");