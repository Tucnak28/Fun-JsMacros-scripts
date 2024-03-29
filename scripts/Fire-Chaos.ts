//The code continually generates random block positions within a specified radius centered around the player's position, ensuring that blocks are placed above the highest non-air block, with a unique block chosen each time and preventing block duplication.

// Define the function that will find the highest non-air block
function findHighestNonAirBlock(x, z) {
  let y = 150;
  while (y > -64 && World.getBlock(x, y, z).getId() == "minecraft:air") { //|| World.getBlock(x, y, z).getId() == "minecraft:fire") {
    y--;
  }
  return y;
} 

// Create a hash map to store the positions of the blocks that have already been placed
let placedBlocks = new Map();

// Set the radius of the block to 100 blocks
const range = 50;

const tickInterval = 1;

// Create an array of blocks to choose from for the block
const customBlocks = [
  "minecraft:sculk_sensor"
  //"minecraft:sponge"
  //"minecraft:netherrack",
  //"minecraft:magma_block",
  //"minecraft:nether_quartz_ore",
  //"minecraft:chiseled_nether_bricks"
];

const allBlocks = [
  "minecraft:stone",
  "minecraft:granite",
  "minecraft:polished_granite",
  "minecraft:diorite",
  "minecraft:polished_diorite",
  "minecraft:andesite",
  "minecraft:polished_andesite",
  "minecraft:grass_block",
  "minecraft:dirt",
  "minecraft:coarse_dirt",
  "minecraft:podzol",
  "minecraft:cobblestone",
  "minecraft:oak_planks",
  "minecraft:spruce_planks",
  "minecraft:birch_planks",
  "minecraft:jungle_planks",
  "minecraft:acacia_planks",
  "minecraft:dark_oak_planks",
  "minecraft:bedrock",
  "minecraft:gold_ore",
  "minecraft:iron_ore",
  "minecraft:coal_ore",
  "minecraft:oak_log",
  "minecraft:spruce_log",
  "minecraft:birch_log",
  "minecraft:jungle_log",
  "minecraft:acacia_log",
  "minecraft:dark_oak_log",
  "minecraft:stripped_oak_log",
  "minecraft:stripped_spruce_log",
  "minecraft:stripped_birch_log",
  "minecraft:stripped_jungle_log",
  "minecraft:stripped_acacia_log",
  "minecraft:stripped_dark_oak_log",
  "minecraft:stripped_oak_wood",
  "minecraft:stripped_spruce_wood",
  "minecraft:stripped_birch_wood",
  "minecraft:stripped_jungle_wood",
  "minecraft:stripped_acacia_wood",
  "minecraft:stripped_dark_oak_wood",
  "minecraft:oak_wood",
  "minecraft:spruce_wood",
  "minecraft:birch_wood",
  "minecraft:jungle_wood",
  "minecraft:acacia_wood",
  "minecraft:dark_oak_wood",
  "minecraft:sponge",
  "minecraft:wet_sponge",
  "minecraft:lapis_ore",
  "minecraft:lapis_block",
  "minecraft:dispenser",
  "minecraft:sandstone",
  "minecraft:chiseled_sandstone",
  "minecraft:cut_sandstone",
  "minecraft:note_block",
  "minecraft:sticky_piston",
  "minecraft:piston",
  "minecraft:gold_block",
  "minecraft:iron_block",
  "minecraft:bricks",
  "minecraft:tnt",
  "minecraft:white_wool",
  "minecraft:orange_wool",
  "minecraft:magenta_wool",
  "minecraft:light_blue_wool",
  "minecraft:yellow_wool",
  "minecraft:lime_wool",
  "minecraft:pink_wool",
  "minecraft:gray_wool",
  "minecraft:light_gray_wool",
  "minecraft:cyan_wool",
  "minecraft:purple_wool",
  "minecraft:blue_wool",
  "minecraft:brown_wool",
  "minecraft:green_wool",
  "minecraft:red_wool",
  "minecraft:black_wool",
  "minecraft:white_concrete",
  "minecraft:orange_concrete",
  "minecraft:magenta_concrete",
  "minecraft:light_blue_concrete",
  "minecraft:yellow_concrete",
  "minecraft:lime_concrete",
  "minecraft:pink_concrete",
  "minecraft:gray_concrete",
  "minecraft:light_gray_concrete",
  "minecraft:cyan_concrete",
  "minecraft:purple_concrete",
  "minecraft:blue_concrete",
  "minecraft:brown_concrete",
  "minecraft:green_concrete",
  "minecraft:red_concrete",
  "minecraft:black_concrete",
  "minecraft:white_stained_glass",
  "minecraft:orange_stained_glass",
  "minecraft:magenta_stained_glass",
  "minecraft:light_blue_stained_glass",
  "minecraft:yellow_stained_glass",
  "minecraft:lime_stained_glass",
  "minecraft:pink_stained_glass",
  "minecraft:gray_stained_glass",
  "minecraft:light_gray_stained_glass",
  "minecraft:cyan_stained_glass",
  "minecraft:purple_stained_glass",
  "minecraft:blue_stained_glass",
  "minecraft:brown_stained_glass",
  "minecraft:green_stained_glass",
  "minecraft:red_stained_glass",
  "minecraft:black_stained_glass",
  "minecraft:white_terracotta",
  "minecraft:orange_terracotta",
  "minecraft:magenta_terracotta",
  "minecraft:light_blue_terracotta",
  "minecraft:yellow_terracotta",
  "minecraft:lime_terracotta",
  "minecraft:pink_terracotta",
  "minecraft:gray_terracotta",
  "minecraft:light_gray_terracotta",
  "minecraft:cyan_terracotta",
  "minecraft:purple_terracotta",
  "minecraft:blue_terracotta",
  "minecraft:brown_terracotta",
  "minecraft:green_terracotta",
  "minecraft:red_terracotta",
  "minecraft:black_terracotta"
]



