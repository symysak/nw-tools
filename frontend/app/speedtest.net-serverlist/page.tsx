"use client";

import React from "react";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SpeedIcon from '@mui/icons-material/Speed';
import Link from '@mui/material/Link';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer } from '@mui/material';
import {Skeleton} from "@mui/material";


const OoklaServerList = () => {
    const [data, setData] = useState<ServerList>([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const [loaded, setLoaded] = useState(false);

    type ServerInfo = {
        id: number;
        name: string;
        location: string;
        website: string;
        host: string;
        ipv4: string;
        ipv6: string;
        ipv4_asn: string;
        ipv6_asn: string;
    }
    type ServerList = ServerInfo[];

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios("https://nw-tools-backend.suyama.ne.jp/api/serverlist" + "?nocache=" + new Date().getTime());
            setLastUpdated(res.data.pop().lastupdated);
            setData(res.data);
        }
        fetchData();
        setTimeout(() => setLoaded(true), 500);
        /*
        setData([
            {
                "id": 1234,
                "name": "Test",
                "location": "Tokyo",
                "website": "https://www.speedtest.net/api/js/perform-redirect?server_id=test",
                "host": "example.com:8080",
                "ipv4": "10.10.10.1(test.example.com)",
                "ipv6": "fe80::1(無し)",
                "ipv4_asn": "AS11111 Example, Inc.",
                "ipv6_asn": "AS111111 Example, Inc."
            },
            {
                "id": 1234,
                "name": "Test",
                "location": "Tokyo",
                "website": "https://www.speedtest.net/api/js/perform-redirect?server_id=test",
                "host": "example.com:8080",
                "ipv4": "10.10.10.1(test.example.com)",
                "ipv6": "fe80::1(無し)",
                "ipv4_asn": "AS11111 Example, Inc.",
                "ipv6_asn": "AS111111 Example, Inc."
            }
        ]);
        */
    }, [])


    return (
        <div>
            <p>speedtest.netのサーバリストです。
                speedtest-cliのサーバID指定の際にお使い下さい</p>
            <p>スピードテストのご利用は計画的に。</p>
            {loaded ? (
                <TableContainer component={Paper}>
                    <a>server_count: {data.length}</a>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: "104px" }}>ID</TableCell>
                                <TableCell style={{ minWidth: "160px" }}>サーバ名</TableCell>
                                <TableCell style={{ minWidth: "117px" }}>ロケーション</TableCell>
                                <TableCell style={{ minWidth: "100px" }}>ウェブサイト</TableCell>
                                <TableCell style={{ maxWidth: "50px" }}>測定ボタン</TableCell>
                                <TableCell style={{ minWidth: "200px" }}>ホスト</TableCell>
                                <TableCell style={{ minWidth: "300px" }}>IPv4 Addr(RDNS)</TableCell>
                                <TableCell style={{ minWidth: "250px" }}>IPv6 Addr(RDNS)</TableCell>
                                <TableCell style={{ minWidth: "250px" }}>IPv4 ASN</TableCell>
                                <TableCell style={{ minWidth: "250px" }}>IPv6 ASN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: ServerInfo) => (
                                <TableRow key={row.id} >
                                    <TableCell align="right">
                                        {row.id}
                                        <IconButton size="small" onClick={() => navigator.clipboard.writeText(String(row.id))}>
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.location}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Link href={row.website}>{row.website}</Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton size="small" href={"https://www.speedtest.net/server/" + row.id}>
                                            <SpeedIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.host}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.ipv4}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.ipv6}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.ipv4_asn === "無し" || row.ipv4_asn === "API-error"
                                            ? row.ipv4_asn
                                            : <Link href={"https://bgp.he.net/" + row.ipv4_asn.split(" ", 1)[0]}>{row.ipv4_asn}</Link>
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.ipv6_asn === "無し" || row.ipv6_asn === "API-error"
                                            ? row.ipv6_asn
                                            : <Link href={"https://bgp.he.net/" + row.ipv6_asn.split(" ", 1)[0]}>{row.ipv6_asn}</Link>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <a>最終更新: {lastUpdated} (UTC). 1時間毎に更新</a>
                </TableContainer>
            ) : (<Skeleton variant="rectangular" width="100%" height="100%" />
            )
            }
        </div>
    )
}
export default OoklaServerList;
