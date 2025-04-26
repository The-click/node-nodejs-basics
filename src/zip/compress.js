import { pipeline } from "node:stream/promises";
import path from "path";
import { createGzip } from "node:zlib";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    try {
        const readStream = fs.createReadStream(
            path.join(__dirname, "files", "fileToCompress.txt")
        );
        const writeStream = fs.createWriteStream(
            path.join(__dirname, "files", "archive.gz")
        );
        const gzip = createGzip();

        await pipeline(readStream, gzip, writeStream);
    } catch (e) {
        console.log(e);
    }
};

await compress();
