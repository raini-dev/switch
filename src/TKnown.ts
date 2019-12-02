type TIsKnown<X, Y> = X extends unknown ? Y : X;

/**
 * Returns the second type if the first type extends unknown.
 * @type TIsKnown
 */
export type TKnown<T, K> = T extends TIsKnown<T, K> ? T : K;
