let loopCount = 0;
let startTime = Date.now(); 
let isProcessing = false;

function restart() {
    Chat.log("Restarting environment...");
    Chat.say("/kill @e[type=item]");
    Chat.say("/tp 0 77 54");
    Chat.say("/effect give @a instant_health 1 10");
    Chat.say("/effect give @a minecraft:saturation 1 2");
}

function stopAndClearRecordings() {
    Chat.log("Stopping and clearing recordings...");
    Chat.say("/mocap recording stop _");
    Time.sleep(100);
    Chat.say("/mocap recording discard _");
    Time.sleep(100);
    Chat.say("/mocap playback stop_all");
    Time.sleep(100);
}

function saveReplay() {
    loopCount++;
    Chat.log(`Saving recording as loop${loopCount} and replaying all loops...`);
    Chat.say("/mocap recording stop");
    Time.sleep(150);
    Chat.say(`/mocap recording save loop${loopCount}`);
    Time.sleep(150);
    Chat.say(`/mocap scenes add_to .loopscene loop${loopCount}`);
    Time.sleep(150);
}

function playAllReplays() {
    Chat.say("/mocap playback stop_all");
    Chat.log("Playing all recorded loops...");
    Chat.say("/mocap playback start .loopscene");
}

function sceneCreate() {
    //Chat.say("/mocap scenes remove loopscene");
    Time.sleep(100);
    Chat.say("/mocap scenes add loopscene");
    Time.sleep(100);
}

function startNewRecording() {
    Chat.log("Starting new recording...");
    Chat.say("/mocap recording start @a");
    startTime = Date.now();
}

function loopCycle() {
    Chat.log("Starting cycle mode...");
    sceneCreate();
    stopAndClearRecordings();
    restart();
    startNewRecording();

    while (true) {
        if (Date.now() - startTime >= 30000) {
            isProcessing = true;
            Chat.log("Time has run out, saving and restarting...");
            Time.sleep(100);
            saveReplay();
            Time.sleep(100);
            restart();
            playAllReplays();
            Time.sleep(100);
            startNewRecording();
            Time.sleep(100);
            isProcessing = false;
        }
        Time.sleep(200);
    }
}

function parkourMode() {
    Chat.log("Starting parkour mode...");
    sceneCreate();
    stopAndClearRecordings();
    restart();
    startNewRecording();

    while (true) {
        if (!isProcessing && World.getBlock(Player.getPlayer().getBlockPos()).getId() === "minecraft:water") {
            isProcessing = true;
            Chat.log("Player is submerged, saving and restarting...");
            Time.sleep(100);
            saveReplay();
            Time.sleep(100);
            restart();
            playAllReplays();
            Time.sleep(100);
            startNewRecording();
            Time.sleep(100);
            isProcessing = false;
        }
        Time.sleep(200);
    }
}

//loopCycle();
parkourMode();
