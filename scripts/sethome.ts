function checkOnGround() {
    let isOnGroundPrevious = false;
    let previousY = null; // Store the previous Y position
    let jumpCount = 0; // Track the number of jumps

    while (true) {
        let isOnGround = Player.getPlayer().isOnGround();
        let currentY = Player.getPlayer().getY();

        // If the player is on the ground and there was a transition from not on ground to on ground
        if (isOnGround && !isOnGroundPrevious) {
            jumpCount++; // Increment jump count
            //Chat.log(jumpCount);

            // If it's the third jump, set the home
            if (jumpCount === 2) {
                Chat.say("/delhome home"); // Delete old home
                Time.sleep(100); // Wait for the home to be deleted (adjust timing if needed)
                Chat.say("/sethome home"); // Set new home
                previousY = currentY; // Update previous Y position
                jumpCount = 0; // Reset jump count after setting home
            }
        }

        // If the player's current Y position is more than three blocks below the previous Y position
        if (previousY !== null && currentY < previousY - 2) {
            Chat.say("/home"); // Teleport player back to home
            previousY = currentY; // Update previous Y position to current position
        }

        isOnGroundPrevious = isOnGround; // Update previous state

        // Wait for 100 milliseconds before checking again
        Time.sleep(50);
    }
}

// Start checking for on ground status
checkOnGround();
