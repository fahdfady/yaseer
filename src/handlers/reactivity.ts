const context: Running[] = [];
// Declares a constant named "context" with a type of an array of "Running" objects. It is initialized as an empty array.

function subscribe(running: any, subscribers: any) {
    subscribers.add(running);
    running.dependencies.add(subscribers);
}
// Defines a function named "subscribe" that takes two arguments: "running" and "subscribers". It adds "running" to "subscribers" and adds "subscribers" to "running.dependencies".

function cleanup(running: any) {
    for (const dep of running.dependencies) {
        dep.delete(running);
    }
    running.dependencies.clear();
}
// Defines a function named "cleanup" that takes one argument: "running". It iterates over "running.dependencies" and removes "running" from each dependency. Then it clears "running.dependencies".

export function createSignal<T>(value: T) {
    const subscribers: Set<Running> = new Set();
    // Declares a constant named "subscribers" with a type of a Set of "Running" objects. It is initialized as an empty Set.

    const getter = () => {
        const running = context[context.length - 1];
        if (running) subscribe(running, subscribers)
        return value;
    };
    // Declares a constant named "getter" which is a function. It checks the last item in "context" array and if it exists, it calls "subscribe" function with "running" and "subscribers" as arguments. Then it returns the value.

    const setter = (newValue: T) => {
        value = newValue;
        for (const sub of [...subscribers]) {
            sub.execute();
        }
    };
    // Declares a constant named "setter" which is a function. It assigns "newValue" to "value" and then iterates over "subscribers" and calls the "execute" method of each listener.

    return [getter, setter] as const;
    // Returns an array containing "getter" and "setter" as a tuple.
}

export function createEffect(fn: () => void) {
    const execute = () => {
        cleanup(running);
        context.push(running);
        try {
            fn()
        } finally {
            context.pop
        }
    }
    // Declares a constant named "execute" which is a function. It calls the "cleanup" function with "running" as an argument, pushes "running" to "context" array, executes the "fn" function, and pops the last item from "context" array in the "finally" block.

    const running: Running = {
        execute,
        dependencies: new Set()
    }
    // Declares a constant named "running" with a type of "Running" object. It has properties "execute" and "dependencies". "execute" is assigned the "execute" function and "dependencies" is initialized as an empty Set.

    execute();
    // Calls the "execute" function.
    console.log(running, context, execute);
}
