import { Locator, expect } from "fixtures";

export function hasText(element: Locator) {
    expect(element).not.toBe("");
    expect(element).not.toBeNull();
    expect(element).not.toBeUndefined();
}

export function isNotUndefinedOrNull<T>(element: T) {
    expect(element).not.toBeNull();
    expect(element).not.toBeUndefined();
}
