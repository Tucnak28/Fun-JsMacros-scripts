const item_frame = Reflection.getClass("net.minecraft.class_1533");
const containsMap = item_frame.getDeclaredMethod("method_43273");
const getMapId = item_frame.getDeclaredMethod("method_43272");
const ITEM_STACK = Reflection.getDeclaredMethod(item_frame, "method_33340");




getMapId.setAccessible(true);
ITEM_STACK.setAccessible(true);

World.getEntities().forEach(entity => {
    const entityRaw = entity.getRaw()
    if(entityRaw.getClass() != item_frame) return;
    if(containsMap.invoke(entityRaw) != true) return;
    const mapId = getMapId.invoke(entityRaw).getAsInt();
    const ItemObj = ITEM_STACK.invoke(entityRaw);
    Chat.log("id: " + mapId);
    Chat.log("item stack: " + ItemObj);
    for (const key in ItemObj) {
        Chat.log(ItemObj[key]);
    }
});