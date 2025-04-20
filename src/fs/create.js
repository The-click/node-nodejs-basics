import fs from "node:fs/promises";
import path from "node:path";

const create = async () => {
    try {
        const filePath = path.join(path.dirname("./"), "files", "fresh.txt");

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
