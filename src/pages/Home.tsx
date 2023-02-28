import Dashboard from "../templates/Dashboard";
import { Helmet } from "react-helmet-async";

function Home() {
    const titleTag="Network Tools - SUYAMA";
    return (
        <div>
            <Helmet>
                <title>{titleTag}</title>
            </Helmet>
            <Dashboard title="ホーム" >
                <a>test</a>
            </Dashboard>
        </div>
    )
}
export default Home;