export = {};
declare global {
    interface Running {
        execute: () => void;
        dependencies: Set<Set<() => void>>;
    }
}