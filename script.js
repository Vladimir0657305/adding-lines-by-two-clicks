

let countStep = 11;
$duration = 200000; // длительность анимации


function Painting() {
let xCollision = '';
let yCollision = '';
let points = [];
let pointsCoef = [];
let outx = '';
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
        document.querySelector('.coor').onclick = collapse;
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
            
            let midx = Math.round((startx + endx) / 2); //  middle x coordinates
            let midy = Math.round((starty + endy) / 2); //  middle y coordinates
            let coef = ((startx - endx) * (startx - endx) + (starty - endy) * (starty - endy))**.5 / $duration // coef new distance / old distance

            // Save coordinates of line in to the points array
            points.push([startx, starty, x, y]);
            pointsCoef.push([midx, midy, coef]);
            
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
            redrawLines();

            // Redraw dots 
            redrawDots();
        }
    }

let MouseContext = function (e) {
    e.preventDefault();
    context.beginPath();
    context.moveTo(0, 0);
    context.clearRect(0, 0, width, height);
    
    // Redraw lines from array
    redrawLines();

    // Redraw dots 
    redrawDots();

    startx = '';
    starty = '';
    mouse.x = '';
    mouse.y = '';
    }
    function redrawLines() {
        for (let i = 0; i < points.length; i++) {
            context.beginPath();
            context.strokeStyle = "blue";
            context.fillStyle = "blue";
            context.moveTo(points[i][0], points[i][1]);
            context.lineTo(points[i][2], points[i][3]);
            context.stroke();
        }
    };

function redrawDots() {
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
};

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
    // let x2 = '';
    function draw() {
    for (let i = 0; i < points.length; i++) { // перебираем все прямые
        let x1 = ((points[i][0] + pointsCoef[i][2] * points[i][2]) / (1 + pointsCoef[i][2])); // пересчитываем новые уменьшенные координаты соотв точки
        let y1 = ((points[i][1] + pointsCoef[i][2] * points[i][3]) / (1 + pointsCoef[i][2])); // пересчитываем новые уменьшенные координаты соотв точки
        x2 = ((points[i][2] + pointsCoef[i][2] * points[i][0]) / (1 + pointsCoef[i][2]));  // пересчитываем новые уменьшенные координаты соотв точки
        let y2 = ((points[i][3] + pointsCoef[i][2] * points[i][1]) / (1 + pointsCoef[i][2])); //  пересчитываем новые уменьшенные координаты соотв точки
        context.beginPath();
        context.moveTo(points[i][0], points[i][1]); // устанавливаем перо в начало по старым координатам с одной стороны прямой
        context.lineWidth = 3; // толщина линии
        context.arc(points[i][0], points[i][1], 2, 0, 2 * Math.PI); // рисуем круг с центом в новых уменьшенных координатах
        context.moveTo(points[i][2], points[i][3]); // устанавливаем перо в начало по старым координатам с другой стороны прямой
        context.lineWidth = 4;
        context.arc(points[i][2], points[i][3], 2, 0, 2 * Math.PI); // рисуем круг с центом в новых уменьшенных координатах
        context.strokeStyle = "#ffffff";
        context.fillStyle = "#ffffff";
        context.fill();
        context.stroke();

        // меняем координаты на вновь вычисленные - уменьшенные
        points[i][0] = x1; 
        points[i][1] = y1;
        points[i][2] = x2;
        points[i][3] = y2;
        outx++;
        pointsCoef[i][2] = (((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) ** .5 + outx*18) / $duration;
    }
    
    if ((points[0][2]  - pointsCoef[0][0])-1 <= 0 && (points[0][3]  - pointsCoef[0][1])-1 <= 0) {
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(timerId);
        xCollision = '';
        yCollision = '';
        points = [];
        pointsCoef = [];
        outx = '';
        
        return;
        }
    }
    let timerId = setInterval(draw, 20);
};
}


// document.querySelector('.coor').onclick = collapse;

let app = new Painting();
app.initialize();