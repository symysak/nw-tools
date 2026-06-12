import { createFileRoute } from "@tanstack/react-router"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute("/ip-addr-table")({ component: IpAddrTable })

interface Row {
  cidr: string
  subnetMask: string
  ipAddrCount: string
}

const rows: Row[] = [
  { cidr: "/32", subnetMask: "255.255.255.255", ipAddrCount: "1" },
  { cidr: "/31", subnetMask: "255.255.255.254", ipAddrCount: "2" },
  { cidr: "/30", subnetMask: "255.255.255.252", ipAddrCount: "4" },
  { cidr: "/29", subnetMask: "255.255.255.248", ipAddrCount: "8" },
  { cidr: "/28", subnetMask: "255.255.255.240", ipAddrCount: "16" },
  { cidr: "/27", subnetMask: "255.255.255.224", ipAddrCount: "32" },
  { cidr: "/26", subnetMask: "255.255.255.192", ipAddrCount: "64" },
  { cidr: "/25", subnetMask: "255.255.255.128", ipAddrCount: "128" },
  { cidr: "/24", subnetMask: "255.255.255.0", ipAddrCount: "256" },
  { cidr: "/23", subnetMask: "255.255.254.0", ipAddrCount: "512" },
  { cidr: "/22", subnetMask: "255.255.252.0", ipAddrCount: "1,024" },
  { cidr: "/21", subnetMask: "255.255.248.0", ipAddrCount: "2,048" },
  { cidr: "/20", subnetMask: "255.255.240.0", ipAddrCount: "4,096" },
  { cidr: "/19", subnetMask: "255.255.224.0", ipAddrCount: "8,192" },
  { cidr: "/18", subnetMask: "255.255.192.0", ipAddrCount: "16,384" },
  { cidr: "/17", subnetMask: "255.255.128.0", ipAddrCount: "32,768" },
  { cidr: "/16", subnetMask: "255.255.0.0", ipAddrCount: "65,536" },
  { cidr: "/15", subnetMask: "255.254.0.0", ipAddrCount: "131,072" },
  { cidr: "/14", subnetMask: "255.252.0.0", ipAddrCount: "262,144" },
  { cidr: "/13", subnetMask: "255.248.0.0", ipAddrCount: "524,288" },
  { cidr: "/12", subnetMask: "255.240.0.0", ipAddrCount: "1,048,576" },
  { cidr: "/11", subnetMask: "255.224.0.0", ipAddrCount: "2,097,152" },
  { cidr: "/10", subnetMask: "255.192.0.0", ipAddrCount: "4,194,304" },
  { cidr: "/9", subnetMask: "255.128.0.0", ipAddrCount: "8,388,608" },
  { cidr: "/8", subnetMask: "255.0.0.0", ipAddrCount: "16,777,216" },
  { cidr: "/7", subnetMask: "254.0.0.0", ipAddrCount: "33,554,432" },
  { cidr: "/6", subnetMask: "252.0.0.0", ipAddrCount: "67,108,864" },
  { cidr: "/5", subnetMask: "248.0.0.0", ipAddrCount: "134,217,728" },
  { cidr: "/4", subnetMask: "240.0.0.0", ipAddrCount: "268,435,456" },
  { cidr: "/3", subnetMask: "224.0.0.0", ipAddrCount: "536,870,912" },
  { cidr: "/2", subnetMask: "192.0.0.0", ipAddrCount: "1,073,741,824" },
  { cidr: "/1", subnetMask: "128.0.0.0", ipAddrCount: "2,147,483,648" },
  { cidr: "/0", subnetMask: "0.0.0.0", ipAddrCount: "4,294,967,296" },
]

function CopyButton({ text }: { text: string }) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => navigator.clipboard.writeText(text)}
      aria-label="コピー"
    >
      <Copy />
    </Button>
  )
}

function IpAddrTable() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">IPアドレス個数表</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-20">CIDR</TableHead>
            <TableHead className="min-w-44">サブネットマスク</TableHead>
            <TableHead className="min-w-40">IPアドレス数</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.cidr}>
              <TableCell>
                <span className="mr-1">{row.cidr}</span>
                <CopyButton text={row.cidr} />
              </TableCell>
              <TableCell>
                <span className="mr-1">{row.subnetMask}</span>
                <CopyButton text={row.subnetMask} />
              </TableCell>
              <TableCell>
                <span className="mr-1">{row.ipAddrCount}</span>
                <CopyButton text={row.ipAddrCount} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
