let xCollision = '';
let yCollision = '';
let points = [];
let outx = '';
let outy = '';
let step = [];
$duration = 3000; // длительность анимации

function Painting() {

    let canvas;
    let context;
    let width;
    let height;
    let startx = '';
    let starty = '';
    let endx = '';
    let endy = '';
    let x = '';
    let y = '';

    this.initialize = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');

        width = document.getElementById("canvas").clientWidth;
        height = document.getElementById("canvas").clientHeight;

        canvas.width = width;
        canvas.height = height;

        canvas.addEventListener('click', MouseDown, false);
        canvas.addEventListener('mousemove', MouseMove, false);
        canvas.addEventListener('contextmenu', MouseContext, false);
    }

    let MouseDown = function (e) {
        e.preventDefault();
        x = e.pageX - e.target.offsetLeft;
        y = e.pageY - e.target.offsetTop;
        // Point begin when mouse down first time
        if (startx == '' && starty == '') {
            startx = x;
            starty = y;
            context.beginPath();
            context.moveTo(startx, starty);
        }
        // When first coordinates != undefained - it seem there is a second press
        else if (startx !== '' && starty !== '' && endx === '' && endy === '') {
            endx = x;
            endy = y;
            // Save coordinates of line in to the points array
            points.push([startx, starty, x, y]);
            // Clear coordinates after save
            startx = '';
            starty = '';
            endx = '';
            endy = '';
            // Get the coordinates dots of lines intersctions
            for (let i = 0; i < points.length; i++) {
                for (let k = i; k < points.length; k++) {
                    get_line_intersection(...points[i], ...points[k]);
                    context.beginPath();
                    context.moveTo(xCollision, yCollision);
                    context.arc(xCollision, yCollision, 4, 0, 2 * Math.PI);
                    context.lineWidth = 1;
                    context.lineTo(xCollision, yCollision);
                    // context.strokeStyle = "red";
                    // context.fillStyle = "red";
                    context.fill();
                    context.stroke();
                }
            }
        }
    }

    let MouseMove = function (e) {
        if (startx !== '' && starty !== '' && endx === '' && endy === '') {
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;

            // Drawing line
            context.beginPath();
            context.moveTo(startx, starty);
            context.lineTo(x, y);
            context.clearRect(0, 0, width, height);
            context.stroke();

            // Check intersection with existing lines
            for (let i = 0; i < points.length; i++) {
                get_line_intersection(startx, starty, x, y, ...points[i]);
                context.beginPath();
                context.moveTo(xCollision, yCollision);
                context.arc(xCollision, yCollision, 4, 0, 2 * Math.PI);
                context.lineWidth = 1;
                context.lineTo(xCollision, yCollision);
                context.strokeStyle = "red";
                context.fillStyle = "red";
                context.fill();
                context.stroke();
            }

            // Redraw lines from array
            for (let i = 0; i < points.length; i++) {
                context.beginPath();
                context.strokeStyle = "blue";
                context.fillStyle = "blue";
                context.moveTo(points[i][0], points[i][1]);
                context.lineTo(points[i][2], points[i][3]);
                context.stroke();
            }

            // Redraw dots 
            for (let i = 0; i < points.length; i++) {
                for (let k = i; k < points.length; k++) {
                    get_line_intersection(...points[i], ...points[k]);
                    context.beginPath();
                    context.moveTo(xCollision, yCollision);
                    context.arc(xCollision, yCollision, 4, 0, 2 * Math.PI);
                    context.lineWidth = 1;
                    context.lineTo(xCollision, yCollision);
                    context.strokeStyle = "red";
                    context.fillStyle = "red";
                    context.fill();
                    context.stroke();
                }
            }
        }
    }
}


let MouseContext = function (e) {
    e.preventDefault();
    startx = '';
    starty = '';
    mouse.x = '';
    mouse.y = '';
    context.clearRect(0, 0, width, height);
}


// Function to get the dots of lines intersctions
function get_line_intersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    let s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x; s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x; s2_y = p3_y - p2_y;

    let s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        // Collision detected
        xCollision = Math.round(p0_x + (t * s1_x));
        yCollision = Math.round(p0_y + (t * s1_y));
    }
    return 0; // No collision
}

// Collapse animation
function collapse() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

    var time = new Date().getTime() * 0.002;
    var x = Math.sin(time) * 96 + 128;
    var y = Math.cos(time * 0.9) * 96 + 128;
    for (let i = 0; i < points.length; i++) {
        // a = (points[i][0] + points[i][2]) / 2;
        // b = (points[i][1] + points[i][3]) / 2;
        console.log('==>', points[i]);

        let deltaX = Math.abs(points[i][2] - points[i][0]),
            deltaY = Math.abs(points[i][3] - points[i][1]),
            signX = points[i][0] < points[i][2] ? 1 : -1,
            signY = points[i][1] < points[i][3] ? 1 : -1,
            error = deltaX - deltaY;
        while (points[i][0] != points[i][2] || points[i][1] != points[i][3]) {
            let error2 = error * 2;
            if (error2 > -deltaY) {
                error -= deltaY;
                points[i][0] += signX;
            }
            if (error2 < deltaX) {
                error += deltaX;
                points[i][1] += signY;
            }
            context.beginPath();
            context.moveTo(points[i][0], points[i][1]);
            context.lineWidth = 3;
            context.lineTo(points[i][2], points[i][3]);
            context.moveTo(points[i][2], points[i][3]);
            context.lineWidth = 3;
            context.lineTo(points[i][0], points[i][1]);
            context.strokeStyle = "#ffffff";
            context.fillStyle = "#ffffff";
            context.fill();
            context.stroke();
        }
    }
    points = [];
};

document.querySelector('.coor').onclick = collapse;

let app = new Painting();
app.initialize();