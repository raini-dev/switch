import { Switch } from "./src";

export * from "./src";

/**
 * Pointer interface for lifting value provided as an argument to Switch.
 */
export default function<T, K>(x: T) {
  return Switch.for<T, K>(x);
}
