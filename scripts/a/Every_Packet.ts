
/*function waitForEvent(updateData) {
    return new Promise(resolve => {
        const listener = JsMacros.on("RecvPacket", JavaWrapper.methodToJava(event => {
            if (event.type !== "MapUpdateS2CPacket") return;
            let updateDataObj = updateData.get(event.packet);
            if (updateDataObj == null) return;
            
            resolve(event)
            JsMacros.off(listener)
        }))
    })
}

function waitForPaint(updateData) {
    JsMacros.createCustomEvent("dyePainted").registerEvent();
    const painted = JsMacros.createCustomEvent("dyePainted");
    const listener = JsMacros.on("RecvPacket", JavaWrapper.methodToJava(event => {
        if (event.type !== "MapUpdateS2CPacket") return;
        let updateDataObj = updateData.get(event.packet);
        if (updateDataObj == null) return;
        Chat.log(updateDataObj);
        painted.trigger();
    }));
    JsMacros.waitForEvent("dyePainted");
    Chat.log("off");
    JsMacros.off(listener);
}
*/

//Get the client instance:
let clientInstance = Client.getMinecraft();
//Use reflection to get the Minecraft class
let MapUpdateS2CPacket = Reflection.getClass("net.minecraft.class_2683");
//Use reflection to get the field that holds the update data
let updateData = Reflection.getDeclaredField(MapUpdateS2CPacket, "field_28016");
let id = Reflection.getDeclaredMethod(MapUpdateS2CPacket, "method_11644");

let MapState = Reflection.getClass("net.minecraft.class_22$class_5637");
let width = Reflection.getDeclaredField(MapState, "field_27894");
let height = Reflection.getDeclaredField(MapState, "field_27895");
let startZ = Reflection.getDeclaredField(MapState, "field_27893");
let startX = Reflection.getDeclaredField(MapState, "field_27892");
let colors = Reflection.getDeclaredField(MapState, "field_27896");


updateData.setAccessible(true);
width.setAccessible(true);
height.setAccessible(true);
startZ.setAccessible(true);
startX.setAccessible(true);
colors.setAccessible(true);
id.setAccessible(true);

