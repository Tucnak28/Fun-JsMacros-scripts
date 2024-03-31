const center = Player.rayTraceBlock(1000, true);

const x = center.getX();
const y = center.getY();
const z = center.getZ();

const block = World.getBlock(x, y, z);
const blockType = block.getId();
const blockStates = block.getBlockStateHelper().blocksMovement();
const blockName =block.getName();

Chat.log(Chat.createTextBuilder().append("\n[").withColor(0x7)
.append(blockName).withColor(0x5).append("]").withColor(0x7)
.build());

//blockStates.forEach(state => {
    Chat.log(blockStates);
//});

while(1) {
    const center = Player.rayTraceBlock(1000, true);

const x = center.getX();
const y = center.getY();
const z = center.getZ();
    Chat.say(`/setblock ${x} ${y} ${z} air`);
    Time.sleep(10)
}


