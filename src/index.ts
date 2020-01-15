import { Switch } from "./Switch";

export * from "./ISwitch";
export * from "./Switch";
export * from "./TKnown";
export * from "./TPredicateFunction";

/**
 * Pointer interface for lifting value provided as an argument to Switch.
 */
export default function<T, K extends any[]>(x: T) {
  return Switch.for<T, K>(x);
}