let lookupTable = {"4":"grass2","5":"grass1","6":"grass0","7":"grass3","8":"pumpkin_seeds2","9":"pumpkin_seeds1","10":"pumpkin_seeds0","11":"pumpkin_seeds3","12":"cobweb2","13":"cobweb1","14":"cobweb0","15":"cobweb3","16":"red_dye2","17":"red_dye1","18":"red_dye0","19":"red_dye3","20":"ice2","21":"ice1","22":"ice0","23":"ice3","24":"light_gray_dye2","25":"light_gray_dye1","26":"light_gray_dye0","27":"light_gray_dye3","28":"oak_leaves2","29":"oak_leaves1","30":"oak_leaves0","31":"oak_leaves3","32":"snow2","33":"snow1","34":"snow0","35":"snow3","36":"gray_dye2","37":"gray_dye1","38":"gray_dye0","39":"gray_dye3","40":"melon_seeds2","41":"melon_seeds1","42":"melon_seeds0","43":"melon_seeds3","44":"ghast_tear2","45":"ghast_tear1","46":"ghast_tear0","47":"ghast_tear3","48":"lapis_block2","49":"lapis_block1","50":"lapis_block0","51":"lapis_block3","52":"dark_oak_log2","53":"dark_oak_log1","54":"dark_oak_log0","55":"dark_oak_log3","56":"bone_meal2","57":"bone_meal1","58":"bone_meal0","59":"bone_meal3","60":"orange_dye2","61":"orange_dye1","62":"orange_dye0","63":"orange_dye3","64":"magenta_dye2","65":"magenta_dye1","66":"magenta_dye0","67":"magenta_dye3","68":"light_blue_dye2","69":"light_blue_dye1","70":"light_blue_dye0","71":"light_blue_dye3","72":"yellow_dye2","73":"yellow_dye1","74":"yellow_dye0","75":"yellow_dye3","76":"lime_dye2","77":"lime_dye1","78":"lime_dye0","79":"lime_dye3","80":"pink_dye2","81":"pink_dye1","82":"pink_dye0","83":"pink_dye3","84":"flint2","85":"flint1","86":"flint0","87":"flint3","88":"gunpowder2","89":"gunpowder1","90":"gunpowder0","91":"gunpowder3","92":"cyan_dye2","93":"cyan_dye1","94":"cyan_dye0","95":"cyan_dye3","96":"purple_dye2","97":"purple_dye1","98":"purple_dye0","99":"purple_dye3","100":"lapis_lazuli2","101":"lapis_lazuli1","102":"lapis_lazuli0","103":"lapis_lazuli3","104":"cocoa_beans2","105":"cocoa_beans1","106":"cocoa_beans0","107":"cocoa_beans3","108":"green_dye2","109":"green_dye1","110":"green_dye0","111":"green_dye3","112":"brick2","113":"brick1","114":"brick0","115":"brick3","116":"ink_sac2","117":"ink_sac1","118":"ink_sac0","119":"ink_sac3","120":"gold_nugget2","121":"gold_nugget1","122":"gold_nugget0","123":"gold_nugget3","124":"prismarine_crystals2","125":"prismarine_crystals1","126":"prismarine_crystals0","127":"prismarine_crystals3","-122":"emerald0","-123":"emerald1","-124":"emerald2","-121":"emerald3","-70":"chorus_fruit0","-71":"chorus_fruit1","-72":"chorus_fruit2","-69":"chorus_fruit3","-54":"apple0","-55":"apple1","-56":"apple2","-53":"apple3","-94":"glowstone_dust0","-95":"glowstone_dust1","-96":"glowstone_dust2","-93":"glowstone_dust3","-58":"poisonous_potato0","-59":"poisonous_potato1","-60":"poisonous_potato2","-57":"poisonous_potato3","-106":"magma_cream0","-107":"magma_cream1","-108":"magma_cream2","-105":"magma_cream3","-114":"nether_wart0","-115":"nether_wart1","-116":"nether_wart2","-113":"nether_wart3","-98":"mycelium0","-99":"mycelium1","-100":"mycelium2","-97":"mycelium3","-66":"purpur_block0","-67":"purpur_block1","-68":"purpur_block2","-65":"purpur_block3","-126":"lapis_ore0","-127":"lapis_ore1","-128":"lapis_ore2","-125":"lapis_ore3","-110":"egg0","-111":"egg1","-112":"egg2","-109":"egg3","-74":"iron_nugget0","-75":"iron_nugget1","-76":"iron_nugget2","-73":"iron_nugget3","-118":"birch_wood0","-119":"birch_wood1","-120":"birch_wood2","-117":"birch_wood3","-102":"beetroot0","-103":"beetroot1","-104":"beetroot2","-101":"beetroot3","-90":"slime_ball0","-91":"slime_ball1","-92":"slime_ball2","-89":"slime_ball3","-86":"spider_eye0","-87":"spider_eye1","-88":"spider_eye2","-85":"spider_eye3","-82":"soul_sand0","-83":"soul_sand1","-84":"soul_sand2","-81":"soul_sand3","-78":"brown_mushroom0","-79":"brown_mushroom1","-80":"brown_mushroom2","-77":"brown_mushroom3","-46":"crimson_nylium0","-47":"crimson_nylium1","-48":"crimson_nylium2","-45":"crimson_nylium3","-34":"warped_nylium0","-35":"warped_nylium1","-36":"warped_nylium2","-33":"warped_nylium3","-26":"warped_hyphae0","-27":"warped_hyphae1","-28":"warped_hyphae2","-25":"warped_hyphae3","-18":"cobbled_deepslate0","-19":"cobbled_deepslate1","-20":"cobbled_deepslate2","-17":"cobbled_deepslate3","-10":"glow_lichen0","-11":"glow_lichen1","-12":"glow_lichen2","-9":"glow_lichen3","-14":"raw_iron0","-15":"raw_iron1","-16":"raw_iron2","-13":"raw_iron3","-62":"podzol0","-63":"podzol1","-64":"podzol2","-61":"podzol3","-50":"charcoal0","-51":"charcoal1","-52":"charcoal2","-49":"charcoal3","-22":"warped_wart_block0","-23":"warped_wart_block1","-24":"warped_wart_block2","-21":"warped_wart_block3","-42":"crimson_stem0","-43":"crimson_stem1","-44":"crimson_stem2","-41":"crimson_stem3","-38":"crimson_hyphae0","-39":"crimson_hyphae1","-40":"crimson_hyphae2","-37":"crimson_hyphae3","-30":"warped_stem0","-31":"warped_stem1","-32":"warped_stem2","-29":"warped_stem3"}
let packet;

const listener = JsMacros.on("RecvPacket", JavaWrapper.methodToJava(event => {
    if (event.type !== "MapUpdateS2CPacket") return;

    let updateDataObj = updateData.get(event.packet);
    if (updateDataObj == null) return;
    
    const idObj = id.invoke(event.packet);
    const widthObj = width.getInt(updateDataObj);
    const heightObj = height.getInt(updateDataObj);
    
    Chat.log("id: " + idObj);
    Chat.log("width: " + widthObj);
    Chat.log("height: " + heightObj);
    Chat.log("startZ: " + startZ.getInt(updateDataObj));
    Chat.log("startX: " + startX.getInt(updateDataObj));
    if(widthObj != 128 || heightObj != 128) return;
    let colorsObj = colors.get(updateDataObj);
    if (colorsObj == null) return;
    packet = colorsObj;
}));

const listenerMessage = JsMacros.on("SendMessage", JavaWrapper.methodToJava(event => {
    getMapState(packet);
}));

