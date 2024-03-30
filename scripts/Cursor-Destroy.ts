//The code destroys blocks within a specified spherical radius centered around where player is looking, removing gravel and water blocks directly while buffering other block types for sequential removal to optimize performance.

/*
const center = Player.rayTraceBlock(1000, true);
//if(!center) continue;
const blockX = center.getX();
const blockY = center.getY();
const blockZ = center.getZ();
const radius = 175;

let count = 0;
//Write a for loop that will do setblock for every block in a radius of that coordinations in sphere shape
for(let y = -radius; y <= radius; y++) {
    for(let x = -radius; x <= radius; x++) {
      for(let z = -radius; z <= radius; z++) {
        if(x*x + y*y + z*z <= radius*radius) {
            
            const block = World.getBlock(blockX+x, blockY+y, blockZ+z);
            if(!block) continue;
            let blockType = block.getId();
            if(blockType == "minecraft:air") continue;
            //Chat.say(`/clone ${blockX+x} ${blockY+y} ${blockZ+z} ${blockX+x} ${blockY+y} ${blockZ+z} ${blockX+x} ${blockY+y+50} ${blockZ+z}`);
            Chat.say(`/setblock ${blockX+x} ${blockY+y} ${blockZ+z} air`);
            count++;
            if(count % 300 == 0) Time.sleep(1)
        }
      }
    }
  }

Chat.log("Blocks destroyed: " + count);
Time.sleep(5)

*/
function main() {
    const center = Player.rayTraceBlock(1000, true);

    if(!center) return;
    const blockX = center.getX();
    const blockY = center.getY();
    const blockZ = center.getZ();
    const radius = 100;
    let count = 0;

    //initialize buffer array for non-gravel blocks
    let nonGravelBuffer = [];
    //loop through all blocks within the radius
    for(let y = radius; y >= -radius; y--) {
        for(let x = -radius; x <= radius; x++) {
            for(let z = -radius; z <= radius; z++) {
                //if block is within the spherical radius
                if(x*x + y*y + z*z <= radius*radius) {
                    const block = World.getBlock(blockX+x, blockY+y, blockZ+z);
                    if(!block) continue;
                    const blockType = block.getId();
                    //if it's gravel, remove it directly
                    if(blockType === "minecraft:gravel" || blockType === "minecraft:water" || blockType === "minecraft:lava") {
                        Chat.say(`/setblock ${block.getX()} ${block.getY()} ${block.getZ()} air`);
                    } else {
                        //otherwise, add it to the buffer array of non-gravel blocks
                        nonGravelBuffer.push(block);
                    }
                    count++;
                    if(count % 5000 == 0) Time.sleep(1);
                }
            }
        }
    }
    
    // Shuffle the array to randomize the order
    nonGravelBuffer.sort(() => Math.random() - 0.5);

    //loop over non-gravel buffer to replace all blocks with air
    count = 0;
    for(let i = nonGravelBuffer.length - 1; i >= 0; i--) {
        const blockType = nonGravelBuffer[i].getId();
        //skip if it's already air
        if(blockType == "minecraft:air") continue;
        Chat.say(`/setblock ${nonGravelBuffer[i].getX()} ${nonGravelBuffer[i].getY()} ${nonGravelBuffer[i].getZ()} air`);
        count++;
        if(count % 200 == 0) Time.sleep(1);
    }

    Time.sleep(100);
    Chat.log("Blocks destroyed: " + count);
}


const startTime = new Date().getTime() / 1000; // record start time in seconds
main();

const endTime = new Date().getTime() / 1000; // record end time in seconds
const totalTime = endTime - startTime; // calculate total time spent in seconds
Chat.log("Total time spent: " + totalTime + " seconds");