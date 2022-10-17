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

        width = document.getElementById("canvas").clientWidth;
        height = document.getElementById("canvas").clientHeight;

        canvas.width = width;
        canvas.height = height;
    
        canvas.addEventListener('click', MouseDown, false);
        // canvas.addEventListener('mousemove', MouseMove, false);
        // canvas.addEventListener('dblclick', MouseDbl, false);
        
    }

    let MouseDown = function (e) {
        e.preventDefault();
        // colour = '#' + Math.floor(Math.random() * 16777215).toString(16);
        let x = e.pageX - e.target.offsetLeft;
        let y = e.pageY - e.target.offsetTop;
        // context.fillStyle = colour;
        // context.strokeStyle = colour;
        
        if (startx == '' && starty == '') {
            startx = x;
            starty = y;
            context.beginPath();
            context.moveTo(startx, starty);
            
        }
        
        else if (startx != '' && starty != '' && endx == '' && endy == '') {
            endx = x;
            endy = y;
            context.lineTo(endx, endy);
            // console.log(startx, starty, endx, endy);
        // context.closePath();
        context.stroke();
        context.fill();

        points.push([startx, starty, x, y]);
        console.log(points);
        startx = '';
        starty = '';
        endx = '';
        endy = '';
    }
    
    
    }
    
                        
    let MouseMove = function (e) {
        let x = e.pageX - e.target.offsetLeft;
        let y = e.pageY - e.target.offsetTop;
        console.log(x, y);
                                            // let distance1 = (prevPos.x - startPos.x) +
                                            //     (prevPos.y - startPos.y);
                                            // console.log(distance1);

        // let a = distance * 10 * (Math.pow(Math.random(), 2) - 0.5);

        // let r = Math.random() - 0.5;

        let size = (Math.random() * 15) / distance;

        // dist.x = (prevPos.x - startPos.x) * Math.sin(0.5) + startPos.x;
        // dist.y = (prevPos.y - startPos.y) * Math.cos(0.5) + startPos.y;
        dist.x = prevPos.x ;
        dist.y = prevPos.y;

                                            startPos.x = prevPos.x;
                                            startPos.y = prevPos.y;

                                            prevPos.x = (e.layerX);
                                            prevPos.y = (e.layerY);
                                            // console.log(e.layerX, e.layerY)
        // ------- Draw -------
        let lWidth = (Math.random() + 20 / 10 - 0.5) * size + (1 - Math.random() + 30 / 20 - 0.5) * size;
        // context.lineWidth = lWidth;
        // context.strokeWidth = lWidth;
        context.lineWidth = 1;
        context.strokeWidth = 1;

        // context.lineCap = 'round';
        // context.lineJoin = 'round';

        // context.beginPath();
        // context.moveTo(startPos.x, startPos.y);
        // context.quadraticCurveTo(dist.x, dist.y, prevPos.x, prevPos.y);

        // context.fillStyle = colour;
        // context.strokeStyle = colour;

        // context.moveTo(startPos.x + a, startPos.y + a);
        // context.lineTo(startPos.x + r + a, startPos.y + r + a);

        // context.stroke();
        // context.fill();

        // context.closePath();

        // context.beginPath();
        // context.moveTo(20, 20);
        // context.lineTo(20, 100);
        // context.lineTo(70, 100);
        // context.closePath();
        // context.stroke();
        // context.fillStyle = "red";
        // context.fill();
    }

    

    let MouseDbl = function (e) {
        e.preventDefault();
        context.clearRect(0, 0, width, height);
    }

}

let app = new OilPainting();
app.initialize();