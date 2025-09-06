let timeRate = 3000;
let count = 0;

function main() {
    const center = Player.rayTraceBlock(1000, true);

    if (!center) return;

    const blockX = center.getX();
    const blockY = center.getY();
    const blockZ = center.getZ();

    const block = World.getBlock(blockX, blockY, blockZ).getId();


    // Perform the scan and store the result in `chunks`
    const chunks = World.getWorldScanner()
    .withBlockFilter("getId").is("MATCHES", block)
    .build().scanAroundPlayer(20);


    Chat.log(chunks.length + " blocks");

    if(chunks.length >= 5000000) {
        Chat.log("uhhh, a little bit too much huh");
        return;
    } 

    chunks.forEach(block => {
        Chat.say(`/setblock ${block.x} ${block.y} ${block.z} air`);
        //Chat.log(World.getBlock(block.x, block.y, block.z));

        count++;

        const tps = World.getServerInstantTPS();

        if (timeRate >= 0 && tps < 19) timeRate-=0.001;
        else if(timeRate < 2999)timeRate+=0.001;

        if (count % Math.ceil(timeRate) === 0) Time.sleep(1);
    });
}

const startTime = new Date().getTime() / 1000; // record start time in seconds
main();
const endTime = new Date().getTime() / 1000; // record end time in seconds
const totalTime = endTime - startTime; // calculate total time spent in seconds
Chat.log("Total time spent: " + totalTime + " seconds");