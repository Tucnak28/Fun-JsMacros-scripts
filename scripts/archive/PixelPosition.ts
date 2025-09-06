const Yaw = Player.getPlayer().getYaw()
const Pitch = Player.getPlayer().getPitch()

const position = "[" + Yaw + ", " + Pitch + "]," + '\n'

// Write the JSON string to a file
FS.open("Positions.json").append(position)