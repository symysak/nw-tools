import Dashboard from "../templates/Dashboard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";


const OoklaServerList = () => {
    const [data, setData] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios("https://ookla-serverlist-backend.suyamas.jp/api/serverlist");
            setLastUpdated(res.data.pop().lastUpdated);
            setData(res.data);
        }
        fetchData();
    }, [])
    
    const titleTag="Ooklaサーバリスト-Network Tools|SUYAMA";

    return (
        <div>
            <Helmet>
                <title>{titleTag}</title>
            </Helmet>
            <Dashboard title="Ooklaサーバリスト" >
                <p>Ookla Speedtest.netのサーバリストです。
                    speedtest-cliのサーバID指定の際等にお使い下さい</p>
                <TableContainer component={Paper} sx={{overflow: "auto"}}>
                    <a>最終更新: {lastUpdated}. 1h毎に更新しています</a>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{minWidth:"82px"}}>ID</TableCell>
                                <TableCell style={{minWidth:"170px"}}>サーバ名</TableCell>
                                <TableCell style={{minWidth:"154px"}}>ロケーション</TableCell>
                                <TableCell style={{minWidth:"154px"}}>ホスト</TableCell>
                                <TableCell style={{minWidth:"154px"}}>ウェブサイト</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow key={row.id} >
                                        <TableCell align="left">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.location}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.host}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.website}
                                        </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dashboard>
        </div>
    )
}
export default OoklaServerList;