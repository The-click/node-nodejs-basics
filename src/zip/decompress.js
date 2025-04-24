import { pipeline } from "node:stream/promises";
import path from "path";
import { createUnzip } from "node:zlib";
import fs from "fs";

const decompress = async () => {
    try {
        const readStream = fs.createReadStream(
            path.join(path.dirname("./"), "files", "archive.gz")
        );
        const writeStream = fs.createWriteStream(
            path.join(path.dirname("./"), "files", "fileToCompress.txt")
        );
        const unzip = createUnzip();

        await pipeline(readStream, unzip, writeStream);
    } catch (e) {
        console.log(e);
    }
};

await decompress();
