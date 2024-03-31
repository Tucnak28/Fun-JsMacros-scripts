if (event.text.getString().includes("Could not set the block")) {
    //event.text = null;
    event.cancel();
}