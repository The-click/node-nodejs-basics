import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    try {
        const filePath = path.join(__dirname, "files", "fresh.txt");

        await fs.writeFile(filePath, "I am fresh and young", {
            flag: "wx",
        });
    } catch (err) {
        if (err.code === "EEXIST") {
            throw new Error("FS operation failed");
        }

        console.log(err);
    }
};

await create();
