import { Worker } from "worker_threads";
import os from "node:os";

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
        const worker = new Worker("./worker.js", { workerData });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

await performCalculations();
