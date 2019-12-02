import match, { Switch } from "../src";

describe("Switch", () => {
  it("should exist", () => {
    expect(Switch).not.toBe(undefined);
  });

  describe("Switch.for", () => {
    it("should create an instance of Switch", () => {
      expect(Switch.for("")).toBeInstanceOf(Switch);
    });
  });

  describe("case/default", () => {
    it("should defer execution until default is called", () => {
      expect(match("asdf").case("", () => 123)).toBeInstanceOf(Switch);
    });

    it("should return value if matched by equation", () => {
      expect(
        match("")
          .case("", 123)
          .default(345),
      ).toEqual(123);
    });

    it("should return value if matched by predicate function", () => {
      expect(
        match("asdf")
          .case(x => x == "asdf", 123)
          .default(345),
      ).toEqual(123);
    });

    it("should return default value if not matched", () => {
      expect(
        match("asdf")
          .case("", 123)
          .default(234),
      ).toEqual(234);
    });

    it("should preserve the first match and its value", () => {
      expect(
        match("asdf")
          .case("asdf", 123)
          .case("asdf", 234)
          .default(345),
      ).toEqual(123);
    });
  });
});
