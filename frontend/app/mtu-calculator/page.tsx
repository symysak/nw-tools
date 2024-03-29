"use client";

import React from "react";
import { Grid, Icon, IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, ArrowDownward, ArrowUpward, SubdirectoryArrowRight, SubtitlesOff } from "@mui/icons-material";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {
    Listbox,
    ListboxSection,
    ListboxItem
} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function MTUcalculator() {
    type Proto = {
        name: string;
        size: number;
        isChild?: boolean;
    }[];
    
    const proto: Proto = [
        { name: "Ethernet", size: 14},
        { name: "VLAN", size: 4, isChild: true},
        { name: "IPv4", size: 20},
        { name: "IPv6", size: 40},
        { name: "TCP", size: 20},
        { name: "UDP", size: 8},
        { name: "EtherIP(RFC3378)", size: 2},
        { name: "GRE", size: 4 },
        { name: "Key", size: 4, isChild: true},
        { name: "Sequence Number", size: 4, isChild: true},
        { name: "WireGuard(without UDP hdr)", size: 32},
        { name: "VXLAN(without UDP hdr)", size: 8},
    ];

    type SelectedProto = {
        id: number;
        name: string;
        size: number;
        isChild?: boolean;
    }[];

    const [selectedProto, setSelectedProto] = React.useState<SelectedProto>([]);
    let copySelectedProto: SelectedProto = [...selectedProto];

    const calculateSize = (type: "header size" | "mtu/mss", num: number, selectedProto: SelectedProto) => {
        if(type === "header size"){
            let sum: number = 0;
            let str: string = "";
            for(let i = 0; i < selectedProto.length; i++) {
                sum += selectedProto[i].size;
                // selectedProtoが空の時は何もしない
                if(selectedProto.length === 0){

                }
                // selectedProtoの最後の要素の時には"="をつける
                else if(i === selectedProto.length - 1) {
                    str += selectedProto[i].size + " = ";
                }
                // 他の要素の時には"+"をつける
                else {
                    str += selectedProto[i].size + " + ";
                }
            }
            str += sum;
            return str;
        }

        else if(type === "mtu/mss"){
            let sum: number = 0;
            let str: string = "";
            for(let i = 0; i < selectedProto.length; i++) {
                sum += selectedProto[i].size;

                // selectedProtoの最初の要素の前にはnumを表示
                if(i === 0){
                    str += num
                }

                // selectedProtoが空の時
                if(selectedProto.length === 0){

                }
                // selectedProtoの最後の要素の時
                else if(i === selectedProto.length - 1) {
                    str += " - " + selectedProto[i].size + " = ";
                }
                // 他の要素の時
                else {
                    str += " - " + selectedProto[i].size;
                }
            }
            str += num - sum;
            return str;
        }
    }

    // 配列のアイテムを上に移動
    const upObject = (id: number, list: SelectedProto) => {
        if(id === 0) return list;

        const temp1 = list[id]
        const temp2 = list[id - 1]
        list[id] = temp2
        list[id - 1] = temp1
        return list
    }

    // 配列のアイテムを下に移動
    const downObject = (id: number, list: SelectedProto) => {
        if(id === list.length - 1) return list;

        const temp1 = list[id]
        const temp2 = list[id + 1]
        list[id] = temp2
        list[id + 1] = temp1
        return list
    }

    // 選択されたプロトコルを表示するやつ
    type SelectedProtoListProps = {
        list: SelectedProto;
    }
    const SelectedProtoList = (props: SelectedProtoListProps) => {
        const list = props.list;
        let temp: any = [];
        for(let i = 0; i < list.length; i++) {
            temp.push(
                <div key={i}>
                    <Spacer y={2}/>
                    <Grid container>
                        <Grid item xs={8} sm={9} md={10}>
                            <Button fullWidth disableAnimation>
                                {list[i].name} - {list[i].size}bytes
                            </Button>
                        </Grid>
                        <Grid alignSelf="center" justifySelf="center" item xs={4} sm={3} md={2}>

                            {i === 0
                            ? <IconButton color="inherit" disabled size="small">
                                <ArrowUpward fontSize="small"/>
                              </IconButton>
                            : <IconButton color="inherit" size="small">
                                <ArrowUpward fontSize="small" onClick={() => {
                                    setSelectedProto(upObject(i, copySelectedProto));
                                }}/>
                              </IconButton>
                            }

                            {i === (list.length - 1)
                            ? <IconButton color="inherit" disabled size="small">
                                <ArrowDownward fontSize="small"/>
                              </IconButton>
                            : <IconButton color="inherit" size="small">
                                <ArrowDownward fontSize="small" onClick={() => {
                                    setSelectedProto(downObject(i, copySelectedProto));
                                }}/>
                              </IconButton>
                            }

                            <IconButton color="inherit" size="small">
                                <DeleteIcon fontSize="small" onClick={() => {
                                    setSelectedProto(copySelectedProto.filter((a: any) =>  a.id !== list[i].id));
                                }}/>
                            </IconButton>

                        </Grid>
                    </Grid>
                </div>
            )
        }
        return (
            <div>
                {temp}
            </div>
        )
    }

    const [textInput, setTextInput] = React.useState(1500);
    const [customProtoSize, setCustomProtoSize] = React.useState(0);
    const [customProtoName, setCustomProtoName] = React.useState("任意のプロトコル");

    const titleTag="トンネルMTU計算機";
    type classItem = {name: string, size: number, isChild?: boolean};
    return (
        <div>
                <Typography variant="body2" paddingBottom="10px">
                    トンネリングの際のオーバーヘッド計算等にお使いください。
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardBody>
                                <p>ボタンを押して追加</p>
                                <Listbox
                                    items={proto}
                                >
                                {(item: classItem) => (
                                    <ListboxItem
                                        key={item.name}
                                        onPress={() => {
                                            copySelectedProto.push({id: Math.random(), name: item.name, size: item.size},);
                                            setSelectedProto(copySelectedProto);
                                        }}
                                    >
                                        {item.isChild === true ? (
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <SubdirectoryArrowRight fontSize="inherit"/>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    {item.name} - {item.size}bytes
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <>
                                            {item.name} - {item.size}bytes
                                            </>
                                        )}
                                    </ListboxItem>
                                )}

                                </Listbox>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Input
                                            value={customProtoName}
                                            onValueChange={setCustomProtoName}
                                            label="プロトコル名"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Input
                                            value={String(customProtoSize)}
                                            label="bytes"
                                            onChange={
                                                (event) => setCustomProtoSize(Number(event.target.value))
                                            }
                                            />
                                    </Grid> 
                                    <Grid item xs={1}>
                                        <IconButton
                                            style={{
                                                height: "100%",
                                            }}
                                            color="inherit"
                                            onClick={() => {
                                                if(customProtoSize === 0) return;
                                                copySelectedProto.push({id: Math.random(), name: customProtoName, size: customProtoSize},);
                                                setSelectedProto(copySelectedProto);
                                            }}
                                        >
                                            <Add />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardBody>
                        </Card>
                    </Grid>
                    <Grid item xs sm>
                        <Card>
                            <CardBody>
                                <Input labelPlacement="outside-left" label="元のMTU" value={String(textInput)} onChange={(event) => setTextInput(Number(event.target.value))}/>
                                <p>Header size: {calculateSize("header size", 0, selectedProto)}</p>
                                <p>MTU/MSS: {calculateSize("mtu/mss", textInput, selectedProto)}</p>
                                <p>追加したプロトコル</p>
                                    <SelectedProtoList list={selectedProto} />
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>


        </div>
    )
}
export default MTUcalculator;