"use client";

import * as React from 'react';
import NextLink from 'next/link';
import {siteConfig} from '@/config/site';
import Drawer from '@mui/material/Drawer';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

const drawerWidth = 240;

export default function AppBarAndNavBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const trigger = useScrollTrigger();

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar color="transparent" position="fixed" sx={{ backdropFilter: "blur(8px)", backgroundColor: "navBar" }}>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            fontSize="medium"
                            sx={{ flexGrow: 1 }}
                        >
                            {siteConfig.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Slide>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
            	<Divider />
				<List>
					{siteConfig.navItems.map(({ label, href }) => (
					<ListItem key={href} disablePadding>
                        <NextLink href={href} legacyBehavior>
                            <ListItemButton component={Link} onClick={() => {setMobileOpen(false)}}>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </NextLink>
					</ListItem>
					))}
				</List>
            </Drawer>
        </>
    );
}