const getChanceHilo = (card) => {
  let lower = 0;
  let higher = 0;

  if (card == 1) {
    lower = 1 / 13;
    higher = 12 / 13;
  } else if (card == 13) {
    lower = 12 / 13;
    higher = 1 / 13;
  } else {
    lower = card / 13;
    higher = (13 - card + 1) / 13;
  }

  lower = lower.toString().substring(0, 6);
  higher = higher.toString().substring(0, 6);

  return {
    lower: lower,
    higher: higher,
  };
};
export default getChanceHilo;
