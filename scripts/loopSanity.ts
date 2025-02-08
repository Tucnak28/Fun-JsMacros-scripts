let loopTimers = 0;
let loopCount = 0;

do {
    if (loopTimers === 0) {
        Chat.say("/mocap recording start @a");
    }

    if (loopTimers >= 1000) {
        Chat.say("/mocap recording stop");
        Chat.say("/mocap playing stopAll");

        loopCount++; // Increment for every loop without limit

        Chat.say(`/mocap recording save loop${loopCount}`);

        // Play all previous loops including the new one
        for (let i = 1; i <= loopCount; i++) {
            Chat.say(`/mocap playing start loop${i}`);
        }

        loopTimers = 0;
    }

    loopTimers++;
    Time.sleep(50);

} while (true);
