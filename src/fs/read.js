import fs from "node:fs/promises";
import path from "node:path";

const read = async () => {
    try {
        const filePath = path.join(
            path.dirname("./"),
            "files",
            "fileToRead.txt"
        );

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
