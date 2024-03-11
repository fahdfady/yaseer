export declare function createSignal<T>(value: T): readonly [() => T, (newValue: T) => void];
export declare function createEffect(fn: () => void): void;
