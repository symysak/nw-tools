import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import axios from "axios"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute("/speedtest-net-serverlist")({
  component: SpeedtestNetServerlist,
})

interface ServerInfo {
  id: number
  name: string
  location: string
  website: string
  host: string
  ipv4: string
  ipv6: string
  ipv4_asn: string
  ipv6_asn: string
}

function CopyButton({ text }: { text: string }) {
  return (
    <Button variant="ghost" size="icon-xs" onClick={() => navigator.clipboard.writeText(text)} aria-label="コピー">
      <Copy />
    </Button>
  )
}

function AsnLink({ asn }: { asn: string }) {
  if (asn === "無し" || asn === "API-error") return <span>{asn}</span>
  const asnId = asn.split(" ")[0]
  return (
    <a
      href={`https://bgp.he.net/${asnId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:no-underline"
    >
      {asn}
    </a>
  )
}

function SpeedtestNetServerlist() {
  const [data, setData] = useState<ServerInfo[]>([])
  const [lastUpdated, setLastUpdated] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          "https://nw-tools-backend.suyama.ne.jp/api/serverlist?nocache=" + Date.now()
        )
        const list = res.data as (ServerInfo & { lastupdated?: string })[]
        const meta = list.pop()
        if (meta?.lastupdated) setLastUpdated(meta.lastupdated)
        setData(list as ServerInfo[])
      } finally {
        setLoaded(true)
      }
    }
    void fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">speedtest.netサーバリスト</h1>
      <p className="text-sm text-muted-foreground mb-1">
        speedtest.netのサーバリストです。speedtest-cliのサーバID指定の際にお使い下さい
      </p>
      <p className="text-sm text-muted-foreground mb-4">スピードテストのご利用は計画的に。</p>

      {!loaded ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-2">server_count: {data.length}</p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-28">ID</TableHead>
                  <TableHead className="min-w-40">サーバ名</TableHead>
                  <TableHead className="min-w-28">ロケーション</TableHead>
                  <TableHead className="min-w-28">ウェブサイト</TableHead>
                  <TableHead className="min-w-20">測定</TableHead>
                  <TableHead className="min-w-48">ホスト</TableHead>
                  <TableHead className="min-w-64">IPv4(RDNS)</TableHead>
                  <TableHead className="min-w-64">IPv6(RDNS)</TableHead>
                  <TableHead className="min-w-60">IPv4 ASN</TableHead>
                  <TableHead className="min-w-60">IPv6 ASN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell>
                      {server.id}
                      <CopyButton text={String(server.id)} />
                    </TableCell>
                    <TableCell>{server.name}</TableCell>
                    <TableCell>{server.location}</TableCell>
                    <TableCell>
                      {server.website ? (
                        <a
                          href={server.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:no-underline text-xs"
                        >
                          {server.website}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">無し</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://www.speedtest.net/server/${server.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon-xs">
                          ▶
                        </Button>
                      </a>
                    </TableCell>
                    <TableCell>{server.host}</TableCell>
                    <TableCell>{server.ipv4}</TableCell>
                    <TableCell>{server.ipv6}</TableCell>
                    <TableCell>
                      <AsnLink asn={server.ipv4_asn} />
                    </TableCell>
                    <TableCell>
                      <AsnLink asn={server.ipv6_asn} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-2">
              最終更新: {lastUpdated} (UTC). 1時間毎に更新
            </p>
          )}
        </>
      )}
    </div>
  )
}
