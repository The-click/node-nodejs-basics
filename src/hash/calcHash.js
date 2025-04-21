import fs from "fs";
import crypto from "crypto";
import path from "node:path";

const calculateHash = async () => {
    try {
        const hashValue = await getHash(
            path.join(path.dirname("./"), "files", "fileToCalculateHashFor.txt")
        );
        console.log(hashValue);
    } catch (error) {
        console.error("Error:", error);
    }
};

const getHash = (path) =>
    new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256");
        const rs = fs.createReadStream(path);
        rs.on("error", reject);
        rs.on("data", (chunk) => hash.update(chunk));
        rs.on("end", () => resolve(hash.digest("hex")));
    });

await calculateHash();
