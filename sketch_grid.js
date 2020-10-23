let cpCanvas;
let cWidth, cHeight;
let hMargin = 10;
let vMargin = 50;

let sliders = [];

let colorP;

let nCols = 100;
let nRows = 20;

let grid;

let colorModeRadio;

function setup() {

    // Define and position my own color-play canvas . . 

    cWidth = windowWidth - 2 * hMargin - menuWidth;
    cHeight = windowHeight - 2 * vMargin;
    cpCanvas = createCanvas(cWidth, cHeight);
    if (menuLeft) {
        cpCanvas.position(menuWidth + hMargin, vMargin);
    } else {
        cpCanvas.position(hMargin, vMargin);
    }

    grid = new CPgrid(cWidth, cHeight, nCols, nRows);


    // P5 sketch basics . . .

    pixelDensity(1); // in case a special screen is used --> this is what I use
    background(0);

    // Place controls . . .

    for (let i = 0; i < 4; i++) {
        sliders.push(createSlider(0, 255, 125).position(hMargin + 150 * i, 10));
    }

    // info at bottom, below canvas;
    // sort of console.log but as functional part of this program . . 

    colorP = createP('(x,y) = (r,g,b,alpha)').position(hMargin, cHeight + vMargin);


    canvasColorBox = new CanvasColorBox(10, 10);
    canvasControlBox = new CanvasControlBox(10, 60);
    horizonBox = new HorizonBox(10, 180);
    weatherControlBox = new WeatherControlBox(10, 240);
    // flockingControlBox = new FlockingControlBox(10, 360);
    // boidControlBox = new BoidControlBox(10, 410);
    // vehicleControlBox = new VehicleControlBox(10, 500);

    bounceCheckbox = createCheckbox('Bounce Birds', bounce);
    bounceCheckbox.position(width + 10, height - 20);
    // bounceCheckbox.changed(bounceCheckedEvent);

    bkColor = new BaseColor();
    bkColor.setRGBA(55, 55, 55, 1);


    // Serious ----> Color mode selection by radio button . . 

    colorModeRadio = createRadio(); // see: https://p5js.org/reference/#/p5/createRadio
    colorModeRadio.option('RGB');
    colorModeRadio.option('HSL');
    colorModeRadio.option('HSV');
    colorModeRadio.option('B/W');
    colorModeRadio.option('Sepia');
    colorModeRadio.option('Green Grass');
    colorModeRadio.option('Green Forest');
    colorModeRadio.option('Blue: Sky');
    colorModeRadio.option('Blue: River');

}

function draw() {
    background(51);
    grid.show();
    // colorMode(HSL);      // only has effect on p5 color functions; not Pixels[]

    // cpCanvas.loadPixels();
    // for (let y = 0; y < cHeight; y++) {
    //     for (let x = 0; x < cWidth; x++) {
    //         let index = (x + y * cWidth) * 4;
    //         // let r = y / 4; // 255 * (x / cWidth);
    //         // let g = x / 4; // index % 255; // random(255);
    //         // let b = 255; // 255 * (y / cHeight); //y % 255;
    //         // let alpha = sliders[3].value();
    //         // setBytes(pixels[index], r, g, b, alpha);
    //         // pixels[index + 0] = sliders[0].value();
    //         // pixels[index + 1] = g;
    //         // pixels[index + 2] = b;
    //         // pixels[index + 3] = alpha;
    //     }
    //     // console.log(round(frameRate()));
    // }
    // cpCanvas.updatePixels();

    // for (let i = 0; i < originalImg.length; i++) {
    //     // if (originalImg[i] && xp[i]) {
    //     image(originalImg[i], xp[i], yp[i], sizes[i], sizes[i]);
    //     // };
    // };

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
            pixels[index + 3] + ')');
    }
}