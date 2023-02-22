import Dashboard from "../templates/Dashboard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
/*
const rows = [
    { cider: "/32", subnetMask: "255.255.255.255", ipAddrCount: "1" },
    { cider: "/31", subnetMask: "255.255.255.254", ipAddrCount: "2" },
    { cider: "/30", subnetMask: "255.255.255.252", ipAddrCount: "4" },
    { cider: "/29", subnetMask: "255.255.255.248", ipAddrCount: "8" },
    { cider: "/28", subnetMask: "255.255.255.240", ipAddrCount: "16" },
    { cider: "/27", subnetMask: "255.255.255.224", ipAddrCount: "32" },
    { cider: "/26", subnetMask: "255.255.255.192", ipAddrCount: "64" },
    { cider: "/25", subnetMask: "255.255.255.128", ipAddrCount: "128"},
    { cider: "/24", subnetMask: "255.255.255.0", ipAddrCount: "256" },
    { cider: "/23", subnetMask: "255.255.254.0", ipAddrCount: "512" },
    { cider: "/22", subnetMask: "255.255.252.0", ipAddrCount: "1024" },
    { cider: "/21", subnetMask: "255.255.248.0", ipAddrCount: "2048" },
    { cider: "/20", subnetMask: "255.255.240.0", ipAddrCount: "4096" },
    { cider: "/19", subnetMask: "255.255.224.0", ipAddrCount: "8192" },
    { cider: "/18", subnetMask: "255.255.192.0", ipAddrCount: "16384" },
    { cider: "/17", subnetMask: "255.255.128.0", ipAddrCount: "32768" },
    { cider: "/16", subnetMask: "255.255.0.0", ipAddrCount: "65536" },
    { cider: "/15", subnetMask: "255.254.0.0", ipAddrCount: "131072" },
    { cider: "/14", subnetMask: "255.252.0.0", ipAddrCount: "262144" },
    { cider: "/13", subnetMask: "255.248.0.0", ipAddrCount: "524288" },
    { cider: "/12", subnetMask: "255.240.0.0", ipAddrCount: "1048576" },
    { cider: "/11", subnetMask: "255.224.0.0", ipAddrCount: "2097152" },
    { cider: "/10", subnetMask: "255.192.0.0", ipAddrCount: "4194304" },
    { cider: "/9", subnetMask: "255.128.0.0", ipAddrCount: "8388608" },
];
*/
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
        cider: `/${i}`,
        subnetMask: cidrToNetmask(i),
        ipAddrCount: cidrToNumOfAddresses(i),
    });
}

function IpAddrTable(){
    return (
        <div>
            <Dashboard title="IPアドレス個数表" >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>CIDR</TableCell>
                                <TableCell>サブネットマスク</TableCell>
                                <TableCell>IPアドレス数</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow key={row.cider} >
                                        <TableCell component="th" scope="row">{row.cider}</TableCell>
                                        <TableCell>{row.subnetMask}</TableCell>
                                        <TableCell>{row.ipAddrCount}</TableCell>

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