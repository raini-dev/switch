import { TNonFunction, TPredicateFunction } from "./TPredicateFunction";
import { ISwitch, TDefinedSwitch } from "./ISwitch";
import { TKnown } from "./TKnown";

class SwitchMatched<T, K> implements ISwitch<T, K> {
  public static for<T>(x: T): any {
    return new SwitchMatched(x);
  }

  public constructor(private x: T) {}

  public case(): any {
    return SwitchMatched.for(this.x);
  }

  public default(): any {
    return this.x;
  }
}

/**
 * Switch resembles imperative switch statement using functions.
 *
 * Internally, Switch behaves like Either in the sense that it preserves the position of Right
 * until it successfully matches case predicate (either function or value). If matching happens,
 * Switch becomes a kind of Left and holds the value until it reaches the .default call. If
 * matching didn't happen for all cases, the value of the .default argument is returned instead.
 */
export class Switch<T, K> implements ISwitch<T, K> {
  /**
   * Pointer interface for lifting a value into Switch.
   */
  public static for<T, K>(x: T): ISwitch<T, K> {
    return new Switch<T, K>(x);
  }

  /**
   * @constructor
   */
  constructor(private x: T) {}

  /**
   * Define predicate to be matched against and the value to be returned in case of matching.
   */
  public case<N>(pred: TNonFunction<T>, value: TKnown<K, N>): TDefinedSwitch<T, K, N>;

  /**
   * Define predicate function to be executed against Switch state and the value to be
   * returned in case of matching.
   */
  public case<N>(pred: TPredicateFunction<T>, res: TKnown<K, N>): TDefinedSwitch<T, K, N>;
  public case<N>(pred: any, res: TKnown<K, N>): TDefinedSwitch<T, K, N> {
    const check = typeof pred == "function" ? pred(this.x) : pred === this.x;

    return check ? SwitchMatched.for(res) : Switch.for(this.x);
  }

  /**
   * Define the value to be returned in case none of the cases was matched.
   */
  public default<V>(defaultValue: V): K | V {
    return defaultValue;
  }
}