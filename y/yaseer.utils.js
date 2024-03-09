var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("handlers/nest", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nest = void 0;
    //nest maximum children is 2 nested element --- so if you want to nest again you have to call nest again in your nest function
    function nest(parent, children) {
        if (Array.isArray(children)) {
            for (const child of children) {
                if (Array.isArray(child)) {
                    for (const nestedChild of child) {
                        parent.appendChild(nestedChild);
                    }
                }
                else {
                    parent.appendChild(child);
                }
            }
        }
        else {
            parent.appendChild(children);
        }
        return parent; // Always return the parent HTMLElement
    }
    exports.nest = nest;
});
define("handlers/ddom", ["require", "exports", "handlers/nest"], function (require, exports, nest_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderAppDDOM = exports.template = void 0;
    function template(tag, props, text) {
        let element;
        function getElement() {
            if (!element) {
                element = document.createElement(tag);
                for (const propKey in props) {
                    const propValue = props[propKey];
                    if (propKey.startsWith("on") && typeof propValue === "function") {
                        console.log("somoeone help me", propKey, propValue);
                        // Set the event handler directly without a template literal
                        element.addEventListener(propKey.substring(2), propValue);
                    }
                    else {
                        //@ts-ignore
                        element.setAttribute(propKey, propValue);
                    }
                }
            }
            if (text) {
                element.textContent = `${text}`;
            }
            return element;
        }
        return getElement();
    }
    exports.template = template;
    function renderAppDDOM(root, containerElement) {
        root && (0, nest_js_1.nest)(root, containerElement);
    }
    exports.renderAppDDOM = renderAppDDOM;
});
define("handlers/reactivity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createEffect = exports.createSignal = void 0;
    const context = [];
    // Declares a constant named "context" with a type of an array of "Running" objects. It is initialized as an empty array.
    function subscribe(running, subscribers) {
        subscribers.add(running);
        running.dependencies.add(subscribers);
    }
    // Defines a function named "subscribe" that takes two arguments: "running" and "subscribers". It adds "running" to "subscribers" and adds "subscribers" to "running.dependencies".
    function cleanup(running) {
        for (const dep of running.dependencies) {
            dep.delete(running);
        }
        running.dependencies.clear();
    }
    // Defines a function named "cleanup" that takes one argument: "running". It iterates over "running.dependencies" and removes "running" from each dependency. Then it clears "running.dependencies".
    function createSignal(value) {
        const subscribers = new Set();
        // Declares a constant named "subscribers" with a type of a Set of "Running" objects. It is initialized as an empty Set.
        const getter = () => {
            const running = context[context.length - 1];
            if (running)
                subscribe(running, subscribers);
            return value;
        };
        // Declares a constant named "getter" which is a function. It checks the last item in "context" array and if it exists, it calls "subscribe" function with "running" and "subscribers" as arguments. Then it returns the value.
        const setter = (newValue) => {
            value = newValue;
            for (const sub of [...subscribers]) {
                sub.execute();
            }
        };
        // Declares a constant named "setter" which is a function. It assigns "newValue" to "value" and then iterates over "subscribers" and calls the "execute" method of each listener.
        return [getter, setter];
        // Returns an array containing "getter" and "setter" as a tuple.
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
        // Declares a constant named "execute" which is a function. It calls the "cleanup" function with "running" as an argument, pushes "running" to "context" array, executes the "fn" function, and pops the last item from "context" array in the "finally" block.
        const running = {
            execute,
            dependencies: new Set()
        };
        // Declares a constant named "running" with a type of "Running" object. It has properties "execute" and "dependencies". "execute" is assigned the "execute" function and "dependencies" is initialized as an empty Set.
        execute();
        // Calls the "execute" function.
        console.log(running, context, execute);
    }
    exports.createEffect = createEffect;
});
define("handlers/vdom", ["require", "exports", "handlers/nest"], function (require, exports, nest_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderAppVDOM = exports.h = void 0;
    // takes 1 node ==> converts it to HTML
    function renderNode(vnode) {
        // create the HTML tag
        const el = document.createElement(vnode.tag);
        // iterate on each prop and add it as Key and Value into the HTML element
        for (const [key, value] of Object.entries(vnode.props)) {
            el.setAttribute(key, value);
        }
        // if the children is a single string add it as a text in the HTML tag
        if (typeof vnode.children === "string") {
            el.textContent = vnode.children;
        }
        // else (the children is an array of VNodes) ==> iterate on each VNode and recursivley render them until we finish them and their nested children
        else {
            for (const child of vnode.children) {
                (0, nest_js_2.nest)(el, renderNode(child));
            }
        }
        return el;
    }
    // hypescript render pattern https://www.patterns.dev/vue/render-functions/#:~:text=h%20is%20short%20for%20hyperscript,subsequently%20render%20on%20the%20page.     takes the vnode and return a vnode
    function h(tag, props, children) {
        return {
            tag,
            props,
            children
        };
    }
    exports.h = h;
    function renderAppVDOM(app, fn) {
        app && (0, nest_js_2.nest)(app, renderNode(fn));
    }
    exports.renderAppVDOM = renderAppVDOM;
});
define("index", ["require", "exports", "handlers/ddom", "handlers/nest", "handlers/reactivity", "handlers/vdom"], function (require, exports, ddom_js_1, nest_js_3, reactivity_js_1, vdom_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(ddom_js_1, exports);
    __exportStar(nest_js_3, exports);
    __exportStar(reactivity_js_1, exports);
    __exportStar(vdom_js_1, exports);
    function test() {
        console.log("test");
    }
});
