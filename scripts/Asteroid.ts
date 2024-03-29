// Function to summon TNT
function summonTNT(x, y, z, fuse, motionArray, noGravity) {
    const motionString = motionArray.join(",");
    Chat.say(`/summon minecraft:tnt ${x} ${y} ${z} {Fuse:${fuse}, Motion:[${motionString}], NoGravity:${noGravity}}`);
}


function summonSphereTNT(centerX, centerY, centerZ, numTNT, radius, spawnRadius, height) { 
    const spawnX = Math.round(centerX + Math.random() * (spawnRadius - (-spawnRadius) + 1) + (-spawnRadius));
    const spawnY = centerY + height;
    const spawnZ = Math.round(centerZ + Math.random() * (spawnRadius - (-spawnRadius) + 1) + (-spawnRadius));

    const vector = [centerX - spawnX, centerY - spawnY, centerZ - spawnZ];
    let magnitude = Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
    let normalizedVector = vector.map((component) => (component / magnitude ** 0.6).toFixed(5));

    for (let i = 0; i < numTNT; i++) {
        const theta = (Math.PI * i) / numTNT;
        const phi = Math.acos(1 - 2 * (i / numTNT));
        //const psi = Math.random() * 2 * Math.PI;
        const psi = i;

        const x = radius * Math.sin(phi) * Math.cos(psi);
        const y = radius * Math.sin(phi) * Math.sin(psi);
        const z = radius * Math.cos(phi);

        // Adjust the summoned TNT's position using the calculated coordinates
        summonTNT(spawnX + x, spawnY + y, spawnZ + z, magnitude**0.7+Math.random()*10, normalizedVector, 1);
    }
}


// Event listener for mouse click
function onMouseClick() {
    const numCircTNT = 1000;
    const radius = 40;  // Set your desired radial distance or radius
    const spawnRadius = 150;
    const height = 200;

// Calling the function

    const center = Player.rayTraceBlock(1000, true);
    if (center) {
        const blockX = center.getX();
        const blockY = center.getY();
        const blockZ = center.getZ();

        summonSphereTNT(blockX, blockY + 20, blockZ, numCircTNT, radius, spawnRadius, height);
        // Uncomment the line below if you want to summon linear TNT motion
        // summonLinearTNT(blockX, blockY + 25, blockZ, numLineTNT, fuseLineTNT);
        
    }

}

// Trigger the mouse click event
onMouseClick();
