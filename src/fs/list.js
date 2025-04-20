import fs from "node:fs/promises";
import path from "node:path";

const list = async () => {
    try {
        const filePath = path.join(path.dirname("./"), "files");
        const files = await fs.readdir(filePath);

        for (const file of files) {
            console.log(file);
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }

        console.log(err);
    }
};

await list();
