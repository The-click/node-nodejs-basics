import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    try {
        const filePath = path.join(__dirname, "files", "fileToRead.txt");
        const contents = await fs.readFile(filePath, { encoding: "utf8" });

        console.log(contents);
    } catch (err) {
        if (err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }

        console.log(err);
    }
};

await read();
