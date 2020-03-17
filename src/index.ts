import DefaultSwitch from "./DefaultSwitch";

export * from "./ISwitch";
export * from "./Switch";
export * from "./Unpack";
export * from "./TPredicateFunction";
export * from "./DefaultSwitch";



const a = DefaultSwitch('a')
.case('b', false)
.case('c', false)
.case('d', false)
.case('a', true)
.default(false);

console.log(a);
