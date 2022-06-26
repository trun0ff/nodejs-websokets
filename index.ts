import {httpServer} from './src/http_server';
import {WebSocket, WebSocketServer} from 'ws';
import {Readable, Writable} from "stream";
import {__handleAction} from "./src/controller";

const HTTP_PORT = 3000;
const WEB_SOCKET_PORT =  process.env.WEBSOCKET_PORT ?? 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Websocket works on ${WEB_SOCKET_PORT} port!`);

httpServer.listen(HTTP_PORT);

// @ts-ignore
const wsServer = new WebSocketServer({port: WEB_SOCKET_PORT});

wsServer.on('connection', function (ws: WebSocket){
    console.log("new client connected");
    const readableWsStream = new Readable({
        read(){}
    });
    const writableWsStream = new Writable({
        write(chunk, enc, next) {
            __handleAction(chunk, readableWsStream);
            next();
        }
    });

    readableWsStream.on('data', (chunk) => {
        ws.send(chunk.toString());
    });

    ws.on("message",function (data: string) {
        writableWsStream.write(data);
    });
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Error occurred")
    }
});
