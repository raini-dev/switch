import { TNonFunction, TPredicateFunction } from "./TPredicateFunction";
import { TKnown } from "./TKnown";

/**
 * ISwitch for cases when K is defined.
 * @type TDefinedSwitch
 */
export type TDefinedSwitch<T, K, N> = ISwitch<T, TKnown<K, N>>;

/**
 * @interface ISwitch
 */
export interface ISwitch<T, K> {
  /**
   * Define predicate to be matched against and the value to be returned in case of matching.
   */
  case<N>(pred: TNonFunction<T>, value: TKnown<K, N>): TDefinedSwitch<T, K, N>;

  /**
   * Define predicate function to be executed against Switch state and the value to be
   * returned in case of matching.
   */
  case<N>(pred: TPredicateFunction<T>, value: TKnown<K, N>): TDefinedSwitch<T, K, N>;

  /**
   * Define the value to be returned in case none of the cases was matched.
   */
  default<N>(defaultValue: N): K | N;
}
