import fs from 'fs';

const serverlist = async () => {
    const servers = fs.readFileSync("./cache.json", "utf8");
    return JSON.parse(servers);
}

export default serverlist;