//nest maximum children is 2 nested element --- so if you want to nest again you have to call nest again in your nest function
export function nest(parent: HTMLElement, children: HTMLElement | (HTMLElement | HTMLElement[])[]): HTMLElement {
    if (Array.isArray(children)) {
        for (const child of children) {
            if (Array.isArray(child)) {
                for (const nestedChild of child) {
                    parent.appendChild(nestedChild);
                }
            } else {
                parent.appendChild(child);
            }
        }
    }
    else {
        parent.appendChild(children);
    }
    return parent; // Always return the parent HTMLElement
}