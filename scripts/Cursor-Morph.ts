//The code iteratively moves blocks inward within a cube-shaped region centered around the player's position, replacing each block with air while avoiding overlaps and optimizing performance through block movement.

function moveBlock(x, y, z, center, occupied) {
    if(World.getBlock(x, y, z).getId() == 'minecraft:air') return;

    const oldPos = [x, y, z];
    if(x < center[0]) x++;
    if(x > center[0]) x--;

    if(y < center[1]) y++;
    if(y > center[1]) y--;

    if(z < center[2]) z++;
    if(z > center[2]) z--;
    
    const newPos = [x, y, z];
    if(World.getBlock(newPos[0], newPos[1], newPos[2]).getId() !== 'minecraft:air') return;
    const key = `${x}, ${y}, ${z}`;
    if(occupied.has(key)) return;
    Chat.say(`/clone ${oldPos[0]} ${oldPos[1]} ${oldPos[2]} ${oldPos[0]} ${oldPos[1]} ${oldPos[2]} ${newPos[0]} ${newPos[1]} ${newPos[2]} replace`);
    Chat.say(`/setblock ${oldPos[0]} ${oldPos[1]} ${oldPos[2]} air`);
    
    occupied.set(key, true);
    Time.sleep(1);
}


function scanCubeInwards(centerX, centerY, centerZ, radius) {
    const center = [centerX, centerY, centerZ];
    let occupied = new Map();
    
    for (let a = 0; a <= radius; a++) {
        const minValue = -a;
        const maxValue = a;
        for (let b = minValue; b <= maxValue; b++) {
            for (let c = minValue; c <= maxValue; c++) {
                moveBlock(centerX + a, centerY + b, centerZ + c, center, occupied);
                moveBlock(centerX - a, centerY - b, centerZ - c, center, occupied);
                moveBlock(centerX + b, centerY + a, centerZ + c, center, occupied);
                moveBlock(centerX - b, centerY - a, centerZ - c, center, occupied);
                moveBlock(centerX + b, centerY + c, centerZ + a, center, occupied);
                moveBlock(centerX - b, centerY - c, centerZ - a, center, occupied);
                
            }
        }
    }
}



function main() {
    const radius = 5;
    const inwards = false;
    const center = Player.rayTraceBlock(1000, false);
    for (let b = 0; b <= 10; b++) {
        
        const blockX = center.getX();
        const blockY = center.getY();
        const blockZ = center.getZ();
        scanCubeInwards(blockX, blockY, blockZ, radius);
        Time.sleep(100);
    }
}


main();