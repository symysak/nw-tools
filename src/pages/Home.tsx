import { title } from "process";
import Dashboard from "../templates/Dashboard";
import { Helmet } from "react-helmet-async";
import { Typography } from "@mui/material";

function Home() {
    return (
        <div>
            <Helmet>
                <title>{"Network Tools | SUYAMA"}</title>
            </Helmet>
            <Dashboard title={"Network Tools"} >
                <Typography color="inherit" variant="body2" component="p">
                    個人的に欲しいなと思ったネットワーク系のツールをいろいろ作ってまとめているサイト。
                </Typography>
            </Dashboard>
        </div>
    )
}
export default Home;