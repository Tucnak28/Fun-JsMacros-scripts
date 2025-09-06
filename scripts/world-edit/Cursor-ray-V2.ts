//The code calculates the line of sight from the player's position and systematically destroys blocks along that path within a specified radius, clearing obstructive terrain.
const radius = 5;
const length = 500;

// Block removal method selection
const USE_REFLECTION = true; // Set to true for Java reflection (faster), false for commands (safer)

let count = 0;

let liquids = []; 

function liquidCheck(block) {
    if(!(block.getId() === "minecraft:water" || block.getId() === "minecraft:lava")) return;
    
    liquids.push([block.getX(), block.getY(), block.getZ()]);
}

function planeHash(center, normal, width, length) {
    const centerX = center[0];
    const centerY = center[1];
    const centerZ = center[2];
    const normalX = normal.x;
    const normalY = normal.y;
    const normalZ = normal.z;

    // Initialize reflection components if using reflection method
    let world, airState, setBlockMethod;
    if (USE_REFLECTION) {
        try {
            // Set up Java reflection for direct world manipulation
            world = Client.getMinecraft().field_1687;
            
            // Get air state from Blocks registry
            const BlocksClass = Java.type("net.minecraft.class_2246");
            const airField = Reflection.getDeclaredField(BlocksClass, "field_10124");
            airField.setAccessible(true);
            const airBlock = airField.get(null);
            airState = airBlock.method_9564(); // getDefaultState
            
            // Get setBlockState method
            const worldClass = world.getClass();
            setBlockMethod = Reflection.getDeclaredMethod(worldClass, "method_30092", 
                Java.type("net.minecraft.class_2338"), 
                Java.type("net.minecraft.class_2680"), 
                Java.type("int"), 
                Java.type("int")
            );
            setBlockMethod.setAccessible(true);
            
        } catch (e) {
            Chat.log("Reflection setup failed, falling back to commands: " + e.message);
            USE_REFLECTION = false; // Fallback to commands
        }
    }

    // Calculate orthogonal vectors to the normal vector (optimized)
    let v1, v2;
    
    if (normalX !== 0 || normalY !== 0) {
        v1 = { x: normalY, y: -normalX, z: 0 };
    } else {
        v1 = { x: 1, y: 0, z: 0 };
    }

    // Cross product for v2
    v2 = {
        x: normalY * v1.z - normalZ * v1.y,
        y: normalZ * v1.x - normalX * v1.z,
        z: normalX * v1.y - normalY * v1.x
    };

    // Pre-calculate normalized vectors once
    const lengthV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
    const lengthV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
    const unitV1 = { x: v1.x / lengthV1, y: v1.y / lengthV1, z: v1.z / lengthV1 };
    const unitV2 = { x: v2.x / lengthV2, y: v2.y / lengthV2, z: v2.z / lengthV2 };

    // Pre-calculate half dimensions to avoid repeated division
    const halfWidth = width / 2;
    const halfLength = length / 2;

    // Use Set to avoid duplicate block coordinates
    const blockPositions = new Set();
    
    // Adjust batch sizes and delays based on method
    const batchSize = USE_REFLECTION 
        ? (radius > 30 ? 1000 : (radius > 15 ? 500 : 200))  // Much larger batches for reflection
        : (radius > 30 ? 100 : (radius > 15 ? 50 : 20));    // Original batch sizes for commands
    
    const blockCommands = [];
    const blockOperations = []; // For reflection method
    
    let processedInPlane = 0;
    const maxBlocksPerPlane = radius * radius * 2; // Safety limit per plane

    for (let i = -halfWidth; i <= halfWidth; i++) {
        for (let j = -halfLength; j <= halfLength; j++) {
            // Calculate position offset
            const offsetX = i * unitV1.x + j * unitV2.x;
            const offsetY = i * unitV1.y + j * unitV2.y;
            const offsetZ = i * unitV1.z + j * unitV2.z;

            // Calculate final position
            const x = Math.floor(centerX + offsetX);
            const y = Math.floor(centerY + offsetY);
            const z = Math.floor(centerZ + offsetZ);
            
            // Only check height limits
            if (y >= 319 || y <= -63) continue;

            // Use coordinate string as unique identifier
            const coordKey = `${x},${y},${z}`;
            if (blockPositions.has(coordKey)) continue;
            blockPositions.add(coordKey);

            count++;
            processedInPlane++;
            
            if (USE_REFLECTION) {
                // Add to reflection batch
                blockOperations.push([x, y, z]);
                
                // Execute reflection batch when full
                if (blockOperations.length >= batchSize) {
                    blockOperations.forEach(([bx, by, bz]) => {
                        try {
                            const BlockPos = Java.type("net.minecraft.class_2338");
                            const pos = new BlockPos(bx, by, bz);
                            setBlockMethod.invoke(world, pos, airState, 0, 0); // Using flags 0, 0
                        } catch (e) {
                            // Silently continue on errors to maintain performance
                        }
                    });
                    blockOperations.length = 0;
                    
                    // Minimal delays for reflection
                    if (radius > 50) Time.sleep(1);
                }
            } else {
                // Add to command batch (original method)
                blockCommands.push(`/setblock ${x} ${y} ${z} air`);
                
                // Execute command batch when full
                if (blockCommands.length >= batchSize) {
                    blockCommands.forEach(cmd => Chat.say(cmd));
                    blockCommands.length = 0;
                    
                    // Faster delays - reduced from 10-20ms to 2-5ms
                    const batchDelay = radius > 30 ? 5 : (radius > 15 ? 3 : 1);
                    Time.sleep(batchDelay);
                }
            }
            
            // Safety break for extremely large planes
            if (processedInPlane > maxBlocksPerPlane) {
                Chat.log(`Plane limit reached: ${processedInPlane} blocks processed`);
                break;
            }
        }
        
        // Break outer loop if limit reached
        if (processedInPlane > maxBlocksPerPlane) break;
    }
    
    // Execute remaining operations
    if (USE_REFLECTION && blockOperations.length > 0) {
        blockOperations.forEach(([bx, by, bz]) => {
            try {
                const BlockPos = Java.type("net.minecraft.class_2338");
                const pos = new BlockPos(bx, by, bz);
                setBlockMethod.invoke(world, pos, airState, 0, 0);
            } catch (e) {
                // Silently continue on errors
            }
        });
    } else if (!USE_REFLECTION && blockCommands.length > 0) {
        blockCommands.forEach(cmd => Chat.say(cmd));
    }
}


