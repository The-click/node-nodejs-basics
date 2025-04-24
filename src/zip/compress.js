import { pipeline } from "node:stream/promises";
import path from "path";
import { createGzip } from "node:zlib";
import fs from "fs";

const compress = async () => {
    try {
        const readStream = fs.createReadStream(
            path.join(path.dirname("./"), "files", "fileToCompress.txt")
        );
        const writeStream = fs.createWriteStream(
            path.join(path.dirname("./"), "files", "archive.gz")
        );
        const gzip = createGzip();

        await pipeline(readStream, gzip, writeStream);
    } catch (e) {
        console.log(e);
    }
};

await compress();
