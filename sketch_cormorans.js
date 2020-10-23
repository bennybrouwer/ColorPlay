let myCanvas;
let cWidth, cHeight;
let hMargin = 10;
let vMargin = 50;

let sliders = [];

let colorP;

let originalImg = [];
let sizes = [];
let xp = [];
let yp = [];

function preload() {
    for (let i = 0; i < 8; i++) {
        let f = './img/aalscholver' + i + '.png';
        originalImg.push(loadImage(f));
        sizes.push(Math.floor(random(50, 300)));
        xp.push(Math.floor(random(50, 400)));
        yp.push(Math.floor(random(50, 400)));
    }
}


function setup() {
    cWidth = windowWidth - 2 * hMargin;
    cHeight = windowHeight - 2 * vMargin;
    myCanvas = createCanvas(cWidth, cHeight);
    myCanvas.position(hMargin, vMargin);

    pixelDensity(1); // in case a special screen is used --> this is what I use
    background(0);

    for (let i = 0; i < 4; i++) {
        sliders.push(createSlider(0, 255, 125).position(hMargin + 150 * i, 10));
    }
    colorP = createP('(x,y) = (r,g,b,a)').position(hMargin, cHeight + vMargin);

    for (let i = 0; i < 8; i++) {
        let f = './img/aalscholver' + i + '.png';
        originalImg.push(loadImage(f, img => {
            sizes.push(Math.floor(random(50, 300)));
            xp.push(Math.floor(random(50, 400)));
            yp.push(Math.floor(random(50, 400)));
            image(img, 0, 0);
        }));
    }
}

function draw() {
    background(51);
    // colorMode(HSL);      // only has effect on p5 color functions; not Pixels[]

    myCanvas.loadPixels();
    for (let y = 0; y < cHeight; y++) {
        for (let x = 0; x < cWidth; x++) {
            let index = (x + y * cWidth) * 4;
            // let r = y / 4; // 255 * (x / cWidth);
            // let g = x / 4; // index % 255; // random(255);
            // let b = 255; // 255 * (y / cHeight); //y % 255;
            // let alpha = sliders[3].value();
            // setBytes(pixels[index], r, g, b, alpha);
            // pixels[index + 0] = sliders[0].value();
            // pixels[index + 1] = g;
            // pixels[index + 2] = b;
            // pixels[index + 3] = alpha;
            for (let i = 0; i < 4; i++) {
                pixels[index + i] = sliders[i].value();
            }
        }
        // console.log(round(frameRate()));
    }
    myCanvas.updatePixels();

    for (let i = 0; i < originalImg.length; i++) {
        // if (originalImg[i] && xp[i]) {
        image(originalImg[i], xp[i], yp[i], sizes[i], sizes[i]);
        // };
    };

}

function mouseClicked() {
    let x = mouseX // - hMargin;
    let y = mouseY // - vMargin;
    if (x >= 0 && y >= 0) {
        myCanvas.loadPixels();
        let index = (x + y * cWidth) * 4;
        colorP.html('(' + x + ',' + y + ') = (' +
            pixels[index] + ',' +
            pixels[index + 1] + ',' +
            pixels[index + 2] + ',' +
            pixels[index + 3] + ')');
    }
}