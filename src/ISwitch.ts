import { TNonFunction, TPredicateFunction } from "./TPredicateFunction";
import { Unpack } from "./Unpack";

/**
 * @interface ISwitch
 */
export interface ISwitch<T, K> {
  /**
   * Define predicate to be matched against and the value to be returned in case of matching.
   */
  case<N>(pred: TNonFunction<T>, value: N): ISwitch<T, [Unpack<K>, N]>;

  /**
   * Define predicate function to be executed against Switch state and the value to be
   * returned in case of matching.
   */
  case<N>(pred: TPredicateFunction<T>, value: N): ISwitch<T, [Unpack<K>, N]>;

  /**
   * Define the value to be returned in case none of the cases was matched.
   */
  default<N>(defaultValue: N): Unpack<K> | N;
}
