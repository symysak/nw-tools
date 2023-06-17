import fs from 'fs';

const serverlist = async () => {
    const serverlist = fs.readFileSync("./cache.json", "utf8");
    return JSON.parse(serverlist);
}

export default serverlist;