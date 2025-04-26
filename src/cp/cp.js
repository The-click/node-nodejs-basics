import { fork } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    try {
        const filePath = path.join(__dirname, "files", "script.js");
        const child = fork(filePath, args, { stdio: "pipe" });

        child.stdout.on("data", (data) => {
            console.log(`stdout: ${data.slice(0, -1)}`);
        });

        child.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on("close", (code) => {
            console.log(`Дочерний процесс завершился с кодом ${code}`);

            if (code != 0) {
                throw new Error("Дочерний процесс завершился с ошибкой");
            }
        });

        process.stdin.on("data", (data) => {
            child.stdin.write(data);
        });
    } catch (e) {
        console.log(e);
    }
};

spawnChildProcess(["someArgument1", "someArgument2"]);
