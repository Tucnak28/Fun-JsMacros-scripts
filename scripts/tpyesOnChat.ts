const listenerPacket = JsMacros.on("RecvMessage", JavaWrapper.methodToJava(event => {
    if (event.text.toString().includes("jojo")) Chat.say("/tpyes");
}));