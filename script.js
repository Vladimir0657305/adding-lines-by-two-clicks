    let xcol = '';
    let ycol = '';
let mouse = { x: 0, y: 0 };
const block = '';
function OilPainting() {

    let canvas;
    let context;

    let width;
    let height;
    let points = [];
    let startx = '';
    let starty = '';
    let endx = '';
    let endy = '';
    let x = '';
    let y = '';
    

    
    // let startPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // let prevPos = { x: window.innerWidth / 2, y: 0 };
    let startPos = { x: '' , y: ''  };
    let prevPos = { x: 0, y: 0 };

    let dist = { x: 0, y: 0 };
    // let colour = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let colour = '#000000';


    this.initialize = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        const block = document.querySelector(".block").getContext('2d');
        // block = canvas.getContext('2d');
        // const drawingCanvas = document.getElementById('canvas');
        // let ctx = drawingCanvas.getContext('2d');

        width = document.getElementById("canvas").clientWidth;
        height = document.getElementById("canvas").clientHeight;

        canvas.width = width;
        canvas.height = height;
    
        canvas.addEventListener('click', MouseDown, false);
        canvas.addEventListener('mousemove', MouseMove, false);
        // canvas.addEventListener('mousemove', function (e) {
        //     let x = e.pageX - e.target.offsetLeft;
        //     let y = e.pageY - e.target.offsetTop;
        //     console.log('====>', x, y);
        //     context.lineTo(e.pageX, e.pageY);
        //     context.stroke();
        // }, false);
        canvas.addEventListener('dblclick', MouseDbl, false);
        // animate(canvas, context);
    }

        

    let MouseDown = function (e) {
        e.preventDefault();
        // let ClientRect = this.getBoundingClientRect();
        // mouse.x = e.clientX - ClientRect.left;
        // mouse.y = e.clientY - ClientRect.top;
        // colour = '#' + Math.floor(Math.random() * 16777215).toString(16);
        x = e.pageX - e.target.offsetLeft;
        y = e.pageY - e.target.offsetTop;
        
        
        if (startx == '' && starty == '') {
            startx = x;
            starty = y;
            context.beginPath();
            context.moveTo(startx, starty);

            document.querySelector(".x").innerHTML = mouse.x;
            block.lineWidth = 1;
            block.lineTo(mouse.x, mouse.y);
            block.strokeStyle = "red";
            block.fillStyle = "red";
            block.fill();
            block.stroke();
            
        }
        
        else if (startx != '' && starty != '' && endx == '' && endy == '') {
            endx = x;
            endy = y;
            context.lineTo(endx, endy);
            // console.log(startx, starty, endx, endy);
        // context.closePath();

        const stroke = context.createLinearGradient(startx, starty, x, y);
            stroke.addColorStop(0, 'blue');
            stroke.addColorStop(1, 'red');
            context.strokeStyle = stroke;
            context.lineWidth = 1; 
        
        context.stroke();
        context.fill();

        points.push([startx, starty, x, y]);
        console.log(points);
        startx = '';
        starty = '';
        endx = '';
        endy = '';
        console.log('=-=-=->',points[0]);
        console.log('-=-=-=>',points[1]);
            // console.log('-=!!!!-=-=>', ...points[0], ...points[1]);
            for (let i = 0; i < points.length; i++) {
                for (let k = i; k < points.length; k++) {
                    get_line_intersection(...points[i], ...points[k]);
                    // Math.round()
                    // console.log('!!!!!!!!!', Math.round(xcol), Math.round(ycol));
                    context.beginPath();
                    // context.moveTo(Math.round(xcol), Math.round(ycol));
                    context.moveTo(xcol, ycol);
                    context.arc(xcol, ycol, 4, 0, 2 * Math.PI);
                    context.lineWidth = 1;
                    context.lineTo(xcol, ycol);
                    context.strokeStyle = "red";
                    context.fillStyle = "red";
                    context.fill();
                    context.stroke();
                }
            }
                
            
            
        }
    }
    


    let MouseMove = function (e) {
        // drawingCanvas = document.getElementById('canvas');
        // ctx = drawingCanvas.getContext('2d');
        if (startx !== '' && starty !== '') {
            block.width = canvas.width;
            block.height = canvas.height;
            // let x = e.pageX - e.target.offsetLeft;
            // let y = e.pageY - e.target.offsetTop;
            mouse.x = e.pageX - e.target.offsetLeft;
            mouse.y = e.pageY - e.target.offsetTop;
            
            // blocktext.clearRect(0, 0, innerWidth, innerHeight);
            // block.beginPath();
            // block.moveTo(startx, starty);
            // block.strokeStyle = "red";
            // block.lineWidth = 1; 
            // block.lineTo(x, y);
            // block.stroke();
        }
    }


    let MouseDbl = function (e) {
        e.preventDefault();
        context.clearRect(0, 0, width, height);
    }

}

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
        xcol = Math.round(p0_x + (t * s1_x));
        ycol = Math.round(p0_y + (t * s1_y));
    }

    return 0; // No collision
}

let app = new OilPainting();
app.initialize();