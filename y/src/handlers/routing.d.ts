declare global {
    interface Window {
        route: (e: any) => void;
    }
}
export declare const routes: Record<string | number, string>;
export declare const Link: (route: string, text: string) => HTMLAnchorElement;
