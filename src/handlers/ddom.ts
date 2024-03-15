/**
 * Creates an HTML element with the specified tag, properties, and text content.
 * @param tag - The tag name of the HTML element.
 * @param props - Optional properties to set on the HTML element.
 * @param text - Optional text content of the HTML element.
 * @returns The created HTML element.
 */
export function template(tag: string, props?: Record<string, string | Function>, text?: string): HTMLElement {
    let element: HTMLElement;

    /**
     * Retrieves or creates the HTML element based on the provided tag, properties, and text content.
     * @returns The HTML element.
     */
    function getElement(): HTMLElement {
        if (!element) {
            element = document.createElement(tag);

            for (const propKey in props) {
                const propValue = props[propKey];

                if (propKey.startsWith("on") && typeof propValue === "function") {
                    // Set the event handler directly without a template literal
                    element.addEventListener(propKey.substring(2), propValue as EventListener);
                } else {
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


export function renderAppDDOM(root: HTMLElement, containerElement: HTMLElement): void {
    root.appendChild(containerElement);
}
