const getmultiplierhilo = (card, option) => {
  if (option == "") return 1;
  const multipliers = {
    1: {
      low: 12.87,
      high: 1.073,
    },
    2: {
      low: 6.435,
      high: 1.073,
    },
    3: {
      low: 4.29,
      high: 1.17,
    },
    4: {
      low: 3.217,
      high: 1.287,
    },
    5: {
      low: 2.574,
      high: 1.43,
    },
    6: {
      low: 2.145,
      high: 1.609,
    },
    7: {
      low: 1.839,
      high: 1.839,
    },
    8: {
      low: 1.609,
      high: 2.145,
    },
    9: {
      low: 1.43,
      high: 2.574,
    },
    10: {
      low: 1.287,
      high: 3.217,
    },
    11: {
      low: 1.17,
      high: 12.87,
    },
    12: {
      low: 1.073,
      high: 6.435,
    },
    13: {
      low: 1.073,
      high: 12.87,
    },
  };
  if (option == "lower") {
    return multipliers[card].low;
  } else if (option == "higher") {
    return multipliers[card].high;
  }
  return 1;
};

export default getmultiplierhilo;
