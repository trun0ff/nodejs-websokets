import * as robot from 'robotjs';

const screenSize = robot.getScreenSize();
const height = screenSize.height;
const width = screenSize.width-1;

const up = (dy:number) => {
    let { x, y } = robot.getMousePos();
    y = prepareDy(y-dy);
    robot.moveMouseSmooth(x, y);
};

const down = (dy:number) => {
    let { x, y } = robot.getMousePos();
    y = prepareDy(y+dy);
    robot.moveMouseSmooth(x, y);
};

const left = (dx:number) => {
    let { x, y } = robot.getMousePos();
    x = prepareDx(x-dx);
    robot.moveMouseSmooth(x, y);
};

const right = (dx:number) => {
    let { x, y } = robot.getMousePos();
    x = prepareDx(x+dx);
    robot.moveMouseSmooth(x, y);
};

function prepareDy(value:number):number {
    value = value > height ? height : value;
    value = value < 1 ? 1 :value;
    return value;
}

function prepareDx(value:number):number {
    value = value > width ? width : value;
    value = value < 1 ? 1 :value;
    return value;
}

export {
    up, left, down, right
};