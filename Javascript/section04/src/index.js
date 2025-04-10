import mul, { add, sub } from "./math.js";
import color from "randomcolor";

console.log(add(1, 2));
console.log(sub(4, 3));
console.log(mul(4, 3));

const colors = color();
console.log(colors);