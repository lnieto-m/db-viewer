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
                    sx={{ marginLeft: '5px' }}
                >
                    DBViewer
                </Typography>
                <Box sx={{ flexGrow: 1 }}/>
                <IconButton onClick={handleClick}>
                    <HelpOutlineIcon sx={{ color: 'white' }} />
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
                    Lorem ipsum
                </Popover>
            </Toolbar>
        </AppBar>
    </Box>);
}

export default Header;