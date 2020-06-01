import { Node } from "./Node";
import { Schema, isDropAllowed } from "./Schema";

enum Type {
  a,
  b,
  c,
}

describe("Schema", function () {
  test("by rules", () => {
    const schema: Schema = {
      rules: { [Type.a]: [Type.a, Type.b], [Type.b]: [] },
    };
    const a: Node = {
      id: 1,
      type: Type.a,
    };
    const b: Node = {
      id: 2,
      type: Type.b,
    };
    const c: Node = {
      id: 3,
      type: Type.c,
    };

    //a dropped into b
    expect(isDropAllowed(a, b, schema)).toBe(false);

    //b dropped into a
    expect(isDropAllowed(b, a, schema)).toBe(true);

    //a dropped into c
    expect(isDropAllowed(a, c, schema)).toBe(true);
  });

  test("by function", () => {
    const schema: Schema = {
      isDropAllowed: (a, b) => true,
      rules: { [Type.b]: [] },
    };
    const a: Node = {
      id: 1,
      type: Type.a,
    };
    const b: Node = {
      id: 2,
      type: Type.b,
    };
    const c: Node = {
      id: 3,
      type: Type.c,
    };

    //a dropped into b
    expect(isDropAllowed(a, b, schema)).toBe(false);

    //b dropped into a
    expect(isDropAllowed(a, c, schema)).toBe(true);

    schema.isDropAllowed = () => false;

    //b dropped into a
    expect(isDropAllowed(a, c, schema)).toBe(false);
  });
});
