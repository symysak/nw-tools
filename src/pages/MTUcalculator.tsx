import { Button, Grid, IconButton, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dashboard from "../templates/Dashboard";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from "react-helmet-async";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



function MTUcalculator() {
    const proto = [
        { name: "Ethernet", size: 14},
        { name: "Ethernet(Option) - VLAN", size: 4},
        { name: "IPv4", size: 20},
        { name: "IPv6", size: 40},
        { name: "TCP", size: 20},
        { name: "UDP", size: 8},
        { name: "EtherIP(RFC3378)", size: 2},
        { name: "GRE", size: 4 },
        { name: "GRE(Option) - Key", size: 4},
        { name: "GRE(Option) - Sequence Number", size: 4},

    ]
    const [selectedProto, setSelectedProto] = React.useState([]);
    let copySelectedProto: any = [...selectedProto];

    const calculateSize = (type: "header size" | "mtu/mss", num: number, selectedProto: any) => {
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
    const upObject = (id: number, list: any) => {
        if(id === 0) return list;

        const temp1 = list[id]
        const temp2 = list[id - 1]
        list[id] = temp2
        list[id - 1] = temp1
        return list
    }
    const downObject = (id: number, list: any) => {
        if(id === list.length - 1) return list;

        const temp1 = list[id]
        const temp2 = list[id + 1]
        list[id] = temp2
        list[id + 1] = temp1
        return list
    }
    const SelectedProtoList = (props: any) => {
        const list = props.list;
        let temp = [];
        for(let i = 0; i < list.length; i++) {
            temp.push(
                <div>
                    <Grid container>
                        <Grid item xs={10}>
                            <Button variant="contained" fullWidth>
                                {list[i].name} - {list[i].size}bytes
                            </Button>
                        </Grid>
                        <Grid item xs={2}>

                            {i === 0
                            ? <IconButton disabled size="small">
                                <ArrowUpward fontSize="small"/>
                              </IconButton>
                            : <IconButton size="small">
                                <ArrowUpward fontSize="small" onClick={() => {
                                    setSelectedProto(upObject(i, copySelectedProto));
                                }}/>
                              </IconButton>
                            }

                            {i === (list.length - 1)
                            ? <IconButton disabled size="small">
                                <ArrowDownward fontSize="small"/>
                              </IconButton>
                            : <IconButton size="small">
                                <ArrowDownward fontSize="small" onClick={() => {
                                    setSelectedProto(downObject(i, copySelectedProto));
                                }}/>
                              </IconButton>
                            }

                            <IconButton size="small">
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
            <Stack direction={"column"} spacing={1}>
                {temp}
            </Stack>
        )
    }

    const [textInput, setTextInput] = React.useState(1500);

    const titleTag="トンネルMTU計算機-Network Tools|SUYAMA";

    return (
        <div>
            <Helmet>
                <title>{titleTag}</title>
            </Helmet>
            <Dashboard title="トンネルMTU計算機" >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Item>
                            <Stack direction={"column"} spacing={1}>
                                <p>ボタンを押して追加</p>
                                {proto.map((item: any) => (
                                    <Button variant="contained" onClick={() => {
                                        copySelectedProto.push({id: Math.random(), name: item.name, size: item.size},);
                                        setSelectedProto(copySelectedProto);
                                        }}>
                                        {item.name} - {item.size}bytes
                                    </Button>
                                ))}
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs sm>
                        <Item>
                            <TextField label="元のMTU" value={textInput} onChange={(event) => setTextInput(Number(event.target.value))}/>
                            <p>Header size: {calculateSize("header size", 0, selectedProto)}</p>
                            <p>MTU/MSS: {calculateSize("mtu/mss", textInput, selectedProto)}</p>
                            <p>追加したプロトコル</p>
                                    {/*
                                    {selectedProto.map((item: any) => (
                                        <Grid container spacing={0}>
                                            <Grid item xs={11}>
                                                <Button variant="contained" fullWidth>
                                                    {item.name} - {item.size}bytes
                                                </Button>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton>
                                                    <DeleteIcon fontSize="small" onClick={() => {
                                                        setSelectedProto(copySelectedProto.filter((a: any) =>  a.id !== item.id));
                                                    }}/>
                                                </IconButton>
                                                <IconButton>
                                                    <ArrowUpward fontSize="small" onClick={() => {
                                                        setSelectedProto(copySelectedProto)
                                                    }}/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    */}
                                    <SelectedProtoList list={selectedProto} />
                        </Item>
                    </Grid>
                </Grid>
            </Dashboard>
        </div>
    )
}
export default MTUcalculator;