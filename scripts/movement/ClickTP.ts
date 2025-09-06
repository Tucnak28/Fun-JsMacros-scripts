const center = Player.rayTraceBlock(10000, true);
if (center) {
    const blockX = center.getX();
    const blockY = center.getY();
    const blockZ = center.getZ();
    Chat.say(`/tp ${blockX} ${blockY+1} ${blockZ}`);
} else {
    Chat.log("No block found in line of sight");
}