function blockLevitation() {
  // Get the player's position
  const playerPos = Player.getPlayer().getBlockPos();
  
  // Generate random x, y, and z coordinates within the radius
  let x = Math.floor(playerPos.getX() + Math.random() * range - range / 2);
  let z = Math.floor(playerPos.getZ() + Math.random() * range - range / 2);
  //let y = Math.floor(playerPos.y + Math.random() * radius - radius / 2);
  let y = findHighestNonAirBlock(x, z)
  
  // Check if the block at the random coordinates has already been placed
  const key = `${x}, ${y}, ${z}`;
  if (placedBlocks.has(key)) {
    return;
  }
  
  

  // Choose a random block from the array
  const Block = customBlocks[Math.floor(Math.random() * customBlocks.length)];

  // Set the block at the random coordinates to the chosen block
  Chat.say(`/clone ${x} ${y} ${z} ${x} ${y} ${z} ${x} ${y + 2} ${z}`);
  Chat.say(`/setblock ${x} ${y} ${z} air`);

  // Add the block position to the hash map
  placedBlocks.set(key, true);
}



// Define the main function that will be called every tick
function createRandomBlock() {
  // Get the player's position
  const playerPos = Player.getPlayer().getBlockPos();

  // Generate random x, y, and z coordinates within the radius
  let x = Math.floor(playerPos.getX() + Math.random() * range - range / 2);
  let z = Math.floor(playerPos.getZ() + Math.random() * range - range / 2);
  //let y = Math.floor(playerPos.y + Math.random() * radius - radius / 2);
  let y = findHighestNonAirBlock(x, z)

  // Check if the block at the random coordinates has already been placed
  const key = `${x}, ${y}, ${z}`;
  if (placedBlocks.has(key)) {
    return;
  }
  
  

  // Choose a random block from the array
  const Block = customBlocks[Math.floor(Math.random() * customBlocks.length)];

  // Set the block at the random coordinates to the chosen block
  Chat.say(`/setblock ${x} ${y} ${z} ${Block}`);

  // Add the block position to the hash map
  placedBlocks.set(key, true);
}

// Set the main function to run every tick
while(1) {
  //createRandomBlock()
  blockLevitation();
  Time.sleep(tickInterval)
}



