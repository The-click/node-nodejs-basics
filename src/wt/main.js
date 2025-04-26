import { Worker } from "worker_threads";
import os from "node:os";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    try {
        const availableWorkerNum = os.availableParallelism();
        const promiseWorkers = [];

        for (let numWorker = 0; availableWorkerNum > numWorker; numWorker++) {
            promiseWorkers.push(runWorker(10 + numWorker));
        }

        const result = await Promise.all(promiseWorkers);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, "worker.js"), {
            workerData,
        });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

await performCalculations();
