import fs from "fs";
import path from "node:path";

const write = async () => {
    try {
        const writeStream = fs.createWriteStream(
            path.join(path.dirname("./"), "files", "fileToWrite.txt")
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
