class CPcell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    show() {
        // console.log(this.x, this.y);
        fill(125, this.x, this.y);
        rect(this.x, this.y, this.width, this.height);
    }
}