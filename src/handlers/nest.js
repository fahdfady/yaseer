export function nest(parent, children) {
    if (Array.isArray(children)) {
        for (const child of children) {
            if (Array.isArray(child)) {
                for (const nestedChild of child) {
                    parent.appendChild(nestedChild);
                }
            }
            else {
                parent.appendChild(child);
            }
        }
    }
    else {
        parent.appendChild(children);
    }
    return parent;
}
