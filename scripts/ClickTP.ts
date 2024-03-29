const center = Player.rayTraceBlock(1000, true);
const blockX = center.getX();
const blockY = center.getY();
const blockZ = center.getZ();
Chat.say(`/tp ${blockX} ${blockY+1} ${blockZ}`);