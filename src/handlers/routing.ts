type RouteCallback = () => void;

class Router {
    /**
     * Class to handle routing
     * 
     * @constructor
     */
    private routes: { [key: string]: RouteCallback };
    private currentPath: string = window.location.pathname;
    private previousPath: string | null = null;
    constructor() {
        /**
         * Stores all registered routes
         */
        this.routes = {}

        /**
         * Current URL pathname
         */
        this.currentPath = window.location.pathname;

        /**
         * Previous URL pathname
         */
        this.previousPath = null;

        /**
         * Event listener for the popstate event
         */
        const handlePopstate = this.handlePopstate.bind(this);
        /**
         * Event listener for the click event
         */
        const handleClick = this.handleClick.bind(this);

        /**
         * Add popstate event listener to the window
         */
        window.addEventListener('popstate', handlePopstate);
        /**
         * Add click event listener to the window
         */
        window.addEventListener('click', handleClick);

        this.handleRoute();
    }

    on(path: string, callback: RouteCallback) {
        this.routes[path] = callback;
    }

    navigateTo(path: string): void {
        history.pushState({}, '', path);
        this.handleRoute();
    }

    handlePopstate() {
        this.handleRoute();
    }

    /**
     * Handles the click event and prevents default behavior for anchor elements.
     *
     * @param {Event} e - The click event
     * @return {void} 
     */
    handleClick(e: Event): void {
        // if the target is an anchor element -- and--  it has a href attribute, prevent default behavior and navigate to the href
        if (e.target instanceof HTMLAnchorElement && e.target.href) {
            e.preventDefault();
            this.navigateTo(e.target.href as string);
        }
    }

    /**
     * Handles the route change.
     *
     * If the route exists in the registered routes, it calls the callback function.
     * Otherwise it logs a 404 error message to the console.
     */
    handleRoute() {
        const currentPath = window.location.pathname as string;

        // If the current path is the same as the previous one, do nothing
        if (this.currentPath === currentPath) {
            return;
        }

        // Update the previous and current path
        this.previousPath = this.currentPath;
        this.currentPath = currentPath;

        // Get the callback function for the current path
        const callback = this.routes[currentPath];

        // If the route exists, call its callback function
        if (callback) {
            callback();
        } else {
            // Otherwise log a 404 error
            console.error("404: ", currentPath);
        }
    }

}

export const router = new Router();
// router.on('/', () => {
//     console.log('Home Page');
// });

// router.on('/about', () => {
//     console.log('About Page');
// });

// router.on('/contact', () => {
//     console.log('Contact Page');
// });

// router.on('*', () => {
//     console.log('404 Page');
// });
