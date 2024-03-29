//The code calculates the line of sight from the player's position and systematically destroys blocks along that path within a specified radius, clearing obstructive terrain.

let coordinatesToSetAir = {}; // Hash map to store unique coordinates
const radius = 5;
const length = 300;

function blocksHash(x, y, z) {
    for (let offsetY = -radius; offsetY <= radius; offsetY++) {
        for (let offsetX = -radius; offsetX <= radius; offsetX++) {
            for (let offsetZ = -radius; offsetZ <= radius; offsetZ++) {
                const targetX = parseInt(x) + offsetX;
                const targetY = parseInt(y) + offsetY;
                const targetZ = parseInt(z) + offsetZ;

                if (targetY >= 319 || targetY <= -63) continue;

                // Store the coordinates as a string in the hash map
                const coordinateString = `${targetX},${targetY},${targetZ}`;
                coordinatesToSetAir[coordinateString] = true;
            }
        }
    }
}


function main() {
    let startTime = Date.now(); // Record the start time

    const center = Player.rayTraceBlock(1000, false);
    if(!center) return;

    const eyePos = Player.getPlayer().getEyePos();
    let vector = [  
        center.getX()-eyePos.getX(), 
        center.getY()-eyePos.getY(), 
        center.getZ()-eyePos.getZ()];

    let magnitude = Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
    let normalizedVector = vector.map((component) => component / magnitude);

    for (let i = 0; i < length; i++) {
        let currentPosition = [
            eyePos.getX() + normalizedVector[0] * i,
            eyePos.getY() + normalizedVector[1] * i,
            eyePos.getZ() + normalizedVector[2] * i
        ];
        blocksHash(currentPosition[0], currentPosition[1], currentPosition[2]);
        
        //Time.sleep(10);
    }

    const elapsedTime = (Date.now() - startTime) / 1000;

    // Convert the hash map keys (unique coordinates) back to array
    const uniqueCoordinates = Object.keys(coordinatesToSetAir);

    Chat.log("Calculations done: " + uniqueCoordinates.length + " blocks");
    Chat.log("Time: " + elapsedTime + "s");

    // Shuffle the array to randomize the order
    uniqueCoordinates.sort(() => Math.random() - 0.5);



    // Iterate through the unique coordinates and set the corresponding blocks to air
    uniqueCoordinates.forEach((coordinateString, index) => {
        const [x, y, z] = coordinateString.split(',').map(coord => parseInt(coord));

        const block = World.getBlock(x, y, z);
        if (!block) return;
        if (block.getId() == 'minecraft:air') return;
        if (block.getId() == 'minecraft:grass') return;
        
        Chat.say(`/setblock ${x} ${y} ${z} air`);
        
        // Check if the index is a multiple of twenty (0-based index)
        if ((index + 1) % 200 === 0) {
            // Sleep for a certain amount of time after every twentieth block
            Time.sleep(1); // Sleep for 1000 milliseconds (1 second)
        }
    });

}

main();