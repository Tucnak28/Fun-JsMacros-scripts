// Get world access
const world = Client.getMinecraft().field_1687;

// Get the block the player is aiming at
const target = Player.rayTraceBlock(100, true);
if (target) {
    Chat.log(`Targeting block at ${target.getX()}, ${target.getY()}, ${target.getZ()}`);
    setBlockToAir(target.getX(), target.getY(), target.getZ());
}

function setBlockToAir(x, y, z) {
    try {
        // Get air state from Blocks registry using reflection
        const BlocksClass = Java.type("net.minecraft.class_2246"); // Blocks class
        const airField = Reflection.getDeclaredField(BlocksClass, "field_10124"); // AIR field
        airField.setAccessible(true);
        const airBlock = airField.get(null);
        const airState = airBlock.method_9564(); // getDefaultState
        
        // Create BlockPos using Java.type (simple constructor)
        const BlockPos = Java.type("net.minecraft.class_2338");
        const pos = new BlockPos(x, y, z);
        
        // Test different flag combinations for method_30092
        const actualWorldClass = world.getClass();
        const setBlockMethod = Reflection.getDeclaredMethod(actualWorldClass, "method_30092", 
            Java.type("net.minecraft.class_2338"), 
            Java.type("net.minecraft.class_2680"), 
            Java.type("int"), 
            Java.type("int")
        );
        setBlockMethod.setAccessible(true);
        
        // Common Minecraft block update flags:
        // 1 = NOTIFY_NEIGHBORS, 2 = BLOCK_UPDATE, 4 = NO_RERENDER, 8 = RERENDER_MAIN_THREAD, 16 = NO_OBSERVER
        // 32 = NO_NEIGHBORS, 64 = SKIP_DROPS, 128 = FORCE_STATE, 512 = MOVED
        const flagTests = [
            [0, 0]     // No flags at all - simplest approach
        ];
        
        for (let i = 0; i < flagTests.length; i++) {
            const [flag1, flag2] = flagTests[i];
            try {
                Chat.log(`Testing flags ${flag1}, ${flag2}...`);
                const result = setBlockMethod.invoke(world, pos, airState, flag1, flag2);
                Chat.log(`SUCCESS with flags ${flag1}, ${flag2}! Result: ${result}`);
                Chat.log("Check if block is truly gone and persists after rejoin!");
                break; // Stop on first success
            } catch (e) {
                Chat.log(`Flags ${flag1}, ${flag2} failed: ${e.message}`);
                if (i < flagTests.length - 1) {
                    Chat.log("Trying next combination...");
                    Time.sleep(500); // Short delay between attempts
                }
            }
        }
    } catch (e) {
        Chat.log("Reflection failed: " + e.message);
        Chat.log("Error details: " + e.toString());
    }
}

function floor(val) {
    return Math.floor(val);
}