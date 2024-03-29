function findItem(inv, item, size) {
  let slot = null;
  for (let i = 9; i <= size; i++) {
    if (inv.getSlot(i)?.getItemID() === item) {
      slot = i;
      break;
    }
  }
  return slot;
}

function dyeBucket(inv, item) {
  // log the item we're dyeing
  Chat.log(item);

  // find the slots for the required items
  const mostUsedSlot = findItem(inv, item.slice(0, -1), 45); // the most-used item (e.g. bone meal)
  const bucketSlot = findItem(inv, "minecraft:bucket", 45); // bucket slot
  const featherSlot = findItem(inv, "minecraft:feather", 45); // feather slot
  const coalSlot =  findItem(inv, "minecraft:coal", 45); // coal slot

  // make sure we have all required items, otherwise return null
  if (mostUsedSlot != null && bucketSlot != null && featherSlot != null && coalSlot != null) {   // Swap items as needed
    if(mostUsedSlot != 45) {
      inv.swap(mostUsedSlot, 45);
    }
    if(bucketSlot != 44) {
      inv.swap(bucketSlot, 44);
    }
    if(coalSlot != 43) {
      inv.swap(coalSlot, 43);
    }
    if(featherSlot != 42) {
      inv.swap(featherSlot, 42);
    }
  } else {
    return null;
  }

  // attack with bucket, selecting correct slot,
  // looking in the right direction and swapping back items
  const player = Player.getPlayer();
  smoothLook(Player.getPlayer(), 89, 1, 150, 50); // turn to the right direction
  Client.waitTick();
  inv.setSelectedHotbarSlotIndex(8);
  Time.sleep(250);
  Client.waitTick()
  player.attack();
  Time.sleep(150);
  Client.waitTick()
  inv.swap(45, mostUsedSlot); // Swap items back
  Client.waitTick()
  switch(item.charAt(item.length - 1)) {
    // dye item to be used
    case "0":
      inv.swap(42, 45);
      Time.sleep(150);
      Client.waitTick()
      player.attack();
      inv.swap(45, 42);
      break;
    case "1":
      break;
    case "2":
      inv.swap(43, 45);
      Time.sleep(150);
      Client.waitTick()
      player.attack();
      inv.swap(45, 43);
      break;
    case "3":
      inv.swap(43, 45);
      Time.sleep(150);
      Client.waitTick()
      player.attack();
      Time.sleep(350);
      Client.waitTick()
      player.attack();
      Time.sleep(350);
      Client.waitTick()
      inv.swap(45, 43);
      break;
    default:
      Chat.log("Unknown dye item: " + item);
      break;
  }
}


function loadItems(neededDyes) { 
  Chat.say("/backpack");
  JsMacros.waitForEvent("OpenScreen");
  Client.waitTick()
  let inv = Player.openInventory();
  for(let k = 0; k <= 2; k++) {
    for(let i = 0; i <= 89; i++) {
      const itemID = inv.getSlot(i).getItemID();
      if(neededDyes.includes(itemID)) {
        const targetSlot = 89 - neededDyes.findIndex(id => id === itemID);
        if(targetSlot < 54 || targetSlot == i) continue;
        inv.swap(i, targetSlot);
        Time.sleep(1);
      }
    };
  }
  inv.close();
  Time.sleep(50);
  Client.waitTick();
}

function smoothLook(player, goalYaw, goalPitch, TIME, TIME_INTERVAL) {
  var yawDifference = goalYaw - player.getYaw()
  var pitchDifference = goalPitch - player.getPitch()

  const STEPS = TIME / TIME_INTERVAL
  for(let i = 0; i < STEPS; i ++) {
      player.lookAt(player.getYaw() + yawDifference / STEPS, player.getPitch() + pitchDifference / STEPS)
      Time.sleep(TIME_INTERVAL)
  }
}

const rows = [
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44]
]

function findRow(slot) {
  for(let i = 0; i < rows.length; i++) {
    if(rows[i].includes(slot)) return i
  }
  return -1;
}

function getItemSlot(inv, item) {
  for(let i = 0; i < 45; i++) {
    if(inv.getSlot(i).getItemID() == item) return i
  }
} 
  
function findHotbar(map, item) {
  for (let i = 0; i <= 8; i++) {
    if(inv.getSlot(map.hotbar[i]).getItemID() == item) {
      return i
    }
  }
  return -1;
}

