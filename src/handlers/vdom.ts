import { nest } from "./nest.js";

type VNode = {
    tag: string;
    props: Record<string, any>;
    children: VNode[] | string;
}

// takes 1 node ==> converts it to HTML
function renderNode(vnode: VNode): HTMLElement {
    // create the HTML tag
    const el = document.createElement(vnode.tag);

    // iterate on each prop and add it as Key and Value into the HTML element
    for (const [key, value] of Object.entries(vnode.props)) {
        el.setAttribute(key, value);
    }

    // if the children is a single string add it as a text in the HTML tag
    if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
    }

    // else (the children is an array of VNodes) ==> iterate on each VNode and recursivley render them until we finish them and their nested children
    else {
        for (const child of vnode.children) {
            nest(el, renderNode(child))
        }
    }

    return el;
}


// hypescript render pattern https://www.patterns.dev/vue/render-functions/#:~:text=h%20is%20short%20for%20hyperscript,subsequently%20render%20on%20the%20page.     takes the vnode and return a vnode
export function h(tag: string, props: Record<string, any>, children: VNode[] | string): VNode {
    return {
        tag,
        props,
        children
    }
}

export function renderAppVDOM(app: HTMLElement, fn: VNode): void {
    app && nest(app, renderNode(fn));
}