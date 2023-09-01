function factorial(number) {
  var value = number;
  for (var i = number; i > 1; i--) value *= i - 1;
  return value;
}
function combination(n, d) {
  if (n == d) return 1;
  return factorial(n) / (factorial(d) * factorial(n - d));
}
const calculateMultiplier = (m, d) => {
  const n = 25,
    x = 25 - m;
  const first = combination(n, d);
  const second = combination(x, d);
  const result = 0.99 * (first / second);
  return Math.round(result * 100) / 100;
};
export default calculateMultiplier;
