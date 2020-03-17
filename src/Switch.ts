import { TNonFunction, TPredicateFunction } from "./TPredicateFunction";
import { ISwitch } from "./ISwitch";
import { Unpack } from "./Unpack";

class SwitchMatched<T, K> implements ISwitch<T, K> {
  /**
   * @deprecated
   */
  public static for<T>(x: T): any {
    return new SwitchMatched(x);
  }

  public static of<T>(x: T): any {
    return new SwitchMatched(x);
  }

  public constructor(private x: T) {}

  public case(): any {
    return SwitchMatched.for(this.x);
  }

  public default(): any {
    return this.case();
  }

  public fold<N>(f: (x: T) => N): N {
    return f(this.x);
  }

  public map<N>(f: (x: T) => N): ISwitch<N, Unpack<K>> {
    return SwitchMatched.for(f(this.x));
  }

  public ap<N extends (x: T) => any>(
    o: ISwitch<N, []>,
  ): ISwitch<N extends (x: T) => infer R ? R : never, Unpack<K>> {
    return SwitchMatched.for(this.fold(o.fold(x => x)));
  }
}

/**
 * Switch resembles imperative switch statement using chaining.
 *
 * Internally, Switch behaves like Either in the sense that it preserves the position of Right
 * until it successfully matches case predicate (either function or value). If matching happens,
 * Switch becomes a kind of Left and holds the value until it reaches the .default call. If
 * matching didn't happen for all cases, the value of the .default argument is returned instead.
 */
export class Switch<T, K extends any[]> implements ISwitch<T, K> {
  /**
   * Pointer interface for lifting a value into Switch.
   * @deprecated
   */
  public static for<T, K = []>(x: T): ISwitch<T, K extends [] ? K : [K]> {
    return new Switch<T, K extends [] ? K : [K]>(x);
  }

  public static of<T, K = []>(x: T): ISwitch<T, K extends [] ? K : [K]> {
    return new Switch<T, K extends [] ? K : [K]>(x);
  }

  /**
   * @constructor
   */
  constructor(private x: T) {}

  /**
   * Define predicate to be matched against and the value to be returned in case of matching.
   */
  public case<N>(pred: TNonFunction<T>, value: N): ISwitch<T, [Unpack<K>, N]>;

  /**
   * Define predicate function to be executed against Switch state and the value to be
   * returned in case of matching.
   */
  public case<N>(pred: TPredicateFunction<T>, value: N): ISwitch<T, [Unpack<K>, N]>;
  public case<N>(pred: any, value: N): ISwitch<T, [Unpack<K>, N]> {
    const check = typeof pred == "function" ? pred(this.x) : pred === this.x;

    return check ? SwitchMatched.for(value) : Switch.for(this.x);
  }

  /**
   * Define the value to be returned in case none of the cases was matched.
   */
  public default<V>(defaultValue: V): ISwitch<V, Unpack<K>> {
    return Switch.for(defaultValue);
  }

  public fold<N>(f: (x: T) => N): N {
    return f(this.x);
  }

  public map<N>(f: (x: T) => N): ISwitch<N, Unpack<K>> {
    return (Switch.for(f(this.x)) as unknown) as ISwitch<N, Unpack<K>>;
  }

  public ap<N extends (x: T) => any>(
    o: ISwitch<N, []>,
  ): ISwitch<N extends (x: T) => infer R ? R : never, Unpack<K>> {
    return Switch.for(this.fold(o.fold(x => x)));
  }
}
