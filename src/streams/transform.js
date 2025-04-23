import { Transform, pipeline } from "node:stream";

const transform = async () => {
    class ReverseTransform extends Transform {
        _transform(chunk, encoding, callback) {
            const splitString = chunk
                .toString()
                .split("")
                .slice(0, -1)
                .reverse();
            splitString.push("\n");
            this.push(splitString.join(""));
            callback();
        }
    }
    const reverseTransform = new ReverseTransform();

    pipeline(process.stdin, reverseTransform, process.stdout, (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        } else {
            console.log("Pipeline succeeded.");
        }
    });
};

await transform();
