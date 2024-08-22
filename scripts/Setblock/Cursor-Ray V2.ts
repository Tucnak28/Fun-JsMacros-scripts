//The code calculates the line of sight from the player's position and systematically destroys blocks along that path within a specified radius, clearing obstructive terrain.
const radius = 20;
const length = 500;



let count = 0;

let liquids = []; 

function liquidCheck(block) {
    if(!(block.getId() === "minecraft:water" || block.getId() === "minecraft:lava")) return;
    
    liquids.push([block.getX(), block.getY(), block.getZ()]);
}

function planeHash(center, normal, width, length) {
    const centerX = center[0];
    const centerY = center[1];
    const centerZ = center[2];
    const normalX = normal.x;
    const normalY = normal.y;
    const normalZ = normal.z;

    // Calculate orthogonal vectors to the normal vector
    let v1, v2;

    // Check if normalX and normalY are not both zero
    if (normalX !== 0 || normalY !== 0) {
        v1 = { x: normalY, y: -normalX, z: 0 };
    } else {
        // If normalX and normalY are both zero, use a different approach
        v1 = { x: 1, y: 0, z: 0 };
    }

    // Calculate v2 by taking the cross product of normal and v1 to ensure orthogonality
    v2 = {
        x: normalY * v1.z - normalZ * v1.y,
        y: normalZ * v1.x - normalX * v1.z,
        z: normalX * v1.y - normalY * v1.x
    };

    // Normalize orthogonal vectors
    const lengthV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
    const lengthV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
    const unitV1 = { x: v1.x / lengthV1, y: v1.y / lengthV1, z: v1.z / lengthV1 };
    const unitV2 = { x: v2.x / lengthV2, y: v2.y / lengthV2, z: v2.z / lengthV2 };

    // Iterate through each block in the plane
    for (let i = -width / 2; i <= width / 2; i++) {
        for (let j = -length / 2; j <= length / 2; j++) {
            // Calculate position of the current block
            const offsetX = i * unitV1.x + j * unitV2.x;
            const offsetY = i * unitV1.y + j * unitV2.y;
            const offsetZ = i * unitV1.z + j * unitV2.z;

            // Calculate final position of the block
            const x = Math.floor(centerX + offsetX); //the floor is essential because math.round sets some numbers to -0.0
            const y = Math.floor(centerY + offsetY);
            const z = Math.floor(centerZ + offsetZ);
            
            


            if (y >= 319 || y <= -63) continue;

            const block = World.getBlock(x, y, z);
            if (!block) continue;
            const blockType = block.getId();
            const blockStates = block.getBlockStateHelper().blocksMovement();
            count++;    
            
            if (!blockStates && blockType != "minecraft:water") continue;
            //if (blockType == 'minecraft:air') continue;
            //if (blockType == 'minecraft:grass') continue;

            //liquidCheck(block);
            if (count % radius*2 === 0) Time.sleep(1);


            Chat.say(`/setblock ${x} ${y} ${z} air`);

            //Chat.log(blockType);
        }
    }
}


function main() {
    const center = Player.rayTraceBlock(2000, false);
    if(!center) return;

    const eyePos = Player.getPlayer().getEyePos();
    let vector = [  
        center.getX()-eyePos.getX(), 
        center.getY()-eyePos.getY(), 
        center.getZ()-eyePos.getZ()];

    let magnitude = Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
    let normalizedVector = vector.map((component) => component / magnitude);

    let normalizedVectorArray = { x: normalizedVector[0], y: normalizedVector[1], z: normalizedVector[2]};


    for (let i = 0; i < length; i+=0.2  ) {//i+=radius/1.5) {
        let currentPosition = [
            eyePos.getX() + normalizedVector[0] * i,
            eyePos.getY() + normalizedVector[1] * i,
            eyePos.getZ() + normalizedVector[2] * i
        ];

        //Chat.log(`${currentPosition[0]}, ${currentPosition[1]}  , ${currentPosition[2]}`);

        //blocksHash(currentPosition[0], currentPosition[1], currentPosition[2]);

        //const custom = { x: 0, y: 0, z: 1 }; // Flat along the x and z axes (horizontal plane)
        planeHash(currentPosition, normalizedVectorArray, radius, radius);
    }


}

let startTime = Date.now(); // Record the start time

main();

const elapsedTime = (Date.now() - startTime) / 1000;

Chat.log("Calculations done: " + count + " blocks");
Chat.log("Time: " + elapsedTime + "s");
