import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    try {
        const readStream = fs.createReadStream(
            path.join(__dirname, "files", "fileToRead.txt")
        );

        readStream.on("error", (err) => {
            throw err;
        });
        readStream.on("data", (chunk) => {
            process.stdout.write(chunk + "\n");
        });
        readStream.on("end", () => console.log("end"));
    } catch (e) {
        console.log(e);
    }
};

await read();
