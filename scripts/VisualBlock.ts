draw3d = Hud.createDraw3D()
draw3d.register()

const reverse = !GlobalVars.getBoolean("ToggleScript");
GlobalVars.putBoolean("ToggleScript", reverse);
if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append("ToggleScript").withColor(0x5)
        .append("]").withColor(0x7).append(" enabled").withColor(0xc)
        .build());
} else {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append("ToggleScript").withColor(0x5)
        .append("]").withColor(0x7).append(" disabled").withColor(0xc)
        .build());
}
while (GlobalVars.getBoolean("ToggleScript")) {
    const {x, y, z} = Player.getPlayer().getPos()
    //draw3d.addBox(x - 1, y - 1, z - 1, x + 1, y + 1, z + 1, 0x00FF00, 0x3F00FF00, true)
    Time.sleep(1000)
    Pos = Player.getPlayer().getPos()
    draw3d.addLine(x, y, z, Pos.x, Pos.y, Pos.z, 0x00FF00)
}