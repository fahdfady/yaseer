"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAppDDOM = exports.template = void 0;
const nest_js_1 = require("./nest.js");
function template(tag, props, text) {
    let element;
    function getElement() {
        if (!element) {
            element = document.createElement(tag);
            for (const propKey in props) {
                const propValue = props[propKey];
                if (propKey.startsWith("on") && typeof propValue === "function") {
                    console.log("somoeone help me", propKey, propValue);
                    element.addEventListener(propKey.substring(2), propValue);
                }
                else {
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
