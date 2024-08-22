function main() {
    const center = Player.rayTraceBlock(1000, true);

    if(!center) return;
    const blockX = center.getX();
    const blockY = center.getY();
    const blockZ = center.getZ();
    const radius = 100;
    let count1 = 0;
    let count2 = 0;

    // Measure time for the first method (iterateSphere)
    /*const startTimeMethod1 = new Date().getTime() / 1000;
    World.iterateSphere(center.getBlockPos(), radius, JavaWrapper.methodToJava( 
        (bData)=>{
            if(bData.getId().includes('water')){
                count1++;
            }
        }
    ));
    const endTimeMethod1 = new Date().getTime() / 1000;
    const totalTimeMethod1 = endTimeMethod1 - startTimeMethod1;
    Chat.log("Time spent in method 1 (iterateSphere): " + totalTimeMethod1 + " seconds");*/


    Chat.log("--------------------------------------------------");
        // Measure time for the second method (for-loop iteration)
        const startTimeMethod1 = new Date().getTime() / 1000;


        const endTimeMethod1 = new Date().getTime() / 1000;
        const totalTimeMethod1 = endTimeMethod1 - startTimeMethod1;
        Chat.log("Time spent in method 1 (for-loop): " + totalTimeMethod1 + " seconds");

    // Measure time for the second method (for-loop iteration)
    const startTimeMethod2 = new Date().getTime() / 1000;
    for(let y = radius; y >= -radius; y--) {
        for(let x = -radius; x <= radius; x++) {
            for(let z = -radius; z <= radius; z++) {
                const distanceSquared = x*x + y*y + z*z;
                if(distanceSquared <= radius*radius) {
                    const block = World.getBlock(blockX+x, blockY+y, blockZ+z);
                    if(!block) continue;
                    if(block.getId() == "minecraft:water") count2++;
                }
            }
        }
    }
    const endTimeMethod2 = new Date().getTime() / 1000;
    const totalTimeMethod2 = endTimeMethod2 - startTimeMethod2;
    Chat.log("Time spent in method 2 (for-loop): " + totalTimeMethod2 + " seconds");

    // Log the counts
    Chat.log("Count from method 1: " + count1);
    Chat.log("Count from method 2: " + count2);
}

// Record start time
const startTime = new Date().getTime() / 1000; 
main();
// Record end time
const endTime = new Date().getTime() / 1000; 
// Calculate and log total time spent
const totalTime = endTime - startTime; 
Chat.log("Total time spent: " + totalTime + " seconds");




//Chat.say(`/setblock ${bData.getX()} ${bData.getY()} ${bData.getZ()} air`);