let cWidth, cHeight;
let hMargin = 20;
let vMargin = 150;

let colorP;

let nCols = 100;
let nRows = 20;

let wheel;

// let displayRadio;

function setup() {

    // Define and position my own color-play canvas . . 

    cWidth = windowWidth - 2 * hMargin - menuWidth;
    cHeight = windowHeight - 2 * vMargin;

    if (cWidth > cHeight) {
        cWidth = cHeight;
    }
    cpCanvas = createCanvas(cWidth, cHeight);
    if (menuLeft) {
        cpCanvas.position(menuWidth + hMargin, vMargin);
    } else {
        cpCanvas.position(hMargin, vMargin);
    }

    // grid = new CPgrid(cWidth, cHeight, nCols, nRows);

    strokeWeight(0);
    angleMode(DEGREES);
    // angleMode(RADIANS);
    colorMode(HSL);
    wheel = new Wheel();

    // ======= CURTAIN is not a P5 class -->> modify before use ==========
    // curtain = new Curtain(document.getElementById("color-picker"), cWidth, cHeight);
    //
    // setInterval(() => curtain.draw(), 1);
    //
    // curtain.onChange((color) => {
    //     let selected = document.getElementsByClassName("selected")[0];
    //     selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    // });
    // ====================================================================

    // P5 sketch basics . . .

    pixelDensity(1); // in case a special screen is used --> this is what I use
    // background(51);
    background(255, 0, 0);

    // Place controls . . .

    // for (let i = 0; i < 4; i++) {
    //     sliders.push(createSlider(0, 255, 125).position(hMargin + 150 * i, 20));
    // }

    // info at bottom, below canvas;
    // sort of console.log but as functional part of this program . . 

    colorP = createP('(x,y) = (r,g,b,alpha)').position(hMargin, cHeight + vMargin);

    cstBox = new ColorSelTypeBox(10, 10);
    cmBox = new ColorModeBox(10, 200);

    // bounceCheckbox = createCheckbox('Bounce Birds', bounce);
    // bounceCheckbox.position(width + 10, height - 20);
    // bounceCheckbox.changed(bounceCheckedEvent);

    bkColor = new BaseColor();
    bkColor.setRGBA(55, 55, 55, 1);
}

function draw() {
    background(51);
    wheel.show();
}

function mouseClicked() {
    let x = mouseX // - hMargin;
    let y = mouseY // - vMargin;
    if (x >= 0 && y >= 0) {
        cpCanvas.loadPixels();
        let index = (x + y * cWidth) * 4;
        colorP.html('(' + x + ',' + y + ') = (' +
            pixels[index] + ',' +
            pixels[index + 1] + ',' +
            pixels[index + 2] + ',' +
            pixels[index + 3] + '); '
            //  +
            // cstBox.cstRadio.selected() + ', ' +
            // cstBox.cstRadio.value()
        );
    }
}