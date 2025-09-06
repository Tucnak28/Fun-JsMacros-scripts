while(true) {
  if(Player.rayTraceBlock(20, false) == null) { continue }
  const Block = Player.rayTraceBlock(3, false)
  if(Block.getId() == "minecraft:oak_log") {
    Chat.log(Block.getBlockState())
  }
  Time.sleep(100)
}