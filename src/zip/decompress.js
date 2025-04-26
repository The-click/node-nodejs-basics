import { pipeline } from "node:stream/promises";
import path from "path";
import { createUnzip } from "node:zlib";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    try {
        const readStream = fs.createReadStream(
            path.join(__dirname, "files", "archive.gz")
        );
        const writeStream = fs.createWriteStream(
            path.join(__dirname, "files", "fileToCompress.txt")
        );
        const unzip = createUnzip();

        await pipeline(readStream, unzip, writeStream);
    } catch (e) {
        console.log(e);
    }
};

await decompress();
