class Converter {
  toHex(rgb) {
    if (!rgb || rgb.length !== 3) {
      throw new Error("Parameter needed");
    }
    if (
      typeof rgb[0] !== "number" ||
      typeof rgb[1] !== "number" ||
      typeof rgb[2] !== "number"
    ) {
      throw new Error("Parameter should contain integer numeric data");
    }
    if (
        !Number.isInteger(rgb[0]) ||
        !Number.isInteger(rgb[1]) ||
        !Number.isInteger(rgb[2])
    ) {
        throw new Error("Parameter should contain integer numeric data");
      }
    var canSquash = this.squashable(rgb);
    const hexed = rgb.reduce((curr, next) => {
      next = Math.max(Math.min(next, 255), 0);
      return (curr = curr + (canSquash ? next.toString(16).slice(-1) : ("0" + next.toString(16)).slice(-2)));
    }, "#");
    return hexed;
  }
  squashable(rgb) {
    var canSquash = true;
    rgb.forEach(el => {
      canSquash = (el % 17 !== 0 && el > 0 && el < 256 ) ? false : canSquash;
    });
    return canSquash;
  }
}

module.exports = Converter;
