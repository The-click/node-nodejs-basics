import fs from "node:fs/promises";
import path from "node:path";

const copy = async () => {
    try {
        const sourceDirPath = path.join(path.dirname("./"), "files");
        const destinationDirPath = path.join(path.dirname("./"), "files_copy");

        await fs.cp(sourceDirPath, destinationDirPath, {
            recursive: true,
            errorOnExist: true,
            force: false,
            mode: fs.constants.COPYFILE_EXCL,
        });
    } catch (err) {
        if (err.code === "ERR_FS_CP_EEXIST" || err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }

        console.log(err);
    }
};

await copy();
