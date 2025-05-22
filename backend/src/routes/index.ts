import express from 'express';
import serverlist from './serverlist';
import { ipInfo } from '../updateServerlist';

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "It's working!" });
})

router.get("/serverlist", async (req, res) => {
    res.send(await serverlist());
})

router.get("/myip", async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const clientIp = typeof ip === 'string' ? ip.split(',')[0].trim() : '';
    
    try {
        const ipData = await ipInfo(clientIp);
        res.send(ipData);
    } catch (error) {
        res.status(500).send({ error: "Failed to get IP information" });
    }
})

app.use((req, res) => {
    res.status(404);
    res.render("Error 404", {
        param: {
            status: 404,
            message: "Not Found"
        }
    })
})

export default router;