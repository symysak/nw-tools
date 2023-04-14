import { title } from "process";
import Dashboard from "../templates/Dashboard";
import { Helmet } from "react-helmet-async";
import { Typography } from "@mui/material";

function Home() {
    const titleTag="ホーム";
    return (
        <div>
            <Helmet>
                <title>{titleTag + " - Network Tools | SUYAMA"}</title>
            </Helmet>
            <Dashboard title={titleTag} >
                <Typography color="inherit" variant="body2" component="p">
                    個人的に欲しいなと思ったネットワーク系のツールをいろいろ作ってまとめているサイト。
                </Typography>
            </Dashboard>
        </div>
    )
}
export default Home;