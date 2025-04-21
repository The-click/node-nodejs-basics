import fs from "fs";
import path from "node:path";

const read = async () => {
    try {
        const rs = fs.createReadStream(
            path.join(path.dirname("./"), "files", "fileToRead.txt")
        );

        rs.on("error", (err) => {
            throw err;
        });
        rs.on("data", (chunk) => {
            process.stdout.write(chunk + "\n");
        });
        rs.on("end", () => console.log("end"));
    } catch (e) {
        console.log(e);
    }
};

await read();
