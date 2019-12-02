/**
 * Type guard for disallowing provision of functions to the Switch as a predicate.
 */
export type TNonFunction<T> = T extends Function ? never : T;

/**
 * Type guard for disallowing provision of non-predicate functions to the Switch as a predicate.
 * Predicate functions MUST accept Switch state type and return a boolean.
 */
export type TPredicateFunction<T> = (x: T) => boolean;
