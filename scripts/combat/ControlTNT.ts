//summon TNT in Minecraft, with specified motion patterns, and triggers the creation of a sphere of TNT upon a mouse click event, which then moves in a spiral pattern.

var rotoff = 0;
// Function to summon TNT
function summonTNT(x, y, z, fuse, motionArray, noGravity, entity) {
    const motionString = motionArray.join(",");
    Chat.say(`/summon minecraft:${entity} ${x} ${y} ${z} {Fuse:${fuse}, Motion:[${motionString}], NoGravity:${noGravity}}`);
}


// Event listener for mouse click
function onMouseClick(entity, gravity, radius, countTNT, height) {
// Calling the function

    const center = Player.rayTraceBlock(1000, true);
    if (center) {
        const blockX = center.getX();
        const blockY = center.getY();
        const blockZ = center.getZ();
        for (let index = 0; index < countTNT; index++) {
            summonTNT(blockX, blockY+1, blockZ, 1000, [0, 0, 0], gravity, entity);
        }
        
        // Uncomment the line below if you want to summon linear TNT motion
        // summonLinearTNT(blockX, blockY + 25, blockZ, numLineTNT, fuseLineTNT);
        
        Time.sleep(300);
        move_mouse(radius, entity, height);
    }


}

function sphereCoordination(i, radius, numTNT, center, height) {
    const phi = Math.acos(1 - 2 * (i / numTNT));
    //const psi = Math.random() * 2 * Math.PI;
    const psi = i + rotoff;
    const x = radius * Math.sin(phi) * Math.cos(psi) + center.getX();
    const y = radius * Math.sin(phi) * Math.sin(psi) + center.getY() + height;
    const z = radius * Math.cos(phi) + center.getZ();
    return [x, y, z];
}

function move_mouse(radius, entity, height){
    var Tnt_array = [];
    var i = 0;
    const entities = World.getEntities()

    for (const index in entities) {
        if(entities[index].getType() == "minecraft:" + entity) {
            Tnt_array.push(entities[index])
        }
    }

    
    var pos = Player.rayTraceBlock(1000, false);
    while(1) {
        
        if(!pos) return;
        for (const index in Tnt_array) {
            const TNT = Tnt_array[index];
            if(!TNT.isAlive()) Tnt_array.splice(index, 1);
            var coord = sphereCoordination(index, radius, Tnt_array.length, pos.getBlockPos(), height); //Math.sin(rotoff)*50
            var off_vector = PositionCommon.createVec(TNT.getX(), TNT.getY(), TNT.getZ(), coord[0], coord[1], coord[2]);
            var distance = off_vector.getMagnitudeSq();
            if(distance < 0.05) {
                Chat.say(`/data modify entity ${TNT.getUUID()} Motion set value [${0},${0},${0}]`);  
                continue;
            }

             // Damping factor to slow down the motion
            const dampingFactor = 10; //10 fast
            // Maximum distance at which damping is fully applied
            const maxDistance = 1000; //1000 fast

            const adjustedDamping = dampingFactor * Math.min(1, Math.abs(distance) / maxDistance);
        
            off_vector = off_vector.normalize().scale(adjustedDamping);

            //Chat.log(off_vector.getDeltaX().toString());
            Chat.say(`/data modify entity ${TNT.getUUID()} Motion set value [${off_vector.getDeltaX().toFixed(8)},${off_vector.getDeltaY().toFixed(8)},${off_vector.getDeltaZ().toFixed(8)}]`);   
        }

        Time.sleep(100);
        rotoff += 0.1;
    }
}


//data modify entity abb8e493-22d2-4206-9675-6f470572b599 Motion set value [0.0,0.5,0.0]
//local off = Vector(x,y,z)*seg
// Trigger the mouse click event

//entity, gravity, radius, countTNT, height
onMouseClick("tnt", 1, 10, 1000, 20);


//INTERESTING SPIRAL
////summonTNT(blockX, blockY+1, blockZ, index*5+100, [0, 0, 0], gravity, entity);
////onMouseClick("tnt", 1, 10, 1000, 25);

//svihadlo
//onMouseClick("tnt", 1, 10, 1000, 5);
//const psi = rotoff //+ rotoff;