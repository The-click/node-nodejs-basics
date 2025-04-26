import fs from "fs";
import crypto from "crypto";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    try {
        const hashValue = await getHash(
            path.join(__dirname, "files", "fileToCalculateHashFor.txt")
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
