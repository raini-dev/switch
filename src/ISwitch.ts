import { TNonFunction, TPredicateFunction } from "./TPredicateFunction";
import { Unpack } from "./Unpack";

/**
 * @interface ISwitch
 */
export interface ISwitch<T, K> {
  /**
   * Define predicate to be matched against and the value to be returned in case of matching.
   */
  case<N>(predicate: TNonFunction<T>, value: N): ISwitch<T, [Unpack<K>, N]>;

  /**
   * Define predicate function to be executed against Switch state and the value to be
   * returned in case of matching.
   */
  case<N>(predicateFunction: TPredicateFunction<T>, value: N): ISwitch<T, [Unpack<K>, N]>;

  /**
   * Define the value to be returned in case none of the cases was matched.
   */
  default<V>(defaultValue: V): ISwitch<V, Unpack<K>>;

  map<N>(f: (x: T) => N): ISwitch<N, Unpack<K>>;

  fold<N>(f: (x: T) => N): N;

  ap<N extends (x: T) => any>(
    x: ISwitch<N, []>,
  ): ISwitch<N extends (x: T) => infer R ? R : never, Unpack<K>>;
}
