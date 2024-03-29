JsMacros.getOpenContexts().forEach(c => {
    if (c != context.getCtx()) {
        c.closeContext();
    }
});
Hud.clearDraw3Ds()