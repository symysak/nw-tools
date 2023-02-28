import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TocIcon from '@mui/icons-material/Toc';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';

import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        {/* Home */}
        <ListItemButton component={Link} to={"/"}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
        </ListItemButton>

        {/* Ooklaサーバリスト */}
        <ListItemButton component={Link} to={"/ookla-server-list"}>
            <ListItemIcon>
                <TocIcon />
            </ListItemIcon>
            <ListItemText primary="Ooklaサーバリスト" />
        </ListItemButton>

        {/* IP Addr個数表 */}
        <ListItemButton component={Link} to={"/ip-addr-table"}>
            <ListItemIcon>
                <TocIcon />
            </ListItemIcon>
            <ListItemText primary="IPアドレス個数表" />
        </ListItemButton>
        
        {/* MTU計算機 */}
        <ListItemButton component={Link} to={"/mtu-calculator"}>
            <ListItemIcon>
                <CalculateIcon />
            </ListItemIcon>
            <ListItemText primary="トンネルMTU計算機" />
        </ListItemButton>

    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
    
    </React.Fragment>
);
