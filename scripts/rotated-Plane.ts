function createRotatedPlane(center, normal, width, length) {
    const centerX = center.getX();
    const centerY = center.getY();
    const centerZ = center.getZ();
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
            const x = centerX + offsetX;
            const y = centerY + offsetY;
            const z = centerZ + offsetZ;

            //Chat.log(`${x}, ${y}, ${z}`);

            // Place the block at the calculated position
            placeBlock(x, y, z);
        }
    }
}

function placeBlock(x, y, z) {
    // Place a block at the specified coordinates
    Chat.say(`/setblock ${parseInt(x)} ${parseInt(y)} ${parseInt(z)} stone`);
}


// Variables representing 90-degree angles
const rightAngle = { x: 1, y: 0, z: 0 }; // Right angle along the x-axis
const upAngle = { x: 0, y: 1, z: 0 };    // Right angle along the y-axis
const forwardAngle = { x: 0, y: 0, z: 1 };// Right angle along the z-axis

// Variables representing flat orientations
const horizontal = { x: 1, y: 0, z: 1 }; // Flat along the x and z axes (horizontal plane)
const vertical = { x: 0, y: 1, z: 0 };   // Flat along the y-axis (vertical plane)

// Other degrees or orientations
const diagonal = { x: 1, y: 1, z: 1 };   // Diagonal orientation
const customAngle = { x: -0.2, y: -0.8, z: 0.38 }; // Custom angle

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

    normalizedVector = { x: normalizedVector[0], y: normalizedVector[1], z: normalizedVector[2]};

    createRotatedPlane(center, normalizedVector, 50, 50);
}

main();