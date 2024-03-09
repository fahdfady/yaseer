declare module "handlers/nest" {
    export function nest(parent: HTMLElement, children: HTMLElement | (HTMLElement | HTMLElement[])[]): HTMLElement;
}
declare module "handlers/ddom" {
    export function template(tag: string, props?: Record<string, string | Function>, text?: string): HTMLElement;
    export function renderAppDDOM(root: HTMLElement, containerElement: HTMLElement): void;
}
declare module "handlers/reactivity" {
    export function createSignal<T>(value: T): readonly [() => T, (newValue: T) => void];
    export function createEffect(fn: () => void): void;
}
declare module "handlers/vdom" {
    type VNode = {
        tag: string;
        props: Record<string, any>;
        children: VNode[] | string;
    };
    export function h(tag: string, props: Record<string, any>, children: VNode[] | string): VNode;
    export function renderAppVDOM(app: HTMLElement, fn: VNode): void;
}
declare module "index" {
    export * from "handlers/ddom";
    export * from "handlers/nest";
    export * from "handlers/reactivity";
    export * from "handlers/vdom";
}
