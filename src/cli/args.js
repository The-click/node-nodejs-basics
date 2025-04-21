const parseArgs = () => {
    const argumentsList = [];
    let propString = "";

    process.argv.slice(2).forEach((arg) => {
        if (arg.startsWith("--")) {
            propString = arg;
        } else {
            propString += " is " + arg;
            argumentsList.push(propString);
        }
    });

    console.log(argumentsList.join(","));
};

parseArgs();
