while(1) {
    while(Player.getPlayer().isFallFlying() == false) {
            Input = Player.getCurrentPlayerInput()
            Player.addInput(Player.createPlayerInput(1, Input.movementSideways, Input.yaw, Input.pitch, true, Input.sneaking, Input.sprinting))
            Time.sleep(100)
    }
}