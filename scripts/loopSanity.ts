let loopCount = 0;
let startTime = Date.now(); // Store the starting timestamp


function restart() {
    Chat.say("/kill @e[type=item]");
    //Chat.say("/clear");
    Time.sleep(100);
    Chat.say("/tp 929 64 1035");
    Time.sleep(100);
    Chat.say("/effect give @a instant_health 1 10");
    Chat.say("/effect give @a minecraft:saturation 1 2");
    Time.sleep(100);
}

function playAllReplays() {
    // Play all previous loops including the new one
    for (let i = 1; i <= loopCount; i++) {
        Chat.say(`/mocap playback start loop${i}`);
        Time.sleep(10); // Small delay to ensure commands process smoothly
    }
}

function loopCycle() {
    restart();


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
        if (Date.now() - startTime >= 150000) { // 20 seconds elapsed
            loopCount++;
            Chat.say("/mocap recording stop");
            Time.sleep(50);
            
            Chat.say(`/mocap recording save loop${loopCount}`);
            Time.sleep(50);
    
    
            playAllReplays();
    
            restart();
    
            // Restart recording
            Time.sleep(50);
            Chat.say(`/mocap recording start @a`);
            startTime = Date.now(); // Reset the timer
        }
    
        Time.sleep(100);
    } while (true);
}


loopCycle();
//playAllReplays();   
