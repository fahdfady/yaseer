"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEffect = exports.createSignal = void 0;
const context = [];
function subscribe(running, subscribers) {
    subscribers.add(running);
    running.dependencies.add(subscribers);
}
function cleanup(running) {
    for (const dep of running.dependencies) {
        dep.delete(running);
    }
    running.dependencies.clear();
}
function createSignal(value) {
    const subscribers = new Set();
    const getter = () => {
        const running = context[context.length - 1];
        if (running)
            subscribe(running, subscribers);
        return value;
    };
    const setter = (newValue) => {
        value = newValue;
        for (const sub of [...subscribers]) {
            sub.execute();
        }
    };
    return [getter, setter];
}
exports.createSignal = createSignal;
function createEffect(fn) {
    const execute = () => {
        cleanup(running);
        context.push(running);
        try {
            fn();
        }
        finally {
            context.pop;
        }
    };
    const running = {
        execute,
        dependencies: new Set()
    };
    execute();
    console.log(running, context, execute);
}
exports.createEffect = createEffect;
