import { nest } from "./nest.js";

export function template(tag: string, props?: Record<string, string | Function>, text?: string): HTMLElement {
    let element: HTMLElement;

    function getElement() {
        if (!element) {
            element = document.createElement(tag);

            for (const propKey in props) {
                const propValue = props[propKey];

                if (propKey.startsWith("on") && typeof propValue === "function") {
                    console.log("somoeone help me", propKey, propValue)
                    // Set the event handler directly without a template literal
                    element.addEventListener(propKey.substring(2), propValue as EventListener);
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


export function renderAppDDOM(root: HTMLElement, containerElement: HTMLElement | HTMLElement[]): void {
    let elements: string[];

    if (Array.isArray(containerElement)) {
        elements = containerElement.map(child => child.outerHTML);
    }
    else {
        elements = [containerElement.outerHTML];
    }

    root.innerHTML = elements.join('');
}