function getMapState(colorsObj) {
    const colorsArray = [];

    for (let i = 0; i < colorsObj.length; i = i + 128) {
        let rowArray = [];
        for (let j = i; j < i + 128; j = j + 4) {
            let pixelArray = colorsObj.slice(j, j + 4);
            let pixelColor = pixelArray[0];
            if (pixelArray.every(val => val == pixelColor)) {
                rowArray.push(pixelColor);
            } else {
                rowArray.push(-1); // indicates that this 4x4 block is not uniform
            }
        }
        colorsArray.push(rowArray);
    }
    const actualColors = colorsArray.filter((row, index) => index % 4 === 0);
    
    let numRows = actualColors.length;
    let numColumns = actualColors[0].length;
    let numElements = numRows * numColumns;
    
    Chat.log("Number of rows: " + numRows);
    Chat.log("Number of columns: " + numColumns);
    Chat.log("Size of colorsArray: " + numElements);

      
    const translatedArray = actualColors.map(subArray => {
    return subArray.map(num => {
        return lookupTable[num.toString()];
    });
    });
    FS.open("translated.json").write(JSON.stringify(translatedArray));
    let dyesJson = JSON.parse(FS.open("similar_colors.json").read());
    let array1D = translatedArray.flat();
    let errorArray = [];
    for (const key in dyesJson) {
        if(array1D[key - 1] == dyesJson[key]) continue;
        const index = parseInt(key);
        const intDye = dyesJson[key].slice(0, -1);
        const intShade = parseInt(dyesJson[key].charAt(dyesJson[key].length - 1));
        const curShade = parseInt(array1D[key - 1].charAt(array1D[key - 1].length - 1));
        const curDye = array1D[key - 1].slice(0, -1);
        errorArray.push([index, [intDye, intShade], [curDye, curShade]]);
    }
    Chat.log(errorArray);
}
//Connecting numbers and dyes names
/*
const numbers = [  [58, 58, 57, 57, 56, 56],
  [59, 59, 118, 118, 117],
  [117, 116, 116, 119, 119]
];

const items = [  ["bone_meal0", "bone_meal0", "bone_meal1", "bone_meal1", "bone_meal2", "bone_meal2"],
  ["bone_meal3", "bone_meal3", "ink_sac0", "ink_sac0", "ink_sac1"],
  ["ink_sac1", "ink_sac2", "ink_sac2", "ink_sac3", "ink_sac3"]
];
*/
/*
const numbers = Object.values(JSON.parse(FS.open("numbers.json").read()));
const items = Object.values(JSON.parse(FS.open("neededDyes.json").read()));

let lookupTable = {};

for (let i = 0; i < numbers.length; i++) {
  const rowNumbers = numbers[i];
  const rowItems = items[i];
  for (let j = 0; j < rowNumbers.length; j++) {
    const number = rowNumbers[j];
    const item = rowItems[j];
    if (!(number in lookupTable)) {
      lookupTable[number] = item;
    }
  }
}

FS.open("result.json").write(JSON.stringify(lookupTable));*/










/*JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((e) => {
    if(e.type !== "MapUpdateS2CPacket") return;
    let updateDataObj = updateData.get(e.packet);
    if(updateDataObj == null) return;
    Chat.log(updateDataObj);
}));*/
/*
JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((e) => {
    //C2S
    if(e.type == "PlayerMoveC2SPacket$LookAndOnGround") return;
    if(e.type == "PlayerInputC2SPacket") return;
    if(e.type == "KeepAliveC2SPacket") return;
    if(e.type == "HandSwingC2SPacket") return;
    if(e.type == "PlayerInteractEntityC2SPacket") return;

    //S2C
    if(e.type == "TeamS2CPacket") return;
    if(e.type == "BossBarS2CPacket") return;
    if(e.type == "ScoreboardObjectiveUpdateS2CPacket") return;
    if(e.type !== "MapUpdateS2CPacket") return;
    if(e.type == "PlayerListS2CPacket") return;
    if(e.type == "WorldTimeUpdateS2CPacket") return;
    if(e.type == "ScreenHandlerSlotUpdateS2CPacket") return;
    if(e.type == "EntitySetHeadYawS2CPacket") return;
    if(e.type == "EntityS2CPacket$Rotate") return;
    if(e.type == "EntityPassengersSetS2CPacket") return;
    if(e.type == "PlayerListHeaderS2CPacket") return;
    if(e.type == "EntityEquipmentUpdateS2CPacket") return;
    if(e.type == "EntityAttributesS2CPacket") return;
    if(e.type == "KeepAliveS2CPacket") return;
    if(e.type == "EntityS2CPacket$MoveRelative") return;
    if(e.type == "EntityStatusS2CPacket") return;
    if(e.type == "EntityPositionS2CPacket") return;
    if(e.type == "") return;
    if(e.type == "") return;
    if(e.type == "") return;
    if(e.type == "") return;
    
    //Chat.log(updateData.get(e.packet));
    let updateDataObj = updateData.get(e.packet);
    if(updateDataObj == null) return;
    Chat.log(updateDataObj);

    //Chat.log("x: " + e.packet.method_11450()) //Sucess of armor slot //"ScreenHandlerSlotUpdateS2CPacket"
    //Chat.log("x: " + e.packet)
}))
*/

/*
let receive = 0;
let send = 0;
JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((e) => {
    receive++;
    Chat.log("receive: " + receive);
}))

JsMacros.on("SendPacket", JavaWrapper.methodToJavaAsync((e) => {
    send++;
    Chat.log("send: " + send);
}))
*/