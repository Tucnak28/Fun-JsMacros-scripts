const banned = ["(/vote)", "vytvořil GAMBU", "/lottery buy", "(/levels)"];

for (const ban of banned) {
    if (event.text.getString().includes(ban)) {
        event.cancel();
        break;
    }
}
