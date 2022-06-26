import * as robot from "robotjs";


const screenSize = robot.getScreenSize();
const screenHeight = screenSize.height;
const screedWidth = screenSize.width-1;

const circle = (radius:number) => {
    if(checkRadius(radius)) {
        const { x, y } = robot.getMousePos();
        robot.mouseToggle("down", "left");
        let steps = 2*Math.PI*radius;
        let centerX = x+radius;
        let centerY = y;

        for (let i = 0; i < steps; i++) {
            robot.moveMouseSmooth(
                (centerX + radius * Math.cos(2 * Math.PI * i / steps)),
                (centerY + radius * Math.sin(2 * Math.PI * i / steps))
            );
        }
        robot.mouseToggle("up", "left");
    }
};

const square = (size:number) => {
    if(checkSquareSize(size)) {
        const { x, y } = robot.getMousePos();
        robot.mouseToggle("down", "left");
        let sqX = x;
        let sqY = y;
        for (let i = 0; i < size; i++) {
            robot.moveMouseSmooth(sqX++, sqY);
        }
        for (let i = 0; i < size; i++) {
            robot.moveMouseSmooth(sqX, sqY++);
        }
        for (let i = 0; i < size; i++) {
            robot.moveMouseSmooth(sqX--, sqY);
        }
        for (let i = 0; i < size; i++) {
            robot.moveMouseSmooth(sqX, sqY--);
        }
        robot.mouseToggle("up", "left");
    }
};

const rectangle = (width:number, height:number) => {
    if(checkRectSize(width, height)) {
        const { x, y } = robot.getMousePos();
        robot.mouseToggle("down", "left");
        let sqX = x;
        let sqY = y;
        for (let i = 0; i < width; i++) {
            robot.moveMouseSmooth(sqX++, sqY);
        }
        for (let i = 0; i < height; i++) {
            robot.moveMouseSmooth(sqX, sqY++);
        }
        for (let i = 0; i < width; i++) {
            robot.moveMouseSmooth(sqX--, sqY);
        }
        for (let i = 0; i < height; i++) {
            robot.moveMouseSmooth(sqX, sqY--);
        }
        robot.mouseToggle("up", "left");
    }
};



function checkRadius(value:number): boolean
{
    const { x, y } = robot.getMousePos();
    if(x+(2*value) > screedWidth
    || y + value < 0
    || y - value > screenHeight) {
        console.log('Your circle goes out of screen borders')
        return false;
    }
    return true;
}

function checkSquareSize(value:number): boolean
{
    const { x, y } = robot.getMousePos();
    if(x+value > screedWidth
    || y - value > screenHeight) {
        console.log('Your square goes out of screen borders')
        return false;
    }
    return true;
}

function checkRectSize(width:number, height:number): boolean
{
    const { x, y } = robot.getMousePos();
    if(x+width > screedWidth
    || y - height > screenHeight) {
        console.log('Your square goes out of screen borders')
        return false;
    }
    return true;
}

export {circle, square, rectangle};