function dyePixel(inv, position, dye) {
  let hotbarSlot = findHotbar(inv.getMap(), dye);
  if(hotbarSlot == -1) {
    
    const row = rows[findRow(getItemSlot(inv, dye))];
    if(!row) {
      return -1;
    }

    for(let i = 0; i < row.length; i++) {
      inv.swapHotbar(row[i], i);
    }
    Client.waitTick();
    hotbarSlot = findHotbar(inv.getMap(), dye);
    Client.waitTick();
  }

  if(hotbarSlot != inv.getSelectedHotbarSlotIndex()) {
    Client.waitTick(2);
    inv.setSelectedHotbarSlotIndex(hotbarSlot);
    Client.waitTick(2);
  }

  const [yaw, pitch] = position;
  ////Chat.log(yaw.toFixed(0) + ", " + pitch.toFixed(0) + ": " + dye);
  smoothLook(Player.getPlayer(), yaw, pitch, 200, 25); //200, 50
  Player.getPlayer().attack();
  return 1
}

const startingTime = Time.time();

const positions = JSON.parse(FS.open("Positions.json").read());
const AntiAfk = JsMacros.runScript("scripts/Anti-afk.ts");

let dyesJson = JSON.parse(FS.open("similar_colors.json").read());

// Get an array of all the values in the object
const values = Object.values(dyesJson);

// Create an object to store the counts of each value
const valueCounts = {};

// Count the occurrences of each value
values.forEach((value) => { 
  if (value in valueCounts) {
    valueCounts[value]++;
  } else {
    valueCounts[value] = 1;
  }
});

// Get an array of the entries in the valueCounts object
const entries = Object.entries(valueCounts);





// Sort the entries based on the count of each value
entries.sort((a, b) => b[1] - a[1]);
//Chat.log(entries)
//Chat.log(entries[0][0].charAt(entries[0][0].length - 1)); // Outputs: [3, 2, 1]
// The most used values will be at the beginning of the array
const mostUsedValues = entries.map((entry) => entry[0]).map(x => "minecraft:" + x);




const neededDyes = mostUsedValues.map(x => x.slice(0, -1)).reduce(function(acc, curr) {
  if (acc.indexOf(curr) === -1) acc.push(curr);
  return acc;
}, []);


neededDyes.unshift("minecraft:feather");
neededDyes.unshift("minecraft:coal");
neededDyes.unshift("minecraft:bucket");

loadItems(neededDyes)

let inv = Player.openInventory()

const mostUsed = mostUsedValues[0]
dyeBucket(inv, mostUsed)
neededDyes.splice(0, 4); //4

for (const key in neededDyes) {
  Chat.log(neededDyes[key]);
}

let dyesUsed = 0;
for (let dye in neededDyes) {
  for (const position in positions) {
    if(dyesJson[position].slice(0, -1) != neededDyes[dye].replace("minecraft:", "")) { continue }
    const success = dyePixel(inv, positions[position], neededDyes[dye])
    if(success == -1) {
      Chat.log("Failed to dye " + neededDyes[dye])
      const customizedDyes = neededDyes.slice(dyesUsed, neededDyes.length);
      loadItems(customizedDyes)
      dyePixel(inv, positions[position], neededDyes[dye])
    }
  }
  dyesUsed++;
}


//Dying pixels with coal or feather based on the lastChar of the dye (0, 1, 2, 3)
const feather = "minecraft:feather"
const coal = "minecraft:coal"
const items = [feather, coal];
const currentArray = new Array(1024).fill(1);
for(let position in dyesJson) {
  const dye = dyesJson[position].slice(0, -1);
  const mostUsedDye = mostUsed.slice(10, -1);
  const shadeOfMostUsed = mostUsed.charAt(mostUsed.length - 1);
  if(dye == mostUsedDye) currentArray[position - 1] = parseInt(shadeOfMostUsed);
}
loadItems(items);
let done = false;

while(!done) {
  done = true;
  for(let position in dyesJson) {
    const intended = parseInt(dyesJson[position].charAt(dyesJson[position].length - 1));
    let current = currentArray[position - 1];
    if(current > intended) {
      dyePixel(inv, positions[position], feather);
      currentArray[position - 1] = current - 1;
      done = false;
    }
  }
}

done = false;
while(!done) {
  done = true;
  for(let position in dyesJson) {
    const intended = parseInt(dyesJson[position].charAt(dyesJson[position].length - 1));
    let current = currentArray[position - 1];
    Chat.log(current + ">" + intended);
    if(current < intended) {
      dyePixel(inv, positions[position], coal);
      currentArray[position - 1] = current + 1;
      done = false;
    }
  }
}



const endingTime = Time.time();
Chat.log("Art done in: " + (endingTime - startingTime));




/*
// Iterate over original array and assign elements to 2D array
for (let i = 0; i < values.length; i++) {
  const row = Math.floor(i / 32);
  const col = i % 32;
  matrix[row][col] = values[i];
}


FS.open("neededDyes.json").write(JSON.stringify(matrix));
FS.open("dye.json").write(JSON.stringify(dyesJson));
*/