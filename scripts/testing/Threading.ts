function thread1() {
    while(1) {
        Chat.log("thread1");
        Time.sleep(1000);
    }
    
}

function thread2() {
    while(1) {
        Chat.log("thread2");
        Time.sleep(1000);
    }
}

JavaWrapper.methodToJavaAsync(1, thread1).run();
JavaWrapper.methodToJavaAsync(1, thread2).run();