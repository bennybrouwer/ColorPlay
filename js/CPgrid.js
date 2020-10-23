class CPgrid {
    constructor(w, h, nc, nr) {
        this.cols = nc;
        this.rows = nr;
        this.width = w;
        this.height = h;
        let cw = Math.floor(this.width / this.cols);
        let ch = Math.floor(this.height / this.rows);
        this.cell = [];
        for (let x = 0; x < this.cols; x++) {
            this.cell[x] = [];
            for (let y = 0; y < this.rows; y++) {
                this.cell[x][y] = new CPcell(x * cw, y * ch, cw, ch);
            }
        }
    }

    show() {
        stroke(0, 0, 0);
        strokeWeight(1);
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.cell[x][y].show();
            }
        }
    }
}