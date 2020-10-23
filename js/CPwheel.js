new p5();

const sqrt2 = Math.sqrt(2);
const sqrt3 = Math.sqrt(3); // 1.732

class Wheel {
    constructor() {
        this.radius = 150;
        this.angle = 0;
        this.step = TWO_PI / 24;
        this.cw = 10; // circle-width

        this.oX = width / 2;
        this.oY = height / 2;

        this.hue = 0;
        this.sat = 100;
        this.bri = 50;

        this.triangleRotation = 0;

        // Grid Definition:
        this.gridCols = 64;
        this.gridRows = 64;
        this.gridWidth = this.squareSide(); // see square 
        this.gridHeight = this.gridWidth;
        this.cellWidth = Math.floor(this.gridWidth / this.gridCols);
        this.cellHeight = Math.floor(this.gridHeight / this.gridRows);

        console.log(this.cellWidth, this.cellHeight);

        this.cell = [];
        let xOffs = -this.gridWidth / 2;
        for (let x = 0; x < this.gridCols; x++) {
            this.cell[x] = [];
            let yOffs = -this.gridHeight / 2;
            for (let y = 0; y < this.gridRows; y++) {
                // let xx = x * cellWidth;
                // let yy = y * cellHeight;
                this.cell[x][y] = new CPcell(xOffs, yOffs, this.cellWidth, this.cellHeight);
                yOffs += this.cellHeight;
            }
            xOffs += this.cellWidth;
        }
        console.log(this.cell);
    }

    circle() {
        this.radius = min(width, height) / 2;
        let r1 = this.radius - this.cw;
        let r2 = this.radius - 5 * this.cw;
        this.hue = 0;
        strokeWeight(5);
        for (let i = 0; i < 360; i++) {
            this.hue++;
            let x1 = r1 * sin(this.hue);
            let y1 = r1 * cos(this.hue);
            let x2 = r2 * sin(this.hue);
            let y2 = r2 * cos(this.hue);
            stroke(this.hue, this.sat, this.bri);
            line(x1, y1, x2, y2);
        }
    }

    triangle() {
        rotate(this.triangleRotation);
        // this.triangleRotation++;
        strokeWeight(5);
        stroke(255);
        let r = this.radius - 20;
        let x2 = sqrt3 * r / 2;
        let x1 = -x2;
        let y1 = 0.5 * r;
        let y2 = -1 * r;
        line(x1, y1, x2, y1);
        line(x2, y1, 0, y2);
        line(0, y2, x1, y1);
    }

    squareSide() {
        // const r = this.radius - 20;
        // const a = r * sqrt2;
        // return a;
        return (this.radius - 20) * sqrt2;
    }

    square() {
        rotate(this.triangleRotation);
        // this.triangleRotation++;
        const w = 5;
        strokeWeight(w);
        stroke(255);

        // let r = this.radius - 20;
        // let a = r * sqrt2;
        // let x = a / 2;
        const x = this.squareSide() / 2;
        const y = x;

        line(-x, y, x, y);
        line(x, y, x, -y);
        line(x, -y, -x, -y);
        line(-x, -y, -x, y);

        strokeWeight(w + 1);
        stroke(100);
        for (let i = -x; i <= x; i += w) {
            // stroke(this.hue, this.sat, this.bri);
            let h = this.hue * i / this.radius;
            stroke(h, this.sat, this.bri);
            line(i, y, i, -y);
        }
    }

    grid() {
        rotate(this.triangleRotation);
        const w = 5;
        strokeWeight(w);
        stroke(255);

        for (let x = 0; x < this.gridCols; x++) {
            for (let y = 0; y < this.gridRows; y++) {
                this.cell[x][y].show();
            }
        }
    }

    inCircle(x, y) {
        let dx = abs(x); //+ this.oX;
        let dy = abs(y); //+ this.oY;
        if (dx > this.radius || dy > this.radius) {
            return false;
        }
        if (dx + dy < this.radius) {
            return true;
        }
        if (x * x + y * y <= this.radius * this.radius) {
            return true;
        }
        return false;
    }

    saturationBar() {

    }

    handleMouse() {
        if (mouseIsPressed) {
            // console.log(mouseX, mouseY);
            this.xDir = mouseX;
            this.yDir = mouseY;
            if (this.inCircle(mouseX, mouseY)) {
                this.triangleRotation++; // just testing
            }
        }
    }

    show() {
        // background(80);
        translate(width / 2, height / 2);
        this.circle();
        if (cstBox.cstRadio.value() == 1) {
            this.square()
        } else if (cstBox.cstRadio.value() == 2) {
            this.triangle()
        } else if (cstBox.cstRadio.value() == 3) {
            this.grid()
        }
        // translate(-width / 2, -height / 2);
        this.handleMouse();
    }
}