"use client";
import { Card, CardHeader, CardContent, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
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
            <Card elevation={3}>
                <CardHeader>IPv4アドレスからIPv6アドレス</CardHeader>
                <CardContent className="place-items-center">
                    <TextField
                        fullWidth
                        label="IPv4アドレス"
                        value={ipv4Addr}
                        onChange={(a) => setIpv4Addr(a.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="NAT64プレフィックス"
                        value={nat64Prefix}
                        onChange={(a) =>  setNat64Prefix(a.target.value)}
                    />
                    <Button
                        className=""
                        onClick={() => {

                        }}
                    >
                        変換
                    </Button>
                    <TextField
                        fullWidth
                        label="IPv6アドレス"
                        helperText="変換ボタンを押すと表示されます"
                        value={ipv6Addr}
                        onChange={(a) => setIpv6Addr(a.target.value)}
                        InputProps={{endAdornment: <CopyButton text={ipv6Addr}/>}}
                    />
                </CardContent>
            </Card>
            <Card elevation={3}>
                <CardHeader>IPv6アドレスからIPv4アドレス</CardHeader>
                <CardContent className="place-items-center">
                    <TextField
                        fullWidth
                        placeholder=" "
                        label="IPv6アドレス"
                        value={ipv6Addr2}
                        onChange={(a) => setIpv6Addr2(a.target.value)}
                    />
                    <Button
                        className=""
                        onClick={() => {

                        }}
                    >
                        変換
                    </Button>
                    <TextField
                        fullWidth
                        disabled
                        label="IPv4アドレス"
                        helperText="変換ボタンを押すと表示されます"
                        value={ipv4Addr2}
                        onChange={(a) => setIpv4Addr2(a.target.value)}
                        InputProps={{endAdornment: <CopyButton text={ipv4Addr2}/>}}
                    />
                    <TextField
                        fullWidth
                        disabled
                        helperText="変換ボタンを押すと表示されます"
                        label="NAT64プレフィックス"
                        value={nat64Prefix2}
                        onChange={(a) => setNat64Prefix2(a.target.value)}
                        InputProps={{endAdornment: <CopyButton text={nat64Prefix2}/>}}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
export default nat64Calculator;