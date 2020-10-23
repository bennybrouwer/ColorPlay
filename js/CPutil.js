function setBytes(arr, r, g, b, a) {
    if (r) {
        arr[0] = r;
    }
    if (g) {
        arr[1] = g;
    }
    if (b) {
        arr[2] = b;
    }
    if (a) {
        arr[4] = a;
    }
}

function makeTransparent(img) {
    // let d = pixelDensity();
    // console.log(d);
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let loc = (x + y * img.width);
            // let sum = img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2];
            if (img.pixels[loc] > 30) {
                img.pixels[loc] = 100;
                // img.pixels[loc + 3] = 100;
            }
        }
    }
}