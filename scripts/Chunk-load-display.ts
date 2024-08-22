// services start with minecraft, when enabled and are meant to be persistent scripts.
const d2d = Hud.createDraw2D()
let chunkMeter;
let chunkCounter = 0;
let secondsCounter = 0;
let totalChunksLoaded = 0;

d2d.setOnInit(JavaWrapper.methodToJava(() => {
    chunkMeter = d2d.addText("", 0, d2d.getHeight() - 10, 0xFFFFFF, true);
}));

const tickListener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
    // Increment the seconds counter on each tick
    secondsCounter++;

    // Reset the chunk counter every second (20 ticks = 1 second)
    if (secondsCounter % 20 === 0) {
        const averageSpeed = totalChunksLoaded / (secondsCounter / 20);
        chunkMeter?.setText(`Avg Load Speed: ${averageSpeed.toFixed(2)} chunks/s`);
    }
}));

const chunkListener = JsMacros.on("ChunkLoad", JavaWrapper.methodToJava(() => {
    chunkCounter++;
    totalChunksLoaded++;
}));

Hud.registerDraw2D(d2d);

// This fires when the service is stopped
event.stopListener = JavaWrapper.methodToJava(() => {
    Hud.unregisterDraw2D(d2d);
    JsMacros.off(tickListener);
    JsMacros.off(chunkListener);
});
