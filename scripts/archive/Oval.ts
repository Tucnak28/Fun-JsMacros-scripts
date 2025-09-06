draw3d = Hud.createDraw3D()
draw3d.register()

// Set the radius of the circle
const range = 50;

// Set the center point of the circle
const Pos = Player.getPlayer().getBlockPos()
// Set the number of cubes in the circle
const numCubes = Math.ceil(range * 2 * Math.PI);

// Set the angle between each cube
const angle = 360 / numCubes;

// Create a loop to place the cubes
for (let i = 0; i < numCubes; i++) {
  // Calculate the x and z positions of the current cube using the angle and radius
  const x = Pos.x + range * Math.cos((angle * i) * (Math.PI / 180));
  const z = Pos.z + range * Math.sin((angle * i) * (Math.PI / 180));
  // Use the HUD3D.addBox() function to add a cube at the calculated position
  //draw3d.addBox(x, Pos.y, z, 1, 1, 1, color);
  draw3d.addBox(Math.floor(x), Math.floor(Pos.y), Math.floor(z), Math.floor(x + 1), Math.floor(Pos.y + 1), Math.floor(z + 1), 0x00FF00, 100, 0x3F00FF00, 100, true)
}