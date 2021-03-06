class Curtain {
    constructor(target, width, height) {
        // console.log(target);
        this.target = target;
        this.width = width || 100;
        this.height = height || 100;

        this.target.width = this.width;
        this.target.height = this.height;
        this.context = target.getContext("2d");

        this.pickerCircle = { x: 10, y: 10, width: 7, height: 7 };

        this.listenForEvents();
    }

    draw() {
        this.build();
    }

    build() {
        // Build gradient colors on 2D canvas in horizontal direction:
        let gradient = this.context.createLinearGradient(0, 0, this.width, 0);

        gradient.addColorStop(0.00, "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(  0,   0, 255)");
        gradient.addColorStop(0.49, "rgb(  0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(  0, 255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1.00, "rgb(255,   0,   0)");

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        // Add white & black colors (top to bottom):
        gradient = this.context.createLinearGradient(0, 0, 0, this.height);

        gradient.addColorStop(0.0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(  0,   0,   0, 0)");
        gradient.addColorStop(1.0, "rgba(  0,   0,   0, 1)");
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        // Circle Color Selector:
        this.context.beginPath();
        this.context.arc(
            this.pickerCircle.x,
            this.pickerCircle.y,
            this.pickerCircle.width,
            0,
            Math.PI * 2
        );
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.closePath();
    }

    listenForEvents() {
        let isMouseDown = false;

        const onMouseDown = (e) => {
            isMouseDown = true;
            let currentX = e.clientX - this.target.offsetLeft;
            let currentY = e.clientY - this.target.offsetTop;
            if (currentY > this.pickerCircle.y &&
                currentY < this.pickerCircle.y + this.pickerCircle.height &&
                currentX > this.pickerCircle.x &&
                currentX < this.pickerCircle.x + this.pickerCircle.width) {
                isMouseDown = true;
            } else {
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const onMouseMove = (e) => {
            if (isMouseDown) {
                let currentX = e.clientX - this.target.offsetLeft;
                let currentY = e.clientY - this.target.offsetTop;
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const onMouseUp = () => {
            isMouseDown = false;
        }

        this.target.addEventListener("mousedown", onMouseDown);
        this.target.addEventListener("mousemove", onMouseMove);
        this.target.addEventListener("mousemove",
            () => this.onChangeCallback(this.getPickedColor()));

        document.addEventListener("mouseup", onMouseUp);
    }

    getPickedColor() {
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        return {
            r: imageData.data[0],
            g: imageData.data[1],
            b: imageData.data[2],
            a: imageData.data[3]
        };
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }


}


// console.log(document.getElementById("color-picker"));
// let curtain = new Curtain(document.getElementById("color-picker"), 250, 220);
// let curtain = new Curtain(cpCanvas, 250, 220);

// // setInterval(() => curtain.draw(), 1);

// curtain.onChange((color) => {
//     let selected = document.getElementsByClassName("selected")[0];
//     selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
// });