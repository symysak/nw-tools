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



const OoklaServerList = () => {
    const [data, setData] = useState<ServerList>([]);
    const [lastUpdated, setLastUpdated] = useState("");

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
        setData(JSON.parse('[{"id":"21569","name":"i3D.net","location":"Tokyo","website":"https://www.speedtest.net/api/js/perform-redirect?server_id=21569","host":"jp.as.speedtest.i3d.net:8080","ipv4":"103.194.167.213(hosted-by.i3d.net)","ipv6":"2a00:1633:3400::213(無し)","ipv4_asn":"AS49544 i3D.net B.V","ipv6_asn":"AS49544 i3D.net B.V"}]'))
    }, [])

    const titleTag="speedtest.netサーバリスト";

    return (
        <div>
                <p>speedtest.netのサーバリストです。
                    speedtest-cliのサーバID指定の際にお使い下さい</p>
                <p>スピードテストのご利用は計画的に。</p>
                <a>server_count: {data.length}</a>
                <Table aria-label="a dense table">
                    <TableHeader>
                        <TableRow>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody items={data}>
                        {(row: ServerInfo) => (
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
                        )}
                    </TableBody>
                </Table>
                <a>最終更新: {lastUpdated} (UTC). 1時間毎に更新</a>
        </div>
    )
}
export default OoklaServerList;
