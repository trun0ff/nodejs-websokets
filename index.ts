import * as Jimp from 'jimp';
import {httpServer} from './src/http_server';
import * as robot from 'robotjs';
import {WebSocket, WebSocketServer} from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
const webSocketPort =  process.env.WEBSOCKET_PORT ?? 8080;

// @ts-ignore
const wsServer = new WebSocketServer({port: webSocketPort});

wsServer.on('connection', function (ws: WebSocket){
    console.log("new client connected");
    // sending message
    ws.on("message",function (data: any){
        const { x, y } = robot.getMousePos()
        ws.send(`mouse_position ${data}`)
        console.log(`Client has sent us: ${data}`)
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
