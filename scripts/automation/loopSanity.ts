let loopCount = 0;
let startTime = Date.now(); 
let isProcessing = false
let startPos = Player.getPlayer().getPos();
let uniqueID = generateId();

function generateId() {
    const now = new Date();
    const datePart = now.getFullYear().toString().padStart(4, '0') +
                     (now.getMonth() + 1).toString().padStart(2, '0') +
                     now.getDate().toString().padStart(2, '0'); // YYYYMMDD
    const timePart = now.getHours().toString().padStart(2, '0') +
                     now.getMinutes().toString().padStart(2, '0') +
                     now.getSeconds().toString().padStart(2, '0'); // HHMMSS
    return datePart + timePart;
}




function restart() {
    Chat.say(`/tp ${startPos.getX().toFixed(1)} ${startPos.getY().toFixed(0)} ${startPos.getZ().toFixed(1)}`);
    Chat.say("/effect give @a instant_health 1 10");
    Chat.say("/effect give @a minecraft:saturation 1 2");
}

function stopAndClearRecordings() {
    //Chat.log("Stopping and clearing recordings...");
    Chat.say("/mocap recording stop _");
    Time.sleep(100);
    Chat.say("/mocap recording discard _");
    Chat.say("/mocap playback stop_all");
}

function saveReplay() {
    loopCount++;
    //Chat.log(`Saving recording as rec-${uniqueID}-${loopCount} and replaying all loops...`);
    Chat.say("/mocap recording stop");
    Time.sleep(50);
    Chat.say(`/mocap recording save rec-${uniqueID}-${loopCount}`);
    Time.sleep(50);
    Chat.say(`/mocap scenes add_to .scene-${uniqueID} rec-${uniqueID}-${loopCount}`);
}

function playAllReplays() {
    Chat.say("/mocap playback stop_all");
    Chat.log("Playing all recorded loops...");
    Chat.say(`/mocap playback start .scene-${uniqueID}`);
}

function sceneCreate() {
    Chat.say(`/mocap scenes add scene-${uniqueID}`);
    Time.sleep(100);
}

function startNewRecording() {
    Chat.say("/mocap recording start @a");
    startTime = Date.now();
}



function parkourMode() {
    Chat.log("Starting parkour mode...");
    sceneCreate();
    stopAndClearRecordings();
    restart();
    startNewRecording();

    while (true) {
        let blockPos = Player.getPlayer().getPos().add(0, -1, 0);
        
        if (!isProcessing && World.getBlock(blockPos).getId() === "minecraft:grass_block") {
            isProcessing = true;
            Chat.log("saving and restarting...");

            Time.sleep(100);
            saveReplay();
            restart();
            playAllReplays();
            startNewRecording();
            Time.sleep(100);

            isProcessing = false;
        }
        Time.sleep(100);
    }
}


parkourMode();

