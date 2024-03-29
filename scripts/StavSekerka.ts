while(true) {
for (var x = -5; x < 5; x = x+1) {
  for (var z = -5; z < 5; z = z+1) {
      for (var y = 0; y < 5; y = y+1) {
          const Pos = Player.getPlayer().getPos()
          const Block = World.getBlock(Math.floor(Pos.getX()) +x, Math.floor(Pos.getY()) + y, Math.floor(Pos.getZ()) +z)
          const BlockUnder = World.getBlock(Math.floor(Pos.getX()) +x, Math.floor(Pos.getY()) + y - 1, Math.floor(Pos.getZ()) +z)
          if(Block.getId() == "minecraft:oak_log") {
            if(BlockUnder.getId() == "minecraft:air" || BlockUnder.getId() == "minecraft:water") {
              Player.getPlayer().interactBlock(Math.floor(Pos.getX()) +x, Math.floor(Pos.getY()) + y, Math.floor(Pos.getZ()) +z, 0, false)
            }
          }
          //Player.getPlayer().interactBlock(Math.floor(Pos.getX()) +x, Math.floor(Pos.getY()) + y, Math.floor(Pos.getZ()) +z, 1, false)
          Time.sleep(1)
      }
  }
}
}