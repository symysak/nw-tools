import express from 'express';
import router from './routes/index';
import { updateServerlist } from './updateServerlist';
const cors = require('cors');
const cron = require('node-cron');

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

// 実行時に一度だけサーバリストの更新を実行
updateServerlist();
// node-cronでサーバリストの更新を実行
cron.schedule('0 1 * * * *', () => {
    updateServerlist();
});