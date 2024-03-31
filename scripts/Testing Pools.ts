class SizeLimitedObjectFIFO {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.hash = {};
        this.queue = [];
    }

    set(key, value) {
        if (this.queue.length >= this.maxSize) {
            const removedKey = this.queue.shift(); // Remove the oldest key
            delete this.hash[removedKey]; // Remove corresponding entry from the hash
            //Chat.log(removedKey);
            //Chat.say(removedKey);
        }
        this.hash[key] = value; // Add new entry to the hash
        this.queue.push(key); // Add new key to the end of the queue
    }

    get(key) {
        return this.hash[key];
    }
}

class SizeLimitedArrayFIFO {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.array = [];
    }

    set(value) {
        const stringValue = JSON.stringify(value); // Convert the array to a string
        // Check if the string value already exists in the array
        if (this.array.includes(stringValue)) {
            
            Chat.log(stringValue);
            return;
        }

        // If the array exceeds the maximum size, remove the oldest element
        if (this.array.length >= this.maxSize) {
            const removedKey = this.array.shift(); // Remove the oldest element
            //Chat.log(removedKey);
        }
        
        // Add new element to the end of the array
        this.array.push(stringValue); 
    }

    get(index) {
        return JSON.parse(this.array[index]); // Convert the string back to an array
    }

    clear() {
        while (this.array.length > 0) {
            JSON.parse(this.array.shift());
        }
    }
}


const dataSize = 40;
const FIFOSize = 10;

Chat.log(Chat.createTextBuilder().append("\n[").withColor(0x7)
.append("Writing").withColor(0x5).append("]").withColor(0x7)
.build());

Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
.append(`${Math.pow(dataSize, 3)}`).withColor(0x9).append(` data points`).withColor(0x5).append("]").withColor(0x7)
.build());

// Test for SizeLimitedObjectFIFO
const sizeLimitedObject = new SizeLimitedObjectFIFO(FIFOSize);
const startTimeSLO = Date.now();
for (let x = 0; x < dataSize; x++) {
    for (let y = 0; y < dataSize; y++) {
        for (let z = 0; z < dataSize; z++) {
            const coordinate = `${x},${y},${z}`;
            sizeLimitedObject.set(coordinate, "true");
        }
    }
}
const endTimeSLO = Date.now();
Chat.log(`SizeLimitedObjectFIFO: ${endTimeSLO - startTimeSLO} ms`);

// Test for SizeLimitedArrayFIFO
const sizeLimitedArray = new SizeLimitedArrayFIFO(FIFOSize);
const startTimeSLA = Date.now();
for (let x = 0; x < dataSize; x++) {
    for (let y = 0; y < dataSize; y++) {
        for (let z = 0; z < dataSize; z++) {
            const coordinate = [x, y, z];
            sizeLimitedArray.set(coordinate);
        }
    }
}
const endTimeSLA = Date.now();
Chat.log(`SizeLimitedArrayFIFO: ${endTimeSLA - startTimeSLA} ms`);

Chat.log(`Ratio: ${(endTimeSLO - startTimeSLO) / (endTimeSLA - startTimeSLA)}`);


const test = [5, 2, 1];
const test1 = [5, 2, 1];

sizeLimitedArray.set(test);
sizeLimitedArray.set(test1);




/*
// Test for SizeLimitedHashFIFO
const sizeLimitedObject = new SizeLimitedObjectFIFO(FIFOSize);
const startTimeSLO = Date.now();
for (let index = 0; index < dataSize; index++) {
    sizeLimitedObject.set(index.toString(), "true");
}
const endTimeSLO = Date.now();
Chat.log(`SizeLimitedObjectFIFO: ${endTimeSLO - startTimeSLO} ms`);

// Test for sizeLimitedArrayFIO
const sizeLimitedArray = new SizeLimitedArrayFIFO(FIFOSize);
const startTimeSLA = Date.now();
for (let index = 0; index < dataSize; index++) {
    sizeLimitedArray.set(index.toString());
}
const endTimeSLA = Date.now();
Chat.log(`SizeLimitedArrayFIFO: ${endTimeSLA - startTimeSLA} ms`);

// Test for Array
let array = [];
const startTimeArray = Date.now();
for (let index = 0; index < dataSize; index++) {
    array.push(index.toString());
}
const endTimeArray = Date.now();
Chat.log(`Array: ${endTimeArray - startTimeArray} ms`);

// Test for Object
let object = {};
const startTimeObject = Date.now();
for (let index = 0; index < dataSize; index++) {
    object[index.toString()] = "true";
}
const endTimeObject = Date.now();
Chat.log(`Object: ${endTimeObject - startTimeObject} ms`);

// Test for Map
let map = new Map();
const startTimeMap = Date.now();
for (let index = 0; index < dataSize; index++) {
    map.set(index.toString(), "true");
}
const endTimeMap = Date.now();
Chat.log(`Map: ${endTimeMap - startTimeMap} ms`);










Chat.log(Chat.createTextBuilder().append("\n[").withColor(0x7)
.append("Reading").withColor(0x5).append("]").withColor(0x7)
.build());

// Test for SizeLimitedHashFIFO
const startTimeGetSLH = Date.now();
for (let index = 0; index < dataSize; index++) {
    sizeLimitedObject.get(index.toString());
}
const endTimeGetSLH = Date.now();
Chat.log(`SizeLimitedHashFIFO: ${endTimeGetSLH - startTimeGetSLH} ms`);

// Test for SizeLimitedArrayFIFO
const startTimeGetSLA = Date.now();
for (let index = 0; index < dataSize; index++) {
    sizeLimitedArray.get(index.toString());
}
const endTimeGetSLA = Date.now();
Chat.log(`SizeLimitedArrayFIFO: ${endTimeGetSLA - startTimeGetSLA} ms`);

// Test for Array
const startTimeGetArray = Date.now();
for (let index = 0; index < dataSize; index++) {
    array[index];
}
const endTimeGetArray = Date.now();
Chat.log(`Array: ${endTimeGetArray - startTimeGetArray} ms`);

// Test for Object
const startTimeGetObject = Date.now();
for (let index = 0; index < dataSize; index++) {
    object[index.toString()];
}
const endTimeGetObject = Date.now();
Chat.log(`Object: ${endTimeGetObject - startTimeGetObject} ms`);

// Test for Map
const startTimeGetMap = Date.now();
for (let index = 0; index < dataSize; index++) {
    map.get(index.toString());
}
const endTimeGetMap = Date.now();
Chat.log(`Map: ${endTimeGetMap - startTimeGetMap} ms`);

*/