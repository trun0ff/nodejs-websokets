import Jimp from "jimp";
import { getMousePos, screen } from "robotjs";

const getScreen = async () => {
    const { x, y } = getMousePos();
    const piece = screen.capture(x - 100, y - 100, 200, 200);
    const width = piece.byteWidth / piece.bytesPerPixel;
    const height = piece.height;
    const image = new Jimp(width, height);
    let red: number;
    let green: number;
    let blue: number;
    piece.image.forEach((byte: number, i: number) => {
        const mod = i % 4;
        if (mod === 0) {
            blue = byte;
            return;
        }

        if (mod === 1) {
            green = byte;
            return;
        }

        if (mod === 2) {
            red = byte;
            return;
        }

        image.bitmap.data[i - 3] = red;
        image.bitmap.data[i - 2] = green;
        image.bitmap.data[i - 1] = blue;
        image.bitmap.data[i] = 255;
    });

    const data = await image.getBase64Async(Jimp.MIME_PNG);
    return data.split(",")[1];
};

export {getScreen};