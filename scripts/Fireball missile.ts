//The code calculates the vector between the player's position and the block they're looking at, then summons a fireball entity with an explosion power of 1 and a direction corresponding to the calculated vector.

Block = Player.rayTraceBlock(1000, false).getBlockPos()
Pos = Player.getPlayer().getPos()
x = Pos.getX()
y = Pos.getY()
z = Pos.getZ()

xl = Block.getX()
yl = Block.getY()
zl = Block.getZ()

xv = (xl - x)
yv = (yl - y)
zv = (zl - z)
Chat.say("/summon minecraft:fireball ~ ~ ~ {ExplosionPower:1,direction:[" + xv + "," + yv + "," + zv + "]}")
