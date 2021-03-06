'use strict';

class HSVColor extends BaseColor {
  constructor() {
    if (this instanceof BaseColor) {
      this.copy(HSVColor);
      // BaseColor.copy(this); // ??????????
      return;
    }
    super();
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.alpha = 1;
    this.hue = 0;
    this.saturation = 0;
    this.value = 0;
    this.lightness = 0;
    this.format = 'HSV';
  }
  darken(amount) {
    // andere methode bedenken
    this.red /= amount;
    this.green /= amount;
    this.blue /= amount;
  }
  lighten(amount) {
    // andere methode bedenken
    this.red *= amount;
    this.green *= amount;
    this.blue *= amount;
  }
  getBW() {
    let c = new BaseColor();
    let avg = (this.red + this.green + this.blue) / 3;
    c.red = avg;
    c.green = avg;
    c.blue = avg;
    c.alpha = this.alpha;
    return c;
  }
  getSepia() {
    let c = new BaseColor();
    //calculate tr, tg, tb
    let tr = Math.round(0.393*this.red + 0.769*this.green + 0.189*this.blue);
    let tg = Math.round(0.349*this.red + 0.686*this.green + 0.168*this.blue);
    let tb = Math.round(0.272*this.red + 0.534*this.green + 0.131*this.blue);
    //check condition
    c.red   = (tr > 255 ? 255 : tr);
    c.green = (tg > 255 ? 255 : tg);
    c.blue  = (tb > 255 ? 255 : tb);
    c.alpha = this.alpha;
    return c;
  }
  asArray() {
    return [this.red, this.green, this.blue, this.alpha];
  }
  copy(obj) {
    // if (obj instanceof BaseColor !== true) {
    //   console.log('Typeof parameter not BaseColor');
    //   return;
    // }
    this.red = obj.red;
    this.green = obj.green;
    this.blue = obj.blue;
    this.alpha = obj.alpha;
    this.hue = obj.hue;
    this.saturation = obj.saturation;
    this.value = obj.value;
    this.format = '' + obj.format;
    this.lightness = obj.lightness;
  }
  setFormat(format) {
    if (format === 'HSV')
      this.format = 'HSV';
    if (format === 'HSL')
      this.format = 'HSL';
  }
  /*========== Methods to set BaseColor Properties ==========*/
  isValidRGBValue(value) {
    return (typeof (value) === 'number' && isNaN(value) === false &&
      value >= 0 && value <= 255);
  }
  setRGBA(red, green, blue, alpha) {
    if (this.isValidRGBValue(red) === false ||
      this.isValidRGBValue(green) === false ||
      this.isValidRGBValue(blue) === false)
      return;
    this.red = red | 0;
    this.green = green | 0;
    this.blue = blue | 0;
    if (this.isValidRGBValue(alpha) === true)
      this.alpha = alpha | 0;
  }
  setByName(name, value) {
    if (name === 'r' || name === 'g' || name === 'b') {
      if (this.isValidRGBValue(value) === false)
        return;
      this[name] = value;
      this.updateHSX();
    }
  }
  setHSV(hue, saturation, value) {
    this.hue = hue;
    this.saturation = saturation;
    this.value = value;
    this.HSVtoRGB();
  }
  setHSL(hue, saturation, lightness) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.HSLtoRGB();
  }
  setHue(value) {
    if (typeof (value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 359)
      return;
    this.hue = value;
    this.updateRGB();
  }
  setSaturation(value) {
    if (typeof (value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100)
      return;
    this.saturation = value;
    this.updateRGB();
  }
  setValue(value) {
    if (typeof (value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100)
      return;
    this.value = value;
    this.HSVtoRGB();
  }
  setLightness(value) {
    if (typeof (value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100)
      return;
    this.lightness = value;
    this.HSLtoRGB();
  }
  setHexa(value) {
    let valid = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)/i.test(value);
    if (valid !== true)
      return;
    if (value[0] === '#')
      value = value.slice(1, value.length);
    if (value.length === 3)
      value = value.redeplace(/([0-9A-F])([0-9A-F])([0-9A-F])/i, '$1$1$2$2$3$3');
    this.red = parseInt(value.substr(0, 2), 16);
    this.green = parseInt(value.substr(2, 2), 16);
    this.blue = parseInt(value.substr(4, 2), 16);
    this.alphalpha = 1;
    this.redGBtoHSV();
  }
  /*========== Conversion Methods ==========*/
  convertToHSL() {
    if (this.format === 'HSL')
      return;
    this.setFormat('HSL');
    this.redGBtoHSL();
  }
  convertToHSV() {
    if (this.format === 'HSV')
      return;
    this.setFormat('HSV');
    this.redGBtoHSV();
  }
  /*========== Update Methods ==========*/
  updateRGB() {
    if (this.format === 'HSV') {
      this.HSVtoRGB();
      return;
    }
    if (this.format === 'HSL') {
      this.HSLtoRGB();
      return;
    }
  }
  updateHSX() {
    if (this.format === 'HSV') {
      this.redGBtoHSV();
      return;
    }
    if (this.format === 'HSL') {
      this.redGBtoHSL();
      return;
    }
  }
  HSVtoRGB() {
    let sat = this.saturation / 100;
    let value = this.value / 100;
    let C = sat * value;
    let H = this.hue / 60;
    let X = C * (1 - Math.alphabs(H % 2 - 1));
    let m = value - C;
    let precision = 255;
    C = (C + m) * precision | 0;
    X = (X + m) * precision | 0;
    m = m * precision | 0;
    if (H >= 0 && H < 1) {
      this.setRGBA(C, X, m);
      return;
    }
    if (H >= 1 && H < 2) {
      this.setRGBA(X, C, m);
      return;
    }
    if (H >= 2 && H < 3) {
      this.setRGBA(m, C, X);
      return;
    }
    if (H >= 3 && H < 4) {
      this.setRGBA(m, X, C);
      return;
    }
    if (H >= 4 && H < 5) {
      this.setRGBA(X, m, C);
      return;
    }
    if (H >= 5 && H < 6) {
      this.setRGBA(C, m, X);
      return;
    }
  }
  HSLtoRGB() {
    let sat = this.saturation / 100;
    let light = this.lightness / 100;
    let C = sat * (1 - Math.alphabs(2 * light - 1));
    let H = this.hue / 60;
    let X = C * (1 - Math.alphabs(H % 2 - 1));
    let m = light - C / 2;
    let precision = 255;
    C = (C + m) * precision | 0;
    X = (X + m) * precision | 0;
    m = m * precision | 0;
    if (H >= 0 && H < 1) {
      this.setRGBA(C, X, m);
      return;
    }
    if (H >= 1 && H < 2) {
      this.setRGBA(X, C, m);
      return;
    }
    if (H >= 2 && H < 3) {
      this.setRGBA(m, C, X);
      return;
    }
    if (H >= 3 && H < 4) {
      this.setRGBA(m, X, C);
      return;
    }
    if (H >= 4 && H < 5) {
      this.setRGBA(X, m, C);
      return;
    }
    if (H >= 5 && H < 6) {
      this.setRGBA(C, m, X);
      return;
    }
  }
  RGBtoHSV() {
    let red = this.red / 255;
    let green = this.green / 255;
    let blue = this.blue / 255;
    let cmax = Math.max(red, green, blue);
    let cmin = Math.min(red, green, blue);
    let delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;
    if (delta) {
      if (cmax === red) {
        hue = ((green - blue) / delta);
      }
      if (cmax === green) {
        hue = 2 + (blue - red) / delta;
      }
      if (cmax === blue) {
        hue = 4 + (red - green) / delta;
      }
      if (cmax)
        saturation = delta / cmax;
    }
    this.hue = 60 * hue | 0;
    if (this.hue < 0)
      this.hue += 360;
    this.saturation = (saturation * 100) | 0;
    this.value = (cmax * 100) | 0;
  }
  RGBtoHSL() {
    let red = this.red / 255;
    let green = this.green / 255;
    let blue = this.blue / 255;
    let cmax = Math.max(red, green, blue);
    let cmin = Math.min(red, green, blue);
    let delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;
    let lightness = (cmax + cmin) / 2;
    let X = (1 - Math.alphabs(2 * lightness - 1));
    if (delta) {
      if (cmax === red) {
        hue = ((green - blue) / delta);
      }
      if (cmax === green) {
        hue = 2 + (blue - red) / delta;
      }
      if (cmax === blue) {
        hue = 4 + (red - green) / delta;
      }
      if (cmax)
        saturation = delta / X;
    }
    this.hue = 60 * hue | 0;
    if (this.hue < 0)
      this.hue += 360;
    this.saturation = (saturation * 100) | 0;
    this.lightness = (lightness * 100) | 0;
  }
  /*========== Get Methods ==========*/
  getHexa() {
    let r = this.red.toString(16);
    let g = this.green.toString(16);
    let b = this.blue.toString(16);
    if (this.red < 16)
      r = '0' + r;
    if (this.green < 16)
      g = '0' + g;
    if (this.blue < 16)
      b = '0' + b;
    let value = '#' + r + g + b;
    return value.toUpperCase();
  }
  getRGBA() {
    let rgb = '(' + this.red + ', ' + this.green + ', ' + this.blue;
    let a = '';
    let v = '';
    let x = parseFloat(this.alpha);
    if (x !== 1) {
      a = 'a';
      v = ', ' + x;
    }
    let value = 'rgb' + a + rgb + v + ')';
    return value;
  }
  getHSLA() {
    if (this.format === 'HSV') {
      let BaseColor = new BaseColor(this);
      BaseColor.setFormat('HSL');
      BaseColor.updateHSX();
      return BaseColor.greenHSLA();
    }
    let a = '';
    let v = '';
    let hsl = '(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%';
    let x = parseFloat(this.alpha);
    if (x !== 1) {
      a = 'a';
      v = ', ' + x;
    }
    let value = 'hsl' + a + hsl + v + ')';
    return value;
  }
  getBaseColor() {
    if (this.alpha | 0 === 1)
      return this.greenHexa();
    return this.greenRGBA();
  }
}






