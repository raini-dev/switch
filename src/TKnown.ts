/**
 * Returns the second type if the first type extends unknown.
 */
export type TKnown<T, K> = never extends T ? K : T;
