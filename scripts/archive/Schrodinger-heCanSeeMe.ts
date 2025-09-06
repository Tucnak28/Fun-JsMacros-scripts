// Import the Matrix4f class
const Matrix4f = Java.type("org.joml.Matrix4f");
// Import the Matrix4f class
const Vector4f = Java.type("org.joml.Vector4f");
// Import the Matrix4f class
const Vector3f = Java.type("org.joml.Vector3f");

// Create a 3D drawing object
var draw3d = Hud.createDraw3D();

// Register the 3D drawing object
draw3d.register();


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




// Access the frustum's init method with the correct parameter types
const frustum_init_method = Reflection.getDeclaredMethod(
    Java.type("net.minecraft.class_4604"), // Class containing method
    "method_23092",                      // Method name
    Matrix4f.class,                      // Parameter 1 type
    Matrix4f.class                       // Parameter 2 type
);
frustum_init_method.setAccessible(true);




//
//Frustum Fields
//

// Obtain the field for the frustum in WorldRenderer
const frustumX_field = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_20995");
frustumX_field.setAccessible(true);

// Obtain the field for the frustum in WorldRenderer
const frustumY_field = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_20996");
frustumY_field.setAccessible(true);

// Obtain the field for the frustum in WorldRenderer
const frustumZ_field = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_20997");
frustumZ_field.setAccessible(true);

// Obtain the field for the frustum in WorldRenderer
const positionProjectionMatrix_field = Reflection.getDeclaredField(Java.type("net.minecraft.class_4604"), "field_40824");
positionProjectionMatrix_field.setAccessible(true);


const projectionMatrixMethod = Reflection.getDeclaredMethod(Matrix4f, 
    "method_4933",
    Java.type("float"),
    Java.type("float"),
    Java.type("float"),
    Java.type("float")
);
projectionMatrixMethod.setAccessible(true);







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

// Function to convert degrees to radians
function degreesToRadians(degrees) {
    return Math.fround(degrees * (Math.PI / 180));
}


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

// Function to create a position matrix based on player's position and orientation
function getPositionMatrix(player) {
    // Get player's position
    const playerPosition = player.getEyePos();
    const playerX = Math.fround(playerPosition.getX());
    const playerY = Math.fround(playerPosition.getY());
    const playerZ = Math.fround(playerPosition.getZ());

    // Get player's yaw and pitch
    const yaw = player.getYaw();
    const pitch = player.getPitch();

    // Create a new Matrix4f instance
    const positionMatrix = new Matrix4f();

    // Apply translation
    positionMatrix.translation(playerX, playerY, playerZ);

    // Create a rotation matrix based on yaw and pitch
    const rotationMatrix = new Matrix4f();
    rotationMatrix.rotationYXZ(degreesToRadians(yaw), degreesToRadians(pitch), 0.0); // Yaw first, then pitch

    // Combine translation and rotation
    positionMatrix.mul(rotationMatrix);

    return positionMatrix;
}


// Function to create a projection matrix using reflection
function getProjectionMatrix(width, height, nearPlane, farPlane) {
    // Call the projectionMatrix method using reflection
    const projectionMatrix = projectionMatrixMethod.invoke(width, height, nearPlane, farPlane);
    return projectionMatrix;
}









if (entity) {
    // Render a box at each frustum point
    let box = draw3d.addBox(
        0 - 0.5,
        0,
        0 - 0.5,
        0 + 0.5,
        0 + 2,
        0 + 0.5,
        0x00ff00, // Color of the box
        50, // Alpha value
        0x3f00ff00, // Edge color
        0,
        true // Fill the box
    );

    while (true) {
        const player = Player.getPlayer();
        let frustum = frustumField.get(worldRenderer);

        //frustumField_Y.set(frustum, 50); //This is how to set the field

        
        //Chat.log(frustumProjection);
        

        const width = 1920;  // Example width
        const height = 1080; // Example height
        const nearPlane = 0.1; // Near clipping plane
        const farPlane = 1000; // Far clipping plane
        const fov = 90; // Field of view in degrees

        const projectionMatrix = getProjectionMatrix(width, height, nearPlane, farPlane, fov);
        const positionMatrix = getPositionMatrix(entity);

        // Check if the frustum is initialized correctly
        if (projectionMatrix == null || positionMatrix == null) {
            Chat.log("One of the matrices is null. Check initialization.");
            Time.sleep(100);
            continue; // Skip this iteration if matrices are null
        }

        // Check types before invoking
        //Chat.log("Projection Matrix Type: " + projectionMatrix.getClass().getName());
        //Chat.log("Position Matrix Type: " + positionMatrix.getClass().getName());


        const FrustumClass = Java.type("net.minecraft.class_4604"); // Replace with actual class name if different
        const entityFrustum = new FrustumClass(projectionMatrix, positionMatrix); // Create a new instance

        frustum_setPosition.invoke(entityFrustum, entity.getEyePos().getX(), entity.getEyePos().getY(), entity.getEyePos().getZ());

        let frustumX = frustumX_field.get(entityFrustum);
        let frustumY = frustumY_field.get(entityFrustum);
        let frustumZ = frustumZ_field.get(entityFrustum);
        let frustumProjection = positionProjectionMatrix_field.get(entityFrustum);

        //const frustumCorners = calculateFrustumCorners(projectionMatrix, positionMatrix);
        //renderFrustum(frustumCorners);

        //Chat.log(frustumProjection);

        box.setPos(frustumX, frustumY, frustumZ, frustumX+0.5, frustumY+0.5, frustumZ+0.5);


        
        // Use the frustum to check if the entity is visible
        state = isEntityVisibleToOtherPlayer(frustum, entity);

        Chat.log(state);
        // Check if the visibility state has changed
        if (state !== previousState) {
            Chat.log("Visibility state changed: " + state);
            
            Chat.say("/v"); // Trigger vanish command when entity becomes visible

            previousState = state; // Update the previous state
        }

        Time.sleep(100);
    }
}



