
function lerpBaseColor(c1, c2, fraction) {
  let color = new BaseColor();

    function recalc(a, b) {
      return Math.round(a + fraction * (b - a));
      // return Math.floor(a + fraction * (a + b) / 2);
    };

  color.red = recalc(c1.red, c2.red);
  color.green = recalc(c1.green, c2.green);
  color.blue = recalc(c1.blue, c2.blue);
  color.alpha = recalc(c1.alpha, c2.alpha);
  color.hue = recalc(c1.hue + c2.hue);
  color.saturation = recalc(c1.saturation, c2.saturation);
  color.value = recalc(c1.value, c2.value);
  color.lightness = recalc(c1.lightness, c2.lightness);
  return color;
}

function RGBBaseColor(r, g, b) {
  let BaseColor = new BaseColor();
  BaseColor.setRGBA(r, g, b, 1);
  return BaseColor;
}

function RGBABaseColor(r, g, b, a) {
  let BaseColor = new BaseColor();
  BaseColor.setRGBA(r, g, b, a);
  return BaseColor;
}

function HSVBaseColor(h, s, v) {
  let BaseColor = new BaseColor();
  BaseColor.setHSV(h, s, v);
  return BaseColor;
}

function HSVABaseColor(h, s, v, a) {
  let BaseColor = new BaseColor();
  BaseColor.setHSV(h, s, v);
  BaseColor.alpha = a;
  return BaseColor;
}

function HSLBaseColor(h, s, l) {
  let BaseColor = new BaseColor();
  BaseColor.setHSL(h, s, l);
  return BaseColor;
}

function HSLABaseColor(h, s, l, a) {
  let BaseColor = new BaseColor();
  BaseColor.setHSL(h, s, l);
  BaseColor.alpha = a;
  return BaseColor;
}

