import express from 'express';
import router from './routes/index';
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'https://nw-tools.suyama.ne.jp',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/api', router);

app.listen(port);