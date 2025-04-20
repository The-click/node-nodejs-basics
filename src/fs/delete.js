import fs from "node:fs/promises";
import path from "node:path";

const remove = async () => {
    try {
        const filePath = path.join(
            path.dirname("./"),
            "files",
            "fileToRemove.txt"
        );

        await fs.rm(filePath);
    } catch (err) {
        if (err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }

        console.log(err);
    }
};

await remove();
