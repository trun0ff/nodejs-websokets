import * as Jimp from 'jimp';
import {httpServer} from './src/http_server';
import * as robot from 'robotjs';
import {WebSocket, WebSocketServer} from 'ws';
import {down, left, right, up} from "./src/mouse";

const HTTP_PORT = 3000;
const PRINT_SCREEN_ACTION = 'prnt_scrn';

const MOUSE_UP_ACTION = 'mouse_up';
const MOUSE_DOWN_ACTION = 'mouse_down';
const MOUSE_LEFT_ACTION = 'mouse_left';
const MOUSE_RIGHT_ACTION = 'mouse_right';
const MOUSE_POSITION_ACTION = 'mouse_position';

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
const webSocketPort =  process.env.WEBSOCKET_PORT ?? 8080;

// @ts-ignore
const wsServer = new WebSocketServer({port: webSocketPort});

wsServer.on('connection', function (ws: WebSocket){
    console.log("new client connected");
    // sending message
    ws.on("message",function (data: string) {
        console.log(data);
        const dataArray = data.toString().split(' ');
        const action = dataArray[0];
        const value = parseInt(dataArray[1] ?? 0);

        switch (action) {
            case MOUSE_UP_ACTION:
                up(value);
                ws.send(`${data}`);
                break;
            case MOUSE_DOWN_ACTION:
                down(value);
                ws.send(`${data}`);
                break;
            case MOUSE_LEFT_ACTION:
                left(value);
                ws.send(`${data}`);
                break;
            case MOUSE_RIGHT_ACTION:
                right(value);
                ws.send(`${data}`);
                break;
            case MOUSE_POSITION_ACTION:
                let { x, y } = robot.getMousePos();
                ws.send(`mouse_position {${x},${y}}`);
                break;
            case PRINT_SCREEN_ACTION:
                break;
        }
    });
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Error occurred")
    }
});
