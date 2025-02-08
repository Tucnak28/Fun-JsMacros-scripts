let loopCount = 0;
let startTime = Date.now(); // Store the starting timestamp

Chat.say("/mocap recording stop _");
Time.sleep(50);
// Clear any previous recordings & playback before starting
Chat.say("/mocap recording discard _");
Time.sleep(50);
Chat.say("/mocap playback stop_all");
Time.sleep(50);

// Start recording immediately when the script starts
Chat.say(`/mocap recording start @a`);

do {
    if (Date.now() - startTime >= 10000) { // 20 seconds elapsed
        loopCount++;
        Chat.say("/mocap recording stop");
        Time.sleep(50);
        
        Chat.say(`/mocap recording save loop${loopCount}`);
        Time.sleep(50);

        // Play all previous loops including the new one
        for (let i = 1; i <= loopCount; i++) {
            Chat.say(`/mocap playback start loop${i}`);
            Time.sleep(10); // Small delay to ensure commands process smoothly
        }

        // Restart recording
        Time.sleep(50);
        Chat.say(`/mocap recording start @a`);
        startTime = Date.now(); // Reset the timer
    }

    Time.sleep(50);
} while (true);
