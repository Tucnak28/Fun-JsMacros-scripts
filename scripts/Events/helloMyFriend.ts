// Important Variables
const friends = ["Itskeldan", "Xpipos", "GiantAlexis", "MCZahyCZ", "Japkylcz", "mejlos111", "janko1559"]; // List of friends to greet
const minDelayTime = 3000; // Minimum sleep time (in milliseconds) before greeting
const maxDelayTime = 15000; // Maximum sleep time (in milliseconds) before greeting
const cooldownInMinutes = 300; // cooldown in minutes
const greetings = ["o/", "cc", "čau", "yo", "čus"]; // Array of possible greetings



const cooldown = cooldownInMinutes * 60 * 1000; // Cooldown in milliseconds

const globalVars = GlobalVars; // Access to GlobalVars for storing last greeted times

// Assuming this is inside an event listener for a player event
const name = event.player.getName(); // Get the name of the player
const currentTime = Date.now(); // Get the current time in milliseconds

// Log current time in a readable format
const date = new Date(currentTime);

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random greeting
function getRandomGreeting() {
    return greetings[Math.floor(Math.random() * greetings.length)];
}

// Initialize the last greeted time for the current player if it doesn't exist
if (!globalVars.getDouble(name)) {
    globalVars.putDouble(name, 0); // Initialize if this player has never been greeted
}

// If not greeting everyone, check against the friends list
for (const friend of friends) {
    if (name.toLowerCase().includes(friend.toLowerCase())) {
        const lastGreetedTime = globalVars.getDouble(friend) || 0; // Get last greeted time for the friend

        // Check if the friend has been greeted in the last cooldown period
        if (currentTime - lastGreetedTime >= cooldown) {
            Time.sleep(getRandomNumber(minDelayTime, maxDelayTime)); // Random sleep before greeting
            Chat.say(name + " " + getRandomGreeting()); // Log the greeting
            globalVars.putDouble(friend, currentTime); // Update the last greeted time in GlobalVars
        } else {
            Chat.log("You have already greeted " + friend + " within " + cooldownInMinutes + " minutes");
        }
    }
}
