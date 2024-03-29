// Function to summon TNT
function summonTNT(x, y, z, fuse, motionArray, noGravity) {
    const motionString = motionArray.join(",");
    Chat.say(`/summon minecraft:tnt ${x} ${y} ${z} {Fuse:${fuse}, Motion:[${motionString}], NoGravity:${noGravity}}`);
}

// Function to summon TNT with circular motion
/*function summonSphereTNT(centerX, centerY, centerZ, numTNT, fuse, count) {
    for (let i = 0; i < numTNT; i++) {
        const angle = (Math.PI * 2 * i) / numTNT;
        const motionX = (Math.cos(angle) * ((count + 1)/ 2)).toFixed(3);
        const motionZ = (Math.sin(angle) * ((count + 1)/ 2)).toFixed(3);
        const motionArray = [motionX, (count).toFixed(3), motionZ];
        summonTNT(centerX, centerY, centerZ, 26*(count+1)*fuse, motionArray, 0);
    }
}*/




function summonSphereTNT(centerX, centerY, centerZ, numTNT, fuse, radius) {
    for (let i = 0; i < numTNT; i++) {
        const phi = Math.acos(1 - 2 * (i / numTNT));
        //const psi = Math.random() * 2 * Math.PI;
        const psi = i;

        const x = radius * Math.sin(phi) * Math.cos(psi);
        const y = radius * Math.sin(phi) * Math.sin(psi);
        const z = radius * Math.cos(phi);

        // Adjust the summoned TNT's position using the calculated coordinates
        summonTNT(centerX + x, centerY + y, centerZ + z, fuse, [(0).toFixed(3), (0).toFixed(3), (0).toFixed(3)], 1);
    }
}


// Event listener for mouse click
function onMouseClick() {
    const numCircTNT = 1000;
    const fuseCircTNT = 1000; //1.2 for superflat //1.4 default
    const radius = 100;  // Set your desired radial distance or radius

// Calling the function

    const center = Player.rayTraceBlock(1000, true);
    if (center) {
        const blockX = center.getX();
        const blockY = center.getY();
        const blockZ = center.getZ();
        summonSphereTNT(blockX, blockY + 20, blockZ, numCircTNT, fuseCircTNT, radius);
        // Uncomment the line below if you want to summon linear TNT motion
        // summonLinearTNT(blockX, blockY + 25, blockZ, numLineTNT, fuseLineTNT);
        
    }


}

// Trigger the mouse click event
onMouseClick();
