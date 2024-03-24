type RouteCallback = () => void;
declare class Router {
    private routes;
    private currentPath;
    private previousPath;
    constructor();
    on(path: string, callback: RouteCallback): void;
    navigateTo(path: string): void;
    handlePopstate(): void;
    handleClick(e: MouseEvent): void;
    handleRoute(): void;
}
export declare const router: Router;
export {};
