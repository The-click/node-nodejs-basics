import fs from "node:fs/promises";
import path from "node:path";

const rename = async () => {
    try {
        const oldFilePath = path.join(
            path.dirname("./"),
            "files",
            "wrongFilename.txt"
        );
        const newFilePath = path.join(
            path.dirname("./"),
            "files",
            "properFilename.md"
        );

        if (await isFileExist(newFilePath)) {
            const error = new Error("File already exists");
            error.code = "FEXIST";
            throw error;
        }

        await fs.rename(oldFilePath, newFilePath);
    } catch (err) {
        if (err.code === "FEXIST" || err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }

        console.log(err);
    }
};

async function isFileExist(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        if (err.code === "ENOENT") {
            return false;
        }
        throw err;
    }
}

await rename();
