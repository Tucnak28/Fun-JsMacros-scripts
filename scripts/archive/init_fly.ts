const player = Player.getPlayer();
const abilities = player.getAbilities();
const isFlying = abilities.getFlying();


if(isFlying) {
    abilities.setFlying(false);
} else {
    player.addVelocity(0.0,0.08,0.0);
    abilities.setFlying(true);
}
