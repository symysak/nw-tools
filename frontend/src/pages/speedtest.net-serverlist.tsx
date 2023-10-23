import Dashboard from "../templates/Dashboard";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SpeedIcon from '@mui/icons-material/Speed';
import Link from '@mui/material/Link';


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
        //setData(JSON.parse('[{"id":"21569","name":"i3D.net","location":"Tokyo","website":"https://www.speedtest.net/api/js/perform-redirect?server_id=21569","host":"jp.as.speedtest.i3d.net:8080","ipv4":"103.194.167.213(hosted-by.i3d.net)","ipv6":"2a00:1633:3400::213(無し)","ipv4_asn":"AS49544 i3D.net B.V","ipv6_asn":"AS49544 i3D.net B.V"},{"id":"28910","name":"fdcservers.net","location":"Tokyo","website":"https://www.fdcservers.net/","host":"lg-tok.fdcservers.net:8080","ipv4":"50.7.159.4(無し)","ipv6":"無し(無し)","ipv4_asn":"AS30058 FDCservers.net","ipv6_asn":"無し"},{"id":"50686","name":"GSL Networks","location":"Tokyo","website":"https://globalsecurelayer.com/","host":"ty8.speedtest.gslnetworks.com:8080","ipv4":"203.10.99.1(無し)","ipv6":"2401:3bc0:800:1::2(無し)","ipv4_asn":"AS137409 GSL Networks Pty LTD","ipv6_asn":"AS137409 GSL Networks Pty LTD"},{"id":"38241","name":"Enzu.com","location":"Tokyo","website":"https://www.speedtest.net/api/js/perform-redirect?server_id=38241","host":"speedtest-dc09.enzu.com:8080","ipv4":"85.208.111.6(6.111-208-85.rdns.scalabledns.com)","ipv6":"無し(無し)","ipv4_asn":"AS18978 Enzu Inc","ipv6_asn":"無し"},{"id":"24333","name":"Rakuten Mobile, Inc","location":"Tokyo","website":"https://mobile.rakuten.co.jp/","host":"ookla.mbspeed.net:8080","ipv4":"103.124.1.250(無し)","ipv6":"240b:c010:101:1608:59d7:2:0:1(無し)","ipv4_asn":"AS138384 Rakuten Mobile Network, Inc.","ipv6_asn":"AS138384 Rakuten Mobile Network, Inc."},{"id":"20976","name":"GLBB Japan","location":"Tokyo","website":"https://www.glbb.jp/","host":"speedtest-xg-tokyo.glbb.ne.jp:8080","ipv4":"27.0.31.2(oki-27-0-31-2.jptransit.net)","ipv6":"無し(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"無し"},{"id":"50467","name":"Verizon","location":"Tokyo","website":"https://www.verizon.com/","host":"jp-nperf.verizon.net:8080","ipv4":"210.81.6.58(na-na-gw.customer.alter.net)","ipv6":"無し(無し)","ipv4_asn":"AS703 Verizon Business","ipv6_asn":"無し"},{"id":"48463","name":"IPA CyberLab 400G","location":"Tokyo","website":"https://www.ipa.go.jp/","host":"speed.udx.icscoe.jp:8080","ipv4":"219.100.92.228(speed.udx.icscoe.jp)","ipv6":"2401:5e40:1000:1112::228(無し)","ipv4_asn":"AS63770 Industrial Cyber Security Center of Excellence","ipv6_asn":"AS63770 Industrial Cyber Security Center of Excellence"},{"id":"14623","name":"IPA CyberLab","location":"Bunkyo","website":"https://www.ipa.go.jp/icscoe/","host":"speed.coe.ad.jp:8080","ipv4":"103.95.184.74(speed.coe.ad.jp)","ipv6":"無し(無し)","ipv4_asn":"AS63770 Industrial Cyber Security Center of Excellence","ipv6_asn":"無し"},{"id":"8407","name":"Allied Telesis Capital Corporation","location":"Sagamihara","website":"https://atcc-gns.com/","host":"sp5.atcc-gns.net:8080","ipv4":"27.0.31.34(oki-27-0-31-34.jptransit.net)","ipv6":"無し(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"無し"},{"id":"6087","name":"Allied Telesis Capital Corporation","location":"Fussa-shi","website":"https://atcc-gns.com/","host":"sp1.atcc-gns.net:8080","ipv4":"27.0.31.18(oki-27-0-31-18.jptransit.net)","ipv6":"無し(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"無し"},{"id":"7139","name":"SoftEther Corporation","location":"Tsukuba","website":"https://www.softether.org/","host":"speedtest.softether.co.jp:8080","ipv4":"103.41.63.43(speedtest.softether.co.jp)","ipv6":"無し(無し)","ipv4_asn":"AS59103 SoftEther Corporation","ipv6_asn":"無し"},{"id":"6405","name":"Allied Telesis Capital Corporation","location":"Misawa","website":"https://www.speedtest.net/api/js/perform-redirect?server_id=6405","host":"sp3.atcc-gns.net:8080","ipv4":"27.0.31.50(oki-27-0-31-50.jptransit.net)","ipv6":"無し(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"無し"},{"id":"30230","name":"Lequios","location":"Naha City","website":"https://www.speedtest.net/api/js/perform-redirect?server_id=30230","host":"speedtest-xg-lq.glbb.ne.jp:8080","ipv4":"103.13.250.28(oki-103-13-250-28.glbb.ne.jp)","ipv6":"2404:2d00:fe01:2::556(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"AS55900 GLBB Japan KK"},{"id":"21118","name":"GLBB Japan","location":"Naha","website":"https://www.glbb.jp/","host":"speedtest-xg-oki.glbb.ne.jp:8080","ipv4":"103.13.250.27(oki-103-13-250-27.glbb.ne.jp)","ipv6":"2404:2d00:fe01:2::555(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"AS55900 GLBB Japan KK"},{"id":"31181","name":"Allied Telesis Capital Corp.","location":"Okinawa","website":"https://atcc-gns.com/","host":"sp7.atcc-gns.net:8080","ipv4":"27.0.31.66(oki-27-0-31-66.jptransit.net)","ipv6":"無し(無し)","ipv4_asn":"AS55900 GLBB Japan KK","ipv6_asn":"無し"},{"id":"56562","name":"JAPANET TELECOM","location":"Itaquaquecetuba","website":"https://japanettelecom.com.br/","host":"speedtest.japanettelecom.com.br:8080","ipv4":"45.188.241.67(無し)","ipv6":"2804:8520:0:3::4(無し)","ipv4_asn":"AS269561 M.M. Brito da Silva - Multimidia","ipv6_asn":"AS272559 ULISSES DE OLIVEIRA SANTOS - ME"}]'))
    }, [])

    const titleTag="speedtest.netサーバリスト";

    return (
        <div>
            <Helmet>
                <title>{titleTag + " - Network Tools | SUYAMA"}</title>
            </Helmet>
            <Dashboard title={titleTag} maxWidth={"xl"}>
                <p>speedtest.netのサーバリストです。
                    speedtest-cliのサーバID指定の際にお使い下さい</p>
                <p>スピードテストのご利用は計画的に。</p>
                <TableContainer component={Paper} sx={{overflow: "auto"}}>
                    <a>最終更新: {lastUpdated} (UTC). 1時間毎に更新</a>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{minWidth:"104px"}}>ID</TableCell>
                                <TableCell style={{minWidth:"160px"}}>サーバ名</TableCell>
                                <TableCell style={{minWidth:"117px"}}>ロケーション</TableCell>
                                <TableCell style={{minWidth:"100px"}}>ウェブサイト</TableCell>
                                <TableCell style={{maxWidth:"50px"}}>測定ボタン</TableCell>
                                <TableCell style={{minWidth:"200px"}}>ホスト</TableCell>
                                <TableCell style={{minWidth:"300px"}}>IPv4 Addr(RDNS)</TableCell>
                                <TableCell style={{minWidth:"250px"}}>IPv6 Addr(RDNS)</TableCell>
                                <TableCell style={{minWidth:"250px"}}>IPv4 ASN</TableCell>
                                <TableCell style={{minWidth:"250px"}}>IPv6 ASN</TableCell>
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
                                            {row.ipv4_asn === "無し"
                                                ? "無し"
                                                : <Link href={"https://bgp.he.net/" + row.ipv4_asn.split(" ", 1)[0]}>{row.ipv4_asn}</Link>
                                            }
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.ipv6_asn === "無し"
                                                ? "無し"
                                                : <Link href={"https://bgp.he.net/" + row.ipv6_asn.split(" ", 1)[0]}>{row.ipv6_asn}</Link>
                                            }
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
