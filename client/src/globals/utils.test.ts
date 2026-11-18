import { describe, expect, it } from "vitest";
import { cx, readStored, writeStored } from "./utils";

describe("cx", () => {
  it("joins truthy class names", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("browser storage", () => {
  it("falls back when storage is unavailable", () => {
    // Vitest runs in Node: no window, so reads fall back and writes are no-ops.
    expect(() => writeStored("local", "x", 1)).not.toThrow();
    expect(readStored("local", "x", "fallback")).toBe("fallback");
  });
});
