import { Button, Grid, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dashboard from "../templates/Dashboard";
import TextField from '@mui/material/TextField';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from "react-helmet-async";

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
    const [selectedProtoList, setSelectedProtoList] = React.useState([]);
    let copySelectedProtoList: any = [...selectedProtoList];

    const sumSize = (selectedProtoList: any) => {
        let sum: number = 0;
        for(let i = 0; i < selectedProtoList.length; i++) {
            sum += selectedProtoList[i].size;
        }
        return sum;
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
                                        copySelectedProtoList.push({id: Math.random(), name: item.name, size: item.size},);
                                        setSelectedProtoList(copySelectedProtoList);
                                        }}>
                                        {item.name} - {item.size}bytes
                                    </Button>
                                ))}
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs sm>
                        <Item>
                            <TextField label="MTU" value={textInput} onChange={(event) => setTextInput(Number(event.target.value))}/>
                            <p>Header size: {sumSize(selectedProtoList)}</p>
                            <p>MTU/MSS: {textInput - sumSize(selectedProtoList)}</p>
                            <p>追加したプロトコル</p>
                                <Stack direction={"column"} spacing={1}>
                                    {selectedProtoList.map((item: any) => (
                                        <Button variant="contained">
                                            {item.name} - {item.size}bytes
                                            <DeleteIcon fontSize="small" onClick={() => {
                                            setSelectedProtoList(copySelectedProtoList.filter((a: any) =>  a.id !== item.id));
                                            }}/>
                                        </Button>
                                    ))}
                                </Stack>
                        </Item>
                    </Grid>
                </Grid>
            </Dashboard>
        </div>
    )
}
export default MTUcalculator;