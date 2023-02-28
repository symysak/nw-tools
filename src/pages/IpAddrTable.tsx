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
import { Helmet } from "react-helmet-async";

// クリップボードにコピー用
const copyToClipboard = async (text: any) => {
    await global.navigator.clipboard.writeText(text);
};

function cidrToNetmask(cidr: number): string {
    let netmask = '';
    for (let i = 0; i < 4; i++) {
        const octet = Math.min(cidr, 8);
        cidr -= octet;
        netmask += `${256 - Math.pow(2, 8 - octet)}.`;
    }
    return netmask.slice(0, -1);
}
function cidrToNumOfAddresses(cidr: number): string {
    return Math.pow(2, 32 - cidr).toLocaleString();
}

const rows: any = [];
for (let i = 32; i >= 0; i--) {
    rows.push({
        cidr: `/${i}`,
        subnetMask: cidrToNetmask(i),
        ipAddrCount: cidrToNumOfAddresses(i),
    });
}

function IpAddrTable(){
    const titleTag="IPアドレス個数表-Network Tools|SUYAMA";
    return (
        <div>
            <Helmet>
                <title>{titleTag}</title>
            </Helmet>
            <Dashboard title="IPアドレス個数表" >
                <TableContainer component={Paper} sx={{overflow: "auto"}}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{minWidth:"82px"}}>CIDR</TableCell>
                                <TableCell style={{minWidth:"170px"}}>サブネットマスク</TableCell>
                                <TableCell style={{minWidth:"154px"}}>IPアドレス数</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow key={row.cidr} >
                                        <TableCell align="left">
                                            {row.cidr}
                                            <IconButton size="small" onClick={() => copyToClipboard(row.cidr)} >
                                                <ContentCopyIcon fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.subnetMask}
                                            <IconButton size="small" onClick={() => copyToClipboard(row.subnetMask)} >
                                                <ContentCopyIcon fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.ipAddrCount}
                                            <IconButton size="small" onClick={() => copyToClipboard(row.ipAddrCount)} >
                                                <ContentCopyIcon fontSize="small"/>
                                            </IconButton>
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
export default IpAddrTable;