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
const copyToClipboard = async (text: string) => {
    await global.navigator.clipboard.writeText(text);
};

const rows = [
    {
        cidr: "/32",
        subnetMask: "255.255.255.255",
        ipAddrCount: "1"
    },
    {
        cider: "/31",
        subnetMask: "255.255.255.254",
        ipAddrCount: "2"
    },
    {
        cider: "/30",
        subnetMask: "255.255.255.252",
        ipAddrCount: "4"
    },
    {
        cider: "/29",
        subnetMask: "255.255.255.248",
        ipAddrCount: "8"
    },
    {
        cider: "/28",
        subnetMask: "255.255.255.240",
        ipAddrCount: "16"
    },
    {
        cider: "/27",
        subnetMask: "255.255.255.224",
        ipAddrCount: "32"
    },
    {
        cider: "/26",
        subnetMask: "255.255.255.192",
        ipAddrCount: "64"
    },
    {
        cider: "/25",
        subnetMask: "255.255.255.128",
        ipAddrCount: "128"
    },
    {
        cider: "/24",
        subnetMask: "255.255.255.0",
        ipAddrCount: "256"
    },
    {
        cider: "/23",
        subnetMask: "255.255.254.0",
        ipAddrCount: "512"
    },
    {
        cider: "/22",
        subnetMask: "255.255.252.0",
        ipAddrCount: "1,024"
    },
    {
        cider: "/21",
        subnetMask: "255.255.248.0",
        ipAddrCount: "2,048"
    },
    {
        cider: "/20",
        subnetMask: "255.255.240.0",
        ipAddrCount: "4,096"
    },
    {
        cider: "/19",
        subnetMask: "255.255.224.0",
        ipAddrCount: "8,192"
    },
    {
        cider: "/18",
        subnetMask: "255.255.192.0",
        ipAddrCount: "16,384"
    },
    {
        cider: "/17",
        subnetMask: "255.255.128.0",
        ipAddrCount: "32,768"
    },
    {
        cider: "/16",
        subnetMask: "255.255.0.0",
        ipAddrCount: "65,536"
    },
    {
        cider: "/15",
        subnetMask: "255.254.0.0",
        ipAddrCount: "131,072"
    },
    {
        cider: "/14",
        subnetMask: "255.252.0.0",
        ipAddrCount: "262,144"
    },
    {
        cider: "/13",
        subnetMask: "255.248.0.0",
        ipAddrCount: "524,288"
    },
    {
        cider: "/12",
        subnetMask: "255.240.0.0",
        ipAddrCount: "1,048,576"
    },
    {
        cider: "/11",
        subnetMask: "255.224.0.0",
        ipAddrCount: "2,097,152"
    },
    {
        cider: "/10",
        subnetMask: "255.192.0.0",
        ipAddrCount: "4,194,304"
    },
    {
        cider: "/9",
        subnetMask: "255.128.0.0",
        ipAddrCount: "8,388,608"
    },
    {
        cider: "/8",
        subnetMask: "255.0.0.0",
        ipAddrCount: "16,777,216"
    },
    {
        cider: "/7",
        subnetMask: "254.0.0.0",
        ipAddrCount: "33,554,432"
    },
    {
        cider: "/6",
        subnetMask: "252.0.0.0",
        ipAddrCount: "67,108,864"
    },
    {
        cider: "/5",
        subnetMask: "248.0.0.0",
        ipAddrCount: "134,217,728"
    },
    {
        cider: "/4",
        subnetMask: "240.0.0.0",
        ipAddrCount: "268,435,456"
    },
    {
        cider: "/3",
        subnetMask: "224.0.0.0",
        ipAddrCount: "536,870,912"
    },
    {
        cider: "/2",
        subnetMask: "192.0.0.0",
        ipAddrCount: "1,073,741,824"
    },
    {
        cider: "/1",
        subnetMask: "128.0.0.0",
        ipAddrCount: "2,147,483,648"
    },
    {
        cider: "/0",
        subnetMask: "0.0.0.0",
        ipAddrCount: "4,294,967,296"
    }
];

console.log(rows);
function IpAddrTable(){
    const titleTag="IPアドレス個数表";
    return (
        <div>
            <Helmet>
                <title>{titleTag + " - Network Tools | SUYAMA"}</title>
            </Helmet>
            <Dashboard title={titleTag} >
                <TableContainer component={Paper} sx={{overflow: "auto"}}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{minWidth:"85px"}}>CIDR</TableCell>
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