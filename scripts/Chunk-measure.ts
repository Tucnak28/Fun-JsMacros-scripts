const numIterations = 5; // Number of iterations to perform
let iterationCount = 0; // Counter to keep track of the current iteration
let totalAverageSpeed = 0; // Variable to accumulate the total average speed

// Define a function to perform the teleportation, measurement, and calculation
function performMeasurement() {
    let secondsCounter = 0;
    let totalChunksLoaded = 0;
    const secondLimit = 10;

    

    Chat.say("/tp ~ ~ ~5000");

    const chunkListener = JsMacros.on("ChunkLoad", JavaWrapper.methodToJava(() => {
        totalChunksLoaded++;
    }));

    const tickListener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
        // Increment the seconds counter on each tick
        secondsCounter++;

        // Reset the chunk counter every second (20 ticks = 1 second)
        if (secondsCounter % (secondLimit * 20) === 0) {
            const averageSpeed = totalChunksLoaded / (secondsCounter / (secondLimit * 20));
            Chat.log(`Avg Loading Speed (${iterationCount + 1}): ${averageSpeed.toFixed(2)} chunks/s`);

            // Add the average speed of this iteration to the total
            totalAverageSpeed += averageSpeed;

            // Cleanup event listeners
            JsMacros.off(tickListener);
            JsMacros.off(chunkListener);

            // Proceed to the next iteration or calculate the ultimate average
            if (++iterationCount < numIterations) {
                performMeasurement(); // Start the next iteration
            } else {
                // Calculate the ultimate average
                const ultimateAverage = totalAverageSpeed / numIterations;
                Chat.log(`Ultimate Average Speed: ${ultimateAverage.toFixed(2)} chunks/s`);
            }
        }
    }));
}

// Start the measurement process
performMeasurement();
