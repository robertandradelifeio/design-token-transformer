const childProcess = require('child_process');
const fs = require('fs');

// get all tokens in tokens folder
const dirents = fs.readdirSync('./tokens',{ withFileTypes: true });
// filter out non-directories
const tokens = dirents.filter(dirent => dirent.isFile()).map(dirent => dirent.name);

// if there are more than 3 '.' in the name, parse out platform and brand
if (tokens.length > 3) {
    tokens.map(token => {
        const [platform, brand, fileName] = token.split('.');
        const filePath = `./tokens/${platform}/${brand}/${fileName}`;
        fs.mkdirSync(`./tokens/${platform}/${brand}`, { recursive: true });
        fs.copyFileSync(`./tokens/${token}`, `${filePath}.tokens.json`);
    })
}

childProcess.execSync(`node ${__dirname}/transformTokens.js`);

