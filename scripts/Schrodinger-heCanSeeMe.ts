const entity = Player.getPlayer().rayTraceEntity(10);
let previousState = false; // Initialize previous state as false
let state = false;

// Obtain the field for the frustum in WorldRenderer
const frustumField = Reflection.getDeclaredField(Java.type("net.minecraft.class_761"), "field_27740");
frustumField.setAccessible(true);

// Obtain the getVisibilityBoundingBox method for entities
const getVisibilityBoundingBoxMethod = Reflection.getDeclaredMethod(Java.type("net.minecraft.class_1297"), "method_5830");
getVisibilityBoundingBoxMethod.setAccessible(true);

// Get the Minecraft instance
const minecraftInstance = Client.getMinecraft(); // This should be correct

// Access the field for the WorldRenderer from the Minecraft instance
const worldRendererField = Reflection.getDeclaredField(Java.type("net.minecraft.class_310"), "field_1769");
worldRendererField.setAccessible(true);
const worldRenderer = worldRendererField.get(minecraftInstance);

// Reflectively access the isVisible method
const isVisibleMethod = Reflection.getDeclaredMethod(
    Java.type("net.minecraft.class_4604"),
    "method_23089",
    Java.type("double"), Java.type("double"), Java.type("double"),
    Java.type("double"), Java.type("double"), Java.type("double")
);
isVisibleMethod.setAccessible(true);

// Retrieve the frustum's setPosition method
const frustum_setPosition = Reflection.getDeclaredMethod(
    Java.type("net.minecraft.class_4604"),
    "method_23088", // The obfuscated name for the setPosition method
    Java.type("double"), // Type for cameraX
    Java.type("double"), // Type for cameraY
    Java.type("double")  // Type for cameraZ
);
frustum_setPosition.setAccessible(true);

// Obtain the field for the frustum in WorldRenderer
const frustumField_X = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_20995");
frustumField_X.setAccessible(true);

// Obtain the field for the frustum in WorldRenderer
const frustumField_Y = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_20996");
frustumField_Y.setAccessible(true);

// Obtain the field for the frustum in WorldRenderer
const frustumField_Z = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_20997");
frustumField_Z.setAccessible(true);




// Get the obfuscated fields for minX, minY, minZ, maxX, maxY, and maxZ from class_238 (Box)
const minXField = Reflection.getDeclaredField(Java.type("net.minecraft.class_238"), "field_1323");
minXField.setAccessible(true);

const minYField = Reflection.getDeclaredField(Java.type("net.minecraft.class_238"), "field_1322");
minYField.setAccessible(true);

const minZField = Reflection.getDeclaredField(Java.type("net.minecraft.class_238"), "field_1321");
minZField.setAccessible(true);

const maxXField = Reflection.getDeclaredField(Java.type("net.minecraft.class_238"), "field_1320");
maxXField.setAccessible(true);

const maxYField = Reflection.getDeclaredField(Java.type("net.minecraft.class_238"), "field_1325");
maxYField.setAccessible(true);

const maxZField = Reflection.getDeclaredField(Java.type("net.minecraft.class_238"), "field_1324");
maxZField.setAccessible(true);




// Modify isVisibleInternal to accept a frustum parameter
function isVisibleInternal(box, frustum) {
    if (frustum == null) {
        Chat.log("Frustum is null.");
        return false;
    }

    // Use reflection to get the actual values of the obfuscated fields from the box
    let x1 = minXField.get(box);
    let y1 = minYField.get(box);
    let z1 = minZField.get(box);
    let x2 = maxXField.get(box);
    let y2 = maxYField.get(box);
    let z2 = maxZField.get(box);

    return isVisibleMethod.invoke(frustum, x1, y1, z1, x2, y2, z2);
}

// Now you can check visibility against this frustum
function isEntityVisibleToOtherPlayer(otherFrustum, entity) {
    let boundingBox = getVisibilityBoundingBoxMethod.invoke(entity.getRaw());
    return isVisibleInternal(boundingBox, otherFrustum);
}


if (entity) {
    while (true) {
        const player = Player.getPlayer();
        let frustum = frustumField.get(worldRenderer);

        //frustumField_Y.set(frustum, 50);

        let frustumX = frustumField_X.get(frustum);
        let frustumY = frustumField_Y.get(frustum);
        let frustumZ = frustumField_Z.get(frustum);

        const position = player.getBlockPos();
        const yaw = player.getYaw();
        const pitch = player.getPitch();

        
        Chat.log(frustumY);

        
        // Use the frustum to check if the entity is visible
        state = isEntityVisibleToOtherPlayer(frustum, entity);
        // Check if the visibility state has changed
        if (state !== previousState) {
            Chat.log("Visibility state changed: " + state);
            
            Chat.say("/v"); // Trigger vanish command when entity becomes visible

            previousState = state; // Update the previous state
        }

        Time.sleep(100);
    }
}



