import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    try {
        const writeStream = fs.createWriteStream(
            path.join(__dirname, "files", "fileToWrite.txt")
        );

        process.stdin.on("data", (data) => {
            writeStream.write(data, (error) => {
                if (error) {
                    throw error;
                }
            });
        });
    } catch (e) {
        console.log(e);
    }
};

await write();
