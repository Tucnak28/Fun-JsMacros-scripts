var player1 = Player.getPlayer(); // get the first player
var player2 = Player.rayTraceEntity(); // get the second player
if (player2 != null && player2.getType() == "minecraft:player") {
    while(1) {
        // calculate the pitch and yaw of player2's view
        var pitch = player2.getPitch();
        var yaw = player2.getYaw();
        // calculate the direction that player2 is looking
        var dirX = Math.sin(yaw * Math.PI / 180.0);
        var dirZ = Math.cos(yaw * Math.PI / 180.0);
        var dirY = Math.sin(pitch * Math.PI / 180.0);
        // get the position of player1
        var pos1 = player1.getBlockPos()
        // get the position of player2
        var pos2 = player2.getBlockPos()
        // calculate the distance between player1 and player2
        var dx = pos1.x - pos2.x;
        var dy = pos1.y - pos2.y;
        var dz = pos1.z - pos2.z;
        var distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        // check if player1 is within player2's screen
        if (dirX*dx + dirY*dy + dirZ*dz > 0 && distance <= 32) {
            Chat.log(`!! ${dirX*dx + dirY*dy + dirZ*dz} !!`);
        } else {
        Chat.log(`${dirX*dx + dirY*dy + dirZ*dz}`);
        }
        Time.sleep(100)
    }
}