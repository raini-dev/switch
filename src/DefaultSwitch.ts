import { ISwitch } from "./ISwitch";
import { Switch as SwitchClass } from "./Switch";

/**
 * Pointer interface for lifting value provided as an argument to Switch.
 */
export default function Switch<T, K = []>(x: T): ISwitch<T, K extends [] ? K : [K]> {
  return SwitchClass.for<T, K>(x);
}
