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



/**
 * Render a DDOM app by replacing the content of a root element with new content
 * @param root The root element to update
 * @param containerElement The new elements to use for the content of the root element
 * Before updating the content, iterate over the existing elements and store their event listeners in a data attribute.
 *Update the content of the root element.
 *After updating the content, reattach the event listeners from the stored data attribute to the corresponding elements in the new content.
 */
export function renderAppDDOM(root: HTMLElement, containerElement: HTMLElement | HTMLElement[]): void {
    let elements: HTMLElement[];

    if (Array.isArray(containerElement)) {
        elements = containerElement;
    } else {
        elements = [containerElement];
    }

    // Store event listeners before updating content .. manually transferring the event listeners from the old elements to the new elements before replacing the content. This way, the event listeners will be preserved even after the content is updated.
    const eventListenersMap = new Map<HTMLElement, Map<string, EventListener>>(); // Map of elements to their event listeners
    elements.forEach(element => {
        const eventListeners = new Map<string, EventListener>(); // Map of event listener names to their functions
        element.getAttributeNames().forEach(attr => {
            if (attr.startsWith('on')) {
                const eventName = attr.slice(2); // Remove "on" from the attribute name to get the event name
                const eventListener = element.getAttribute(attr); // Get the event listener function from the attribute
                if (eventName && eventListener) {
                    eventListeners.set(eventName, new Function(eventListener) as EventListener); // Set the event listener function
                    element.removeAttribute(attr); // Remove the event listener attribute from the element
                }
            }
        });
        eventListenersMap.set(element, eventListeners); // Add the element and its event listeners to the map
    });

    // Update content
    root.innerHTML = ''; // Clear the root element before adding new content
    elements.forEach(element => {
        root.appendChild(element);
    });

    // Reattach event listeners
    eventListenersMap.forEach((eventListeners, element) => {
        eventListeners.forEach((listener, eventName) => {
            element.addEventListener(eventName, listener); // Add the event listener back to the element
        });
    });
}