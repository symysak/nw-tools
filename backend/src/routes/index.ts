import express from 'express';
import serverlist from './serverlist';

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
})

router.get("/serverlist", async (req, res) => {
    res.send(await serverlist());
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