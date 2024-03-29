//This script defines functions to summon TNT entities with various motion patterns, including circular and linear motion. When triggered by a mouse click event, it summons multiple TNT entities in circular patterns around the clicked block, with varying fuse lengths and motion characteristics. Additionally, it can summon TNT entities with linear motion if uncommented.

// Function to summon TNT
function summonTNT(x, y, z, fuse, motionArray, noGravity) {
    const motionString = motionArray.join(",");
    Chat.say(`/summon minecraft:tnt ${x} ${y} ${z} {Fuse:${fuse}, Motion:[${motionString}], NoGravity:${noGravity}}`);
}

// Function to summon TNT with circular motion
function summonCircularTNT(centerX, centerY, centerZ, numTNT, fuse, count) {
    for (let i = 0; i < numTNT; i++) {
        const angle = (Math.PI * 2 * i) / numTNT;
        const motionX = (Math.cos(angle) * ((count + 1)/ 2)).toFixed(3);
        const motionZ = (Math.sin(angle) * ((count + 1)/ 2)).toFixed(3);
        const motionArray = [motionX, (count).toFixed(3), motionZ];
        summonTNT(centerX, centerY, centerZ, 26*(count+1)*fuse, motionArray, 0);
    }
}

function summonPlusTNT(centerX, centerY, centerZ, arms, fuse, count) {
    for (let j = 0; j < arms; j++) {
        for (let i = 0; i < count; i += 0.1) {
            const angle = (Math.PI * 2 * j) / arms;
            const motionX = (Math.cos(angle) * ((i + 1)/ 2)).toFixed(3);
            const motionZ = (Math.sin(angle) * ((i + 1)/ 2)).toFixed(3);
            const motionArray = [motionX, (i).toFixed(3), motionZ];
            summonTNT(centerX, centerY, centerZ, 26*(i+1)*fuse, motionArray, 0);
        }
    }
}

// Function to summon TNT with linear motion
function summonLinearTNT(centerX, centerY, centerZ, numTNT, fuse) {
    for (let i = 0; i < numTNT; i++) {
        const motionY = ((Math.PI * 2 * i) / numTNT).toFixed(3);
        summonTNT(centerX, centerY, centerZ, fuse + i, [0.0, motionY, 0.0], 0);
    }
}


// Event listener for mouse click
function onMouseClick() {
    const numCircTNT = 50;
    const numLineTNT = 50;
    const fuseCircTNT = 1.2; //1.2 for superflat //1.4 default
    const fuseLineTNT = 25;
    const circleCount = 10; //limit is 10
    const plusArms = 10;

// Calling the function

    const center = Player.rayTraceBlock(1000, true);
    if (center) {
        const blockX = center.getX();
        const blockY = center.getY();
        const blockZ = center.getZ();
        for (let i = 0; i < circleCount; i++) {
            summonCircularTNT(blockX, blockY + 10, blockZ, numCircTNT, fuseCircTNT, i);
        }
        summonPlusTNT(blockX, blockY + 10, blockZ, plusArms, fuseCircTNT, circleCount-1);
        // Uncomment the line below if you want to summon linear TNT motion
        // summonLinearTNT(blockX, blockY + 25, blockZ, numLineTNT, fuseLineTNT);
        
    }


}

// Trigger the mouse click event
onMouseClick();
