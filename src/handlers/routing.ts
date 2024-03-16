declare global {
    interface Window {
        route: (e: any) => void;
    }
}

/**
 * Handles routing by updating the browser's history and calling the `handleLocation` function.
 * @param e - The event object.
 */
const Route = (e: any) => {
    e = e || window.event;
    e.preventDefault();

    window.history.pushState({}, '', e.target.href);
    handleLocation();
}

export const routes: Record<string | number, string> = {
    // 404: '/404',
    // '/': 'Home',
    // '/about': 'About',
    // '/contact': 'Contact'
}

/**
 * Creates a link element and appends it to the document body.
 * @param route - The URL route for the link.
 * @param text - The text to be displayed for the link.
 */
export const Link = (route: string, text: string) => {
    const a = document.createElement('a'); // Create the anchor element
    a.href = route; // Set the href attribute

    // Add the text to the anchor element
    const linkText = document.createTextNode(text);
    a.appendChild(linkText);

    // Append the anchor element to the document body
    document.body.appendChild(a);
    return a;
}

/**
 * Handles the current location by fetching the corresponding route and updating the HTML content.
 * @returns {Promise<void>} A promise that resolves when the HTML content is updated.
 */
const handleLocation = async (): Promise<void> => {
    console.log("handleLocationTEST")
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const modulePath = `./pages/${route}`;
    console.log(modulePath)
    try {
        const module = await import(modulePath);
        if (typeof module.default === 'function') {
            module.default();
        } else {
            console.error(`Module '${modulePath}' does not have a default export function.`);
        }
    } catch (error) {
        console.error(`Failed to import module '${modulePath}':`, error);
    }
    console.log("handleLocationTEST22222")
}
window.onpopstate = handleLocation;
console.log("Routing loaded.")

window.route = Route; // Expose the route function to the window object