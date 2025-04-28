import util from "node:util";

const parseArgs = () => {
    try {
        const { values, positionals } = util.parseArgs({ strict: false });
        let returnSting = [];

        Object.keys(values).forEach((key, index) =>
            returnSting.push(`--${key} is ${positionals[index]}`)
        );

        console.log(returnSting.join(", "));
    } catch (e) {
        console.log(e);
    }
};

parseArgs();
