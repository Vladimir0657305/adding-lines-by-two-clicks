let xCollision = '';
let yCollision = '';
let points = [];
let outx = '';
let outy = '';
let step = [];
let goal = 10000; // 10 сек
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
        // animate();
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
            // Save coordinates of line and path length in to the points array
            let deltax = Math.abs(startx - x);
            let deltay = Math.abs(starty - y);
            let temp = Math.sqrt(deltax * deltax + deltay * deltay);
            points.push([startx, starty, x, y, temp]);
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
            for (let i = 0; i< points.length; i++) {
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


let MouseContext = function(e) {
    e.preventDefault();
    // Drawing line
    // context.beginPath();
    // context.moveTo(startx, starty);
    // context.lineTo(startx, starty);
    
    // context.stroke();

    
    
    startx = '';
    starty = '';
    mouse.x = '';
    mouse.y = '';
    context.clearRect(0, 0, width, height);
}


// Function to get the dots of lines intersctions
function get_line_intersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y)
{
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





let time;
// функция линейной интерполяции между точками p1 и p2
// let lerp = (t, p) => [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]
// let lerp = (t, p) => [p[i][0] + (p[i][2] - p[i][0]) * t, p[i][1] + (p[i][3] - p[i][1]) * t]


// Collapse animation =================================================================================
function collapse() {
    requestAnimationFrame( collapse);
    var now = new Date().getTime(),
    dt = now - (time || now);
    console.log(time);
    time = now;

    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    console.log('time=', time)

    for (let i = 0; i < points.length; i++) {
        context.beginPath();
        context.moveTo(points[i][0], points[i][1]);
    

    // если время конца анимации еще не настало
    if (dt < goal) {
        requestAnimationFrame(collapse) // запрашиваем следующий кадр
        // growPath(t / goal * total); // рисуем ползущую линию
        let lerp = (t, p) => [p[i][0] + (p[i][2] - p[i][0]) * t, p[i][1] + (p[i][3] - p[i][1]) * t]
        context.lineTo(...lerp(dt / goal * points[i][4], points[i]));
    }
    // если анимация закончилась
    else {
        // рисуем замкнутую линию через все точки
        // points.forEach((pt, i) => i && context.lineTo(pt[0], pt[1]))
        // context.closePath();
    }
    }
    context.stroke();
    context.fillText((dt / goal).toFixed(2), 5, 10)
}

// function growPath(t) {
//     // длина пути между уже пройденными точками
//     let pathLen = 0;
//     for (let i = 1; i <= points.length; i++) {
//         let pt = points[i] || points[0];
//         // если точка уже пройдена
//         // if (t - pathLen > pt[2]) {
//         //     pathLen += pt[2]; // считаем пройденный путь
//         //     ctx.lineTo(pt[0], pt[1]); // рисуем полную линию
//         // }
//         // // если точка еще не достигнута 
//         // else {
//             // считаем конечную точку и выходим из цикла
//             return ctx.lineTo(...lerp((t - pathLen) / pt[2], points[i - 1], pt));
//         // }
//     }
// }

        

// for (let i = 0; i < points.length; i++)  {

//             // a = (points[i][0] + points[i][2]) / 2;
//             // b = (points[i][1] + points[i][3]) / 2;
//             console.log('==>', points[i]);
//             // drawLineTo(points[i][2], points[i][3], points[i][0], points[i][1], step[i]);

//                 // console.log('=!=!==>', points[i][0], points[i][1], points[i][2], points[i][3], error, error2)
//                 // break;
//                 context.beginPath();
//                 context.moveTo(points[i][0], points[i][1]);
//                 context.lineWidth = 3;
//                 context.lineTo(points[i][2], points[i][3]);
//                 context.moveTo(points[i][2], points[i][3]);
//                 context.lineWidth = 3;
//                 context.lineTo(points[i][0], points[i][1]);
//                 context.strokeStyle = "#ffffff";
//                 context.fillStyle = "#ffffff";
//                 context.fill();
//                 context.stroke();
            


//             // console.log('!!!!!!!!!!!!!!', points[i][0], points[i][1], points[i][2], points[i][3]);
//             // context.beginPath();
//             // context.moveTo(points[i][0], points[i][1]);
//             // context.lineWidth = 3;
//             // context.lineTo(a, b);
//             // context.moveTo(points[i][2], points[i][3]);
//             // context.lineWidth = 3;
//             // context.lineTo(a, b);
//             // context.strokeStyle = "#ffffff";
//             // context.fillStyle = "#ffffff";
//             // context.fill();
//             // context.stroke();
//             // i++
//         }  
//         // points = [];
//         // requestAnimationFrame( collapse, 60);
//     };

    
    
    
    

    
    

document.querySelector('.coor').onclick = collapse;





let app = new Painting();
app.initialize();