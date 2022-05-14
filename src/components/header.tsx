import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Popover } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

function Header() {

    const [anchorHelper, setAnchorHelper] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorHelper(event.currentTarget);
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
                <Box sx={{ flexGrow: 1 }}/>
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
                <Box sx={{ flexGrow: 1 }}/>
                <IconButton onClick={handleClick}>
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