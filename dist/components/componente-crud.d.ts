import type { Components, JSX } from "../types/components";

interface ComponenteCrud extends Components.ComponenteCrud, HTMLElement {}
export const ComponenteCrud: {
    prototype: ComponenteCrud;
    new (): ComponenteCrud;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
