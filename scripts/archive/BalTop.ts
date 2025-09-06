Chat.say("/baltop")
const message = JsMacros.waitForEvent("RecvMessage") 
Chat.log(message.event.toString())
