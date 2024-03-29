// Include the java-random library
const Random = require('java-random');

// Set the seed value
//Chat.log(seed)
// Create a new Random generator with the specified seed value

for (var x = 1; x < 1000; x = x+1) {
    let rng = new Random(Time.time() - 5);
    let randomNumber = rng.nextInt(37);
    if(randomNumber == 25) { Player.getPlayer().interact(); Chat.log(randomNumber); break;}
    Time.sleep(1)
}