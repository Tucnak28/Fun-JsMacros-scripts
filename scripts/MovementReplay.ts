//This script toggles a feature called "ToggleScript" and logs messages indicating whether it's enabled or disabled. When enabled, it continuously records the player's position every 20 milliseconds and stores the data in an object called coordinatesTable. If ToggleScript is disabled, after a one-second delay, it creates a green 3D box centered on the player's position with a transparent blue outline, updating it with the player's current position every 50 milliseconds.

// Declare an empty object to store coordinates
var coordinatesTable = {};

// Create a 3D drawing object
var draw3d = Hud.createDraw3D();

// Register the 3D drawing object
draw3d.register();

// Get the value of the global variable "ToggleScript"
// If it's not set, it will return false
const reverse = !GlobalVars.getBoolean("ToggleScript");

// Set the value of the global variable "ToggleScript" to the opposite of its current value
GlobalVars.putBoolean("ToggleScript", reverse);

// If the value of "ToggleScript" is true, log a message saying the script is enabled
if (reverse) {
  Chat.log(
    Chat.createTextBuilder()
      .append("[")
      .withColor(0x7)
      .append("ToggleScript")
      .withColor(0x5)
      .append("]")
      .withColor(0x7)
      .append(" enabled")
      .withColor(0xc)
      .build()
  );
}
// If the value of "ToggleScript" is false, log a message saying the script is disabled
else {
  Chat.log(
    Chat.createTextBuilder()
      .append("[")
      .withColor(0x7)
      .append("ToggleScript")
      .withColor(0x5)
      .append("]")
      .withColor(0x7)
      .append(" disabled")
      .withColor(0xc)
      .build()
  );
}

// While the value of "ToggleScript" is true, do the following:
while (GlobalVars.getBoolean("ToggleScript")) {
  // Add the current time (in milliseconds) as a key, and the player's current position as the value, to the coordinatesTable object
  coordinatesTable[Date.now()] = Player.getPlayer().getPos();

  // Sleep for 20 milliseconds
  Time.sleep(20);
}

// If the value of "ToggleScript" is true
if (reverse) {
  // Sleep for 1000 milliseconds (1 second)
  Time.sleep(1000);

  // Get the player's current position
  const { x, y, z } = Player.getPlayer().getPos();

  // Add a green 3D box centered on the player's position, with a transparent blue outline, to the 3D drawing object
  // The box's dimensions are 1 block wide, 2 blocks tall, and 1 block deep
  // The box will be updated every 50 milliseconds
  var box = draw3d.addBox(
    x - 0.5,
    y,
    z - 0.5,
    x + 0.5,
    y + 2,
    z + 0.5,
    0x00ff00,
    50,
    0x3f00ff00,
    0,
    true
  );

  // Do the following indefinitely:
  while (1) {
    // For each key (timestamp) in the coordinatesTable object:
    for (let pos in coordinatesTable) {
      // Get the value (player position) for the current key
      let value = coordinatesTable[pos]
// Get the player position from the value
const { x, y, z } = value;

  // Update the position of the 3D box to the player's position
  box.setPos(x - 0.5, y, z - 0.5, x + 0.5, y + 2, z + 0.5);

  // Sleep for 20 milliseconds
  Time.sleep(20);
}

}

// Remove the 3D box from the 3D drawing object
draw3d.removeBox(box);
}