const axios = require('axios');
import fs from 'fs';
import http from 'http';
const dns = require('dns');
require('dotenv').config();


const getUrl = async (url: string) => {
    let a: string = "default";
    const agent = new http.Agent({ family: 4 });
    try {
        const response = await axios.get(url , { httpAgent: agent, timeout: 2000 })
        // レスポンスヘッダのホスト名を返す
        return response.request.res.responseUrl;
    }
    catch (error) { 
        return url; 
    }
}

const getData = async () => {
    const url = "https://www.speedtest.net/api/js/servers?search=japan&limit=100"
    try {
        const response = await axios.get(url);
        return JSON.parse(JSON.stringify(response.data));
    }
    catch (error) {
        return {message: "error"}; 
    }
}

const ipInfo = async (ip: string) => {
    const url = process.env.IPINFOIO_API_URL + ip + "?token=" + process.env.IPINFOIO_API_TOKEN;
    if(ip !== "error"){
        try {
            const response = await axios.get(url);
            const json = JSON.parse(JSON.stringify(response.data));
            if(json.hostname === undefined){
                json.hostname = "無し";
            }
            return json;
        }
        catch (error) {
            return {ip: "API-error", hostname: "API-error", org: "API-error"};
        }
    }
    else{
        return {ip: "無し", hostname: "無し", org: "無し"};
    }
}

const dnsPromises = dns.promises;
const getIp = async (host: string, ver: number) => {
    try{
        const response = await dnsPromises.lookup(host, { family: ver });
        return response.address;
    }
    catch (error) {
        return "error";
    }
}

export async function updateServerlist() { 
    let json = await getData();
    let list = [];
    for (let i = 0; i < json.length + 1; i++){
        if(i < json.length){
            if(json[i].country !== "Japan"){
                continue;
            }
            //const fqdnWithoutPort = json[i].host.replace(".prod.hosts.ooklaserver.net:8080", "")
            const fqdnWithoutPort = json[i].url.replace("http:\/\/", "").replace("https:\/\/", "").replace(":8080\/speedtest\/upload.php", "");
            const ipv4 = await ipInfo(await getIp(fqdnWithoutPort, 4));
            const ipv6 = await ipInfo(await getIp(fqdnWithoutPort, 6));
            let push = {
                id: json[i].id,
                name: json[i].sponsor, //server name
                location: json[i].name, //location
                website: await getUrl("https://www.speedtest.net/api/js/perform-redirect?server_id=" + json[i].id),
                host: json[i].host.replace(".prod.hosts.ooklaserver.net", ""), //url
                ipv4: ipv4.ip + "(" + ipv4.hostname + ")",
                ipv6: ipv6.ip + "(" + ipv6.hostname + ")",
                ipv4_asn: ipv4.org,
                ipv6_asn: ipv6.org,
            }
            list.push(push);
        }
        else{
            let push = {
                lastupdated: new Date().toLocaleString()
            }
            list.push(push);
        }
    }
    fs.writeFileSync("./cache.json", JSON.stringify(list));
}