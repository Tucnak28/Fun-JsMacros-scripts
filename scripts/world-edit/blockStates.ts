const center = Player.rayTraceBlock(1000, true);

const x = center.getX();
const y = center.getY();
const z = center.getZ();

const block = World.getBlock(x, y, z);
const blockType = block.getId();
const blockStates = block.getBlockHelper().getTags();
const blockName =block.getName();

Chat.log(Chat.createTextBuilder().append("\n[").withColor(0x7)
.append(blockName).withColor(0x5).append("]").withColor(0x7)
.build());

for (const state in blockStates) {
    Chat.log(blockStates[state]);
}

