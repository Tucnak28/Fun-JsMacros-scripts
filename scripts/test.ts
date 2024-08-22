const BlockPos = Java.type("net.minecraft.class_2338");
const BlockArgumentParser = Java.type("net.minecraft.class_2259");
const StringReader = Java.type("com.mojang.brigadier.StringReader");

const world = Client.getMinecraft().field_1687;

let pos = Player.getPlayer().getPos();
setBlock(floor(pos.x), floor(pos.y) - 1, floor(pos.z), "water")


function setBlock(x, y, z, stateName) {
    let pos = new BlockPos(x, y, z);
    let state = new BlockArgumentParser(new StringReader(stateName), true).method_9678(false).method_9669();
    world.method_2937(pos, state); //setBlockStateWithoutNeighborUpdates
    //world.method_8652(pos, state, 18); //setBlockState
}

function floor(val) {
    return Math.floor(val);
}