function main() {
    const center = Player.rayTraceBlock(2000, false);
    if(!center) return;

    const eyePos = Player.getPlayer().getEyePos();
    
    // Pre-calculate eye position coordinates to avoid repeated method calls
    const eyeX = eyePos.getX();
    const eyeY = eyePos.getY();
    const eyeZ = eyePos.getZ();
    const centerX = center.getX();
    const centerY = center.getY();
    const centerZ = center.getZ();
    
    // Calculate direction vector
    const vectorX = centerX - eyeX;
    const vectorY = centerY - eyeY;
    const vectorZ = centerZ - eyeZ;

    // Calculate magnitude once
    const magnitude = Math.sqrt(vectorX * vectorX + vectorY * vectorY + vectorZ * vectorZ);
    
    // Pre-calculate normalized vector components
    const normalizedX = vectorX / magnitude;
    const normalizedY = vectorY / magnitude;
    const normalizedZ = vectorZ / magnitude;
    
    const normalizedVectorObj = { x: normalizedX, y: normalizedY, z: normalizedZ };

    // Keep original step size for complete coverage
    const stepSize = 0.2;
    
    // Estimate total operations and warn if too large
    const estimatedBlocks = (radius * radius) * (length / stepSize);
    if (estimatedBlocks > 1000000) {
        Chat.log(`WARNING: Estimated ${Math.floor(estimatedBlocks)} blocks - this will take time!`);
        Chat.log(`Radius: ${radius}, Length: ${length} - be patient!`);
    }
    
    Chat.log(`Processing with radius ${radius} - fast mode enabled`);
    
    for (let i = 0; i < length; i += stepSize) {
        const currentPosition = [
            eyeX + normalizedX * i,
            eyeY + normalizedY * i,
            eyeZ + normalizedZ * i
        ];

        planeHash(currentPosition, normalizedVectorObj, radius, radius);
        
        // Minimal delays for speed - only for very large radius
        if (radius > 30) {
            Time.sleep(2); // Reduced from 15-25ms to 2ms
        }
    }
}

let startTime = Date.now(); // Record the start time

main();

const elapsedTime = (Date.now() - startTime) / 1000;

Chat.log("Calculations done: " + count + " blocks");
Chat.log("Time: " + elapsedTime + "s");
