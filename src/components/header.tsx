import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Button, Popover, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import '../styles/header.css';

function Header() {

    const [anchorHelper, setAnchorHelper] = useState<HTMLButtonElement | null>(null);
    const [drawerState, setDrawerState] = useState<boolean>(false);

    const handleClick = (target: HTMLButtonElement) => {
        setAnchorHelper(target);
    }

    const handleClose = () => {
        setAnchorHelper(null);
    }

    const open = Boolean(anchorHelper);
    const id = open ? 'simple-popover' : undefined;

    return(<Box>
        <AppBar
            position='static'
            sx={{ backgroundColor: '#202225' }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1, width: {xs: "0px", lg: "170px"} }}/>
                <div style={{ display: 'contents'}}>
                    <Box
                        sx={{
                            height: 48,
                            objectFit: 'contain'
                        }}
                        component="img"
                        src={'/db-viewer/kroniicopter-helicopter.gif'} 
                        alt="kroniicopter"
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ marginLeft: '5px', color: "#d4d5d5"}}
                    >
                        DBViewer
                    </Typography>
                </div>
                <Box sx={{ flexGrow: 1 }}/>
                <IconButton sx={{ display: {xs: 'inline-flex', lg: 'none'} }}
                    onClick={() => setDrawerState(true)}
                    id="menu-button-drawer"
                >
                    <MenuIcon sx={{ color: "#d4d5d5" }} />
                </IconButton>
                <Drawer
                    anchor='right'
                    open={drawerState}
                    onClose={()=> setDrawerState(false)}
                    sx={{ color: '#202225' }}
                >
                    <Box
                        sx={{ width: '250px' , height: '100%', backgroundColor: '#202225'}}
                        role="presentation"
                        onClick={() => setDrawerState(false)}
                        onKeyDown={() => setDrawerState(false)}
                    >
                        <List>
                            <ListItem key="Tags">
                                <Link className='link-header' to="/">
                                    <ListItemButton sx={{ color: '#202225'}}>
                                        <ListItemIcon>
                                            <ImageSearchIcon sx={{ color: "#d4d5d5" }} />
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: "#d4d5d5" }} primary="TAGS"/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key="Profiles" sx={{ textDecoration: 'none' }}>
                                <Link className='link-header' to="/profiles">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AccountCircleIcon sx={{ color: "#d4d5d5" }} />
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: "#d4d5d5" }} primary="PROFILES" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key="Help">
                                <ListItemButton onClick={(e) => handleClick(document.getElementById("menu-button-drawer") as HTMLButtonElement)}>
                                    <ListItemIcon>
                                        <HelpOutlineIcon sx={{ color: "#d4d5d5" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "#d4d5d5" }} primary="About this"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>

                <Button sx={{display: { xs: 'none', lg: 'inline-flex' }}}> <Link style={{ textDecoration: "none", color: "#d4d5d5"}} to="/"> Tags </Link></Button>
                <Button sx={{display: { xs: 'none', lg: 'inline-flex' }}}> <Link style={{ textDecoration: "none", color: "#d4d5d5"}} to="/profiles"> Profiles </Link></Button>
                <IconButton onClick={(e) => handleClick(e.currentTarget)} sx={{display: { xs: 'none', lg: 'inline-flex' }}}>
                    <HelpOutlineIcon sx={{ color: "#d4d5d5" }} />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorHelper}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <Typography sx={{ p: 2, maxWidth: '400px', backgroundColor: '#36383e', color: '#d4d5d5'}}>
                        What is this ? <br />
                        This page is meant to be a visual of my personnal fanarts database.
                        Every entry of the database is a fanart posted on Twitter and saved automatically
                        by my personnal bot if one of the displayed tags matched. <br />
                    </Typography>
                </Popover>
            </Toolbar>
        </AppBar>
    </Box>);
}

export default Header;