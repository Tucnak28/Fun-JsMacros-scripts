//The code calculates the line of sight from the player's position and systematically destroys blocks along that path within a specified radius, clearing obstructive terrain.

function destroyBlock(x, y, z) {
    const radius = 5;
    for (let offsetY = -radius; offsetY <= radius; offsetY++) {
        for (let offsetX = -radius; offsetX <= radius; offsetX++) {
            for (let offsetZ = -radius; offsetZ <= radius; offsetZ++) {
                const targetX = parseInt(x) + offsetX;
                const targetY = parseInt(y) + offsetY;
                const targetZ = parseInt(z) + offsetZ;

                if (targetY >= 319 || targetY <= -63) continue;

                const block = World.getBlock(targetX, targetY, targetZ);
                if (!block) continue;
                if (block.getId() === 'minecraft:air') continue;

                Chat.say(`/setblock ${targetX} ${targetY} ${targetZ} air`);
            }
        }
    }
}

function main() {
    const center = Player.rayTraceBlock(1000, false);
    if(!center) return;

    const eyePos = Player.getPlayer().getEyePos();
    let vector = [
        center.getX()-eyePos.getX(), 
        center.getY()-eyePos.getY(), 
        center.getZ()-eyePos.getZ()];

    let magnitude = Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
    let normalizedVector = vector.map((component) => component / magnitude);

    for (let i = 0; i < magnitude+300; i++) {
        let currentPosition = [
            eyePos.getX() + normalizedVector[0] * i,
            eyePos.getY() + normalizedVector[1] * i,
            eyePos.getZ() + normalizedVector[2] * i
        ];
        destroyBlock(currentPosition[0], currentPosition[1], currentPosition[2]);
        Time.sleep(50);
    }
}

main();