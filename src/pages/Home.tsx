import { title } from "process";
import Dashboard from "../templates/Dashboard";
import { Helmet } from "react-helmet-async";

function Home() {
    const titleTag="ホーム";
    return (
        <div>
            <Helmet>
                <title>{titleTag + " - Network Tools | SUYAMA"}</title>
            </Helmet>
            <Dashboard title={titleTag} >
                <a>test</a>
            </Dashboard>
        </div>
    )
}
export default Home;