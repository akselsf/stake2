const getMultiPlierXPos = (x, size) => {
  console.log(x);
  if (size == 16) {
    if (x == 0 || x == 16) {
      return 1000;
    } else if (x == 1 || x == 15) {
      return 130;
    } else if (x == 2 || x == 14) {
      return 26;
    } else if (x == 3 || x == 13) {
      return 9;
    } else if (x == 4 || x == 12) {
      return 4;
    } else if (x == 5 || x == 11) {
      return 2;
    } else if (x == 6 || x == 10) {
      return 1.5;
    } else {
      return 0.2;
    }
  }
  return 0;
};

export default getMultiPlierXPos;
