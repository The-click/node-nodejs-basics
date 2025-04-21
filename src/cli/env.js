const parseEnv = () => {
    let returnString = "";

    Object.keys(process.env).forEach((key) => {
        if (key.startsWith("RSS_")) {
            returnString += `${key}=${process.env[key]}; `;
        }
    });

    console.log(returnString);
};

parseEnv();
