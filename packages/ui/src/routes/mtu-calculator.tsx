import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { ArrowDown, ArrowUp, CornerDownRight, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Route = createFileRoute("/mtu-calculator")({ component: MtuCalculator })

interface Proto {
  name: string
  size: number
  isChild?: boolean
}

interface SelectedProto extends Proto {
  id: number
}

const PROTO_LIST: Proto[] = [
  { name: "Ethernet", size: 14 },
  { name: "VLAN", size: 4, isChild: true },
  { name: "IPv4", size: 20 },
  { name: "IPv6", size: 40 },
  { name: "TCP", size: 20 },
  { name: "UDP", size: 8 },
  { name: "EtherIP(RFC3378)", size: 2 },
  { name: "GRE", size: 4 },
  { name: "Key", size: 4, isChild: true },
  { name: "Sequence Number", size: 4, isChild: true },
  { name: "WireGuard(without UDP hdr)", size: 32 },
  { name: "VXLAN(without UDP hdr)", size: 8 },
]

function calcHeaderSize(list: SelectedProto[]): string {
  if (list.length === 0) return "0"
  const sum = list.reduce((acc, p) => acc + p.size, 0)
  return list.map((p) => p.size).join(" + ") + " = " + sum
}

function calcMtuMss(baseMtu: number, list: SelectedProto[]): string {
  if (list.length === 0) return String(baseMtu)
  const sum = list.reduce((acc, p) => acc + p.size, 0)
  return baseMtu + " - " + list.map((p) => p.size).join(" - ") + " = " + (baseMtu - sum)
}

function MtuCalculator() {
  const [selected, setSelected] = useState<SelectedProto[]>([])
  const [baseMtu, setBaseMtu] = useState(1500)
  const [customName, setCustomName] = useState("任意のプロトコル")
  const [customSize, setCustomSize] = useState("")

  function addProto(proto: Proto) {
    setSelected((prev) => [...prev, { ...proto, id: Math.random() }])
  }

  function removeProto(id: number) {
    setSelected((prev) => prev.filter((p) => p.id !== id))
  }

  function moveUp(index: number) {
    if (index === 0) return
    setSelected((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  function moveDown(index: number) {
    setSelected((prev) => {
      if (index === prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">トンネルMTU計算機</h1>
      <p className="text-sm text-muted-foreground mb-4">
        トンネリングの際のオーバーヘッド計算等にお使いください。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>プロトコルを追加</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {PROTO_LIST.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => addProto(p)}
                className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors flex items-center gap-1"
              >
                {p.isChild && <CornerDownRight className="size-3 text-muted-foreground shrink-0" />}
                <span>{p.name} — {p.size}bytes</span>
              </button>
            ))}
            <div className="pt-2 flex gap-1">
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="プロトコル名"
                className="flex-1"
              />
              <Input
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="bytes"
                type="number"
                className="w-20"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  const size = parseInt(customSize)
                  if (!size) return
                  addProto({ name: customName, size })
                }}
              >
                <Plus />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>計算結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="base-mtu">元のMTU</Label>
              <Input
                id="base-mtu"
                type="number"
                value={baseMtu}
                onChange={(e) => setBaseMtu(Number(e.target.value))}
                className="w-28"
              />
            </div>
            <p className="text-sm">
              <span className="text-muted-foreground">Header size: </span>
              {calcHeaderSize(selected)}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">MTU/MSS: </span>
              {calcMtuMss(baseMtu, selected)}
            </p>
            <div className="space-y-1">
              {selected.map((p, i) => (
                <div key={p.id} className="flex items-center gap-1">
                  <span className="flex-1 text-sm px-2 py-1 rounded bg-muted truncate">
                    {p.name} — {p.size}bytes
                  </span>
                  <Button variant="ghost" size="icon-xs" onClick={() => moveUp(i)} disabled={i === 0}>
                    <ArrowUp />
                  </Button>
                  <Button variant="ghost" size="icon-xs" onClick={() => moveDown(i)} disabled={i === selected.length - 1}>
                    <ArrowDown />
                  </Button>
                  <Button variant="ghost" size="icon-xs" onClick={() => removeProto(p.id)}>
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
