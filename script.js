let xCollision = '';
let yCollision = '';
let mouse = [ x= '', y= '' ];
const block = '';
let points = [];

function Painting() {

    let canvas;
    let context;
    let width;
    let height;
    
    let dots = [];
    let startx = '';
    let starty = '';
    let endx = '';
    let endy = '';
    let x = '';
    let y = '';
    let colour = '#000000';

    this.initialize = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        let ctx = canvas.getContext("2d");

        width = document.getElementById("canvas").clientWidth;
        height = document.getElementById("canvas").clientHeight;

        canvas.width = width;
        canvas.height = height;
    
        canvas.addEventListener('click', MouseDown, false);
        
        // canvas.addEventListener('mousemove', MouseMove, false);
        

        // var canvas = document.querySelector("canvas");
        
        // var ctx = canvas.getContext("2d");
        
        // canvas.addEventListener("mousemove", function (e) {
        //     if (startx !== '' && starty !== '' && endx === '' && endy === '') {
        //     canvas.width = canvas.width;
        //     context.strokeStyle = "red";
        //     context.moveTo(startx, starty);
        //     context.lineTo(mouse.x, mouse.y);
        //     context.stroke();
        //     }}, false);
        // }

        canvas.addEventListener('mousemove', function (e) {
            if (startx !== '' && starty !== '' && endx === '' && endy === '') {
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            context.beginPath();
            context.moveTo(startx, starty);
            context.lineTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
            context.clearRect(0,0, width, height);
            context.stroke();
            
            // for (let i = 0; i < points.length; i++) {
            //     context.beginPath();
            //     context.moveTo(points[i][0], points[i][1]);
            //     context.lineTo(points[i][2], points[i][3]);
            //     context.stroke();
            //     console.log(points);
            // }
            
            }
        }, false);

        // canvas.addEventListener('dblclick', MouseDbl, false);
        // canvas.addEventListener('contextmenu', MouseOnContextMenu , false);
        
        canvas.addEventListener('contextmenu', function (e){
            e.preventDefault();
            // mouse.x = startx;
            // mouse.y = starty;
            // context.lineWidth = 1; 
            // context.clearRect(startx, starty, mouse.x, mouse.y);
            // context.strokeStyle = "transparent";
            // context.fillStyle = "transparent";
            startx = '';
            starty = '';
            mouse.x = '';
            mouse.y = '';
            // context.beginPath();
        } , false);
        
    }

        

    let MouseDown = function (e) {
        e.preventDefault();
        // let ClientRect = this.getBoundingClientRect();
        // mouse.x = e.clientX - ClientRect.left;
        // mouse.y = e.clientY - ClientRect.top;
        x = e.pageX - e.target.offsetLeft;
        y = e.pageY - e.target.offsetTop;
        
        if (startx == '' && starty == '') {
            startx = x;
            starty = y;
            context.beginPath();
            context.moveTo(startx, starty);
            
            // draw(startx, starty);
            // document.querySelector(".x").innerHTML = mouse.x;
            // console.log(mouse.x);
        }
        else if (startx !== '' && starty !== '' && endx === '' && endy === '') {
            endx = x;
            endy = y;
            
            const stroke = context.createLinearGradient(startx, starty, x, y);
            stroke.addColorStop(0, 'blue');
            stroke.addColorStop(1, 'red');
            context.strokeStyle = stroke;
            context.lineWidth = 1; 
            context.lineTo(endx, endy);
            context.stroke();
            context.fill();

            points.push([startx, starty, x, y]);
            // console.log(points);
            startx = '';
            starty = '';
            endx = '';
            endy = '';
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

            // for (let i = 0; i < points.length; i++) {
            //     context.beginPath();
            //     context.moveTo(points[i][0], points[i][1]);
            //     context.lineTo(points[i][2], points[i][3]);
            //     context.stroke();
            //     console.log(points);
            // }

        }
    }
    
    let MouseMove = function (e) {
        if (startx !== '' && starty !== '' && endx === '' && endy === '') {
            context.width = width;
            context.height = height;
            // let x = e.pageX - e.target.offsetLeft;
            // let y = e.pageY - e.target.offsetTop;
            mouse.x = e.pageX - e.target.offsetLeft;
            mouse.y = e.pageY - e.target.offsetTop;
            context.beginPath();
            context.moveTo(startx, starty);
            context.lineWidth = 1;
            context.strokeStyle = "red";
            context.fillStyle = "red";
            context.fill();
            context.lineTo(mouse.x, mouse.y);
            context.clearRect(0,0,width,height)
            context.stroke();
        }
    }
}




    // let MouseOnContextMenu = function (e) {
    //         e.preventDefault();
    //         startx = 0;
    //         starty = 0;
    //         mouse.x = '';
    //         mouse.y = '';
    //         context.beginPath();
    // }



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

let app = new Painting();
app.initialize();