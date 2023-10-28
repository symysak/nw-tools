"use client";

import React from "react";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SpeedIcon from '@mui/icons-material/Speed';
import Link from '@mui/material/Link';
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import {Skeleton} from "@nextui-org/react";


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

    const titleTag="speedtest.netサーバリスト";

    return (
        <div>
                <p>speedtest.netのサーバリストです。
                    speedtest-cliのサーバID指定の際にお使い下さい</p>
                <p>スピードテストのご利用は計画的に。</p>
                <Skeleton isLoaded={loaded}>
                    <Table 
                        isCompact
                        topContent={<a>server_count: {data.length}</a>}
                        bottomContent={<a>最終更新: {lastUpdated} (UTC). 1時間毎に更新</a>}
                    >
                        <TableHeader>
                            <TableColumn style={{minWidth:"104px"}}>ID</TableColumn>
                            <TableColumn style={{minWidth:"160px"}}>サーバ名</TableColumn>
                            <TableColumn style={{minWidth:"117px"}}>ロケーション</TableColumn>
                            <TableColumn style={{minWidth:"100px"}}>ウェブサイト</TableColumn>
                            <TableColumn style={{maxWidth:"50px"}}>測定ボタン</TableColumn>
                            <TableColumn style={{minWidth:"200px"}}>ホスト</TableColumn>
                            <TableColumn style={{minWidth:"300px"}}>IPv4 Addr(RDNS)</TableColumn>
                            <TableColumn style={{minWidth:"250px"}}>IPv6 Addr(RDNS)</TableColumn>
                            <TableColumn style={{minWidth:"250px"}}>IPv4 ASN</TableColumn>
                            <TableColumn style={{minWidth:"250px"}}>IPv6 ASN</TableColumn>
                        </TableHeader>
                        <TableBody items={data}>
                            {(item: ServerInfo) => (
                                <TableRow key={item.id} >
                                        <TableCell align="right">
                                            {item.id}
                                            <IconButton color="inherit" size="small" onClick={() => navigator.clipboard.writeText(String(item.id))}>
                                                <ContentCopyIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.location}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Link href={item.website}>{item.website}</Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton color="inherit" size="small" href={"https://www.speedtest.net/server/" + item.id}>
                                                <SpeedIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.host}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.ipv4}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.ipv6}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.ipv4_asn === "無し" || item.ipv4_asn === "API-error"
                                                ? item.ipv4_asn
                                                : <Link href={"https://bgp.he.net/" + item.ipv4_asn.split(" ", 1)[0]}>{item.ipv4_asn}</Link>
                                            }
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.ipv6_asn === "無し" || item.ipv6_asn === "API-error"
                                                ? item.ipv6_asn
                                                : <Link href={"https://bgp.he.net/" + item.ipv6_asn.split(" ", 1)[0]}>{item.ipv6_asn}</Link>
                                            }
                                        </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Skeleton>
        </div>
    )
}
export default OoklaServerList;
