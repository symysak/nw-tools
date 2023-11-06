"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface CopyButtonProps {
    text: string;
}
const CopyButton = (props: CopyButtonProps) => {
    return (
        <ContentCopyIcon
            type="button"
            fontSize="small"
            onClick={() => {
                navigator.clipboard.writeText(props.text);
            }}
        />
    )
}

const nat64Calculator = () => {
    const [ipv4Addr, setIpv4Addr] = useState("");
    const [ipv6Addr, setIpv6Addr] = useState("");
    const [nat64Prefix, setNat64Prefix] = useState("64:ff9b::");

    const [ipv4Addr2, setIpv4Addr2] = useState("");
    const [ipv6Addr2, setIpv6Addr2] = useState("");
    const [nat64Prefix2, setNat64Prefix2] = useState("");

    
    return (
        <div>
            <p>NAT64のアドレスの変換ができます。</p>
            <Spacer y={4} />
            <Card>
                <CardHeader>IPv4アドレスからIPv6アドレス</CardHeader>
                <CardBody className="place-items-center">
                    <Input
                        fullWidth
                        isClearable
                        labelPlacement="outside"
                        placeholder=" "
                        label="IPv4アドレス"
                        value={ipv4Addr}
                        onValueChange={setIpv4Addr}
                    />
                    <Spacer y={1} />
                    <Input
                        fullWidth
                        isClearable
                        labelPlacement="outside"
                        placeholder=" "
                        label="NAT64プレフィックス"
                        value={nat64Prefix}
                        onValueChange={setNat64Prefix}
                    />
                    <Spacer y={2} />
                    <Button
                        className=""
                        onPress={() => {

                        }}
                    >
                        変換
                    </Button>
                    <Spacer y={2} />
                    <Input
                        fullWidth
                        isReadOnly
                        labelPlacement="outside"
                        label="IPv6アドレス"
                        placeholder="変換ボタンを押すと表示されます"
                        value={ipv6Addr}
                        onValueChange={setIpv6Addr}
                        endContent={<CopyButton text={ipv6Addr}/>}
                    />
                </CardBody>
            </Card>
            <Spacer y={4} />
            <Card>
                <CardHeader>IPv6アドレスからIPv4アドレス</CardHeader>
                <CardBody className="place-items-center">
                    <Input
                        fullWidth
                        isClearable
                        labelPlacement="outside"
                        placeholder=" "
                        label="IPv6アドレス"
                        value={ipv6Addr2}
                        onValueChange={setIpv6Addr2}
                    />
                    <Spacer y={2} />
                    <Button
                        className=""
                        onPress={() => {

                        }}
                    >
                        変換
                    </Button>
                    <Spacer y={2} />
                    <Input
                        fullWidth
                        isReadOnly
                        labelPlacement="outside"
                        label="IPv4アドレス"
                        placeholder="変換ボタンを押すと表示されます"
                        value={ipv4Addr2}
                        onValueChange={setIpv4Addr2}
                        endContent={<CopyButton text={ipv4Addr2}/>}
                    />
                    <Spacer y={1} />
                    <Input
                        fullWidth
                        isClearable
                        labelPlacement="outside"
                        placeholder="変換ボタンを押すと表示されます"
                        label="NAT64プレフィックス"
                        value={nat64Prefix2}
                        onValueChange={setNat64Prefix2}
                        endContent={<CopyButton text={nat64Prefix2}/>}
                    />
                </CardBody>
            </Card>
        </div>
    )
}
export default nat64Calculator;