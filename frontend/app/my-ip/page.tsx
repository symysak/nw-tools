"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface IpInfo {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
}

const MyIpPage = () => {
    const [loading, setLoading] = useState(true);
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIpInfo = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.nw-tools.suyama.ne.jp'}/api/myip`);
                setIpInfo(response.data);
                setLoading(false);
            } catch (err) {
                setError("IPアドレス情報の取得に失敗しました");
                setLoading(false);
            }
        };

        fetchIpInfo();
    }, []);

    return (
        <div>
            <p>あなたのIPアドレスとその詳細情報を表示します。</p>
            <Spacer y={4} />
            <Skeleton isLoaded={!loading} className="rounded-lg">
                <Card>
                    <CardHeader>IPアドレス情報</CardHeader>
                    <CardBody>
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <Table aria-label="IP Address Information">
                                <TableHeader>
                                    <TableColumn>項目</TableColumn>
                                    <TableColumn>値</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="ip">
                                        <TableCell>IPアドレス</TableCell>
                                        <TableCell>
                                            {ipInfo?.ip}
                                            <IconButton color="inherit" size="small" onClick={() => ipInfo?.ip && navigator.clipboard.writeText(ipInfo.ip)}>
                                                <ContentCopyIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="hostname">
                                        <TableCell>ホスト名</TableCell>
                                        <TableCell>{ipInfo?.hostname}</TableCell>
                                    </TableRow>
                                    <TableRow key="location">
                                        <TableCell>場所</TableCell>
                                        <TableCell>{ipInfo?.city && `${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`}</TableCell>
                                    </TableRow>
                                    <TableRow key="coordinates">
                                        <TableCell>座標</TableCell>
                                        <TableCell>{ipInfo?.loc}</TableCell>
                                    </TableRow>
                                    <TableRow key="org">
                                        <TableCell>組織</TableCell>
                                        <TableCell>{ipInfo?.org}</TableCell>
                                    </TableRow>
                                    <TableRow key="postal">
                                        <TableCell>郵便番号</TableCell>
                                        <TableCell>{ipInfo?.postal}</TableCell>
                                    </TableRow>
                                    <TableRow key="timezone">
                                        <TableCell>タイムゾーン</TableCell>
                                        <TableCell>{ipInfo?.timezone}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )}
                    </CardBody>
                </Card>
            </Skeleton>
        </div>
    );
};

export default MyIpPage;