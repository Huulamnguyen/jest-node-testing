/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

//TODO: Make Markov machine from text and generate text from it.
function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
};

// TODO: Read file and generate text from it.
function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.erro(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data)
        };
    });
};

// TODO: Read URL and make text from it.
async function makeURLText(url) {
    let res;
    try {
        res = await axios.get(url);
    } catch (err){
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    };
    generateText(res.data)
};

// TODO: Interpret cmdline to decice what to do
let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
}

else if (method = "url") {
    makeURLText(url);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}