//This script defines a function to summon TNT entities with specified attributes, and another function to generate a rain of TNT within a specific area when triggered by a mouse click event. The rainingTNT function randomly selects positions within the defined area and summons TNT entities at those positions with a given fuse time. The onMouseClick function continuously checks for player position and triggers the rainingTNT function accordingly. Adjustments can be made to the radius, height, number of TNT, and fuse time parameters to customize the raining effect.

// Function to summon TNT
function summonTNT(x, y, z, fuse, motionArray, noGravity) {
    const motionString = motionArray.join(",");
    Chat.say(`/summon minecraft:tnt ${x} ${y} ${z} {Fuse:${fuse}, Motion:[${motionString}], NoGravity:${noGravity}}`);
}

// Function to generate a rain of TNT in a specific area
function rainingTNT(centerX, centerY, centerZ, radius, height, numTNT, fuse) {
    for (let i = 0; i < numTNT; i++) {
        const randomX = centerX + (Math.random() * 2 - 1) * radius;
        const randomY = centerY + Math.random() * height;
        const randomZ = centerZ + (Math.random() * 2 - 1) * radius;
        summonTNT(randomX, randomY, randomZ, fuse, [0, 0, 0], 0);
    }
    
}

// Event listener for mouse click
function onMouseClick() {
    //const center = Player.rayTraceBlock(1000, true);
    while(1) {
        const center = Player.getPlayer().getPos();
        if (center) {
            const blockX = center.getX();
            const blockY = center.getY();
            const blockZ = center.getZ();
            const radius = 100; // Adjust the radius of the raining area
            const height = 150; // Adjust the height of the raining area
            const numTNT = 50; // Adjust the number of TNT to rain down
            const fuse = 150; // Adjust the fuse time for the raining TNT

            rainingTNT(blockX, blockY + 50, blockZ, radius, height, numTNT, fuse);
        }
        Time.sleep(1000);
    }
}

// Trigger the mouse click event
onMouseClick();
