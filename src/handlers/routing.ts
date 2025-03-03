type RouteCallback = () => void;
type RouteGuard = (to: Route, from: Route) => boolean | Promise<boolean>;
type RouteParams = { [key: string]: string };

interface Route {
    path: string;
    callback: RouteCallback;
    guards?: RouteGuard[];
    params?: RouteParams;
    query?: URLSearchParams;
}

class Router {
    /**
     * Class to handle routing
     * 
     * @constructor
     */
    private routes: Map<string, Route>;
    private currentPath: string;
    private previousPath: string | null;
    private wildcardRoute?: Route;
    
    constructor() {
        /**
         * Stores all registered routes
         */
        this.routes = new Map();

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

    /**
     * Register a route with optional guards
     */
    on(path: string, callback: RouteCallback, guards?: RouteGuard[]) {
        if (path === '*') {
            this.wildcardRoute = { path, callback, guards };
            return;
        }

        this.routes.set(path, { path, callback, guards });
    }

    /**
     * Navigate to a path with optional query parameters
     */
    async navigateTo(path: string, query?: Record<string, string>): Promise<void> {
        let url = path;
        if (query) {
            const searchParams = new URLSearchParams(query);
            url = `${path}?${searchParams.toString()}`;
        }
        
        history.pushState({}, '', url);
        await this.handleRoute();
    }

    private handlePopstate() {
        this.handleRoute();
    }

    /**
     * Handles the click event and prevents default behavior for anchor elements.
     *
     * @param {Event} e - The click event
     * @return {void} 
     */
    private handleClick(e: Event): void {
        // if the target is an anchor element -- and--  it has a href attribute, prevent default behavior and navigate to the href
        if (e.target instanceof HTMLAnchorElement && e.target.href) {
            e.preventDefault();
            const url = new URL(e.target.href);
            this.navigateTo(url.pathname, Object.fromEntries(url.searchParams));
        }
    }

    /**
     * Match route patterns like /users/:id
     */
    private matchRoute(pathname: string): Route | undefined {
        // First try exact match
        if (this.routes.has(pathname)) {
            return this.routes.get(pathname);
        }

        // Then try pattern matching
        for (const [pattern, route] of this.routes) {
            if (pattern.includes(':')) {
                const patternParts = pattern.split('/');
                const pathParts = pathname.split('/');

                if (patternParts.length === pathParts.length) {
                    const params: RouteParams = {};
                    let matches = true;

                    for (let i = 0; i < patternParts.length; i++) {
                        if (patternParts[i].startsWith(':')) {
                            params[patternParts[i].slice(1)] = pathParts[i];
                        } else if (patternParts[i] !== pathParts[i]) {
                            matches = false;
                            break;
                        }
                    }

                    if (matches) {
                        return { ...route, params };
                    }
                }
            }
        }

        return this.wildcardRoute;
    }

    /**
     * Handle route changes with guards and params
     */
    private async handleRoute(): Promise<void> {
        const url = new URL(window.location.href);
        const currentPath = url.pathname;

        if (this.currentPath === currentPath) {
            return;
        }

        const route = this.matchRoute(currentPath);
        if (!route) {
            console.error("404: ", currentPath);
            return;
        }

        // Check route guards
        if (route.guards) {
            const fromRoute = this.matchRoute(this.currentPath);
            for (const guard of route.guards) {
                const canProceed = await guard(route, fromRoute!);
                if (!canProceed) {
                    history.back();
                    return;
                }
            }
        }

        // Update paths
        this.previousPath = this.currentPath;
        this.currentPath = currentPath;

        // Add query parameters to route
        route.query = url.searchParams;

        // Execute route callback
        route.callback();
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
