//The code calculates the vector between the player's position and the block they're looking at, then summons a fireball entity with an explosion power of 1 and a direction corresponding to the calculated vector.

//Old code
/*
let Block = Player.rayTraceBlock(1000, false).getBlockPos()
let Pos = Player.getPlayer().getPos()

let x = Pos.getX()
let y = Pos.getY()
let z = Pos.getZ()

let xl = Block.getX()
let yl = Block.getY()
let zl = Block.getZ()

let xv = (xl - x)
let yv = (yl - y)
let zv = (zl - z)

Chat.say(`/summon minecraft:fireball ~ ~ ~ {ExplosionPower:1,direction:[${xv}, ${yv}, ${zv}]}`)*/



let power = 5;
let velocityMultiplier = 2;
let delay = 2;


const reverse = !GlobalVars.getBoolean("Flamethrower");

GlobalVars.putBoolean("Flamethrower", reverse);
if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append("Flamethrower").withColor(0x5)
        .append("]").withColor(0x7).append(" enabled").withColor(0xc)
        .build());
} else {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append("Flamethrower").withColor(0x5)
        .append("]").withColor(0x7).append(" disabled").withColor(0xc)
        .build());
}


function launchFireball(pitch, yaw) {
    let h = pitch * (Math.PI/180)
    let i = -yaw * (Math.PI/180)
    let j = Math.cos(i);
    let k = Math.sin(i);
    let l = Math.cos(h);
    let m = Math.sin(h);

    // Multiply the motion components by the velocityMultiplier
    let motionX = k * l * 2 * velocityMultiplier;
    let motionY = -m * 2 * velocityMultiplier;
    let motionZ = j * l * 2 * velocityMultiplier;

    Chat.say(`/summon fireball ~ ~1 ~ {ExplosionPower:${power},Motion:[${motionX}, ${motionY}, ${motionZ}]}`);
}

while (GlobalVars.getBoolean("Flamethrower")) {
    const player = Player.getPlayer();

    if(!player) continue;

    const pitch = player.getPitch();
    const yaw =  player.getYaw();

    if(!pitch) continue;
    if(!yaw) continue;

    launchFireball(pitch, yaw);
    Client.waitTick(delay); // wait 1 second (synchronized to client ticks)
}